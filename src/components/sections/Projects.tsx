'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { projects } from '@/data/projects'
import type { ProjectItem } from '@/types'
import { ExternalLink, X, ShieldAlert, Cpu, GitBranch, TrendingUp, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Custom-crafted minimalist visual system architectures for each project (editorial look)
function ProjectMinimalVisual({ projectId }: { projectId: string }) {
  if (projectId === 'autonomous-agents-orchestrator') {
    return (
      <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        {/* Connection flow lines */}
        <path d="M 50 120 L 150 120" stroke="#111111" strokeWidth="1" strokeDasharray="3,3" />
        <path d="M 230 120 L 290 80 L 370 80" stroke="#111111" strokeWidth="1" />
        <path d="M 230 120 L 290 160 L 370 160" stroke="#111111" strokeWidth="1" />
        <path d="M 450 80 L 480 120" stroke="#111111" strokeWidth="1" />
        <path d="M 450 160 L 480 120" stroke="#111111" strokeWidth="1" />
        
        {/* Node A: Input */}
        <circle cx="50" cy="120" r="6" fill="#111111" />
        <text x="50" y="140" textAnchor="middle" className="fill-[#111111] font-semibold text-[8px] uppercase tracking-wider">User Intent</text>
        
        {/* Node B: Coordinator */}
        <rect x="150" y="95" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="190" y="120" textAnchor="middle" className="fill-[#111111] font-bold">COORDINATOR</text>
        <text x="190" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">LLM Router</text>
        
        {/* Node C: QA Agent */}
        <rect x="370" y="55" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#fcfaf7]" />
        <text x="410" y="80" textAnchor="middle" className="fill-[#111111] font-bold">QA AGENT</text>
        <text x="410" y="92" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Code Auditor</text>
        
        {/* Node D: Review Agent */}
        <rect x="370" y="135" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#fcfaf7]" />
        <text x="410" y="160" textAnchor="middle" className="fill-[#111111] font-bold">REVIEWER</text>
        <text x="410" y="172" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Doc Engine</text>
        
        {/* Grid dots background */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
      </svg>
    )
  }

  if (projectId === 'synthetic-healthcare-data') {
    return (
      <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        {/* Flow */}
        <path d="M 80 120 L 160 120" stroke="#111111" strokeWidth="1" />
        <path d="M 260 120 L 340 120" stroke="#111111" strokeWidth="1" strokeDasharray="4,2" />
        <path d="M 420 120 L 460 120" stroke="#111111" strokeWidth="1" />

        {/* Input */}
        <rect x="20" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="50" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">Raw Set</text>

        {/* Model */}
        <rect x="160" y="85" width="100" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="210" y="115" textAnchor="middle" className="fill-[#111111] font-bold">VAE ENGINE</text>
        <text x="210" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Latent Space</text>
        <text x="210" y="140" textAnchor="middle" className="fill-[#111111]/70 text-[8px]">PyTorch</text>

        {/* Rules */}
        <rect x="340" y="95" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="380" y="120" textAnchor="middle" className="fill-[#111111] font-semibold">Rules Audit</text>
        <text x="380" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[7.5px]">Constraints</text>

        {/* Output */}
        <circle cx="480" cy="120" r="10" fill="#111111" />
        <text x="480" y="145" textAnchor="middle" className="fill-[#111111] text-[8px] uppercase tracking-wider font-semibold">Staging</text>
        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
      </svg>
    )
  }

  if (projectId === 'rag-document-intelligence') {
    return (
      <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        {/* Paths */}
        <path d="M 70 120 L 140 80 L 220 80" stroke="#111111" strokeWidth="1" />
        <path d="M 70 120 L 140 160 L 220 160" stroke="#111111" strokeWidth="1" />
        <path d="M 300 80 L 350 120" stroke="#111111" strokeWidth="1" />
        <path d="M 300 160 L 350 120" stroke="#111111" strokeWidth="1" />
        <path d="M 430 120 L 470 120" stroke="#111111" strokeWidth="1.5" />

        {/* Ingest */}
        <rect x="10" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="40" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">APIs</text>

        {/* Vector DB */}
        <rect x="220" y="55" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="260" y="80" textAnchor="middle" className="fill-[#111111] font-semibold">pgvector</text>
        <text x="260" y="92" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Dense Match</text>

        {/* BM25 Keyword */}
        <rect x="220" y="135" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="260" y="160" textAnchor="middle" className="fill-[#111111] font-semibold">BM25 Index</text>
        <text x="260" y="172" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Exact Match</text>

        {/* Hybrid Ranker */}
        <rect x="350" y="95" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="390" y="120" textAnchor="middle" className="fill-[#111111] font-bold">HYBRID RANK</text>
        <text x="390" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Reciprocal Fusion</text>

        {/* LLM */}
        <circle cx="480" cy="120" r="10" fill="#111111" />
        <text x="480" y="145" textAnchor="middle" className="fill-[#111111] text-[8px] uppercase tracking-wider font-semibold">GPT-4o</text>
        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
      </svg>
    )
  }

  // fallback/distributed-task-scheduler
  return (
    <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
      <path d="M 80 120 L 160 120" stroke="#111111" strokeWidth="1" />
      <path d="M 260 120 L 310 80 L 380 80" stroke="#111111" strokeWidth="1" />
      <path d="M 260 120 L 310 160 L 380 160" stroke="#111111" strokeWidth="1" />

      {/* Scheduler client */}
      <rect x="20" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="50" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">Client</text>

      {/* Database Lock Manager */}
      <rect x="160" y="85" width="100" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
      <text x="210" y="115" textAnchor="middle" className="fill-[#111111] font-bold">LOCK MANAGER</text>
      <text x="210" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Advisory Locks</text>
      <text x="210" y="140" textAnchor="middle" className="fill-[#111111]/70 text-[8px]">PostgreSQL</text>

      {/* Worker Nodes */}
      <rect x="380" y="55" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="420" y="80" textAnchor="middle" className="fill-[#111111] font-semibold">Worker Node A</text>

      <rect x="380" y="135" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="420" y="160" textAnchor="middle" className="fill-[#111111] font-semibold">Worker Node B</text>
      <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
    </svg>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<ProjectItem | null>(null)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade in section header
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

    // Film Reel horizontal slider effect with pin
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const scrollWidth = track.scrollWidth
    const calculateTranslation = () => -(scrollWidth - window.innerWidth)

    const scrollTween = gsap.to(track, {
      x: calculateTranslation,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#f5efe8] flex flex-col justify-between"
    >
      {/* Top Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 w-full pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Exhibits"
          eyebrowNumber="02"
          title="Creative Solutions"
          subtitle="A gallery of software architectures designed with strict constraints and clear tradeoffs."
          className="mb-0 text-[#111111]"
        />
        <div className="font-mono text-xs text-[#6b6b6b] hidden md:block">
          Scroll vertically to walk through the gallery
        </div>
      </div>

      {/* Horizontal Slides track */}
      <div className="flex-grow flex items-center">
        <div
          ref={trackRef}
          className="film-reel-container flex flex-row items-center gap-16 px-16 w-max"
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-[#fcfaf7] border border-[#111111]/10 rounded-2xl p-6 sm:p-10 flex flex-col justify-between cursor-pointer hover:border-[#111111]/25 hover:shadow-sm group transition-all duration-300 select-none"
            >
              {/* Exhibit Number / Status */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#6b6b6b]">
                <span>EXHIBIT 0{idx + 1}</span>
                <span className="uppercase tracking-widest">{project.status}</span>
              </div>

              {/* Large Procedural Visual */}
              <div className="my-4 flex-grow border border-[#111111]/5 rounded-xl bg-[#f5efe8]/30 flex items-center justify-center p-4 overflow-hidden relative">
                <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500 ease-[var(--ease-spring)]">
                  <ProjectMinimalVisual projectId={project.id} />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-[#111111] leading-none mb-1.5">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#6b6b6b] font-mono leading-none">
                    Role: {project.status === 'open-source' ? 'Creator / Author' : 'Lead Architect'}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-0.5 rounded text-[#111111]/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[9px] font-mono text-[#6b6b6b]">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Unseen Studio styled Final Frame */}
          <div className="film-exhibit w-[80vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] aspect-[16/10.5] sm:aspect-[16/10] bg-transparent flex flex-col justify-center items-center text-center p-10">
            <span className="font-mono text-xs text-[#6b6b6b] uppercase tracking-[0.25em] mb-4">
              Looking for more experiments?
            </span>
            <a
              href="https://github.com/alexchen"
              target="_blank"
              rel="noreferrer"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111111] hover:text-[#333333] tracking-tight border-b-2 border-current pb-2 transition-all flex items-center gap-2 group"
            >
              <span>github.com/alexchen</span>
              <ArrowRight className="inline-block group-hover:translate-x-2 transition-transform duration-300" size={32} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Padding space to frame layouts */}
      <div className="h-10 w-full bg-transparent" />

      {/* Case Study Modal */}
      {selected && (
        <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function CaseStudyModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[#f5efe8]/90 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div
        className="w-full max-w-4xl bg-[#fcfaf7] border border-[#111111]/15 rounded-2xl p-6 sm:p-10 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-[#111111]/10 bg-[#f5efe8] hover:bg-[#111111]/5 text-[#6b6b6b] hover:text-[#111111] transition-all"
          aria-label="Close case study"
        >
          <X size={15} />
        </button>

        {/* Header */}
        <div className="mb-8 pr-10">
          <span className="text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider block mb-2">
            {'// Engineering Case Study'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#111111] tracking-tight">
            {project.name}
          </h2>
          <p className="text-[#6b6b6b] font-mono text-xs sm:text-sm mt-2">
            {project.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#111111]/10">
          {/* Main Case Study Sections */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Problem */}
            <div>
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-2 flex items-center gap-1.5 border-b border-[#111111]/5 pb-1.5 font-bold">
                <ShieldAlert size={12} />
                <span>Problem Statement</span>
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            {/* 2. Approach */}
            <div>
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-2 flex items-center gap-1.5 border-b border-[#111111]/5 pb-1.5 font-bold">
                <Cpu size={12} />
                <span>Approach & Solution</span>
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>

            {/* 3. Architecture */}
            <div>
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-1.5 font-bold">
                <GitBranch size={12} />
                <span>System Architecture</span>
              </h3>
              <div className="p-4 border border-[#111111]/10 rounded-xl bg-[#f5efe8]/30 mb-4">
                <ProjectMinimalVisual projectId={project.id} />
              </div>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.architecture}
              </p>
            </div>

            {/* 4. Challenges */}
            <div>
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-2 flex items-center gap-1.5 border-b border-[#111111]/5 pb-1.5 font-bold">
                <Cpu size={12} />
                <span>Implementation Challenges</span>
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.challenges}
              </p>
            </div>

            {/* 5. Results */}
            <div>
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-2 flex items-center gap-1.5 border-b border-[#111111]/5 pb-1.5 font-bold">
                <TrendingUp size={12} />
                <span>Business & Technical Results</span>
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.results}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Tech Stack */}
            <div className="p-5 border border-[#111111]/10 rounded-xl bg-[#f5efe8]/20">
              <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-3 font-bold">
                {'// Technical Stack'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-0.5 rounded text-[#111111]/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="p-5 border border-[#111111]/10 rounded-xl bg-[#f5efe8]/20">
                <h3 className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-wider mb-3 font-bold">
                  {'// Key Metrics'}
                </h3>
                <ul className="flex flex-col gap-2">
                  {project.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="text-xs text-[#6b6b6b] font-mono flex items-start gap-1.5"
                    >
                      <span className="text-[#111111]">•</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action URLs */}
            <div className="flex flex-col gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 border border-[#111111]/10 hover:bg-[#111111]/5 text-[#111111] rounded-xl text-xs font-mono font-semibold transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#111111] hover:bg-[#222222] text-[#f5efe8] rounded-xl text-xs font-mono font-semibold transition-all"
                >
                  <ExternalLink size={12} />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

