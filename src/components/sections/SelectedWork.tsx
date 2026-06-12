'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as staticProjects } from '@/data/projects'
import { ProjectMinimalVisual } from '../ui/ProjectMinimalVisual'
import { ArrowRight } from 'lucide-react'
import type { ProjectItem } from '@/types'

interface SelectedWorkProps {
  initialProjects?: ProjectItem[]
}

/**
 * Book page-flip project showcase.
 *
 * Layout concept:
 * ─────────────────────────────────────────────────────────
 *  • A notebook sits in the center of the screen.
 *  • The left half of the notebook always shows the current project.
 *  • When you scroll, the RIGHT page lifts (rotateY 0 → -180°) and
 *    lands on the left, revealing the next project underneath.
 *  • Each flip is driven by GSAP ScrollTrigger scrub, so the speed
 *    matches your scroll velocity — it feels physical.
 *  • After all projects are flipped, the back-cover GitHub CTA appears.
 * ─────────────────────────────────────────────────────────
 */
export function SelectedWork({ initialProjects }: SelectedWorkProps) {
  const DISPLAY_PROJECTS = (initialProjects && initialProjects.length > 0)
    ? initialProjects.slice(0, 3)
    : staticProjects.slice(0, 3)

  const sectionRef   = useRef<HTMLDivElement>(null)
  const bookRef      = useRef<HTMLDivElement>(null)
  const pagesRef     = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const book    = bookRef.current
    const pages   = pagesRef.current.filter(Boolean)

    if (!section || !book || pages.length === 0) return

    // Total scroll distance: 1 screen-height per page flip
    const totalScrollLength = pages.length * window.innerHeight

    // Master pinning timeline
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: `+=${totalScrollLength}`,
        invalidateOnRefresh: true,
      },
    })

    // Animate each page flip in sequence
    pages.forEach((page, i) => {
      const progress = i / pages.length          // when this flip starts
      const end      = (i + 1) / pages.length   // when this flip ends

      master.fromTo(
        page,
        { rotateY: 0, z: i === 0 ? 0 : -1 },
        {
          rotateY: -180,
          z: 2,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
        },
        progress              // insert at this fraction through the timeline
      )

      // Shadow depth on page lift — gives 3D realism
      master.fromTo(
        page,
        { filter: 'drop-shadow(0 0px 0px rgba(0,0,0,0))' },
        {
          filter: 'drop-shadow(-12px 8px 28px rgba(60,40,20,0.28))',
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 0,
        },
        progress
      )
    })

    return () => {
      master.scrollTrigger?.kill()
      master.kill()
    }
  }, [])

  const addPageRef = (el: HTMLDivElement | null, i: number) => {
    if (el) pagesRef.current[i] = el
  }

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ background: 'transparent' }}
      aria-label="Selected projects — book page flip"
    >
      {/* Section label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6b6b]">02</span>
        <div className="w-16 h-px bg-[#111111]/15" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6b6b]">Selected Work</span>
        <div className="w-16 h-px bg-[#111111]/15" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b6b6b] hidden sm:inline">
          Scroll to flip pages
        </span>
      </div>

      {/* Section heading */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center z-20 select-none pointer-events-none">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-[#111111]">
          Systems I've Built
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6b6b6b] font-sans max-w-md mx-auto">
          High-performance backends, AI pipelines, and scalable architectures — from hackathons to production.
        </p>
      </div>

      {/* ──── NOTEBOOK ──── */}
      <div
        ref={bookRef}
        className="notebook relative"
        style={{
          width: 'min(88vw, 960px)',
          height: 'min(72vh, 580px)',
          perspective: '2200px',
        }}
      >
        {/* Notebook shadow */}
        <div
          className="absolute inset-0 rounded-[4px] pointer-events-none"
          style={{
            boxShadow: '0 32px 80px rgba(60,40,20,0.22), 0 8px 24px rgba(60,40,20,0.14)',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Left SPINE strip */}
        <div
          className="absolute left-0 top-0 bottom-0 z-30 flex flex-col items-center justify-between py-4"
          style={{
            width: 28,
            background: 'linear-gradient(180deg, #2a2218 0%, #1a1610 100%)',
            boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.35), 3px 0 6px rgba(0,0,0,0.2)',
            borderRadius: '4px 0 0 4px',
          }}
          aria-hidden="true"
        >
          {/* Spine rings */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 14,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8a7a60, #c4b080, #8a7a60)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,220,0.15)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* ── BACK COVER: GitHub CTA (visible after all flips) ── */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[4px]"
          style={{
            left: 28,
            background: '#1a1610',
            zIndex: 1,
          }}
        >
          <div className="flex flex-col items-center gap-6 px-8 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8a7a60]">
              End of Notebook
            </span>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight leading-tight text-[#f5efe8] max-w-xs">
              More work lives<br />on GitHub
            </h4>
            <a
              href="https://github.com/MUKULBUROL"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-[#f5efe8] border-b border-[#8a7a60]/60 pb-1 text-sm font-mono font-bold tracking-wider hover:text-[#c4b080] transition-colors group"
            >
              <span>Explore Everything</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── PROJECT PAGES ── */}
        {/* Rendered in reverse order so page 0 is on top */}
        {[...DISPLAY_PROJECTS].reverse().map((project, revIdx) => {
          const idx = DISPLAY_PROJECTS.length - 1 - revIdx
          return (
            <div
              key={project.id}
              ref={(el) => addPageRef(el, idx)}
              className="page absolute inset-0"
              style={{
                left: 28,
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                zIndex: 10 + (DISPLAY_PROJECTS.length - 1 - idx),
              }}
              data-cursor-label="Scroll"
            >
              {/* ── FRONT FACE (current project) ── */}
              <div
                className="page-face page-front absolute inset-0 flex overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, #fdfaf6 0%, #f7f0e8 100%)',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                {/* Paper texture lines */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        transparent,
                        transparent 31px,
                        rgba(17,17,17,0.05) 31px,
                        rgba(17,17,17,0.05) 32px
                      )
                    `,
                    backgroundPositionY: '44px',
                  }}
                  aria-hidden="true"
                />

                {/* Red margin line */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: '15%', width: 1, background: 'rgba(200, 80, 60, 0.18)' }}
                  aria-hidden="true"
                />

                {/* Page edge right */}
                <div
                  className="absolute top-0 right-0 bottom-0 pointer-events-none"
                  style={{
                    width: 6,
                    background: 'linear-gradient(90deg, transparent, rgba(180,150,110,0.15))',
                  }}
                  aria-hidden="true"
                />

                {/* Content layout */}
                <div className="flex flex-col md:flex-row w-full h-full p-6 md:p-10 gap-6">
                  
                  {/* Left: project visual */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <div className="w-full h-full max-h-64 md:max-h-none">
                      <ProjectMinimalVisual projectId={project.id} />
                    </div>
                  </div>

                  {/* Right: project details */}
                  <div className="flex-1 flex flex-col justify-center gap-3 md:pl-6 md:border-l border-[#111111]/10">
                    <span className="font-mono text-[8px] text-[#9b8b78] uppercase tracking-[0.25em]">
                      Page {String(idx + 1).padStart(2, '0')} · {project.status.toUpperCase()}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-heading font-black leading-tight text-[#111111]">
                      {project.name}
                    </h3>

                    <p className="text-xs text-[#6b6b6b] leading-relaxed font-sans line-clamp-3">
                      {project.results || project.solution}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono bg-[#111111]/6 border border-[#111111]/10 px-1.5 py-0.5 rounded text-[#111111]/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/selected-work/${project.id}`}
                      className="mt-2 self-start text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      Read Story →
                    </Link>
                  </div>
                </div>

                {/* Corner page number */}
                <span
                  className="absolute bottom-3 right-5 font-mono text-[9px] text-[#9b8b78]"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
              </div>

              {/* ── BACK FACE (what you see mid-flip) ── */}
              <div
                className="page-face page-back absolute inset-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #f0e9df 0%, #e8ddd0 100%)',
                  borderRadius: '4px 0 0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Paper grain on back */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        transparent,
                        transparent 31px,
                        rgba(17,17,17,0.04) 31px,
                        rgba(17,17,17,0.04) 32px
                      )
                    `,
                    backgroundPositionY: '44px',
                  }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] text-[#9b8b78] uppercase tracking-widest rotate-180">
                  — Flip —
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#6b6b6b] select-none pointer-events-none z-20">
        <span className="text-[8px] font-mono uppercase tracking-[0.25em]">Scroll to turn pages</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#6b6b6b] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
