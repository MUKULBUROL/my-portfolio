'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    gsap.set(dot, { xPercent: -50, yPercent: -50 })
    gsap.set(ring, { xPercent: -50, yPercent: -50 })

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX)
      yDotTo(e.clientY)
      xRingTo(e.clientX)
      yRingTo(e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)

    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: 'rgba(6, 182, 212, 0.8)',
        backgroundColor: 'rgba(6, 182, 212, 0.08)',
        duration: 0.25,
      })
      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: '#06B6D4',
        duration: 0.25,
      })
    }

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(124, 58, 237, 0.5)',
        backgroundColor: 'transparent',
        duration: 0.25,
      })
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#7C3AED',
        duration: 0.25,
      })
    }

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive-3d')
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', onMouseEnterLink)
        target.removeEventListener('mouseleave', onMouseLeaveLink)
        target.addEventListener('mouseenter', onMouseEnterLink)
        target.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    addHoverListeners()

    // Observe body alterations to automatically bind dynamic elements
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive-3d')
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', onMouseEnterLink)
        target.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary pointer-events-none z-50 hidden lg:block"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-primary/40 pointer-events-none z-50 hidden lg:block"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  )
}
