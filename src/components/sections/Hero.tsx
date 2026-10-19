'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { animate } from 'framer-motion'
import { useUI } from '@/context/UIContext'
import { resume } from '@/data/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowUpRight, FileText, Eye } from 'lucide-react'
import { gsap } from 'gsap'

export function Hero() {
  const { navigateWithTransition, isCurtainActive, openResumeDialog } = useUI()
  const prefersReduced = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  // Drag state (held in refs outside React state for 60fps performance)
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const hasDraggedOnceRef = useRef(false)

  const startPointerRef = useRef({ x: 0, y: 0 })
  const pointerIdRef = useRef<number | null>(null)
  const currentXRef = useRef(0)
  const currentYRef = useRef(0)
  const currentRotateRef = useRef(0)
  const currentScaleRef = useRef(1)

  // Spring animation controls
  const animXRef = useRef<{ stop: () => void } | null>(null)
  const animYRef = useRef<{ stop: () => void } | null>(null)
  const animScaleRef = useRef<{ stop: () => void } | null>(null)

  const stopSprings = useCallback(() => {
    animXRef.current?.stop()
    animYRef.current?.stop()
    animScaleRef.current?.stop()
    animXRef.current = null
    animYRef.current = null
    animScaleRef.current = null
  }, [])

  // Safe movement limit dynamically calculated to prevent overlapping navbar or buttons
  const getSafeLimit = useCallback(() => {
    if (typeof window === 'undefined') return 100
    const w = window.innerWidth
    if (w < 640) return 38
    if (w < 768) return 48
    if (w < 1024) return 68
    if (w < 1280) return 88
    return 105
  }, [])

  const updateTransform = useCallback(() => {
    if (!draggableRef.current) return
    // Subtle pendulum arc lifting: bob rises slightly when swinging outward
    const arcLift = (currentXRef.current * currentXRef.current) / 600
    const finalY = currentYRef.current - arcLift
    draggableRef.current.style.transform = `translate3d(${currentXRef.current.toFixed(2)}px, ${finalY.toFixed(2)}px, 0px) rotate(${currentRotateRef.current.toFixed(2)}deg) scale(${currentScaleRef.current.toFixed(3)})`
  }, [])

  // Desktop pointer subtle parallax
  useEffect(() => {
    if (prefersReduced) return

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const hero = heroRef.current
    const visual = heroVisualRef.current
    if (!hero || !visual) return

    const xVisualTo = gsap.quickTo(visual, 'x', { duration: 0.5, ease: 'power2.out' })
    const yVisualTo = gsap.quickTo(visual, 'y', { duration: 0.5, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) return

      const rect = hero.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5

      // Subtle parallax: max 6px
      xVisualTo(relX * 7)
      yVisualTo(relY * 5)
    }

    const handleMouseLeave = () => {
      xVisualTo(0)
      yVisualTo(0)
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReduced])

  // Spring release back to origin
  const release = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    if (draggableRef.current) {
      draggableRef.current.style.cursor = 'grab'
      if (pointerIdRef.current !== null) {
        try {
          draggableRef.current.releasePointerCapture(pointerIdRef.current)
        } catch {}
        pointerIdRef.current = null
      }
    }

    // Fade out hint after first successful drag
    if (hasMovedRef.current && !hasDraggedOnceRef.current) {
      hasDraggedOnceRef.current = true
      if (hintRef.current) {
        hintRef.current.style.opacity = '0'
        hintRef.current.style.pointerEvents = 'none'
      }
      try {
        sessionStorage.setItem('mk_hero_dragged', 'true')
      } catch {}
    }

    stopSprings()

    if (prefersReduced) {
      currentXRef.current = 0
      currentYRef.current = 0
      currentRotateRef.current = 0
      currentScaleRef.current = 1
      updateTransform()
      return
    }

    const limit = getSafeLimit()

    // Underdamped pendulum sway: swings smoothly across equilibrium ~3-4 times
    const pendulumXConfig = {
      type: 'spring' as const,
      stiffness: 120,
      damping: 7.2,
      mass: 0.95,
    }

    // Vertical recovery: smoothly returns to baseline
    const springYConfig = {
      type: 'spring' as const,
      stiffness: 155,
      damping: 11.5,
      mass: 0.9,
    }

    animXRef.current = animate(currentXRef.current, 0, {
      ...pendulumXConfig,
      onUpdate: (latest) => {
        currentXRef.current = latest
        currentRotateRef.current = (latest / limit) * 12
        updateTransform()
      },
      onComplete: () => {
        currentRotateRef.current = 0
        updateTransform()
        animXRef.current = null
      },
    })

    animYRef.current = animate(currentYRef.current, 0, {
      ...springYConfig,
      onUpdate: (latest) => {
        currentYRef.current = latest
        updateTransform()
      },
      onComplete: () => {
        animYRef.current = null
      },
    })

    animScaleRef.current = animate(currentScaleRef.current, 1.0, {
      type: 'spring' as const,
      stiffness: 240,
      damping: 18,
      onUpdate: (latest) => {
        currentScaleRef.current = latest
        updateTransform()
      },
      onComplete: () => {
        animScaleRef.current = null
      },
    })
  }, [prefersReduced, stopSprings, updateTransform, getSafeLimit])

  // Drag Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.button !== 0) return

    // Do not activate while curtain intro is active or main-content is inert
    if (isCurtainActive) return
    const main = typeof document !== 'undefined' ? document.getElementById('main-content') : null
    if (main?.hasAttribute('inert')) return

    stopSprings()

    const target = e.currentTarget
    target.setPointerCapture(e.pointerId)
    pointerIdRef.current = e.pointerId
    isDraggingRef.current = true
    hasMovedRef.current = false
    target.style.cursor = 'grabbing'

    const limit = getSafeLimit()
    const r0 = Math.hypot(currentXRef.current, currentYRef.current)

    if (r0 > 0.001) {
      const clampedR = Math.min(r0, limit - 0.5)
      const d0 = (limit * clampedR) / (limit - clampedR)
      const ux = currentXRef.current / r0
      const uy = currentYRef.current / r0
      startPointerRef.current = {
        x: e.clientX - ux * d0,
        y: e.clientY - uy * d0,
      }
    } else {
      startPointerRef.current = { x: e.clientX, y: e.clientY }
    }

    currentScaleRef.current = 1.025
    updateTransform()
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - startPointerRef.current.x
    const dy = e.clientY - startPointerRef.current.y
    const distance = Math.hypot(dx, dy)

    if (distance > 5) {
      hasMovedRef.current = true
    }

    const limit = getSafeLimit()

    let x = 0
    let y = 0
    if (distance > 0) {
      // Prescribed radial rubber-band mapping: displayedDistance = limit * distance / (limit + distance)
      const displayedDistance = (limit * distance) / (limit + distance)
      x = (dx / distance) * displayedDistance
      y = (dy / distance) * displayedDistance
    }

    // Pendulum tilt based on displacement angle (up to ±12 degrees)
    const rotation = Math.max(-12, Math.min(12, (x / limit) * 12))

    currentXRef.current = x
    currentYRef.current = y
    currentRotateRef.current = rotation
    currentScaleRef.current = 1.025

    updateTransform()
  }

  // Safety listeners: pointercancel, blur, resize
  useEffect(() => {
    const onBlur = () => {
      release()
    }
    const onResize = () => {
      release()
    }
    window.addEventListener('blur', onBlur)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('resize', onResize)
      stopSprings()
    }
  }, [release, stopSprings])

  // Check if user already dragged once in this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mk_hero_dragged') === 'true' && hintRef.current) {
        hasDraggedOnceRef.current = true
        hintRef.current.style.opacity = '0'
        hintRef.current.style.pointerEvents = 'none'
      }
    } catch {}
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction & Overview"
      className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20"
    >
      {/*
        Container: Centered, max-w-6xl mx-auto px-4 sm:px-8
        Aligns directly with the navbar container boundary
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1.1fr] xl:grid-cols-[1.15fr_auto_1.15fr] items-center gap-8 lg:gap-8 xl:gap-12 w-full">

          {/* ======================================================== */}
          {/* COLUMN 1: LEFT                                            */}
          {/* Status -> Name -> Intro -> Education/Internship -> Location*/}
          {/* ======================================================== */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start justify-center min-w-0"
          >
            {/* 1.1 Status Badge */}
            <div className="inline-flex items-center gap-1.5 border border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1C1C] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000] mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 bg-[#FF5C35] rounded-none shrink-0" aria-hidden="true" />
              <span>Open to opportunities</span>
            </div>

            {/* 1.2 Mukul Kumar Heading (H1) */}
            <h1 className="font-heading font-black text-[clamp(2.4rem,3.8vw,3.5rem)] tracking-tight uppercase leading-[0.92] text-[#121212] dark:text-[#FAF7F0]">
              <span className="block">MUKUL</span>
              <span className="block">KUMAR</span>
            </h1>

            {/* 1.3 Short Introduction */}
            <p className="mt-4 font-sans text-[15px] sm:text-[16px] text-[#222222] dark:text-[#E2E2E2] leading-[1.6] max-w-[34ch]">
              I build backend services and AI applications, and contribute to open source.
            </p>

            {/* 1.4 Education and Internship */}
            <div className="flex flex-col gap-2.5 font-mono text-xs sm:text-[13px] text-[#444444] dark:text-[#CCCCCC] mt-5 sm:mt-6">
              {/* Education */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF5C35] shrink-0" aria-hidden="true" />
                <span className="font-semibold text-[#121212] dark:text-[#FAF7F0]">IIT Hyderabad</span>
                <span className="text-[#888888] dark:text-[#666666]">·</span>
                <span>B.Tech ’26</span>
              </div>

              {/* Internship on two clean lines */}
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF5C35] shrink-0 mt-1" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[#121212] dark:text-[#FAF7F0]">People Tech Group</span>
                  <span className="text-[#666666] dark:text-[#A3A3A3] text-[11px] sm:text-xs">Former Software Developer Intern</span>
                </div>
              </div>
            </div>

            {/* 1.5 Location */}
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#666666] dark:text-[#999999] pt-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[#FF5C35] shrink-0" aria-hidden="true" />
              <span>Rewari, Haryana, India</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: CENTRE                                          */}
          {/* Clean Portrait with elastic drag                          */}
          {/* ======================================================== */}
          <div className="w-full flex flex-col justify-center items-center py-2 sm:py-4 select-none shrink-0">
            {/* Stationary Wrapper */}
            <div
              ref={heroVisualRef}
              className="relative w-[200px] sm:w-[230px] lg:w-[260px] xl:w-[280px] aspect-square flex items-center justify-center shrink-0"
            >
              {/* Draggable Moving Group */}
              <div
                ref={draggableRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={release}
                onPointerCancel={release}
                onLostPointerCapture={release}
                tabIndex={prefersReduced ? -1 : 0}
                role="img"
                aria-label="Portrait of Mukul Kumar, Software Engineer. Elastic draggable interaction."
                style={{ touchAction: 'pan-y', transformOrigin: '50% -20px' }}
                className={`relative w-full h-full flex items-center justify-center shrink-0 select-none overflow-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C35] ${
                  prefersReduced ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
                }`}
              >
                {/* Photo Layer: Sharp, circular, clean brutalist border & shadow */}
                <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-[#FF5C35] z-10 border-2.5 border-[#121212] dark:border-[#FAF7F0] shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000]">
                  <Image
                    src="/mukul-hero-circle.webp"
                    alt="Portrait of Mukul Kumar, Software Engineer"
                    width={320}
                    height={320}
                    priority
                    draggable={false}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Playful Drag Hint: Speech label beneath portrait */}
              <div
                ref={hintRef}
                aria-hidden="true"
                className={`absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none inline-flex items-center gap-1.5 border border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1C1C] px-2.5 py-1 font-mono text-xs sm:text-[13px] font-bold tracking-tight text-[#121212] dark:text-[#FAF7F0] shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000] select-none whitespace-nowrap transition-opacity duration-300 ${
                  prefersReduced ? 'hidden' : 'opacity-100'
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FAF7F0] dark:bg-[#1C1C1C] border-t border-l border-[#121212] dark:border-[#FAF7F0] rotate-45"
                />
                <span>don’t drag me 👀</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: RIGHT                                           */}
          {/* Role -> Specialization -> CTA Buttons -> Budibase Link    */}
          {/* ======================================================== */}
          <div
            ref={rightColRef}
            className="flex flex-col items-start lg:items-end justify-center lg:text-right min-w-0"
          >
            {/* 3.1 Role Heading (H2) */}
            <h2 className="font-heading font-black text-[clamp(2rem,3.4vw,3.25rem)] tracking-tight uppercase leading-[0.92] text-[#121212] dark:text-[#FAF7F0]">
              <span className="block">SOFTWARE</span>
              <span className="block">ENGINEER</span>
            </h2>

            {/* 3.2 Specialization */}
            <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5C35] dark:text-[#FF5C35] leading-snug">
              Backend development &amp; AI applications
            </p>

            {/* 3.3 CTA Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center lg:justify-end gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigateWithTransition('work')}
                className="h-11 sm:h-12 px-5 sm:px-6 inline-flex items-center justify-center gap-2 bg-[#FF5C35] text-[#FAF7F0] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer border-2 border-[#121212] dark:border-[#FAF7F0] shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[5px_5px_0px_0px_#121212] dark:hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 transition-all shrink-0"
              >
                <span>View Projects</span>
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </button>

              {/* Resume Button Group: Opens in new tab without downloading + in-page preview */}
              <div className="inline-flex items-stretch shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#121212] dark:hover:shadow-[5px_5px_0px_0px_#000000] transition-all shrink-0">
                <a
                  href={resume.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-4 sm:px-5 inline-flex items-center justify-center gap-2 bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-[#121212] dark:border-[#FAF7F0] hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-[#121212] transition-colors"
                  title="Open resume PDF directly in new tab"
                >
                  <FileText size={16} className="stroke-[2]" />
                  <span>Resume</span>
                  <ArrowUpRight size={14} className="stroke-[2.5] opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={openResumeDialog}
                  className="h-11 sm:h-12 px-3 inline-flex items-center justify-center gap-1 bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs font-bold uppercase border-y-2 border-r-2 border-[#121212] dark:border-[#FAF7F0] hover:bg-[#FF5C35] hover:text-[#FAF7F0] dark:hover:bg-[#FF5C35] dark:hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  title="Quick in-page preview modal"
                  aria-label="Preview resume in modal"
                >
                  <Eye size={15} />
                  <span className="hidden sm:inline text-[11px]">Preview</span>
                </button>
              </div>
            </div>

            {/* 3.4 Budibase Contribution Link */}
            <div className="mt-4 sm:mt-5">
              <a
                href="https://github.com/Budibase/budibase/pull/19667"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#555555] dark:text-[#A3A3A3] hover:text-[#FF5C35] dark:hover:text-[#FF5C35] transition-colors focus-visible:outline-none"
              >
                <span className="w-1.5 h-1.5 bg-[#FF5C35] rounded-none shrink-0 group-hover:scale-125 transition-transform" />
                <span className="underline underline-offset-4 decoration-[#121212]/30 dark:decoration-[#FAF7F0]/30 group-hover:decoration-[#FF5C35]">
                  Budibase — merged contribution
                </span>
                <ArrowUpRight size={13} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
