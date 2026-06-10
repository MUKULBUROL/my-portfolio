'use client'

import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { profile } from '@/data/profile'
import { FluidCanvas } from '../ui/FluidCanvas'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [displayName, setDisplayName] = useState('')
  const [roleVisible, setRoleVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('portfolio-visited') === 'true'
    const fullName = profile.name.toUpperCase()

    if (hasVisited) {
      requestAnimationFrame(() => {
        setDisplayName(fullName)
        setRoleVisible(true)
        setContentVisible(true)
        setIsTypingComplete(true)
      })
      
      // Animate layout elements in smoothly with no delays
      gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 })
    } else {
      // First-visit creative typing sequence
      let current = ''
      let charIndex = 0

      const intervalId = setInterval(() => {
        if (charIndex < fullName.length) {
          current += fullName[charIndex]
          setDisplayName(current)
          charIndex++
        } else {
          clearInterval(intervalId)
          setIsTypingComplete(true)

          // Reveal role
          setTimeout(() => {
            setRoleVisible(true)

            // Reveal CTAs & Supporting text
            setTimeout(() => {
              setContentVisible(true)
              sessionStorage.setItem('portfolio-visited', 'true')
              
              // Fade in remaining page indicators
              gsap.fromTo(ctaRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
              gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
            }, 300)
          }, 200)
        }
      }, 45) // Fast character typing to keep under 2 seconds total

      return () => clearInterval(intervalId)
    }
  }, [])

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
      {/* Fullscreen procedural arches & water ripples WebGL canvas */}
      <FluidCanvas />

      {/* Subtle overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe8]/20 via-transparent to-[#f5efe8]/40 pointer-events-none z-0" aria-hidden="true" />

      {/* Main centered layout grid */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full py-16 flex flex-col justify-center items-center text-center">
        
        {/* Massive Typography Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight leading-[0.95] text-[#111111] mb-6 select-none"
        >
          {displayName}
          {!isTypingComplete && (
            <span className="inline-block w-[8px] h-[48px] sm:h-[68px] md:h-[78px] lg:h-[88px] bg-[#111111] ml-2 animate-pulse" />
          )}
        </h1>

        <div ref={contentRef} className="flex flex-col items-center">
          {/* Role Under name */}
          <div className="h-10 overflow-hidden mb-6">
            <h2
              className={`font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#111111]/80 tracking-wide transition-all duration-500 ease-[var(--ease-spring)] transform ${
                roleVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Software Engineer
            </h2>
          </div>

          {/* Supporting text description */}
          <div className="max-w-xl mb-10">
            <p
              className={`text-[#6b6b6b] text-base sm:text-lg leading-relaxed transition-all duration-500 ease-[var(--ease-spring)] delay-100 transform ${
                contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Building intelligent systems, modern products, and meaningful experiences.
            </p>
          </div>

          {/* CTA Button */}
          <div
            ref={ctaRef}
            className={`transition-opacity duration-300 ${
              contentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <MagneticButton
              onClick={() => scrollToSection('journey')}
              className="px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#f5efe8] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2 group transition-all duration-300"
              aria-label="Follow my journey"
            >
              <span>Follow My Journey</span>
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
