'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

    const cards = containerRef.current?.querySelectorAll('.chapter-card')
    cards?.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section id="my-journey" className="py-24 relative overflow-hidden bg-[#f5efe8]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="My Journey"
            eyebrowNumber="02"
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

                {/* Massive Narrative Quote */}
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#111111] leading-tight mb-4 tracking-tight">
                  "{chapter.quote}"
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
      </div>
    </section>
  )
}
