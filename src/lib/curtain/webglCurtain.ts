// src/lib/curtain/webglCurtain.ts
/**
 * Photorealistic Velvet Texture Curtain Renderer
 *
 * Maps a single continuous velvet curtain photograph across two separate panels:
 * - Left panel uses the left half of the image.
 * - Right panel uses the right half.
 * - Centre seam aligned with a tiny overlap (0.003) to prevent gaps when closed.
 * - Coordinated cover cropping preserves aspect ratio across desktop and mobile.
 * - Restrained mesh deformation: gathering toward outer edges with the lower portion
 *   trailing gracefully behind the top.
 * - No artificial striped gradients, blue glow, or fake grain.
 */

const SUBDIV_X = 64
const SUBDIV_Y = 24
const IMG_ASPECT = 1024 / 576 // 16:9 ≈ 1.7778

const VERTEX_SHADER_SOURCE = `
precision highp float;

attribute vec2 a_uv;

uniform float u_progress;         // 0.0 (closed) to 1.0 (gathered & open)
uniform float u_panelSide;        // -1.0 for Left Panel, 1.0 for Right Panel
uniform vec2 u_resolution;
uniform float u_settleTime;       // 0.0 to 1.0 single settling pulse
uniform vec4 u_cropBounds;        // x: U_min, y: U_max, z: V_min, w: V_max
uniform float u_time;             // elapsed seconds for idle fabric motion
uniform float u_isIdle;           // 1.0 while idle, 0.0 when opening starts
uniform float u_dpr;              // device pixel ratio

varying vec2 v_texCoord;
varying vec2 v_uv;

void main() {
  v_uv = a_uv;
  float u = a_uv.x; // 0.0 = outer edge, 1.0 = inner center edge
  float v = a_uv.y; // 0.0 = top, 1.0 = bottom

  // 1. Coordinated Texture Mapping across the two panels
  // Left panel maps: [U_min, U_center + overlap]
  // Right panel maps: [U_max, U_center - overlap]
  float uCenter = (u_cropBounds.x + u_cropBounds.y) * 0.5;
  float overlap = 0.004; // Tiny subpixel overlap to eliminate light leak

  float texU = 0.0;
  if (u_panelSide < 0.0) {
    // Left panel: u=0 is outer left edge, u=1 is center seam
    texU = mix(u_cropBounds.x, uCenter + overlap, u);
  } else {
    // Right panel: u=0 is outer right edge, u=1 is center seam
    texU = mix(u_cropBounds.y, uCenter - overlap, u);
  }

  float texV = mix(u_cropBounds.z, u_cropBounds.w, v);
  v_texCoord = vec2(texU, texV);

  // 2. Restrained Opening & Gathering Motion
  // The lower portion follows slightly behind the top (smooth vertical drag profile)
  float verticalLag = v * 0.14;
  float pEffective = clamp((u_progress - verticalLag * (1.0 - u_progress)) / max(0.001, 1.0 - verticalLag * 0.3), 0.0, 1.0);

  // Smooth gathering curve
  float gatherP = pEffective;

  // Width reduction from ~50.6% (1.012 half-width) to ~22% (gathered at edges)
  float uncompressedWidth = 1.012;
  float gatheredWidth = 0.22;
  float currentWidth = mix(uncompressedWidth, gatheredWidth, gatherP);

  // Exit offset at very end of opening (0.9..1.0)
  float exitOffset = 0.0;
  if (u_progress > 0.9) {
    exitOffset = (u_progress - 0.9) * 10.0 * 0.35;
  }

  // Calculate base X position
  float xNorm = 0.0;
  if (u_panelSide < 0.0) {
    // Left panel: anchored at left viewport edge (x = -1.0)
    xNorm = -1.0 + (u * currentWidth) - exitOffset;
  } else {
    // Right panel: anchored at right viewport edge (x = 1.0)
    xNorm = 1.0 - (u * currentWidth) + exitOffset;
  }

  // 3. Natural Droop & Subtle Parallax Depth
  float sag = sin(u * 3.14159) * 0.012 * v;
  float yNorm = 1.0 - v * 2.0 - sag;

  // 4. Idle Fabric Motion (Low-amplitude mesh deformation)
  // - Top edge is anchored (v = 0 -> 0 displacement)
  // - Movement increases toward bottom (reaches 2-4 CSS pixels)
  // - 5-7 second slow cycle with different phase per panel
  // - Centre seam must remain closed: taper horizontal displacement to 0 at u = 1.0
  if (u_isIdle > 0.5) {
    float phase = (u_panelSide < 0.0) ? 0.0 : 1.35;
    float tCycle = u_time * 1.05 + phase; // ~6.0s cycle
    float idleWave = sin(tCycle) * 0.7 + sin(tCycle * 0.5 + 0.8) * 0.3;

    // Convert ~3 CSS pixels to clip space
    float cssWidth = max(320.0, u_resolution.x / max(1.0, u_dpr));
    float maxDispClip = (3.0 * 2.0) / cssWidth;

    // Top anchored (v=0 -> 0), bottom reaches max
    float vertFactor = pow(v, 1.4);

    // Taper to zero along meeting seam (u = 1.0) so seam stays closed
    float seamTaper = smoothstep(1.0, 0.7, u);
    // Subtle taper at outer edge anchor
    float outerTaper = smoothstep(0.0, 0.15, u);

    float idleDeltaX = idleWave * maxDispClip * vertFactor * seamTaper * outerTaper;
    float idleDeltaY = cos(tCycle * 0.8) * (maxDispClip * 0.2) * vertFactor * seamTaper;

    xNorm += idleDeltaX;
    yNorm += idleDeltaY;
  }

  // 5. Restrained Settling Motion near the end of opening (Single half-wave, no repeated bouncing)
  if (u_settleTime > 0.0 && u_settleTime <= 1.0) {
    float settleWave = sin(u_settleTime * 3.14159) * 0.007 * v * (1.0 - u * 0.5);
    yNorm += settleWave;
  }

  // Very subtle Z depth to provide parallax without warping photographic folds
  float z = sin(u * 12.566) * 0.015 * mix(1.0, 1.3, gatherP);

  gl_Position = vec4(xNorm, yNorm, z, 1.0);
}
`

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

varying vec2 v_texCoord;
varying vec2 v_uv;

uniform sampler2D u_texture;
uniform float u_progress;

void main() {
  vec4 texColor = texture2D(u_texture, v_texCoord);

  // Subtle darkening as fabric gathers to reflect deeper fold shadowing
  float gatherShadow = mix(1.0, 0.88, u_progress * (1.0 - v_uv.x * 0.4));
  vec3 finalColor = texColor.rgb * gatherShadow;

  // Clean fade at the very end of opening transition
  float alpha = 1.0;
  if (u_progress > 0.94) {
    alpha = clamp((1.0 - u_progress) / 0.06, 0.0, 1.0);
  }

  gl_FragColor = vec4(finalColor, alpha * texColor.a);
}
`

export interface WebGLCurtainConfig {
  canvas: HTMLCanvasElement
  isMobile: boolean
  textureUrl?: string
}

export class WebGLCurtainScene {
  private canvas: HTMLCanvasElement
  private gl: WebGLRenderingContext | null = null
  private program: WebGLProgram | null = null
  private vertexBuffer: WebGLBuffer | null = null
  private indexBuffer: WebGLBuffer | null = null
  private texture: WebGLTexture | null = null
  private indexCount = 0

  private isMobile: boolean
  private currentProgress = 0
  private settleTime = 0
  private textureLoaded = false
  private currentTime = 0
  private isIdle = 1.0
  private currentDpr = 1.0

  // Uniform locations
  private uProgressLoc: WebGLUniformLocation | null = null
  private uPanelSideLoc: WebGLUniformLocation | null = null
  private uResolutionLoc: WebGLUniformLocation | null = null
  private uSettleTimeLoc: WebGLUniformLocation | null = null
  private uCropBoundsLoc: WebGLUniformLocation | null = null
  private uTextureLoc: WebGLUniformLocation | null = null
  private uTimeLoc: WebGLUniformLocation | null = null
  private uIsIdleLoc: WebGLUniformLocation | null = null
  private uDprLoc: WebGLUniformLocation | null = null

  public isSupported = false

  constructor({ canvas, isMobile, textureUrl = '/curtain-velvet.jpg' }: WebGLCurtainConfig) {
    this.canvas = canvas
    this.isMobile = isMobile

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        premultipliedAlpha: false,
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      this.isSupported = false
      return
    }

    this.gl = gl
    this.isSupported = this.initGL()
    if (this.isSupported) {
      this.loadTexture(textureUrl)
      this.resize()
    }
  }

  private initGL(): boolean {
    const gl = this.gl
    if (!gl) return false

    const vs = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
    const fs = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
    if (!vs || !fs) return false

    const program = gl.createProgram()
    if (!program) return false

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('WebGL program link failed:', gl.getProgramInfoLog(program))
      return false
    }

    this.program = program

    this.uProgressLoc = gl.getUniformLocation(program, 'u_progress')
    this.uPanelSideLoc = gl.getUniformLocation(program, 'u_panelSide')
    this.uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    this.uSettleTimeLoc = gl.getUniformLocation(program, 'u_settleTime')
    this.uCropBoundsLoc = gl.getUniformLocation(program, 'u_cropBounds')
    this.uTextureLoc = gl.getUniformLocation(program, 'u_texture')
    this.uTimeLoc = gl.getUniformLocation(program, 'u_time')
    this.uIsIdleLoc = gl.getUniformLocation(program, 'u_isIdle')
    this.uDprLoc = gl.getUniformLocation(program, 'u_dpr')

    this.buildGridMesh()

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    return true
  }

  private loadTexture(url: string) {
    const gl = this.gl
    if (!gl) return

    const texture = gl.createTexture()
    this.texture = texture
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Initial placeholder (deep velvet burgundy) while loading
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([115, 18, 30, 255])
    )

    const img = new Image()
    img.src = url
    img.onload = () => {
      if (!this.gl || !this.texture) return
      const g = this.gl
      g.bindTexture(g.TEXTURE_2D, this.texture)
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR)

      this.textureLoaded = true
      this.renderCurrent()
    }
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl
    if (!gl) return null

    const shader = gl.createShader(type)
    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  private buildGridMesh() {
    const gl = this.gl
    if (!gl) return

    const vertices: number[] = []
    const indices: number[] = []

    for (let y = 0; y <= SUBDIV_Y; y++) {
      const v = y / SUBDIV_Y
      for (let x = 0; x <= SUBDIV_X; x++) {
        const u = x / SUBDIV_X
        vertices.push(u, v)
      }
    }

    const rowStride = SUBDIV_X + 1
    for (let y = 0; y < SUBDIV_Y; y++) {
      for (let x = 0; x < SUBDIV_X; x++) {
        const i0 = y * rowStride + x
        const i1 = i0 + 1
        const i2 = (y + 1) * rowStride + x
        const i3 = i2 + 1

        indices.push(i0, i2, i1)
        indices.push(i1, i2, i3)
      }
    }

    this.indexCount = indices.length

    this.vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    this.indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
  }

  public setMobile(isMobile: boolean) {
    this.isMobile = isMobile
    this.renderCurrent()
  }

  public resize() {
    const gl = this.gl
    if (!gl || !this.canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    this.currentDpr = dpr
    const width = Math.floor(window.innerWidth * dpr)
    const height = Math.floor(window.innerHeight * dpr)

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }

    gl.viewport(0, 0, width, height)
    this.renderCurrent()
  }

  public setIdleTime(timeSec: number) {
    this.currentTime = timeSec
    this.isIdle = 1.0
    this.renderCurrent()
  }

  public setProgress(progress: number, settleTime = 0) {
    this.currentProgress = Math.max(0, Math.min(1, progress))
    this.settleTime = settleTime
    // Stop idle motion immediately when opening starts
    this.isIdle = progress <= 0.0001 ? 1.0 : 0.0
    this.renderCurrent()
  }

  // Calculate object-fit: cover texture cropping coordinates
  private calculateCropBounds(): [number, number, number, number] {
    const screenWidth = this.canvas.width || 1
    const screenHeight = this.canvas.height || 1
    const screenAspect = screenWidth / screenHeight

    let uMin = 0.0
    let uMax = 1.0
    let vMin = 0.0
    let vMax = 1.0

    if (screenAspect > IMG_ASPECT) {
      // Screen is wider than 16:9 -> image fills width, crop top/bottom
      const scaleY = IMG_ASPECT / screenAspect
      vMin = (1.0 - scaleY) * 0.5
      vMax = (1.0 + scaleY) * 0.5
    } else {
      // Screen is taller than 16:9 -> image fills height, crop left/right
      const scaleX = screenAspect / IMG_ASPECT
      uMin = (1.0 - scaleX) * 0.5
      uMax = (1.0 + scaleX) * 0.5
    }

    return [uMin, uMax, vMin, vMax]
  }

  public renderCurrent() {
    const gl = this.gl
    const program = this.program
    if (!gl || !program || !this.isSupported) return

    gl.useProgram(program)

    // Bind mesh buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    const aUvLoc = gl.getAttribLocation(program, 'a_uv')
    gl.enableVertexAttribArray(aUvLoc)
    gl.vertexAttribPointer(aUvLoc, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

    // Calculate coordinated cropping bounds
    const [uMin, uMax, vMin, vMax] = this.calculateCropBounds()

    gl.uniform1f(this.uProgressLoc, this.currentProgress)
    gl.uniform2f(this.uResolutionLoc, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uSettleTimeLoc, this.settleTime)
    gl.uniform4f(this.uCropBoundsLoc, uMin, uMax, vMin, vMax)
    gl.uniform1f(this.uTimeLoc, this.currentTime)
    gl.uniform1f(this.uIsIdleLoc, this.isIdle)
    gl.uniform1f(this.uDprLoc, this.currentDpr)

    // Bind texture to unit 0
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    gl.uniform1i(this.uTextureLoc, 0)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 1. Render Left Panel (u_panelSide = -1.0)
    gl.uniform1f(this.uPanelSideLoc, -1.0)
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0)

    // 2. Render Right Panel (u_panelSide = 1.0)
    gl.uniform1f(this.uPanelSideLoc, 1.0)
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0)
  }

  public destroy() {
    const gl = this.gl
    if (gl) {
      if (this.vertexBuffer) gl.deleteBuffer(this.vertexBuffer)
      if (this.indexBuffer) gl.deleteBuffer(this.indexBuffer)
      if (this.texture) gl.deleteTexture(this.texture)
      if (this.program) gl.deleteProgram(this.program)
    }

    this.gl = null
    this.program = null
    this.isSupported = false
  }
}
