'use client'

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '@/data/skills'
import { SectionHeader } from '../ui/SectionHeader'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { NanoCar } from '../ui/NanoCar'

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [activeTab, setActiveTab] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  // Map from skill name → bar element; populated via callback refs
  const barRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const category = skillCategories[activeTab]

  // ── helpers ────────────────────────────────────────────────

  const movePill = (index: number, animate = true) => {
    const btn = tabButtonRefs.current[index]
    const pill = pillRef.current
    if (!btn || !pill) return
    gsap.to(pill, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: animate && !prefersReducedMotion ? 0.38 : 0,
      ease: 'power3.out',
    })
  }

  const animateBars = () => {
    if (prefersReducedMotion) return
    category.skills.forEach((skill, i) => {
      const bar = barRefs.current.get(skill.name)
      if (!bar) return
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: skill.proficiency / 5,
          duration: 0.75,
          ease: 'power3.out',
          delay: i * 0.055,
        }
      )
    })
  }

  const animateRowsIn = (fromX: number) => {
    const rows = panelRef.current?.querySelectorAll('.skill-row')
    if (!rows || prefersReducedMotion) return
    gsap.fromTo(
      rows,
      { opacity: 0, x: fromX },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', clearProps: 'all' }
    )
  }

  // ── scroll trigger (once) ─────────────────────────────────

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 72%',
      once: true,
      onEnter: () => setHasEntered(true),
    })

    return () => trigger.kill()
  }, [])

  // ── first entrance after scroll ───────────────────────────

  useEffect(() => {
    if (!hasEntered) return
    animateRowsIn(24)
    animateBars()
    movePill(activeTab)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEntered])

  // ── tab switch ────────────────────────────────────────────

  const handleTabSwitch = (index: number) => {
    if (index === activeTab) return
    movePill(index)

    if (!prefersReducedMotion && panelRef.current) {
      const rows = panelRef.current.querySelectorAll('.skill-row')
      gsap.to(rows, {
        opacity: 0,
        x: -16,
        duration: 0.14,
        ease: 'power2.in',
        onComplete: () => setActiveTab(index),
      })
    } else {
      setActiveTab(index)
    }
  }

  // ── car callbacks ─────────────────────────────────────────

  /**
   * Fires the moment the car starts moving — move the pill
   * indicator ahead of time so it tracks intent.
   */
  const handleCarDriveStart = (next: number) => {
    movePill(next)
  }

  /**
   * Fires after the car arrives at the destination stop —
   * only NOW do we animate the content in/out.
   */
  const handleCarArrival = (next: number) => {
    if (next === activeTab) return
    if (!prefersReducedMotion && panelRef.current) {
      const rows = panelRef.current.querySelectorAll('.skill-row')
      gsap.to(rows, {
        opacity: 0,
        x: -16,
        duration: 0.14,
        ease: 'power2.in',
        onComplete: () => setActiveTab(next),
      })
    } else {
      setActiveTab(next)
    }
  }

  // Animate in after tab state actually changes
  useEffect(() => {
    if (!hasEntered) return
    animateRowsIn(20)
    animateBars()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // ── position pill on mount before paint ───────────────────

  useLayoutEffect(() => {
    movePill(0, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─────────────────────────────────────────────────────────

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#f5efe8] relative overflow-hidden"
      aria-label="Technical skills"
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          eyebrow="Skills"
          eyebrowNumber="01"
          title="Technical Arsenal"
          subtitle="Core competencies across systems programming, distributed architectures, and scalable backend engineering."
        />

        {/* ── Tab strip with sliding pill — full width so tab centres
             align with the car-track stop positions ── */}
        <div
          ref={tabsContainerRef}
          role="tablist"
          aria-label="Skill categories"
          className="relative flex w-full p-1 mb-4 rounded-xl bg-[#11111108]"
        >
          {/* The sliding active grey pill */}
          <span
            ref={pillRef}
            aria-hidden="true"
            className="absolute top-1 left-1 h-[calc(100%-8px)] rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 shadow-sm pointer-events-none"
          />

          {skillCategories.map((cat, i) => (
            <button
              key={cat.name}
              ref={(el) => { tabButtonRefs.current[i] = el }}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls="skills-panel"
              id={`skills-tab-${i}`}
              onClick={() => handleTabSwitch(i)}
              className="relative z-10 flex-1 py-2 px-1 text-xs font-mono font-bold uppercase tracking-widest rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-center whitespace-nowrap transition-colors duration-200"
              style={{ color: i === activeTab ? cat.color : '#6b6b6b' }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Nano Car track ── */}
        <NanoCar
          activeTab={activeTab}
          tabCount={skillCategories.length}
          tabColors={skillCategories.map((c) => c.color)}
          onDriveStart={handleCarDriveStart}
          onArrival={handleCarArrival}
        />

        {/* ── Skill rows ── */}
        <div
          id="skills-panel"
          ref={panelRef}
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeTab}`}
          className="flex flex-col"
        >
          {category.skills.map((skill, i) => {
            const isHovered = hoveredSkill === skill.name
            const pct = Math.round((skill.proficiency / 5) * 100)

            return (
              <div
                key={skill.name}
                className="skill-row relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Hover background fill */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl transition-opacity duration-200 pointer-events-none"
                  style={{
                    backgroundColor: `${category.color}07`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Thin top border (separator) except first row */}
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ backgroundColor: '#11111109' }}
                  />
                )}

                <div className="relative px-3 py-4">
                  {/* Main row: index · name + badge · bar · pct */}
                  <div className="flex items-center gap-4">

                    {/* Row index */}
                    <span
                      aria-hidden="true"
                      className="text-[10px] font-mono tabular-nums w-5 shrink-0 select-none text-[#111111]/20"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Skill name + Core badge */}
                    <div className="flex items-center gap-2 w-44 shrink-0">
                      <span className="text-sm font-mono font-bold text-[#111111] leading-none">
                        {skill.name}
                      </span>
                      {skill.highlighted && (
                        <span
                          className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-sm font-black tracking-wide shrink-0 leading-none"
                          style={{
                            color: category.color,
                            backgroundColor: `${category.color}14`,
                          }}
                        >
                          Core
                        </span>
                      )}
                    </div>

                    {/* Animated fill bar */}
                    <div
                      aria-label={`Proficiency: ${pct}%`}
                      className="flex-1 h-[3px] rounded-full overflow-hidden"
                      style={{ backgroundColor: `${category.color}18` }}
                    >
                      <div
                        ref={(el) => {
                          if (el) barRefs.current.set(skill.name, el)
                          else barRefs.current.delete(skill.name)
                        }}
                        className="h-full rounded-full origin-left"
                        style={{
                          backgroundColor: category.color,
                          transformOrigin: 'left center',
                          transform: 'scaleX(0)',
                        }}
                      />
                    </div>

                    {/* Proficiency reading */}
                    <span
                      className="text-[11px] font-mono tabular-nums w-8 text-right shrink-0 transition-all duration-200"
                      style={{
                        color: category.color,
                        opacity: isHovered ? 1 : 0.3,
                        fontWeight: isHovered ? 700 : 400,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>

                  {/* Description — smooth height expand on hover */}
                  {skill.description && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxHeight: isHovered ? '52px' : '0px',
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <p className="pt-2 pl-[168px] text-[11px] font-sans text-[#6b6b6b] leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <div className="mt-8 flex items-center gap-4">
          <div
            aria-hidden="true"
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${category.color}50, transparent)`,
            }}
          />
          <span className="text-[10px] font-mono text-[#111111]/30 uppercase tracking-widest">
            {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''} &mdash; hover to expand
          </span>
        </div>
      </div>
    </section>
  )
}
