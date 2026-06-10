'use client'

import React, { useEffect, useRef } from 'react'

export function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Safely get WebGL context
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL is unsupported. Falling back to CSS styling.')
      return
    }

    // Vertex Shader code
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Fragment Shader code (procedural minimal arches + cursor water ripple)
    const fsSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      
      // Signed Distance Field of infinite corridor arches
      float map(vec3 p) {
        // Z-axis repeat
        float z = mod(p.z, 2.5) - 1.25;
        vec3 q = vec3(p.x, p.y, z);
        
        // Arch cut-out opening
        float box = max(abs(q.x) - 0.75, abs(q.y - 0.45) - 1.2);
        float semi = length(vec2(q.x, max(0.0, q.y - 0.45))) - 0.75;
        float arch = min(box, semi);
        
        // Hallway walls
        float ceiling = -p.y + 1.4;
        float floor = p.y + 1.4;
        float leftWall = p.x + 1.8;
        float rightWall = 1.8 - p.x;
        
        float walls = min(ceiling, min(floor, min(leftWall, rightWall)));
        
        // Subtract arch opening from walls
        return max(walls, -arch);
      }
      
      // Calculate normals for lighting
      vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.002, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }
      
      void main() {
        // Normalized screen coords
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 mouseUV = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        
        // Water Ripple displacement calculation
        float dist = distance(uv, mouseUV);
        float ripple = sin(dist * 35.0 - u_time * 6.5) * 0.018 * exp(-dist * 4.5);
        vec2 distortion = normalize(uv - mouseUV + 0.001) * ripple;
        
        // Ray origin & camera movement (slowly drifting through arches)
        vec3 ro = vec3(0.0, 0.0, -u_time * 0.08);
        // Distort ray direction based on water ripples
        vec3 rd = normalize(vec3(uv + distortion, 1.3));
        
        // Raymarching loop
        float t = 0.0;
        int hitIndex = -1;
        
        for (int i = 0; i < 40; i++) {
          vec3 p = ro + rd * t;
          float d = map(p);
          if (d < 0.001) {
            hitIndex = i;
            break;
          }
          t += d;
          if (t > 25.0) break;
        }
        
        // Shading
        vec3 color = vec3(0.96, 0.94, 0.91); // Warm beige base background
        
        if (hitIndex != -1) {
          vec3 p = ro + rd * t;
          vec3 normal = getNormal(p);
          
          // Soft lighting
          vec3 lightDir = normalize(vec3(0.5, 1.0, -0.5));
          float diff = max(0.12, dot(normal, lightDir));
          
          // Shadows & depth shading
          float depthFactor = exp(-t * 0.12);
          
          // Editorial colors
          vec3 surfaceColor = vec3(0.95, 0.93, 0.89); // warm cream
          if (normal.y > 0.8) {
            surfaceColor = vec3(0.91, 0.89, 0.85); // soft floor shadow
          }
          
          color = mix(color, surfaceColor * diff, depthFactor);
        }
        
        // Soft vignette
        float vignette = length(gl_FragCoord.xy / u_resolution.xy - 0.5);
        color = mix(color, color * 0.85, vignette * vignette);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shader helper
    const compileShader = (source: string, type: number): WebGLShader | null => {
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

    const vs = compileShader(vsSource, gl.VERTEX_SHADER)
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER)
    if (!vs || !fs) return

    // Create program
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Vertices coordinates (quad filling canvas)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Locate uniforms
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    // Mouse coordinates tracking
    let targetMouseX = window.innerWidth / 2
    let targetMouseY = window.innerHeight / 2
    let currentMouseX = targetMouseX
    let currentMouseY = targetMouseY

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      // Invert Y axis for WebGL texture orientation
      targetMouseY = window.innerHeight - e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize canvas helper
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation frames loop
    let animationFrameId = 0
    const startTime = performance.now()

    const render = () => {
      // Smooth mouse lag (lerping) to make ripples look organic
      currentMouseX += (targetMouseX - currentMouseX) * 0.09
      currentMouseY += (targetMouseY - currentMouseY) * 0.09

      const time = (performance.now() - startTime) / 1000

      // Bind values to uniforms
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, currentMouseX, currentMouseY)
      gl.uniform1f(timeLocation, time)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none bg-[#f5efe8]"
      style={{ mixBlendMode: 'normal' }}
    />
  )
}
