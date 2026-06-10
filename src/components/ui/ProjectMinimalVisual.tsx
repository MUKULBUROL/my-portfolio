'use client'

import React from 'react'

export function ProjectMinimalVisual({ projectId }: { projectId: string }) {
  if (projectId === 'autonomous-agents-orchestrator') {
    return (
      <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        <path d="M 50 120 L 150 120" stroke="#111111" strokeWidth="1" strokeDasharray="3,3" />
        <path d="M 230 120 L 290 80 L 370 80" stroke="#111111" strokeWidth="1" />
        <path d="M 230 120 L 290 160 L 370 160" stroke="#111111" strokeWidth="1" />
        <path d="M 450 80 L 480 120" stroke="#111111" strokeWidth="1" />
        <path d="M 450 160 L 480 120" stroke="#111111" strokeWidth="1" />
        
        <circle cx="50" cy="120" r="6" fill="#111111" />
        <text x="50" y="140" textAnchor="middle" className="fill-[#111111] font-semibold text-[8px] uppercase tracking-wider">User Intent</text>
        
        <rect x="150" y="95" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="190" y="120" textAnchor="middle" className="fill-[#111111] font-bold">COORDINATOR</text>
        <text x="190" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">LLM Router</text>
        
        <rect x="370" y="55" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#fcfaf7]" />
        <text x="410" y="80" textAnchor="middle" className="fill-[#111111] font-bold">QA AGENT</text>
        <text x="410" y="92" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Code Auditor</text>
        
        <rect x="370" y="135" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#fcfaf7]" />
        <text x="410" y="160" textAnchor="middle" className="fill-[#111111] font-bold">REVIEWER</text>
        <text x="410" y="172" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Doc Engine</text>
        
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
        <path d="M 80 120 L 160 120" stroke="#111111" strokeWidth="1" />
        <path d="M 260 120 L 340 120" stroke="#111111" strokeWidth="1" strokeDasharray="4,2" />
        <path d="M 420 120 L 460 120" stroke="#111111" strokeWidth="1" />

        <rect x="20" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="50" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">Raw Set</text>

        <rect x="160" y="85" width="100" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="210" y="115" textAnchor="middle" className="fill-[#111111] font-bold">VAE ENGINE</text>
        <text x="210" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Latent Space</text>
        <text x="210" y="140" textAnchor="middle" className="fill-[#111111]/70 text-[8px]">PyTorch</text>

        <rect x="340" y="95" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="380" y="120" textAnchor="middle" className="fill-[#111111] font-semibold">Rules Audit</text>
        <text x="380" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[7.5px]">Constraints</text>

        <circle cx="480" cy="120" r="10" fill="#111111" />
        <text x="480" y="145" textAnchor="middle" className="fill-[#111111] text-[8px] uppercase tracking-wider font-semibold">Staging</text>
        
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
      </svg>
    )
  }

  if (projectId === 'rag-document-intelligence') {
    return (
      <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        <path d="M 70 120 L 140 80 L 220 80" stroke="#111111" strokeWidth="1" />
        <path d="M 70 120 L 140 160 L 220 160" stroke="#111111" strokeWidth="1" />
        <path d="M 300 80 L 350 120" stroke="#111111" strokeWidth="1" />
        <path d="M 300 160 L 350 120" stroke="#111111" strokeWidth="1" />
        <path d="M 430 120 L 470 120" stroke="#111111" strokeWidth="1.5" />

        <rect x="10" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="40" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">APIs</text>

        <rect x="220" y="55" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="260" y="80" textAnchor="middle" className="fill-[#111111] font-semibold">pgvector</text>
        <text x="260" y="92" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Dense Match</text>

        <rect x="220" y="135" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
        <text x="260" y="160" textAnchor="middle" className="fill-[#111111] font-semibold">BM25 Index</text>
        <text x="260" y="172" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Exact Match</text>

        <rect x="350" y="95" width="80" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="390" y="120" textAnchor="middle" className="fill-[#111111] font-bold">HYBRID RANK</text>
        <text x="390" y="132" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Reciprocal Fusion</text>

        <circle cx="480" cy="120" r="10" fill="#111111" />
        <text x="480" y="145" textAnchor="middle" className="fill-[#111111] text-[8px] uppercase tracking-wider font-semibold">GPT-4o</text>
        
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
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

      <rect x="20" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="50" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">Client</text>

      <rect x="160" y="85" width="100" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
      <text x="210" y="115" textAnchor="middle" className="fill-[#111111] font-bold">LOCK MANAGER</text>
      <text x="210" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Advisory Locks</text>
      <text x="210" y="140" textAnchor="middle" className="fill-[#111111]/70 text-[8px]">PostgreSQL</text>

      <rect x="380" y="55" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="420" y="80" textAnchor="middle" className="fill-[#111111] font-semibold">Worker Node A</text>

      <rect x="380" y="135" width="80" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="420" y="160" textAnchor="middle" className="fill-[#111111] font-semibold">Worker Node B</text>
      
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" className="pointer-events-none -z-10" />
    </svg>
  )
}
