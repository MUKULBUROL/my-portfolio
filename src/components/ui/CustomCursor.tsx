'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Unseen.co-style circular cursor with context labels
 * ─────────────────────────────────────────────────────
 * • Small solid dot — snaps to mouse instantly
 * • Large thin ring — follows with elastic lag (~0.35s)
 * • mix-blend-mode: difference on both elements
 * • On hover over links / buttons: ring expands
 * • On hover over [data-cursor-label] elements: shows text label
 * • Dynamic context labels based on element type
 * • Hides on touch devices
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isLabeling, setIsLabeling] = useState(false)
  const [labelText, setLabelText] = useState('')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Disable on touch/mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    // Add class to activate custom cursor style hiding via CSS
    document.documentElement.classList.add('custom-cursor-active')

    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 })

    // Quick-to tweens for cursor tracking
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.1, ease: 'power3.out' })
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.1, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3.out' })

    let isVisible = false

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)

      if (!isVisible) {
        isVisible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
      isVisible = false
    }

    // Dynamic context labels based on element type.
    // Elements with data-cursor-no-label="true" are skipped entirely.
    const getContextLabel = (el: HTMLElement): string => {
      // Opt-out: UI-only controls (NanoCar, sliders, etc.) should not trigger label
      if (el.dataset.cursorNoLabel) return ''
      if (el.dataset.cursorLabel) return el.dataset.cursorLabel
      // Only anchor tags with a real href get a label
      if (el.tagName === 'A' && (el as HTMLAnchorElement).href) return 'View'
      // Buttons only get a label if they carry an explicit data-cursor-label
      // (raw <button> without it = UI control, no label wanted)
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return 'Type'
      if (el.classList.contains('tech-icon')) return el.getAttribute('title') || 'Tech'
      if (el.classList.contains('nav-link')) return 'Navigate'
      return ''
    }

    // ── Event Delegation for Hover states ─────────────────────────────

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const el = target.closest(
        'a, button, [role="button"], input, textarea, select, .interactive-3d, .tech-icon, .nav-link, [data-cursor-label]'
      ) as HTMLElement | null

      if (el) {
        const label = getContextLabel(el)
        if (label) {
          setLabelText(label)
          setIsLabeling(true)
          gsap.to(ring, {
            scale: 1.8,
            borderWidth: '0px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            duration: 0.3,
            ease: 'power3.out',
          })
          gsap.to(dot, { scale: 0, duration: 0.2 })
        } else {
          // Normal link hover
          gsap.to(ring, {
            scale: 1.3,
            borderWidth: '1.5px',
            duration: 0.28,
            ease: 'power2.out',
          })
          gsap.to(dot, { scale: 0.4, duration: 0.2, ease: 'power2.out' })
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const el = target.closest(
        'a, button, [role="button"], input, textarea, select, .interactive-3d, .tech-icon, .nav-link, [data-cursor-label]'
      ) as HTMLElement | null

      if (el) {
        if (el.dataset.cursorLabel || getContextLabel(el)) {
          setLabelText('')
          setIsLabeling(false)
          gsap.to(ring, {
            scale: 1,
            borderWidth: '1px',
            backgroundColor: 'rgba(255,255,255,0)',
            duration: 0.32,
            ease: 'power3.out',
          })
          gsap.to(dot, { scale: 1, duration: 0.2 })
        } else {
          gsap.to(ring, {
            scale: 1,
            borderWidth: '1px',
            duration: 0.28,
            ease: 'power2.out',
          })
          gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' })
        }
      }
    }

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      {/* Inner dot — snaps to mouse */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center cursor-dot-style"
      />

      {/* Outer ring — lags behind with elastic ease */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:flex items-center justify-center cursor-ring-style"
      >
        {/* Context label shown on hover */}
        {isLabeling && labelText && (
          <span className="cursor-label">
            {labelText}
          </span>
        )}
      </div>
    </>
  )
}
