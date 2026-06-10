'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Vertex Shader: Maps coordinates to screen-space quad
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// Fragment Shader: Ambient cream base, moving blurred lights, and cursor-based distortion
const fragmentShader = `
  uniform vec3 u_ripples[8];
  uniform float u_time;
  varying vec2 vUv;

  void main() {
    // 1. Accumulate cursor-based distortion ripples
    vec2 distortion = vec2(0.0);
    for (int i = 0; i < 8; i++) {
      vec3 r = u_ripples[i];
      float age = r.z;
      if (age > 0.0) {
        vec2 center = r.xy;
        float dist = distance(vUv, center);
        
        // Ripple wave expansion over time (age goes 1.0 -> 0.0)
        float progress = (1.0 - age) * 0.75;
        
        // Circular wave propagation with exponential spatial decay
        float wave = sin((dist - progress) * 35.0) * age * 0.012 * exp(-dist * 10.0);
        distortion += normalize(vUv - center + 0.0001) * wave;
      }
    }
    
    // Apply distortion capped at 15% intensity
    vec2 distortedUv = vUv + distortion * 0.15;
    
    // 2. Slow moving blurred light gradients
    // Gradient 1: white, slowly orbiting
    vec2 pos1 = vec2(
      0.5 + 0.3 * cos(u_time * 0.08),
      0.5 + 0.2 * sin(u_time * 0.12)
    );
    float g1 = smoothstep(0.65, 0.0, distance(distortedUv, pos1));
    
    // Gradient 2: warm gold/beige, moving along opposite path
    vec2 pos2 = vec2(
      0.5 + 0.25 * sin(u_time * 0.15),
      0.5 + 0.3 * cos(u_time * 0.07)
    );
    float g2 = smoothstep(0.85, 0.0, distance(distortedUv, pos2));
    
    // 3. Colors definitions
    vec3 creamBase = vec3(0.9608, 0.9373, 0.9098); // #f5efe8
    vec3 whiteLight = vec3(1.0);
    vec3 warmLight = vec3(0.8627, 0.8235, 0.7451); // #dcd2be / rgba(220, 210, 190)
    
    // Composite layers
    vec3 color = creamBase;
    color = mix(color, whiteLight, g1 * 0.4); // rgba(255, 255, 255, 0.4)
    color = mix(color, warmLight, g2 * 0.3);  // rgba(220, 210, 190, 0.3)
    
    gl_FragColor = vec4(color, 1.0);
  }
`

function WaterPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  // Track active ripples: x, y are normalized coordinates [0, 1], z is the age/opacity [1, 0]
  const ripplesRef = useRef(
    Array(8).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
  )

  // Track cursor movement and trigger ripples
  useEffect(() => {
    let lastX = 0.5
    let lastY = 0.5
    let activeIndex = 0

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1.0 - (e.clientY / window.innerHeight)
      
      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Spawn ripple source when mouse has moved beyond minimum threshold
      if (dist > 0.035) {
        ripplesRef.current[activeIndex] = { x, y, z: 1.0 }
        activeIndex = (activeIndex + 1) % 8
        
        lastX = x
        lastY = y
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Declare uniforms structure
  const uniformsRef = useRef({
    u_time: { value: 0 },
    u_ripples: { value: Array(8).fill(null).map(() => new THREE.Vector3(0, 0, 0)) }
  })

  // Frame tick animation loop
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()
      
      // Decay ages of active ripples and copy values to shader uniforms
      const ripples = ripplesRef.current
      const uniformsRipples = materialRef.current.uniforms.u_ripples.value
      
      for (let i = 0; i < ripples.length; i++) {
        if (ripples[i].z > 0) {
          ripples[i].z -= delta * 0.85
          if (ripples[i].z < 0) ripples[i].z = 0
        }
        uniformsRipples[i].set(ripples[i].x, ripples[i].y, ripples[i].z)
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
      />
    </mesh>
  )
}

export function FluidCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, depth: false, stencil: false }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <WaterPlane />
      </Canvas>
    </div>
  )
}
