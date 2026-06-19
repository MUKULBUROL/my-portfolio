'use client'

import React from 'react'
import { GlassCard } from './GlassCard'
import { profile } from '@/data/profile'

const AVAILABLE_FOR = [
  'Enterprise Distributed Systems Roles',
  'AI Integration Consulting',
  'Open Source Software Design',
  'Full-Stack System Architectures'
]

export function StatusCard() {
  return (
    <GlassCard className="p-6 border-[#111111]/8 flex flex-col gap-4" hoverEffect>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[2px] h-3.5 w-3.5 justify-center flex-shrink-0" aria-hidden="true">
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-1" />
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-2" />
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-3" />
        </div>
        <div>
          <div className="text-xs font-mono text-[#6b6b6b] font-semibold">Status</div>
          <div className="text-[#111111] text-sm font-heading font-semibold">{profile.availabilityLabel}</div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#111111]/8">
        <div className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-widest mb-3">Interests</div>
        <ul className="flex flex-col gap-2" aria-label="Available for">
          {AVAILABLE_FOR.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
              <span className="text-[#111111] text-[10px] font-bold">→</span>
              <span className="font-mono">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-[#111111]/8">
        <div className="text-[9px] font-mono text-[#6b6b6b] mb-1">Details</div>
        <div className="text-xs text-[#111111] font-mono">{profile.location}</div>
        <div className="text-[9px] text-[#6b6b6b] font-mono mt-0.5">{profile.timezone}</div>
      </div>
    </GlassCard>
  )
}
