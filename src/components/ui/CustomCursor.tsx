'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string>('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    setIsActive(true)
    document.documentElement.classList.add('custom-cursor-active')

    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' })
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' })

    let isVisible = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.15 })
        isVisible = true
      }
      dotXTo(e.clientX)
      dotYTo(e.clientY)
      ringXTo(e.clientX)
      ringYTo(e.clientY)
    }

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
      isVisible = false
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-label]') as HTMLElement | null
      if (interactive) {
        const customLabel = interactive.dataset.cursorLabel
        if (customLabel) {
          setLabel(customLabel)
        }
        gsap.to(ring, {
          scale: 1.5,
          backgroundColor: 'rgba(255, 92, 53, 0.2)',
          borderColor: '#FF5C35',
          duration: 0.2,
          ease: 'power2.out',
        })
        gsap.to(dot, { scale: 0.5, backgroundColor: '#FF5C35', duration: 0.2 })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-label]')
      if (interactive) {
        setLabel('')
        gsap.to(ring, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'currentColor',
          duration: 0.2,
          ease: 'power2.out',
        })
        gsap.to(dot, { scale: 1, backgroundColor: 'currentColor', duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!isActive) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[999998] overflow-hidden select-none hidden lg:block">
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#121212] dark:bg-[#FAF7F0] opacity-0 will-change-transform"
      />
      {/* Outer Editorial Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-1.5 border-[#121212] dark:border-[#FAF7F0] opacity-0 will-change-transform flex items-center justify-center transition-colors"
      >
        {label && (
          <span className="font-mono text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-[#FF5C35] text-[#FAF7F0] absolute -top-5 rounded-none shadow-[1px_1px_0px_0px_#121212]">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
