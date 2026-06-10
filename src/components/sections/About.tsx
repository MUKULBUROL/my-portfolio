'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { fadeUpStagger, revealOnScroll } from '@/lib/animations'
import { Cpu, Code2, GitBranch } from 'lucide-react'

const CAPABILITY_CARDS = [
  {
    key: 'AI',
    icon: <Cpu size={15} />,
    title: 'AI Systems Engineering',
    body: 'Designing multi-agent orchestration layers, context compression algorithms, and retrieval pipelines (RAG) that deliver predictable outputs in production environments.',
  },
  {
    key: 'Engineering',
    icon: <Code2 size={15} />,
    title: 'Full-Stack Software Engineering',
    body: 'Building strict type-safe codebases using Next.js 15, React 19, and Node.js. Designing clean state flows, APIs, and data models.',
  },
  {
    key: 'Architecture',
    icon: <GitBranch size={15} />,
    title: 'Distributed System Design',
    body: 'Architecting distributed pipelines, job scheduling with Advisory locks, resilient caching layers (Redis), and database indexing to handle failure gracefully.',
  },
]

export function About() {
  const headerRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(headerRef.current)
    revealOnScroll(bioRef.current, { from: { y: 25, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' } })
    fadeUpStagger(capabilitiesRef.current, ':scope > *', { stagger: 0.08, delay: 0.1 })
    revealOnScroll(skillsRef.current, { from: { y: 25, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: 'power3.out' } })
  }, [])

  const currentRole = experience[0]

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#f5efe8]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Identity & Skills"
            eyebrowNumber="01"
            title="About Me"
            subtitle="I build software that sits at the intersection of AI systems and production engineering."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column — Profile & Metadata */}
          <div ref={bioRef} className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard className="p-6 border-[#111111]/8" hoverEffect={false} glowColor="none">
              <div className="flex flex-col mb-6">
                <span className="font-heading font-black text-2xl text-[#111111] tracking-tight">{profile.name}</span>
                <span className="text-[#111111] font-mono text-xs mt-1.5">{profile.headline}</span>
              </div>

              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6 font-sans">
                {profile.bio}
              </p>

              <div className="flex flex-col gap-3.5 border-t border-[#111111]/8 pt-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6b6b6b]">Location</span>
                  <span className="text-[#111111]">{profile.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6b6b6b]">Current Role</span>
                  <span className="text-[#111111]">{currentRole?.role} @ {currentRole?.company}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6b6b6b]">Availability</span>
                  <div className="flex items-center gap-2">
                    <span className="status-dot w-1.5 h-1.5 bg-[#10B981]" />
                    <span className="text-[#111111]">{profile.availabilityLabel}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column — Core Capabilities & Tech Stack */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Core Capabilities */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#6b6b6b] mb-4">{'// Core Competencies'}</h3>
              <div ref={capabilitiesRef} className="flex flex-col gap-4">
                {CAPABILITY_CARDS.map((card) => (
                  <div
                    key={card.key}
                    className="p-5 border border-[#111111]/8 hover:border-[#111111]/15 rounded-xl bg-[#fcfaf7] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#111111]/5 text-[#111111] flex items-center justify-center border border-[#111111]/10">
                        {card.icon}
                      </div>
                      <h4 className="text-sm font-heading font-bold text-[#111111] tracking-tight">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-[#6b6b6b] text-xs leading-relaxed font-sans">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Stack Grid (Consolidated from Skills section) */}
            <div ref={skillsRef}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#6b6b6b] mb-4">{'// Technical Stack'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {skillCategories.map((category) => (
                  <div
                    key={category.name}
                    className="p-4 border border-[#111111]/8 rounded-xl bg-[#fcfaf7]"
                  >
                    <h4 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider mb-3">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={cn(
                            'text-[10px] font-mono px-2 py-0.5 rounded border transition-all duration-250',
                            skill.highlighted
                              ? 'bg-[#111111]/10 border-[#111111]/25 text-[#111111] font-semibold'
                              : 'bg-[#111111]/5 border-[#111111]/8 text-[#6b6b6b]'
                          )}
                          title={skill.description}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
