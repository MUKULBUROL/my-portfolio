'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NODES = [
  {
    id: 'user',
    label: 'User / Client',
    sublabel: 'Optimistic State',
    desc: 'Optimistic UI state updates ensure immediate response feedback. The client coordinates automatic token refresh and manages exponential backoff retry policies for interrupted connections.'
  },
  {
    id: 'api',
    label: 'API Gateway',
    sublabel: 'Rate Limiting & Auth',
    desc: 'The front door manages TLS termination, JWT token validation, CORS rules, and rate limits using a Redis Token Bucket filter to prevent resource starvation.'
  },
  {
    id: 'queue',
    label: 'Message Queue',
    sublabel: 'Redis / RabbitMQ',
    desc: 'Buffers incoming spikes. Absorbs backpressure so that database connection pools are not overwhelmed, and decouples request ingestion from worker execution.'
  },
  {
    id: 'worker',
    label: 'Worker Pool',
    sublabel: 'Stateless Consumers',
    desc: 'Scales horizontally to process background jobs. Uses database advisory locks to guarantee exactly-once execution and process jobs in transactional chunks.'
  },
  {
    id: 'database',
    label: 'Primary Database',
    sublabel: 'PostgreSQL Relational',
    desc: 'Ensures strict ACID guarantees. Scaled using read-replicas for query distribution, indexing strategies (like B-Tree and GIN), and pg_bouncer connection pools.'
  }
]

export function HowIThink() {
  const [selectedNode, setSelectedNode] = useState<string>('api')
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    // Fade in section header
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

    // Trigger line drawing on scroll
    const path = svgRef.current?.querySelector('.animated-flow-path')
    if (path) {
      const pathAnim = gsap.fromTo(
        path,
        { strokeDashoffset: 800 },
        {
          strokeDashoffset: 0,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
      if (pathAnim.scrollTrigger) triggers.push(pathAnim.scrollTrigger)
    }

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const selectedData = NODES.find((n) => n.id === selectedNode)

  return (
    <section id="how-i-think" ref={sectionRef} className="py-24 relative overflow-hidden bg-[#f5efe8]" aria-label="System design thinking">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="How I Think"
            eyebrowNumber="03"
            title="System Architecture"
            subtitle="I build resilient, distributed systems designed to scale under strict resource constraints."
            align="center"
          />
        </div>

        {/* SVG Diagram Canvas */}
        <div className="mt-12 flex justify-center items-center w-full overflow-x-auto py-8">
          <div className="min-w-[650px] w-full max-w-4xl">
            <svg
              ref={svgRef}
              viewBox="0 0 800 180"
              className="w-full h-auto stroke-[#111111]/10 fill-none font-mono text-[9px] select-none"
            >
              <defs>
                <marker id="dot-arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#111111" />
                </marker>
              </defs>

              {/* Background Connective Line */}
              <path
                d="M 80 90 L 720 90"
                stroke="rgba(17, 17, 17, 0.08)"
                strokeWidth="1.5"
              />

              {/* Active data packet flow line (GSAP animated dash) */}
              <path
                className="animated-flow-path"
                d="M 80 90 L 720 90"
                stroke="#111111"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                style={{
                  strokeDasharray: '40, 200',
                  animation: 'marching-flow 5s linear infinite'
                }}
              />

              {/* Node 1: User */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('user')}>
                <circle cx="80" cy="90" r="24" className={`transition-all duration-300 ${selectedNode === 'user' ? 'fill-[#111111] stroke-[#111111]' : 'fill-[#fcfaf7] stroke-[#111111]/15 hover:stroke-[#111111]/30'}`} />
                <text x="80" y="93" textAnchor="middle" className={`font-sans text-[8px] font-bold tracking-tight pointer-events-none ${selectedNode === 'user' ? 'fill-[#f5efe8]' : 'fill-[#111111]'}`}>USER</text>
              </g>

              {/* Node 2: API Gateway */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('api')}>
                <rect x="200" y="66" width="60" height="48" rx="4" className={`transition-all duration-300 ${selectedNode === 'api' ? 'fill-[#111111] stroke-[#111111]' : 'fill-[#fcfaf7] stroke-[#111111]/15 hover:stroke-[#111111]/30'}`} />
                <text x="230" y="90" textAnchor="middle" className={`font-sans text-[8px] font-bold tracking-tight pointer-events-none ${selectedNode === 'api' ? 'fill-[#f5efe8]' : 'fill-[#111111]'}`}>API</text>
                <text x="230" y="100" textAnchor="middle" className={`font-mono text-[5.5px] pointer-events-none ${selectedNode === 'api' ? 'fill-[#f5efe8]/60' : 'fill-[#6b6b6b]'}`}>GATEWAY</text>
              </g>

              {/* Node 3: Queue */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('queue')}>
                <rect x="350" y="66" width="60" height="48" rx="4" className={`transition-all duration-300 ${selectedNode === 'queue' ? 'fill-[#111111] stroke-[#111111]' : 'fill-[#fcfaf7] stroke-[#111111]/15 hover:stroke-[#111111]/30'}`} />
                <text x="380" y="90" textAnchor="middle" className={`font-sans text-[8px] font-bold tracking-tight pointer-events-none ${selectedNode === 'queue' ? 'fill-[#f5efe8]' : 'fill-[#111111]'}`}>QUEUE</text>
                <text x="380" y="100" textAnchor="middle" className={`font-mono text-[5.5px] pointer-events-none ${selectedNode === 'queue' ? 'fill-[#f5efe8]/60' : 'fill-[#6b6b6b]'}`}>BUFFER</text>
              </g>

              {/* Node 4: Worker */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('worker')}>
                <rect x="500" y="66" width="60" height="48" rx="4" className={`transition-all duration-300 ${selectedNode === 'worker' ? 'fill-[#111111] stroke-[#111111]' : 'fill-[#fcfaf7] stroke-[#111111]/15 hover:stroke-[#111111]/30'}`} />
                <text x="530" y="90" textAnchor="middle" className={`font-sans text-[8px] font-bold tracking-tight pointer-events-none ${selectedNode === 'worker' ? 'fill-[#f5efe8]' : 'fill-[#111111]'}`}>WORKER</text>
                <text x="530" y="100" textAnchor="middle" className={`font-mono text-[5.5px] pointer-events-none ${selectedNode === 'worker' ? 'fill-[#f5efe8]/60' : 'fill-[#6b6b6b]'}`}>CONSUMER</text>
              </g>

              {/* Node 5: Database */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('database')}>
                <rect x="650" y="66" width="60" height="48" rx="4" className={`transition-all duration-300 ${selectedNode === 'database' ? 'fill-[#111111] stroke-[#111111]' : 'fill-[#fcfaf7] stroke-[#111111]/15 hover:stroke-[#111111]/30'}`} />
                <text x="680" y="90" textAnchor="middle" className={`font-sans text-[8px] font-bold tracking-tight pointer-events-none ${selectedNode === 'database' ? 'fill-[#f5efe8]' : 'fill-[#111111]'}`}>DATABASE</text>
                <text x="680" y="100" textAnchor="middle" className={`font-mono text-[5.5px] pointer-events-none ${selectedNode === 'database' ? 'fill-[#f5efe8]/60' : 'fill-[#6b6b6b]'}`}>STORE</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Typographic details: NO cards, NO dashboard panels */}
        <div className="mt-10 max-w-3xl mx-auto border-t border-[#111111]/10 pt-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#6b6b6b]">Selected Subsystem</span>
            <span className="text-xl font-heading font-black text-[#111111] mt-1 uppercase">{selectedData?.label}</span>
            <span className="font-mono text-[10px] text-[#6b6b6b]/80 mt-0.5">{selectedData?.sublabel}</span>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed font-sans">
              {selectedData?.desc}
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}
