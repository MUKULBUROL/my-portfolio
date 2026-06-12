'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '@/data/skills'
import { SectionHeader } from '../ui/SectionHeader'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PROFICIENCY_LABELS = ['', 'Beginner', 'Familiar', 'Comfortable', 'Proficient', 'Expert']

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (prefersReducedMotion) {
      if (gridRef.current) gsap.set(gridRef.current.children, { opacity: 1, y: 0 })
      return
    }

    const cards = Array.from(gridRef.current?.children || [])
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [prefersReducedMotion])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#f5efe8] relative overflow-hidden"
      aria-label="Technical skills"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          eyebrow="Skills"
          eyebrowNumber="01"
          title="Technical Arsenal"
          subtitle="Core competencies across systems programming, distributed architectures, and scalable backend engineering."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="group relative rounded-2xl border border-[#111111]/8 bg-white/40 backdrop-blur-sm p-6 hover:border-[#111111]/15 transition-all duration-300 hover:shadow-lg hover:shadow-[#111111]/5"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-sm font-heading font-bold text-[#111111] tracking-tight">
                  {category.name}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#111111]/80 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#6b6b6b]">
                        {PROFICIENCY_LABELS[skill.proficiency]}
                      </span>
                    </div>

                    {/* Proficiency bar */}
                    <div className="w-full h-1 rounded-full bg-[#111111]/6 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(skill.proficiency / 5) * 100}%`,
                          backgroundColor: category.color,
                          opacity: skill.highlighted ? 1 : 0.6,
                        }}
                      />
                    </div>

                    {/* Description */}
                    {skill.description && (
                      <p className="text-[10px] text-[#6b6b6b] leading-relaxed">
                        {skill.description}
                      </p>
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
