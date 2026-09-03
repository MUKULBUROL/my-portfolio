'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowRight, ChevronDown, Download, Mail, GraduationCap, MapPin } from 'lucide-react'
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
  const glowRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mukulburoli@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

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
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
        .to(metadataRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
        .to(techRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
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
    const glow = glowRef.current
    if (!container || !glow || prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x,
        y,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const words = document.querySelectorAll('.title-word')

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      gsap.to(el, {
        y: -6,
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      gsap.to(el, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    words.forEach((word) => {
      word.addEventListener('mouseenter', onEnter)
      word.addEventListener('mouseleave', onLeave)
    })

    return () => {
      words.forEach((word) => {
        word.removeEventListener('mouseenter', onEnter)
        word.removeEventListener('mouseleave', onLeave)
      })
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

      {/* Interactive Cursor Follow Glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none blur-[120px] rounded-full w-[380px] h-[380px] bg-gradient-to-tr from-[#966d3a]/12 to-[#7C3AED]/12 dark:from-[#d4b483]/8 dark:to-[#7C3AED]/8 opacity-0 transition-opacity duration-700 ease-out z-0"
        style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }}
        aria-hidden="true"
      />

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
          <div ref={descRef} className="mb-6 opacity-0">
            <p className="text-[#111111]/80 dark:text-[#e5ded4]/80 font-normal text-base sm:text-lg leading-relaxed font-sans max-w-lg">
              I build high-performance systems, <span className="text-[#966d3a] dark:text-[#d4b483] font-semibold">AI pipelines</span>, and infrastructure that power real products.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 opacity-0 w-full sm:w-auto">
            <MagneticButton
              onClick={() => scrollToSection('skills')}
              data-cursor-label="Explore"
              className="cta-button px-8 py-4 bg-[#111111] hover:bg-[#222222] dark:bg-[#e5ded4] dark:hover:bg-[#fcfaf7] text-[#f5efe8] dark:text-[#111111] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2 group"
              aria-label="View selected work"
            >
              <span>View Selected Work</span>
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </MagneticButton>

            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-outline px-6 py-4 border-2 border-[#111111] dark:border-[#e5ded4]/30 hover:bg-[#111111] hover:text-[#f5efe8] dark:hover:bg-[#e5ded4] dark:hover:text-[#111111] text-[#111111] dark:text-[#e5ded4] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Download size={12} />
              <span>Resume</span>
            </a>

            <MagneticButton
              onClick={() => scrollToSection('connect')}
              data-cursor-label="Connect"
              className="cta-button-outline px-6 py-4 border-2 border-[#111111] dark:border-[#e5ded4]/30 hover:bg-[#111111] hover:text-[#f5efe8] dark:hover:bg-[#e5ded4] dark:hover:text-[#111111] text-[#111111] dark:text-[#e5ded4] rounded-full text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2"
              aria-label="Let's talk"
            >
              <Mail size={12} />
              <span>Let&apos;s Talk</span>
            </MagneticButton>
          </div>

          {/* End of Left Column Content */}
        </div>

        {/* ── Right column: photo, metadata & tech stack ── */}
        <div className="flex flex-col items-center w-full md:w-auto flex-shrink-0 order-1 md:order-2 md:-mt-16 gap-6 select-none">
          <HeroAvatar ref={photoRef} />

          {/* Metadata Card */}
          <div
            ref={metadataRef}
            className="w-full max-w-[320px] opacity-0 mt-2 border border-[#111111]/5 dark:border-[#e5ded4]/8 bg-[#fcfaf7]/30 dark:bg-[#1e1b19]/30 backdrop-blur-md p-4 rounded-[1.75rem] shadow-sm space-y-3.5 hover:border-[#966d3a]/20 dark:hover:border-[#d4b483]/20 transition-all duration-300"
          >
            {/* Education Row */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#111111]/5 dark:border-[#e5ded4]/8 bg-[#fcfaf7] dark:bg-[#111111] flex items-center justify-center text-[#966d3a] dark:text-[#d4b483] shadow-sm flex-shrink-0">
                <GraduationCap size={14} className="stroke-[1.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-xs text-[#111111] dark:text-[#e5ded4]">Software Engineer</span>
                <span className="font-sans text-[10px] text-[#555555] dark:text-[#cccccc]">IIT Hyderabad &apos;26</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#111111]/5 dark:bg-[#e5ded4]/8" />

            {/* Location & Availability Row */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-[#111111]/5 dark:border-[#e5ded4]/8 bg-[#fcfaf7] dark:bg-[#111111] flex items-center justify-center text-[#966d3a] dark:text-[#d4b483] shadow-sm flex-shrink-0 mt-0.5">
                <MapPin size={14} className="stroke-[1.5]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-sans font-semibold text-xs text-[#111111] dark:text-[#e5ded4]">
                  Based in India
                  <span className="font-serif italic text-[10px] text-[#966d3a] dark:text-[#d4b483] ml-1.5 font-normal">Open for work</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="group/email flex items-center gap-1.5 mt-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#966d3a] rounded px-1 -mx-1"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <span className={`font-sans text-[9px] tracking-wide transition-all duration-300 font-medium ${
                    copied ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-102' : 'text-[#555555] dark:text-[#cccccc] group-hover/email:text-[#966d3a] dark:group-hover/email:text-[#d4b483]'
                  }`}>
                    {copied ? 'Email Copied! ✓' : 'mukulburoli@gmail.com'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tech Stack Marquee */}
          <div ref={techRef} className="w-full max-w-[320px] opacity-0">
            <TechMarquee />
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
