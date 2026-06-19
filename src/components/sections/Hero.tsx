'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowRight, ChevronDown, Download, Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { resume } from '@/data/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TechMarquee } from '../ui/TechMarquee'
import { HeroAvatar } from '../ui/HeroAvatar'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const underlineRef = useRef<SVGPathElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const fullName = profile.name.toUpperCase()

  useEffect(() => {
    const nameEl = nameRef.current
    if (!nameEl) return

    if (prefersReducedMotion) {
      nameEl.innerHTML = fullName.split('').map(char =>
        char === ' ' ? '<span class="char-space"> </span>' : `<span class="char">${char}</span>`
      ).join('')
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Split name into two lines: MUKUL and KUMAR
      const firstName = 'MUKUL'
      const lastName = 'KUMAR'
      
      nameEl.innerHTML = `
        <span class="block">${firstName.split('').map(char =>
          `<span class="char">${char}</span>`
        ).join('')}</span>
        <span class="block">${lastName.split('').map(char =>
          `<span class="char">${char}</span>`
        ).join('')}</span>
      `

      // Animate characters
      gsap.from('.char', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Fade in subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 2.5,
        ease: 'power3.out',
      })
    })

    return () => ctx.revert()
  }, [fullName, prefersReducedMotion])

  useEffect(() => {
    const els = [
      photoRef.current,
      roleRef.current,
      descRef.current,
      techRef.current,
      ctaRef.current,
      scrollRef.current,
    ]

    if (prefersReducedMotion) {
      els.forEach((el) => { if (el) gsap.set(el, { opacity: 1, y: 0 }) })
      if (underlineRef.current) {
        gsap.set(underlineRef.current, { strokeDashoffset: 0 })
      }
      return
    }

    // Set up underline length
    const underlineEl = underlineRef.current
    if (underlineEl) {
      const length = underlineEl.getTotalLength()
      gsap.set(underlineEl, { strokeDasharray: length, strokeDashoffset: length })
    }

    // Sequenced reveal timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(photoRef.current, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.8 })
      
    if (underlineEl) {
      tl.to(underlineEl, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '+=1.5')
    }

    tl.fromTo(roleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
      .fromTo(techRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
      .fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1')

    // Gentle floating animation on photo — continuous
    let floatTween: gsap.core.Tween | null = null
    if (photoRef.current) {
      floatTween = gsap.to(photoRef.current, {
        y: -12,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.9,
      })
    }

    return () => {
      tl.kill()
      floatTween?.kill()
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion) return

    // Parallax on scroll — elements move at different speeds
    const nameParallax = gsap.to(nameRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    const photoParallax = gsap.to(photoRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    const textParallax = gsap.to([roleRef.current, descRef.current, techRef.current, ctaRef.current], {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      nameParallax.scrollTrigger?.kill()
      photoParallax.scrollTrigger?.kill()
      textParallax.scrollTrigger?.kill()
      nameParallax.kill()
      photoParallax.kill()
      textParallax.kill()
    }
  }, [prefersReducedMotion])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent"
      aria-label="Hero section"
    >
      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#f5efe8]/10 via-transparent to-[#f5efe8]/30 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Animated gradient mesh background */}
      <div className="hero-bg-mesh" aria-hidden="true">
        <div className="hero-mesh-accent" />
      </div>

      {/* Main asymmetric layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12 md:px-16 w-full py-16 flex flex-col md:flex-row items-center justify-between gap-12 min-h-[85vh]">

        {/* ── Left column: text ── */}
        <div className="flex flex-col items-start text-left select-none flex-1 order-2 md:order-1">

          {/* Name container with underline */}
          <div className="relative mb-14 sm:mb-16">
            {/* Name with staggered character reveal */}
            <h1
              ref={nameRef}
              className="text-5xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight leading-[0.95] text-[#111111] select-none"
            />

            {/* Creative hand-drawn accent line SVG */}
            <svg
              className="absolute left-0 -bottom-6 w-[160px] sm:w-[220px] md:w-[280px] h-[20px] pointer-events-none"
              viewBox="0 0 280 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={underlineRef}
                d="M 6 8 C 65 14, 185 2, 274 10 C 210 13, 110 16, 40 12 C 120 10, 205 7, 260 12"
                stroke="#7C3AED"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Role + description */}
          <div ref={roleRef} className="mb-4 opacity-0">
            <h2 ref={subtitleRef} className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#111111]/85 tracking-wide opacity-0">
              {profile.headline}
            </h2>
          </div>

          <div ref={descRef} className="mb-6 opacity-0">
            <p className="text-[#111111]/85 font-medium text-base sm:text-lg leading-relaxed font-sans max-w-md">
              High-performance backends, <span className="text-highlight font-bold text-[#7C3AED]">AI pipelines</span>, and systems that actually work in production.
            </p>
          </div>

          {/* Tech Stack Marquee */}
          <div ref={techRef} className="w-full max-w-md mb-10 opacity-0">
            <TechMarquee />
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 opacity-0">
            <MagneticButton
              onClick={() => scrollToSection('skills')}
              data-cursor-label="Explore"
              className="cta-button px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#f5efe8] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2 group"
              aria-label="View selected work"
            >
              <span>View Selected Work</span>
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </MagneticButton>

            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-outline px-6 py-4 border-2 border-[#111111] hover:bg-[#111111] hover:text-[#f5efe8] text-[#111111] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Download size={12} />
              <span>Resume</span>
            </a>

            <MagneticButton
              onClick={() => scrollToSection('connect')}
              data-cursor-label="Connect"
              className="cta-button-outline px-6 py-4 border-2 border-[#111111] hover:bg-[#111111] hover:text-[#f5efe8] text-[#111111] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2"
              aria-label="Let's talk"
            >
              <Mail size={12} />
              <span>Let&apos;s Talk</span>
            </MagneticButton>
          </div>
        </div>

        {/* ── Right column: photo ── */}
        <HeroAvatar ref={photoRef} />
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
