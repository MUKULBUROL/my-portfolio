'use client'

import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface SkillNode {
  name: string
  color: string
  radius: number
  speed: number
  phase: number
  description: string
}

const SKILL_NODES: SkillNode[] = [
  { name: 'AI & LLMs', color: '#A78BFA', radius: 0.0, speed: 0, phase: 0, description: 'Autonomous agents, custom prompt routing, RAG workflows, vector databases.' },
  { name: 'React 19', color: '#61DAFB', radius: 1.6, speed: 0.28, phase: 0.5, description: 'Concurrent UI loading, compiler transitions, custom state hooks.' },
  { name: 'Next.js 15', color: '#F1F5F9', radius: 2.3, speed: 0.20, phase: 1.2, description: 'App Router framework, static path generation, caching protocols.' },
  { name: 'TypeScript', color: '#3178C6', radius: 3.0, speed: 0.24, phase: 2.0, description: 'Advanced template literals, generics audits, robust runtime checks.' },
  { name: 'Node.js', color: '#10B981', radius: 3.7, speed: 0.16, phase: 2.8, description: 'Multi-threaded background loops, data pipelines, rate-limiting handlers.' },
  { name: 'Python', color: '#3776AB', radius: 4.4, speed: 0.13, phase: 3.6, description: 'Inference script integrations, data analysis pipelines.' },
  { name: 'PostgreSQL', color: '#3B82F6', radius: 5.1, speed: 0.11, phase: 4.4, description: 'Execution indexes, compound queries, complex transaction isolation.' },
  { name: 'AWS Cloud', color: '#F59E0B', radius: 5.8, speed: 0.08, phase: 5.2, description: 'Container definitions, VPC routing parameters, CDN configurations.' },
]

// Generate stable random background stars for the galaxy environment at module level to avoid React 19 render purity issues
const STAR_COUNT = 300
const STAR_POSITIONS = (() => {
  const pos = new Float32Array(STAR_COUNT * 3)
  for (let i = 0; i < STAR_COUNT; i++) {
    // Disk-like distribution for a galaxy spiral feel
    const angle = Math.random() * Math.PI * 2
    const radius = 2 + Math.random() * 8
    pos[i * 3] = Math.cos(angle) * radius
    pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
    pos[i * 3 + 2] = Math.sin(angle) * radius
  }
  return pos
})()

export function SkillsGalaxy({
  activeSkill,
  setActiveSkill,
}: {
  activeSkill: string | null
  setActiveSkill: (skill: string | null) => void
}) {

  return (
    <>
      {/* Galaxy center glow point */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#7C3AED" />
      </mesh>
      
      {/* Background Star field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STAR_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#94A3B8"
          size={0.02}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.5}
          depthWrite={false}
        />
      </points>

      {SKILL_NODES.map((node) => (
        <GalaxyNode
          key={node.name}
          node={node}
          activeSkill={activeSkill}
          setActiveSkill={setActiveSkill}
        />
      ))}
    </>
  )
}

function GalaxyNode({
  node,
  activeSkill,
  setActiveSkill,
}: {
  node: SkillNode
  activeSkill: string | null
  setActiveSkill: (skill: string | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()
  const isActive = activeSkill === node.name

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      if (node.radius === 0) {
        // AI node resides in coordinates center with floating motion
        meshRef.current.position.set(0, Math.sin(time * 1.8) * 0.12, 0)
        meshRef.current.rotation.y = time * 0.3
        return
      }

      // Compute orbital coordinates
      const angle = time * node.speed + node.phase
      const x = Math.cos(angle) * node.radius
      const z = Math.sin(angle) * node.radius
      const y = Math.sin(time * 0.6 + node.phase) * (node.radius * 0.12)

      meshRef.current.position.set(x, y, z)
      meshRef.current.rotation.y = time * 0.4
    }
  })

  const handleNodeClick = () => {
    setActiveSkill(isActive ? null : node.name)
    if (meshRef.current) {
      const targetPos = new THREE.Vector3()
      meshRef.current.getWorldPosition(targetPos)
      
      // Perform smooth zoom
      gsap.to(camera.position, {
        x: targetPos.x * 0.75,
        y: targetPos.y + 1.2,
        z: targetPos.z + 2.0,
        duration: 1.0,
        ease: 'power3.out',
      })
    }
  }

  const currentScale = isActive ? 1.35 : hovered ? 1.15 : 0.85

  return (
    <mesh
      ref={meshRef}
      scale={currentScale}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        handleNodeClick()
      }}
    >
      <sphereGeometry args={[0.26, 32, 32]} />
      <meshPhysicalMaterial
        color={node.color}
        roughness={0.1}
        metalness={0.8}
        emissive={node.color}
        emissiveIntensity={isActive ? 1.3 : hovered ? 0.7 : 0.1}
        clearcoat={1.0}
      />
      
      {/* Node Tag HUD */}
      <Html distanceFactor={8} position={[0, 0.45, 0]} center>
        <div className={`flex flex-col items-center pointer-events-none select-none transition-all duration-300 ${
          isActive || hovered ? 'opacity-100 scale-105' : 'opacity-70 scale-95'
        }`}>
          <div className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest whitespace-nowrap border select-none shadow-md ${
            isActive 
              ? 'bg-[#7C3AED] text-white border-[#7C3AED]' 
              : hovered 
                ? 'bg-[#06B6D4] text-[#050816] border-[#06B6D4]' 
                : 'bg-[#050816]/90 text-[#94A3B8] border-primary/10'
          }`}>
            {node.name}
          </div>
          {hovered && (
            <div className="mt-1 w-36 p-2 rounded-lg bg-[#050816]/95 border border-[#06B6D4]/30 text-[7px] text-[#94A3B8] leading-snug shadow-xl backdrop-blur-md text-center">
              {node.description}
            </div>
          )}
        </div>
      </Html>
    </mesh>
  )
}
