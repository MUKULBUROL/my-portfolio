'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { journeyChapters } from '@/data/achievements'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    // Animate chapters in sequentially
    const chapters = containerRef.current?.querySelectorAll('.journey-chapter-row')
    chapters?.forEach((chapter) => {
      gsap.fromTo(
        chapter,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#f5efe8]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="My Journey"
            eyebrowNumber="03"
            title="Chapters of Growth"
            subtitle="A narrative of my evolution as an engineer, structured in distinct chapters of curiosity, experience, and system design."
            align="center"
          />
        </div>

        {/* Chapters narrative container */}
        <div ref={containerRef} className="mt-16 flex flex-col gap-20">
          {journeyChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="journey-chapter-row grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#111111]/10 first:border-t-0"
            >
              {/* Left Column: Sticky Chapter Details */}
              <div className="md:col-span-4 md:sticky md:top-28 h-fit flex flex-col">
                <span className="font-mono text-xs font-bold text-[#6b6b6b] tracking-wider uppercase mb-1.5">
                  Chapter {chapter.number}
                </span>
                <h3 className="text-3xl font-heading font-black text-[#111111] leading-tight mb-4 tracking-tight">
                  {chapter.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed font-sans">
                  {chapter.description}
                </p>
              </div>

              {/* Right Column: Milestones */}
              <div className="md:col-span-8 flex flex-col gap-10">
                {chapter.milestones.map((milestone, i) => (
                  <div
                    key={i}
                    className="relative pl-6 sm:pl-8 border-l border-[#111111]/10 flex flex-col items-start"
                  >
                    {/* Minimalist marker dot */}
                    <div
                      className="absolute -left-[4.5px] top-1.5 w-[8px] h-[8px] rounded-full bg-[#111111]"
                      aria-hidden="true"
                    />

                    {/* Milestone Year tag */}
                    <div className="mb-2">
                      <span className="font-mono text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h4 className="text-lg font-heading font-bold text-[#111111] mb-2">
                      {milestone.title}
                    </h4>

                    {/* Milestone Description */}
                    <p className="text-sm text-[#6b6b6b] leading-relaxed font-sans mb-4 max-w-2xl">
                      {milestone.description}
                    </p>

                    {/* Technology tags */}
                    {milestone.tech && milestone.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-0.5 rounded text-[#111111]/75"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
