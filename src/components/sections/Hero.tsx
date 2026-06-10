'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { profile } from '@/data/profile'
import { FluidCanvas } from '../ui/FluidCanvas'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const els = [canvasWrapperRef.current, nameRef.current, roleRef.current, descRef.current, ctaRef.current, scrollRef.current]

    if (prefersReducedMotion) {
      // Skip animation — immediately show everything at final state
      els.forEach((el) => { if (el) gsap.set(el, { opacity: 1, y: 0 }) })
      return
    }

    // GSAP sequenced reveal timeline (max 2 seconds total duration)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      canvasWrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )
      .fromTo(
        nameRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.3'
      )
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        '-=0.1'
      )

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f5efe8] pt-20"
      aria-label="Hero section"
    >
      {/* Fullscreen procedural canvas wrapper */}
      <div ref={canvasWrapperRef} className="absolute inset-0 z-0 opacity-0">
        <FluidCanvas />
      </div>

      {/* Subtle overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8]/20 via-transparent to-[#f5efe8]/40 pointer-events-none z-0" aria-hidden="true" />

      {/* Main asymmetric layout container */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12 md:px-16 w-full py-16 flex flex-col min-h-[85vh] justify-center items-start text-left select-none">
        
        {/* Massive Typography Name — Left-aligned, max-width 80%, slightly offset */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight leading-[0.95] text-[#111111] mb-12 select-none opacity-0 text-left max-w-[80%] md:ml-[5%]"
        >
          {profile.name.toUpperCase()}
        </h1>

        {/* Asymmetric Content Columns */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 mt-4 md:pl-[10%]">
          
          {/* Narrow supporting column (Role and description) */}
          <div className="flex flex-col items-start max-w-md w-full">
            {/* Role Under name */}
            <div ref={roleRef} className="h-auto mb-4 opacity-0">
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#111111]/85 tracking-wide">
                {profile.headline}
              </h2>
            </div>

            {/* Supporting text description */}
            <div ref={descRef} className="mb-8 opacity-0">
              <p className="text-[#6b6b6b] text-base sm:text-lg leading-relaxed font-sans">
                Building intelligent systems, modern products, and meaningful experiences.
              </p>
            </div>
          </div>

          {/* CTA Button — Offset from center, placed to the right on desktop */}
          <div ref={ctaRef} className="opacity-0 md:self-end md:mb-8 pl-2">
            <MagneticButton
              onClick={() => scrollToSection('selected-work')}
              className="px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#f5efe8] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2 group transition-all duration-300"
              aria-label="View selected work"
            >
              <span>View Selected Work</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#6b6b6b] select-none pointer-events-none opacity-0 z-10"
        aria-hidden="true"
      >
        <span className="text-[8px] font-mono uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}
