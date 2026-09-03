'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as staticProjects } from '@/data/projects'
import { ArrowRight } from 'lucide-react'
import type { ProjectItem } from '@/types'
import { NotebookPage } from '../ui/NotebookPage'

interface SelectedWorkProps {
  initialProjects?: ProjectItem[]
}

/**
 * Book page-flip project showcase.
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
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent"
      aria-label="Selected projects — book page flip"
    >
      {/* Section label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">02</span>
        <div className="w-16 h-px bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">Selected Work</span>
        <div className="w-16 h-px bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted hidden sm:inline">
          Scroll to flip pages
        </span>
      </div>

      {/* Section heading */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center z-20 select-none pointer-events-none">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-primary">
          Systems I&apos;ve Built
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted font-sans max-w-md mx-auto">
          High-performance backends, AI pipelines, and scalable architectures — from hackathons to production.
        </p>
      </div>

      {/* ──── NOTEBOOK ──── */}
      <div
        ref={bookRef}
        className="notebook notebook-container relative"
      >
        {/* Notebook shadow */}
        <div
          className="absolute inset-0 rounded-[4px] pointer-events-none notebook-shadow"
          aria-hidden="true"
        />

        {/* Left SPINE strip */}
        <div
          className="absolute left-0 top-0 bottom-0 z-30 flex flex-col items-center justify-between py-4 notebook-spine"
          aria-hidden="true"
        >
          {/* Spine rings */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="notebook-ring"
            />
          ))}
        </div>

        {/* ── BACK COVER: GitHub CTA (visible after all flips) ── */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[4px] notebook-back-cover"
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
        {[...DISPLAY_PROJECTS].reverse().map((project, revIdx) => {
          const idx = DISPLAY_PROJECTS.length - 1 - revIdx
          return (
            <NotebookPage
              key={project.id}
              project={project}
              idx={idx}
              totalCount={DISPLAY_PROJECTS.length}
              addPageRef={addPageRef}
            />
          )
        })}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted select-none pointer-events-none z-20">
        <span className="text-[8px] font-mono uppercase tracking-[0.25em]">Scroll to turn pages</span>
        <div className="w-px h-6 bg-gradient-to-b from-muted to-transparent animate-pulse" />
      </div>
    </section>
  )
}
