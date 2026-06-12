'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export function InteractiveSVGDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const controlPoint = useRef({ x: 500, y: 30 })

  useEffect(() => {
    // Clean up any GSAP tweens on unmount
    return () => {
      gsap.killTweensOf(controlPoint.current)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !pathRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Convert client coordinates to SVG viewBox space (0 to 1000 X, 0 to 60 Y)
    const x = ((e.clientX - rect.left) / rect.width) * 1000
    const y = ((e.clientY - rect.top) / rect.height) * 60

    gsap.to(controlPoint.current, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute(
            'd',
            `M 0 30 Q ${controlPoint.current.x} ${controlPoint.current.y} 1000 30`
          )
        }
      },
    })
  }

  const handleMouseLeave = () => {
    gsap.to(controlPoint.current, {
      x: 500,
      y: 30,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto',
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute(
            'd',
            `M 0 30 Q ${controlPoint.current.x} ${controlPoint.current.y} 1000 30`
          )
        }
      },
    })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !pathRef.current || e.touches.length === 0) return
    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 1000
    const y = ((touch.clientY - rect.top) / rect.height) * 60

    gsap.to(controlPoint.current, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute(
            'd',
            `M 0 30 Q ${controlPoint.current.x} ${controlPoint.current.y} 1000 30`
          )
        }
      },
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className="relative w-full h-[60px] max-w-5xl mx-auto flex items-center justify-center cursor-pointer select-none group"
      style={{ touchAction: 'none' }}
    >
      <svg
        viewBox="0 0 1000 60"
        className="w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        {/* Background reference path (very faint dotted line) */}
        <path
          d="M 0 30 L 1000 30"
          stroke="#111111"
          strokeOpacity="0.04"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* The interactive animated plucked path */}
        <path
          ref={pathRef}
          d="M 0 30 Q 500 30 1000 30"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          className="transition-all duration-300 group-hover:stroke-width-2"
        />
        
        <defs>
          {/* Subtle gradient so the line is elegant and glowing */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.02" />
            <stop offset="25%" stopColor="#111111" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#111111" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.02" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
