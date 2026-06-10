'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { SectionHeader } from '../ui/SectionHeader'
import { projects } from '@/data/projects'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Select the three main projects for the narrative frames
const DISPLAY_PROJECTS = projects.slice(0, 3)

export function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade in section header
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    // Horizontal Scroll Trigger
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const scrollWidth = track.scrollWidth
    const calculateTranslation = () => -(scrollWidth - window.innerWidth)

    const scrollTween = gsap.to(track, {
      x: calculateTranslation,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [])

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#f5efe8] flex flex-col justify-between"
    >
      {/* Top Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 w-full pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Selected Work"
          eyebrowNumber="04"
          title="Interactive Story of Work"
          subtitle="Explore the challenges, system decisions, and real-world outcomes of architectural systems."
          className="mb-0 text-[#111111]"
        />
        <div className="font-mono text-xs text-[#6b6b6b] hidden md:block">
          Scroll vertically to traverse the timeline →
        </div>
      </div>

      {/* Horizontal Slides track */}
      <div className="flex-grow flex items-center">
        <div
          ref={trackRef}
          className="film-reel-container flex flex-row items-center gap-16 px-16 w-max"
        >
          {/* Frame 01: Project 1 */}
          <div className="film-exhibit-wrapper">
            <ProjectFrame project={DISPLAY_PROJECTS[0]} frameNum="01" />
          </div>

          {/* Frame 02: Project 2 */}
          <div className="film-exhibit-wrapper">
            <ProjectFrame project={DISPLAY_PROJECTS[1]} frameNum="02" />
          </div>

          {/* Frame 03: Architecture Insight */}
          <div className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-[#111111] text-[#f5efe8] border border-[#111111]/10 rounded-2xl p-8 sm:p-12 flex flex-col justify-between select-none">
            <span className="font-mono text-[9px] text-[#f5efe8]/60 uppercase tracking-[0.2em]">Frame 03 / Architecture Insight</span>
            <div className="my-auto">
              <blockquote className="text-2xl sm:text-3xl font-heading font-black tracking-tight leading-tight mb-4">
                "We don't need a queue until we have a bottleneck that can't be resolved with batching."
              </blockquote>
              <p className="text-xs sm:text-sm text-[#f5efe8]/70 leading-relaxed max-w-xl">
                Keep systems simple until scale demands otherwise. Every line of infrastructure added is a liability of maintenance and potential failure.
              </p>
            </div>
            <span className="font-mono text-[9px] text-[#f5efe8]/40">// Operations Philosophy</span>
          </div>

          {/* Frame 04: Project 3 */}
          <div className="film-exhibit-wrapper">
            <ProjectFrame project={DISPLAY_PROJECTS[2]} frameNum="04" />
          </div>

          {/* Frame 05: Lesson Learned */}
          <div className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-[#fcfaf7] border border-[#111111]/10 rounded-2xl p-8 sm:p-12 flex flex-col justify-between select-none">
            <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-[0.2em]">Frame 05 / Lesson Learned</span>
            <div className="my-auto">
              <blockquote className="text-2xl sm:text-3xl font-heading font-black tracking-tight leading-tight text-[#111111] mb-4">
                "Software complexity grows quadratically with team size. Keep the code simple, keep the interfaces small."
              </blockquote>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed max-w-xl">
                Clean interfaces and strict boundaries save engineering hours, not complex frameworks. The best teams build minimal components that solve singular, clear constraints.
              </p>
            </div>
            <span className="font-mono text-[9px] text-[#6b6b6b]/50">// Architecture Philosophy</span>
          </div>

          {/* Frame 06: Github CTA */}
          <div className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-transparent flex flex-col justify-center items-center text-center p-10 select-none">
            <span className="font-mono text-[10px] text-[#6b6b6b] uppercase tracking-[0.2em] mb-4">
              Frame 06 / The End of the Reel
            </span>
            <p className="text-lg sm:text-xl text-[#111111]/80 max-w-md font-sans mb-8">
              The projects shown here are only a small part of the story.
            </p>
            <a
              href="https://github.com/alexchen"
              target="_blank"
              rel="noreferrer"
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#111111] hover:text-[#333333] tracking-tight border-b-2 border-current pb-2 transition-all flex items-center gap-2 group"
            >
              <span>Explore everything on GitHub</span>
              <ArrowRight className="inline-block group-hover:translate-x-2 transition-transform duration-300" size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-10 w-full bg-transparent" />
    </section>
  )
}

interface ProjectFrameProps {
  project: typeof projects[0]
  frameNum: string
}

function ProjectFrame({ project, frameNum }: ProjectFrameProps) {
  return (
    <Link href={`/selected-work/${project.id}`} className="block">
      <div className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-[#fcfaf7] border border-[#111111]/10 rounded-2xl p-6 sm:p-10 flex flex-col justify-between cursor-pointer hover:border-[#111111]/25 hover:shadow-sm group transition-all duration-300 select-none">
        
        {/* Top bar */}
        <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#6b6b6b]">
          <span>FRAME {frameNum} / {project.status.toUpperCase()}</span>
          <span className="flex items-center gap-1 group-hover:text-[#111111] transition-colors">
            READ STORY <ArrowUpRight size={10} />
          </span>
        </div>

        {/* Project Name and Tagline */}
        <div className="mt-4">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#111111] leading-none mb-1 group-hover:text-black transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-[#6b6b6b] font-mono">
            {project.tagline}
          </p>
        </div>

        {/* Dynamic Details: Problem, Outcome, Impact (Tech Stack on Hover) */}
        <div className="relative my-6 flex-grow flex flex-col justify-center border-y border-[#111111]/5 py-4 overflow-hidden min-h-[140px] md:min-h-[180px]">
          
          {/* Default Content: Problem, Outcome, Impact */}
          <div className="flex flex-col gap-3 group-hover:opacity-0 transition-opacity duration-300 group-hover:pointer-events-none">
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-mono text-[9px] uppercase tracking-wider text-[#6b6b6b]">Problem</span>
              <p className="col-span-9 text-xs text-[#111111]/80 leading-relaxed line-clamp-2 sm:line-clamp-3">{project.problem}</p>
            </div>
            
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-mono text-[9px] uppercase tracking-wider text-[#6b6b6b]">Outcome</span>
              <p className="col-span-9 text-xs text-[#111111]/80 leading-relaxed line-clamp-2 sm:line-clamp-3">{project.solution}</p>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-mono text-[9px] uppercase tracking-wider text-[#6b6b6b]">Impact</span>
              <p className="col-span-9 text-xs font-semibold text-[#111111] leading-relaxed line-clamp-1">{project.metrics?.[0]}</p>
            </div>
          </div>

          {/* Hover Overlay: Tech Stack */}
          <div className="absolute inset-0 flex flex-col justify-center items-start opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#6b6b6b] mb-3">Implemented Technology Stack</span>
            <div className="flex flex-wrap gap-2 max-w-xl">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2.5 py-1 rounded text-[#111111]/80"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#6b6b6b] mt-5 italic">
              Click to explore design decisions & system architecture →
            </span>
          </div>

        </div>

        {/* Frame Footer */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#6b6b6b]">
          <span>Role: {project.status === 'open-source' ? 'Creator / Author' : 'Lead Architect'}</span>
          <span>Click to View</span>
        </div>
      </div>
    </Link>
  )
}
