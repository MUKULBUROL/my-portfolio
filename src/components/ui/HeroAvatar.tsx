'use client'

import React, { forwardRef } from 'react'
import Image from 'next/image'
import { profile } from '@/data/profile'

export const HeroAvatar = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="opacity-0 flex-shrink-0 order-1 md:order-2 relative"
      aria-hidden="false"
    >
      {/* Editorial photo frame with offset backing card */}
      <div className="relative inline-block animate-float">
        {/* Editorial Offset Backing Card */}
        <div className="absolute inset-0 bg-[#111111]/5 border border-[#111111]/8 rounded-[2.5rem] md:rounded-[3.5rem] translate-x-3 translate-y-3 pointer-events-none" />

        {/* Main Photo Card Frame */}
        <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-2 border-[#111111]/15 bg-[#fcfaf7] shadow-xl">
          <Image
            src="/Profile.jpg"
            alt={`${profile.name} — ${profile.headline}`}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 288px, 320px"
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-102 hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Floating badge — availability status */}
      <div
        className="availability-badge absolute -bottom-3 -right-3 flex items-center gap-2 bg-[#fcfaf7] border border-[#111111]/8 rounded-full px-3 py-1.5 shadow-md"
      >
        <span className="tooltip">Available for freelance/full-time</span>
        <div className="flex items-center gap-[2px] h-3.5 w-3 justify-center" aria-hidden="true">
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-1" />
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-2" />
          <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-3" />
        </div>
        <span className="text-[10px] font-mono text-[#111111] font-semibold tracking-wide">
          {profile.availabilityLabel}
        </span>
      </div>
    </div>
  )
})

HeroAvatar.displayName = 'HeroAvatar'
