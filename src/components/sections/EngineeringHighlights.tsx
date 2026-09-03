'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { Award, Zap, GitMerge, ShieldCheck, Cpu, Code2 } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HighlightCard {
  id: string
  title: string
  project: string
  recruiter: {
    metric: string
    metricSub: string
    icon: React.ReactNode
    points: string[]
    tags: string[]
  }
  manager: {
    metric: string
    metricSub: string
    icon: React.ReactNode
    points: string[]
    tags: string[]
  }
  colorClass: string
  glowColor: string
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    id: 'documind-ai',
    title: 'Semantic Document Search',
    project: 'DocuMind AI',
    colorClass: 'border-amber-500/20 dark:border-amber-400/20 hover:border-amber-500/50 dark:hover:border-amber-400/50',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    recruiter: {
      metric: 'TOP 100',
      metricSub: 'Out of 60,000+ competitors',
      icon: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      points: [
        'Slashed document retrieval time to sub-second speeds for 10K+ text datasets.',
        'Orchestrated OpenAI embeddings and Google Gemini for highly accurate search matches.',
        'Ranked among the Top 100 national teams in the prestigious Adobe India Hackathon 2025.'
      ],
      tags: ['AI Search', 'Hackathon Winner', 'Sub-second Latency']
    },
    manager: {
      metric: '< 800ms',
      metricSub: 'Vector store search latency',
      icon: <Cpu className="w-5 h-5 text-amber-500 dark:text-amber-300" />,
      points: [
        'Structured context boundaries using recursive character text splitters with overlap parameters.',
        'Generated dense vectors via text-embedding-3-small and optimized similarity lookups.',
        'Engineered error-resilient client pipelines with exponential backoff for external API rate limits.'
      ],
      tags: ['Token Overlap', 'Vector Embeddings', 'Rate Limit Retry']
    }
  },
  {
    id: 'splitwise',
    title: 'Simplified Debt Settlement',
    project: 'Splitwise Backend',
    colorClass: 'border-emerald-500/20 dark:border-emerald-400/20 hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    recruiter: {
      metric: '40% LESS',
      metricSub: 'Net ledger transactions',
      icon: <GitMerge className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      points: [
        'Minimized total bank transfers by 40% using automated balance simplification.',
        'Exposed secure REST endpoints in Spring Boot for multi-user bill sharing.',
        'Ensured zero database errors under load using normalized relational schemas.'
      ],
      tags: ['Algorithm Design', 'Spring Boot APIs', 'ACID Transactions']
    },
    manager: {
      metric: 'O(V + E)',
      metricSub: 'Greedy reducer complexity',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-300" />,
      points: [
        'Resolved multi-party debt cycles utilizing a greedy cash-flow simplification algorithm.',
        'Modeled many-to-many JPA database associations with custom indexes to prevent scan bottlenecks.',
        'Guaranteed atomic state synchronization via Spring @Transactional annotations.'
      ],
      tags: ['Greedy Flow API', 'Spring Data JPA', 'Isolated Database Transactions']
    }
  },
  {
    id: 'recommendation',
    title: 'Similarity Traversal Matrix',
    project: 'Graph Engine',
    colorClass: 'border-violet-500/20 dark:border-violet-400/20 hover:border-violet-500/50 dark:hover:border-violet-400/50',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    recruiter: {
      metric: '< 1.0ms',
      metricSub: 'Compute recommendation speed',
      icon: <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
      points: [
        'Sub-millisecond computational speeds for instantaneous client recommendations.',
        'Analyzed multiple similarity criteria (interests, visits) to personalize results.',
        'Written in C++ to achieve strict memory control and hardware-level execution speeds.'
      ],
      tags: ['C++17 Engine', 'Sub-millisecond Latency', 'Multi-metric Traversal']
    },
    manager: {
      metric: 'Top-K Heap',
      metricSub: 'Priority queue retrieval',
      icon: <Code2 className="w-5 h-5 text-violet-500 dark:text-violet-300" />,
      points: [
        'Modeled user-item interactions as a weighted bipartite adjacency graph structure.',
        'Evaluated distance calculations using Cosine, Pearson, Jaccard, and Euclidean metrics.',
        'Utilized std::priority_queue heuristics to fetch the top recommendation matches efficiently.'
      ],
      tags: ['Graph Databases', 'Cosine / Pearson', 'Bipartite Adjacency']
    }
  }
]

export function EngineeringHighlights() {
  const [mode, setMode] = useState<'recruiter' | 'manager'>('recruiter')
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Gentle fade/translate animation on cards on mount or mode switch
    const cards = cardsRef.current?.children
    if (cards) {
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      )
    }
  }, [mode, prefersReducedMotion])

  return (
    <section
      id="engineering-highlights"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-[#fcfaf7] dark:bg-[#111111]"
      aria-label="Engineering achievements and highlights"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Highlights"
          eyebrowNumber="03"
          title="Engineering Milestones"
          subtitle="Real challenges. Concrete solutions. High-impact results."
          align="center"
        />

        {/* Mode Selector Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center bg-[#f5efe8] dark:bg-[#1e1b19] p-1 rounded-full border border-[#111111]/5 dark:border-[#e5ded4]/10 shadow-inner">
            {/* Sliding background tag */}
            <div
              className={`absolute top-1 bottom-1 rounded-full bg-[#111111] dark:bg-[#e5ded4] shadow-md transition-all duration-300 ease-out`}
              style={{
                left: mode === 'recruiter' ? '4px' : 'calc(50% + 2px)',
                width: 'calc(50% - 6px)'
              }}
            />

            {/* Recruiter button */}
            <button
              onClick={() => setMode('recruiter')}
              className={`relative z-10 px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                mode === 'recruiter'
                  ? 'text-[#f5efe8] dark:text-[#111111]'
                  : 'text-[#555555] dark:text-[#cccccc] hover:text-[#111111] dark:hover:text-[#e5ded4]'
              }`}
              aria-label="Switch to Recruiter Skim view"
            >
              Recruiter Mode
            </button>

            {/* Manager button */}
            <button
              onClick={() => setMode('manager')}
              className={`relative z-10 px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                mode === 'manager'
                  ? 'text-[#f5efe8] dark:text-[#111111]'
                  : 'text-[#555555] dark:text-[#cccccc] hover:text-[#111111] dark:hover:text-[#e5ded4]'
              }`}
              aria-label="Switch to Technical Deep-Dive view"
            >
              Hiring Manager
            </button>
          </div>
        </div>

        {/* Highlight Cards Grid */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {HIGHLIGHTS.map((item) => {
            const data = mode === 'recruiter' ? item.recruiter : item.manager
            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between p-7 rounded-[2rem] bg-[#fcfaf7]/50 dark:bg-[#1e1b19]/35 backdrop-blur-md border border-[#111111]/8 dark:border-[#e5ded4]/8 ${item.colorClass} hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group`}
                style={{ '--glow-color': item.glowColor } as React.CSSProperties}
              >
                {/* Glow Backdrop */}
                <div
                  className="absolute inset-0 -z-10 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)` }}
                />

                <div>
                  {/* Project Info Header */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#966d3a] dark:text-[#d4b483]">
                      {item.project}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#111111]/5 dark:border-[#e5ded4]/8 bg-[#fcfaf7] dark:bg-[#111111] flex items-center justify-center shadow-sm">
                      {data.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-heading font-black text-[#111111] dark:text-[#e5ded4] leading-tight tracking-tight uppercase">
                    {item.title}
                  </h3>

                  {/* Callout Metric */}
                  <div className="mt-5 p-4 rounded-[1.25rem] bg-[#f5efe8]/60 dark:bg-[#111111]/50 border border-[#111111]/5 dark:border-[#e5ded4]/5 flex flex-col justify-center">
                    <span className="font-heading font-black text-3xl text-[#111111] dark:text-[#e5ded4] tracking-tight uppercase">
                      {data.metric}
                    </span>
                    <span className="font-mono text-[9px] text-[#6b6b6b] dark:text-[#a0a0a0] mt-0.5 uppercase tracking-wider">
                      {data.metricSub}
                    </span>
                  </div>

                  {/* Impact points */}
                  <ul className="mt-6 space-y-3.5 list-none pl-0">
                    {data.points.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-[#555555] dark:text-[#cccccc] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#966d3a] dark:bg-[#d4b483] mt-1.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-tags */}
                <div className="mt-8 pt-5 border-t border-[#111111]/5 dark:border-[#e5ded4]/5 flex flex-wrap gap-1.5">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[9px] font-mono font-semibold bg-[#f5efe8] dark:bg-[#111111]/60 border border-[#111111]/8 dark:border-[#e5ded4]/8 text-[#555555] dark:text-[#cccccc] rounded-full uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
