'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/experience'

const CHAPTERS = [
  {
    number: '01',
    title: 'Curiosity',
    quote: 'I spent months breaking things just to understand how they worked.',
    narrative: 'My entry into software was driven by raw curiosity. Before I ever wrote production systems, I spent my time dissecting binaries, rebuilding compilers, and experimenting with kernel hooks. I learned that to build robust systems, you must first understand how they fail.',
    timeline: '2018 — 2020'
  },
  {
    number: '02',
    title: 'First Opportunity',
    quote: 'My first internship taught me that building products is different from writing code.',
    narrative: 'Stepping into a professional engineering team, the biggest lesson was social and structural. Writing code is a solitary exercise; building products is a collaborative orchestration. I learned the value of rigorous code reviews, automated CI/CD safety nets, and strict API boundaries.',
    timeline: '2020 — 2022'
  },
  {
    number: '03',
    title: 'Building Products',
    quote: "The challenge wasn't writing software. The challenge was solving problems.",
    narrative: 'Mature systems engineering is about identifying constraints, modeling tradeoffs, and keeping complexity low. I now focus on building distributed request flows, agent frameworks, and high-performance APIs where scale demands absolute simplicity and reliability.',
    timeline: '2022 — PRESENT'
  }
]

export function MyJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    const headerST = gsap.fromTo(
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
    if (headerST.scrollTrigger) triggers.push(headerST.scrollTrigger)

    const cards = containerRef.current?.querySelectorAll('.chapter-card')
    cards?.forEach((card) => {
      const anim = gsap.fromTo(
        card,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 40 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    // Animate each experience row
    const rows = timelineRef.current?.querySelectorAll('.exp-row')
    rows?.forEach((row, i) => {
      const anim = gsap.fromTo(
        row,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section id="my-journey" className="py-24 relative overflow-hidden bg-[#f5efe8]" aria-label="My journey and experience">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="My Journey"
            eyebrowNumber="04"
            title="Chapters of Growth"
            subtitle="A narrative of my evolution as an engineer, structured around core lessons rather than job summaries."
            align="center"
          />
        </div>

        {/* Narrative Grid */}
        <div ref={containerRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {CHAPTERS.map((chapter) => (
            <div
              key={chapter.number}
              className="chapter-card flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#fcfaf7] border border-[#111111]/8 hover:border-[#111111]/15 transition-all duration-300 min-h-[380px]"
            >
              {/* Top Meta */}
              <div>
                <span className="font-mono text-[10px] font-bold text-[#6b6b6b] tracking-[0.2em] uppercase block mb-6">
                  Chapter {chapter.number} / {chapter.title}
                </span>

                {/* Narrative Quote */}
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#111111] leading-tight mb-4 tracking-tight">
                  &ldquo;{chapter.quote}&rdquo;
                </h3>
              </div>

              {/* Narrative Text and Date */}
              <div className="mt-6">
                <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed font-sans mb-6">
                  {chapter.narrative}
                </p>

                <div className="pt-4 border-t border-[#111111]/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6b6b6b]">Timeline</span>
                  <span className="font-mono text-[10px] font-bold text-[#111111]">
                    {chapter.timeline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Experience Timeline ── */}
        <div ref={timelineRef} className="mt-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px flex-1 bg-[#111111]/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b6b6b]">
              Experience Record
            </span>
            <span className="h-px flex-1 bg-[#111111]/10" />
          </div>

          <div className="flex flex-col gap-4">
            {experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.startDate}`}
                className="exp-row group relative bg-[#fcfaf7] border border-[#111111]/8 rounded-xl p-6 sm:p-8 hover:border-[#111111]/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                {/* Accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[#111111]/10 group-hover:bg-[#111111]/25 transition-colors duration-300" />

                <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10 pl-4">
                  {/* Left: Meta */}
                  <div className="flex flex-col gap-1 lg:w-48 flex-shrink-0">
                    <span className="font-mono text-[10px] text-[#6b6b6b] uppercase tracking-widest">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <h4 className="text-lg sm:text-xl font-heading font-black text-[#111111] tracking-tight">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-[11px] text-[#6b6b6b]">
                      {exp.company}
                    </span>
                    <span className="font-mono text-[9px] text-[#6b6b6b]/60 mt-0.5">
                      {exp.location}
                    </span>
                  </div>

                  {/* Right: Description + Tech */}
                  <div className="flex-1 flex flex-col gap-4">
                    <p className="text-sm text-[#6b6b6b] leading-relaxed font-sans">
                      {exp.summary}
                    </p>

                    {/* Achievements list */}
                    <ul className="flex flex-col gap-2">
                      {exp.achievements.slice(1, 4).map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6b6b6b] leading-relaxed font-sans">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#111111]/25 flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono bg-[#111111]/5 border border-[#111111]/8 px-2 py-1 rounded-md text-[#111111]/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
