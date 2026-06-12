'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// Fragment Shader: Watery caustic light + cursor ripples on warm cream base
const fragmentShader = `
  uniform vec3 u_ripples[8];
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simple hash for pseudo-randomness
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // Caustic-style water light pattern
  float caustics(vec2 uv, float t) {
    vec2 p = uv * 4.0;
    float c = 0.0;
    c += noise(p + vec2(t * 0.07, t * 0.05)) * 0.5;
    c += noise(p * 1.8 - vec2(t * 0.04, t * 0.08)) * 0.3;
    c += noise(p * 3.2 + vec2(t * 0.06, -t * 0.04)) * 0.2;
    return c;
  }

  // Color palette for organic shifts
  vec3 palette(float t) {
    vec3 a = vec3(0.96, 0.94, 0.92);   // Warm cream base
    vec3 b = vec3(0.75, 0.68, 0.62);   // Muted brown
    vec3 c = vec3(0.47, 0.42, 0.38);   // Deep taupe
    vec3 d = vec3(0.68, 0.61, 0.55);   // Warm gray
    return a + b * cos(6.28318 * (c * t + d + u_time * 0.05));
  }

  void main() {
    float t = u_time;

    // 1. Cursor ripple distortion
    vec2 distortion = vec2(0.0);
    for (int i = 0; i < 8; i++) {
      vec3 r = u_ripples[i];
      float age = r.z;
      if (age > 0.0) {
        vec2 center = r.xy;
        float dist = distance(vUv, center);
        float progress = (1.0 - age) * 0.7;
        float wave = sin((dist - progress) * 38.0) * age * 0.010 * exp(-dist * 12.0);
        distortion += normalize(vUv - center + 0.0001) * wave;
      }
    }

    // 2. Slow background water sway (independent of cursor)
    vec2 sway = vec2(
      sin(vUv.y * 3.0 + t * 0.25) * 0.004,
      cos(vUv.x * 2.5 + t * 0.18) * 0.003
    );

    vec2 distortedUv = vUv + distortion * 0.18 + sway;

    // 3. Moving light blobs (slow-orbiting warm lights)
    vec2 pos1 = vec2(0.5 + 0.35 * cos(t * 0.07), 0.5 + 0.22 * sin(t * 0.11));
    float g1 = smoothstep(0.70, 0.0, distance(distortedUv, pos1));

    vec2 pos2 = vec2(0.5 + 0.28 * sin(t * 0.13), 0.5 + 0.35 * cos(t * 0.06));
    float g2 = smoothstep(0.90, 0.0, distance(distortedUv, pos2));

    vec2 pos3 = vec2(0.2 + 0.15 * cos(t * 0.09), 0.7 + 0.15 * sin(t * 0.14));
    float g3 = smoothstep(0.55, 0.0, distance(distortedUv, pos3));

    // 4. Caustic shimmer
    float caus = caustics(distortedUv, t);

    // 5. Color palette with organic shifts
    vec3 color = palette(length(distortedUv) * 0.5 + 0.5);

    // 6. Composite with subtle light overlays
    vec3 whiteLight = vec3(1.0, 0.995, 0.985);
    vec3 warmLight  = vec3(0.878, 0.847, 0.792);
    vec3 coolLight  = vec3(0.92, 0.935, 0.95);

    color = mix(color, whiteLight, g1 * 0.25);
    color = mix(color, warmLight,  g2 * 0.18);
    color = mix(color, coolLight,  g3 * 0.12);
    // Add caustic shimmer
    color += vec3(caus * 0.025);

    gl_FragColor = vec4(color, 1.0);
  }
`

function WaterPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const ripplesRef = useRef(
    Array(8).fill(null).map(() => ({ x: 0, y: 0, z: 0 }))
  )

  useEffect(() => {
    let lastX = 0.5
    let lastY = 0.5
    let activeIndex = 0

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1.0 - e.clientY / window.innerHeight

      // Update mouse uniform
      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(x, y)
      }

      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 0.03) {
        ripplesRef.current[activeIndex] = { x, y, z: 1.0 }
        activeIndex = (activeIndex + 1) % 8
        lastX = x
        lastY = y
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const uniformsRef = useRef({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1920, 1080) },
    u_ripples: { value: Array(8).fill(null).map(() => new THREE.Vector3(0, 0, 0)) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  })

  useFrame((state, delta) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()

    const ripples = ripplesRef.current
    const uniformsRipples = materialRef.current.uniforms.u_ripples.value
    for (let i = 0; i < ripples.length; i++) {
      if (ripples[i].z > 0) {
        ripples[i].z -= delta * 0.8
        if (ripples[i].z < 0) ripples[i].z = 0
      }
      uniformsRipples[i].set(ripples[i].x, ripples[i].y, ripples[i].z)
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent={false}
      />
    </mesh>
  )
}

/**
 * FluidCanvas — watery animated background.
 * When `fixed` prop is true it covers the entire viewport as a background layer.
 */
export function FluidCanvas({ fixed = false }: { fixed?: boolean }) {
  const positionClass = fixed
    ? 'fixed inset-0 w-full h-full pointer-events-none select-none'
    : 'absolute inset-0 w-full h-full pointer-events-none select-none'

  return (
    <div className={positionClass} style={{ zIndex: fixed ? -1 : 0 }}>
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
