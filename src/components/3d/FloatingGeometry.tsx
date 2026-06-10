'use client'

import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Generate static particle positions at module level to avoid React 19 render purity issues
const PARTICLE_COUNT = 250
const PARTICLE_POSITIONS = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  return pos
})()

export function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Track cursor position locally (in normalized device coordinates)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (meshRef.current) {
      // Gentle auto-rotation
      meshRef.current.rotation.x = time * 0.15
      meshRef.current.rotation.y = time * 0.1

      // Mouse reactivity (interactively tilting based on pointer coordinate)
      meshRef.current.rotation.x += mouse.current.y * 0.2
      meshRef.current.rotation.y += mouse.current.x * 0.2
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.6, 0.08)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.6, 0.08)
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -time * 0.05
      particlesRef.current.rotation.x = mouse.current.y * 0.08
    }
  })

  return (
    <>
      {/* Central Glassmorphic Geometrical Object */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 120, 16]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          emissive="#06B6D4"
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          ior={1.6}
          thickness={1.8}
        />
      </mesh>

      {/* Orbiting Particle Cluster */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06B6D4"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
          depthWrite={false}
        />
      </points>
    </>
  )
}
