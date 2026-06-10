'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'

interface CanvasContainerProps {
  children: React.ReactNode
  cameraPosition?: [number, number, number]
  fov?: number
}

export function CanvasContainer({
  children,
  cameraPosition = [0, 0, 5],
  fov = 75,
}: CanvasContainerProps) {
  const [dpr, setDpr] = useState(1.5)
  const [webGlSupported, setWebGlSupported] = useState(true)

  useEffect(() => {
    // Check if WebGL context can be initialized asynchronously to avoid React 19 warning
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas')
        const supported = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
        setWebGlSupported(supported)
      } catch {
        setWebGlSupported(false)
      }
    }
    const rafId = requestAnimationFrame(checkWebGL)
    return () => cancelAnimationFrame(rafId)
  }, [])

  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/90 text-text-muted text-sm border border-dashed border-primary/20 rounded-2xl p-6 text-center">
        <div>
          <p className="font-semibold text-white mb-2">3D Acceleration Unavailable</p>
          <p className="max-w-xs text-xs text-text-muted">
            WebGL is disabled or unsupported. Please check your system hardware acceleration settings to render interactive 3D assets.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative select-none pointer-events-auto">
      <Canvas
        dpr={dpr}
        camera={{ position: cameraPosition, fov }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <PerformanceMonitor
            onFallback={() => setDpr(1)}
            onChange={({ factor }) => setDpr(1 + factor * 0.8)}
          >
            {children}
          </PerformanceMonitor>
        </Suspense>
      </Canvas>
    </div>
  )
}
