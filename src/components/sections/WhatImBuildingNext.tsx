'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

const NEXT_PROJECTS = [
  {
    index: '01',
    area: 'Open Source & Community',
    title: 'Contributing to Open Source',
    description: 'Actively seeking opportunities to contribute to open source projects. Interested in giving back to the ecosystem that has powered my growth while collaborating with experienced engineers worldwide.'
  },
  {
    index: '02',
    area: 'Web Development',
    title: 'Production-Ready Websites',
    description: 'Building and shipping production-grade web applications with a focus on performance, accessibility, and scalable architecture. Every project is an opportunity to refine the craft of delivering real-world solutions.'
  },
  {
    index: '03',
    area: 'System Design',
    title: 'Complex Architectures',
    description: 'Diving deep into complex system architectures — distributed systems, event-driven designs, and microservice patterns — and implementing them to understand trade-offs at a practical level.'
  }
]

export function WhatImBuildingNext() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    const headerAnim = gsap.fromTo(
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
    if (headerAnim.scrollTrigger) triggers.push(headerAnim.scrollTrigger)

    const items = containerRef.current?.querySelectorAll('.ledger-item')
    items?.forEach((item) => {
      const anim = gsap.fromTo(
        item,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0.5 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
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
    <section id="next-building" className="py-24 relative overflow-hidden bg-[#f5efe8]" aria-label="What I'm building next">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Future Ledger"
            eyebrowNumber="05"
            title="What I'm Building Next"
            subtitle="An active log of my ongoing technical research, prototype developments, and system experiments."
          />
        </div>

        {/* Ledger list */}
        <div ref={containerRef} className="mt-12 flex flex-col gap-0 border-t border-[#111111]/10">
          {NEXT_PROJECTS.map((item) => (
            <div
              key={item.index}
              className="ledger-item group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-[#111111]/10 items-start hover:bg-[#111111]/2 px-4 transition-all duration-300"
            >
              {/* Meta information */}
              <div className="md:col-span-4 flex flex-col transition-all duration-300 group-hover:translate-x-2">
                <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-widest mb-1.5">Area: {item.area}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-bold text-[#111111]">{item.index}</span>
                  <h3 className="text-lg font-heading font-black text-[#111111] tracking-tight flex items-center gap-2 group-hover:text-[#7C3AED] transition-colors duration-300">
                    <span>{item.title}</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                </div>
              </div>

              {/* Description copy */}
              <p className="md:col-span-8 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed font-sans transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#111111]/90">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
