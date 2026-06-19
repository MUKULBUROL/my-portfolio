'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowRight, ChevronDown, Download, Mail, GraduationCap, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { resume } from '@/data/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TechMarquee } from '../ui/TechMarquee'
import { HeroAvatar } from '../ui/HeroAvatar'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      const els = [
        photoRef.current,
        roleRef.current,
        nameRef.current,
        underlineRef.current,
        descRef.current,
        metadataRef.current,
        techRef.current,
        ctaRef.current,
        scrollRef.current,
      ]
      els.forEach((el) => { if (el) gsap.set(el, { opacity: 1, y: 0 }) })
      gsap.set('.title-word', { y: '0%' })
      return
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(roleRef.current, { y: 15, opacity: 0 })
      gsap.set('.title-word', { y: '100%' })
      if (underlineRef.current) gsap.set(underlineRef.current, { scaleX: 0, opacity: 0 })
      gsap.set(descRef.current, { y: 15, opacity: 0 })
      gsap.set(metadataRef.current, { y: 15, opacity: 0 })
      gsap.set(techRef.current, { y: 15, opacity: 0 })
      gsap.set(ctaRef.current, { y: 15, opacity: 0 })
      gsap.set(scrollRef.current, { opacity: 0 })

      // Sequenced reveal timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(photoRef.current, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.8 })
        .to(roleRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
        .to('.title-word', { y: '0%', duration: 0.8, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
        .to(underlineRef.current, { scaleX: 1, opacity: 1, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' }, '-=0.2')
        .to(descRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
        .to(metadataRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
        .to(techRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
        .to(scrollRef.current, { opacity: 1, duration: 0.3 }, '-=0.1')

      // Gentle floating animation on photo — continuous
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: -12,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.9,
        })
      }
    })

    return () => ctx.revert()
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

    const textParallax = gsap.to([roleRef.current, descRef.current, techRef.current, ctaRef.current, metadataRef.current], {
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

          {/* Role Banner: SOFTWARE ENGINEER + ───────────── ◦ */}
          <div
            ref={roleRef}
            className="flex items-center gap-3 text-[#966d3a] dark:text-[#d4b483] font-sans text-xs uppercase tracking-[0.25em] mb-6 select-none w-full opacity-0"
          >
            <span className="font-semibold">Software Engineer</span>
            <span className="opacity-45">+</span>
            <div className="flex-1 max-w-[120px] sm:max-w-[180px] h-[1px] bg-[#966d3a]/25 dark:bg-[#d4b483]/25" />
            <span className="text-[8px] sm:text-[10px]">◦</span>
          </div>

          {/* Title: Building software that survives production. */}
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.1] text-[#111111] dark:text-[#e5ded4] select-none mb-6"
          >
            <span className="block overflow-hidden py-1">
              <span className="inline-block title-word">Building</span>{' '}
              <span className="inline-block title-word">software</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="inline-block title-word font-normal">that</span>{' '}
              <span className="inline-block title-word font-serif italic font-normal text-[#966d3a] dark:text-[#d4b483]">survives</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="inline-block title-word">production.</span>
            </span>
          </h1>

          {/* Divider Line: ───────────────────────────────── + */}
          <div
            ref={underlineRef}
            className="w-full flex items-center gap-4 mb-8 opacity-0"
          >
            <div className="flex-1 h-[1px] bg-[#111111]/10 dark:bg-[#e5ded4]/10" />
            <span className="text-[#966d3a] dark:text-[#d4b483] font-mono text-xs font-semibold">+</span>
          </div>

          {/* Updated Description */}
          <div ref={descRef} className="mb-8 opacity-0">
            <p className="text-[#111111]/80 dark:text-[#e5ded4]/80 font-normal text-base sm:text-lg leading-relaxed font-sans max-w-lg">
              I build high-performance systems, <span className="text-[#966d3a] dark:text-[#d4b483] font-semibold">AI pipelines</span>, and infrastructure that power real products.
            </p>
          </div>

          {/* Metadata Cards */}
          <div
            ref={metadataRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-8 mb-10 opacity-0 w-full"
          >
            {/* Card 1: Education */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0 w-11 h-11 rounded-full border border-[#111111]/8 dark:border-[#e5ded4]/12 bg-[#fcfaf7]/50 dark:bg-[#1e1b19]/50 flex items-center justify-center text-[#111111] dark:text-[#e5ded4] shadow-sm">
                <GraduationCap size={18} className="stroke-[1.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#111111] dark:text-[#e5ded4]">Software Engineer</span>
                <span className="font-sans text-xs text-[#555555] dark:text-[#cccccc]">IIT Hyderabad &apos;26</span>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-8 bg-[#111111]/10 dark:bg-[#e5ded4]/15" />

            {/* Card 2: Location & Availability */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0 w-11 h-11 rounded-full border border-[#111111]/8 dark:border-[#e5ded4]/12 bg-[#fcfaf7]/50 dark:bg-[#1e1b19]/50 flex items-center justify-center text-[#111111] dark:text-[#e5ded4] shadow-sm">
                <MapPin size={18} className="stroke-[1.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-[#111111] dark:text-[#e5ded4]">Based in India</span>
                <span className="font-serif italic text-xs text-[#966d3a] dark:text-[#d4b483]">Open for meaningful work.</span>
                <span className="font-sans text-[10px] text-[#555555] dark:text-[#cccccc] mt-0.5">mukulburoli@gmail.com</span>
              </div>
            </div>
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
