'use client'

import React, { useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NEXT_PROJECTS = [
  {
    index: '01',
    area: 'Autonomous Agent Orchestration',
    title: 'Dynamic Routing Graphs',
    description: 'Experimenting with stateful agent graphs using LangGraph and Python. The goal is to build deterministic state machines that handle complex tool calls, loops, and human-in-the-loop validation gates without prompt drifting.'
  },
  {
    index: '02',
    area: 'Edge Computing & Networking',
    title: 'Edge-Rendered RAG Systems',
    description: 'Developing high-performance semantic search workers that run on edge networks (Cloudflare Workers). Investigating WASM-compiled vector search engines to eliminate cold-start latencies and decrease database overhead.'
  },
  {
    index: '03',
    area: 'Distributed Systems',
    title: 'Advisory-Locked Schedulers',
    description: 'Drafting an open-source distributed scheduler in Go that uses minimal postgres primitives. Aiming to achieve Temporal-like execution safety and status visibility, but with low infrastructure overhead.'
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
    <section id="next-building" className="py-24 relative overflow-hidden bg-[#f5efe8]">
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
              className="ledger-item grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-[#111111]/10 items-start hover:bg-[#111111]/2 px-4 transition-colors duration-200"
            >
              {/* Meta information */}
              <div className="md:col-span-4 flex flex-col">
                <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-widest mb-1.5">// Area: {item.area}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-bold text-[#111111]">{item.index}</span>
                  <h3 className="text-lg font-heading font-black text-[#111111] tracking-tight">{item.title}</h3>
                </div>
              </div>

              {/* Description copy */}
              <p className="md:col-span-8 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
