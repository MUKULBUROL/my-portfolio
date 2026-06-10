'use client'

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface WorkspaceProps {
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}

export function Workspace({ activeItem, setActiveItem }: WorkspaceProps) {
  return (
    <>
      {/* AI object - Sphere representing core AI node */}
      <WorkspaceItem
        position={[-2.0, 1.0, 0]}
        color="#7C3AED"
        label="AI & Intelligent Systems"
        name="AI"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
      </WorkspaceItem>

      {/* Engineering object - Rounded Box */}
      <WorkspaceItem
        position={[2.0, 1.0, 0]}
        color="#06B6D4"
        label="Full-Stack Engineering"
        name="Engineering"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <boxGeometry args={[0.85, 0.85, 0.85]} />
      </WorkspaceItem>

      {/* Architecture object - Cone/Pyramid */}
      <WorkspaceItem
        position={[-2.0, -1.0, 0]}
        color="#22C55E"
        label="System Architecture"
        name="Architecture"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <coneGeometry args={[0.55, 1.0, 4]} />
      </WorkspaceItem>

      {/* Leadership object - Torus representing circular teamwork flow */}
      <WorkspaceItem
        position={[2.0, -1.0, 0]}
        color="#EC4899"
        label="Technical Leadership"
        name="Leadership"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <torusGeometry args={[0.42, 0.16, 16, 64]} />
      </WorkspaceItem>
    </>
  )
}

function WorkspaceItem({
  children,
  position,
  color,
  label,
  name,
  activeItem,
  setActiveItem,
}: {
  children: React.ReactNode
  position: [number, number, number]
  color: string
  label: string
  name: string
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const isActive = activeItem === name

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Gentle auto-rotation
      meshRef.current.rotation.y = time * 0.45
      meshRef.current.rotation.x = time * 0.25
      
      // Floating translation movement
      const offset = Math.sin(time * 1.5 + position[0]) * 0.08
      meshRef.current.position.y = position[1] + offset
    }
  })

  // Dynamic mesh scale logic
  const currentScale = isActive ? 1.35 : hovered ? 1.15 : 0.95

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={currentScale}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => {
        setHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setActiveItem(isActive ? null : name)
      }}
    >
      {children}
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={isActive ? 0.7 : hovered ? 0.35 : 0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
      {/* HTML billboard tag */}
      <Html distanceFactor={6} position={[0, 0.9, 0]} center>
        <div className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest whitespace-nowrap transition-all duration-300 pointer-events-none select-none border ${
          isActive || hovered 
            ? 'bg-white text-[#050816] border-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.4)] opacity-100' 
            : 'bg-[#050816]/80 text-[#94A3B8] border-primary/20 opacity-70'
        }`}>
          {label}
        </div>
      </Html>
    </mesh>
  )
}
