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

    // Fragment Shader code: Ambient architectural atmosphere + cursor water ripple
    const fsSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_ripple_intensity;
      
      void main() {
        // Normalized screen coords
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 mouseUV = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        
        // Water Ripple displacement calculation
        float dist = distance(uv, mouseUV);
        float ripple = sin(dist * 35.0 - u_time * 6.5) * u_ripple_intensity * exp(-dist * 5.0);
        vec2 distortion = normalize(uv - mouseUV + 0.001) * ripple;
        
        // Apply distortion to coordinates
        vec2 st = uv + distortion;
        
        // Warm beige/cream color base
        vec3 cream = vec3(0.96, 0.94, 0.91);
        vec3 wallColor = vec3(0.94, 0.92, 0.88);
        vec3 floorColor = vec3(0.91, 0.89, 0.85);
        
        // 1. Soft vertical wall shadow boundary (creates feeling of columns/wall on the left)
        float wallMask = smoothstep(-0.31, -0.29, st.x);
        float wallShadow = smoothstep(-0.3, 0.4, st.x);
        
        // 2. Horizontal floor boundary at y = -0.3
        float floorMask = smoothstep(-0.31, -0.29, st.y);
        
        // 3. Ambient soft light gradients (light shaft coming from top-right)
        float lightGrad = dot(st + vec2(0.5, 0.2), normalize(vec2(1.0, 1.2)));
        lightGrad = smoothstep(-1.2, 1.2, lightGrad);
        vec3 ambientLight = vec3(1.0, 0.98, 0.94) * lightGrad * 0.12;
        
        // Combine wall and cream scene background
        vec3 ambientScene = mix(wallColor, cream, wallShadow);
        
        // Floor details with soft light reflection
        float reflection = smoothstep(-0.3, 0.5, st.x);
        vec3 floorReflected = mix(floorColor, vec3(0.95, 0.93, 0.89), reflection);
        
        // Composite floor and wall scenes
        vec3 finalColor = mix(floorReflected, ambientScene, floorMask);
        
        // Add ambient light
        finalColor += ambientLight;
        
        // Soft vignette
        float vignette = length(gl_FragCoord.xy / u_resolution.xy - 0.5);
        finalColor = mix(finalColor, finalColor * 0.88, vignette * vignette);
        
        gl_FragColor = vec4(finalColor, 1.0);
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
    const rippleIntensityLocation = gl.getUniformLocation(program, 'u_ripple_intensity')

    // Mouse coordinates tracking
    let targetMouseX = window.innerWidth / 2
    let targetMouseY = window.innerHeight / 2
    let currentMouseX = targetMouseX
    let currentMouseY = targetMouseY
    
    // Ripple intensity starts at 0, bumps on mouse movement
    let rippleIntensity = 0.0
    let lastMouseX = targetMouseX
    let lastMouseY = targetMouseY

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      // Invert Y axis for WebGL texture orientation
      targetMouseY = window.innerHeight - e.clientY

      // Calculate movement delta to compute speed
      const dx = targetMouseX - lastMouseX
      const dy = targetMouseY - lastMouseY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Bump ripple intensity (very low max, smooth increment)
      rippleIntensity = Math.min(0.015, rippleIntensity + dist * 0.0003)

      lastMouseX = targetMouseX
      lastMouseY = targetMouseY
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

      // Decaying ripple intensity
      rippleIntensity *= 0.94
      if (rippleIntensity < 0.0001) rippleIntensity = 0.0

      const time = (performance.now() - startTime) / 1000

      // Bind values to uniforms
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, currentMouseX, currentMouseY)
      gl.uniform1f(timeLocation, time)
      gl.uniform1f(rippleIntensityLocation, rippleIntensity)

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
