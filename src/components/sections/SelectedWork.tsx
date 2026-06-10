'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectMinimalVisual } from '../ui/ProjectMinimalVisual'
import { projects } from '@/data/projects'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DISPLAY_PROJECTS = projects.slice(0, 3)

export function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const reelBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Cinematic clip-path reveal on the section header
    gsap.fromTo(
      headerRef.current,
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 30 },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    const track = trackRef.current
    const section = sectionRef.current
    const reelBg = reelBgRef.current
    if (!track || !section) return

    // ── Mobile guard: vertical stack on small screens ──
    // The horizontal pin only makes sense on wide viewports.
    // On mobile (<768px) we skip GSAP entirely and let CSS flex-wrap handle layout.
    if (window.innerWidth < 768) return

    const scrollWidth = track.scrollWidth
    const calculateTranslation = () => -(scrollWidth - window.innerWidth)

    // Main horizontal pinning timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    })

    // Slide track horizontally
    tl.to(track, {
      x: calculateTranslation,
      ease: 'none',
    }, 0)

    // Parallax background movement (moves slower than slides)
    if (reelBg) {
      tl.to(reelBg, {
        x: () => -(scrollWidth - window.innerWidth) * 0.3,
        ease: 'none',
      }, 0)
    }

    // Slide reveals: cinematic slide reveals per frame using containerAnimation
    const frames = track.querySelectorAll('.film-frame')
    frames.forEach((frame) => {
      const visual = frame.querySelector('.project-visual')
      const details = frame.querySelector('.project-details')
      
      if (visual) {
        gsap.fromTo(visual,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0.3, scale: 0.9 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: frame,
              containerAnimation: tl,
              start: 'left 85%',
              end: 'left 40%',
              scrub: true,
            }
          }
        )
      }

      if (details) {
        gsap.fromTo(details,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frame,
              containerAnimation: tl,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#f5efe8] flex flex-col justify-between"
      aria-label="Selected projects horizontal section"
    >
      {/* Movie Reel Background with Parallax */}
      <div
        ref={reelBgRef}
        className="absolute inset-y-0 left-0 w-[200vw] h-full pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="film-sprocket-track-top" />
        <div className="film-sprocket-track-bottom" />
      </div>

      {/* Top Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 w-full pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 select-none">
        <SectionHeader
          eyebrow="Selected Work"
          eyebrowNumber="01"
          title="Interactive Story of Work"
          subtitle="Explore the challenges, system decisions, and real-world outcomes of architectural systems."
          className="mb-0 text-[#111111]"
        />
        <div className="font-mono text-xs text-[#6b6b6b] hidden md:block">
          Scroll vertically to traverse the reel →
        </div>
      </div>

      {/* Horizontal Slides track */}
      <div className="flex-grow flex items-center relative z-10">
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-32 px-[15vw] w-max"
        >
          {/* Project Frames */}
          {DISPLAY_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="film-frame w-[80vw] h-[65vh] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 select-none flex-shrink-0"
            >
              {/* Project Visual */}
              <div className="project-visual w-full md:w-1/2 h-full flex items-center justify-center p-4">
                <ProjectMinimalVisual projectId={project.id} />
              </div>

              {/* Project Details */}
              <div className="project-details w-full md:w-1/2 flex flex-col justify-center items-start text-[#111111] max-w-md">
                <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-wider mb-2">
                  Frame 0{idx + 1} / {project.status.toUpperCase()}
                </span>
                
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-none mb-4 select-text">
                  {project.name}
                </h3>
                
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#6b6b6b] block mb-1">Outcome</span>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed font-sans select-text">
                    {project.results || project.solution}
                  </p>
                </div>
                
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#6b6b6b] block mb-1">Role</span>
                  <p className="text-xs font-mono text-[#111111] font-semibold select-text">
                    {project.status === 'open-source' ? 'Creator / Author' : 'Lead Architect'}
                  </p>
                </div>

                <Link
                  href={`/selected-work/${project.id}`}
                  className="mt-8 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111] pb-1 hover:opacity-75 transition-opacity"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          ))}

          {/* Ending Frame: Centered, full viewport width */}
          <div className="w-[100vw] h-[65vh] flex flex-col justify-center items-center text-center px-12 select-none flex-shrink-0 relative z-10">
            <span className="font-mono text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-4">
              End of Reel
            </span>
            <h4 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-tight text-[#111111] max-w-3xl mb-8">
              The projects shown here<br />
              are only part of the story.
            </h4>
            <a
              href="https://github.com/alexchen"
              target="_blank"
              rel="noreferrer"
              className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#111111] hover:text-[#333333] tracking-tight border-b-2 border-[#111111] pb-2 transition-all flex items-center gap-3 group mt-4 select-text"
            >
              <span>Explore everything on GitHub</span>
              <ArrowRight className="group-hover:translate-x-3 transition-transform duration-300" size={36} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-10 w-full bg-transparent" />
    </section>
  )
}
