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

    // Hide native cursor site-wide
    document.documentElement.style.cursor = 'none'

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

    // ── Hover states ──────────────────────────────────────────────

    const enterLink = () => {
      gsap.to(ring, {
        scale: 1.85,
        borderWidth: '1.5px',
        duration: 0.28,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 0.4, duration: 0.2, ease: 'power2.out' })
    }

    const leaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderWidth: '1px',
        duration: 0.28,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    // cursor-label: show text inside a big pill
    const enterLabel = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const text = el.dataset.cursorLabel ?? 'View'
      setLabelText(text)
      setIsLabeling(true)
      gsap.to(ring, {
        scale: 3.5,
        borderWidth: '0px',
        backgroundColor: 'rgba(255,255,255,1)',
        duration: 0.38,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const leaveLabel = () => {
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
    }

    // Dynamic context labels based on element type
    const getContextLabel = (el: HTMLElement): string => {
      if (el.dataset.cursorLabel) return el.dataset.cursorLabel
      if (el.tagName === 'A') return 'View'
      if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') return 'Click'
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return 'Type'
      if (el.classList.contains('tech-icon')) return el.getAttribute('title') || 'Tech'
      if (el.classList.contains('nav-link')) return 'Navigate'
      return ''
    }

    const enterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const label = getContextLabel(el)
      if (label) {
        setLabelText(label)
        setIsLabeling(true)
        gsap.to(ring, {
          scale: 2.8,
          borderWidth: '0px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          duration: 0.3,
          ease: 'power3.out',
        })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      } else {
        enterLink()
      }
    }

    const leaveInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      if (el.dataset.cursorLabel || getContextLabel(el)) {
        leaveLabel()
      } else {
        leaveLink()
      }
    }

    // ── Bind all interactive elements ─────────────────────────────

    const bindAll = () => {
      const links = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], input, textarea, select, .interactive-3d, .tech-icon, .nav-link'
      )
      const labelEls = document.querySelectorAll<HTMLElement>('[data-cursor-label]')

      links.forEach((el) => {
        el.removeEventListener('mouseenter', enterInteractive)
        el.removeEventListener('mouseleave', leaveInteractive)
        el.addEventListener('mouseenter', enterInteractive)
        el.addEventListener('mouseleave', leaveInteractive)
        ;(el as HTMLElement).style.cursor = 'none'
      })

      labelEls.forEach((el) => {
        el.removeEventListener('mouseenter', enterLabel)
        el.removeEventListener('mouseleave', leaveLabel)
        el.addEventListener('mouseenter', enterLabel)
        el.addEventListener('mouseleave', leaveLabel)
        ;(el as HTMLElement).style.cursor = 'none'
      })
    }

    bindAll()

    const observer = new MutationObserver(bindAll)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      observer.disconnect()
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* Inner dot — snaps to mouse */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
        }}
      />

      {/* Outer ring — lags behind with elastic ease */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #ffffff',
          backgroundColor: 'rgba(255,255,255,0)',
          mixBlendMode: 'difference',
        }}
      >
        {/* Context label shown on hover */}
        {isLabeling && labelText && (
          <span
            className="text-[9px] font-mono font-bold tracking-widest uppercase text-black select-none whitespace-nowrap"
            style={{ mixBlendMode: 'normal' }}
          >
            {labelText}
          </span>
        )}
      </div>
    </>
  )
}
