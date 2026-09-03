'use client'

import React, { forwardRef, useEffect, useRef } from 'react'
import Image from 'next/image'
import { profile } from '@/data/profile'
import { gsap } from 'gsap'

export const HeroAvatar = forwardRef<HTMLDivElement, { className?: string }>(({ className = '' }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cardX = rect.left + rect.width / 2
      const cardY = rect.top + rect.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY

      const distanceX = mouseX - cardX
      const distanceY = mouseY - cardY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      const threshold = 350 // radius of influence
      if (distance < threshold) {
        // Calculate tilt angles based on proximity
        const tiltX = (distanceY / threshold) * -12 // max 12 deg
        const tiltY = (distanceX / threshold) * 12  // max 12 deg
        
        // Calculate translation pull
        const pullX = (distanceX / threshold) * 18  // max 18px translation
        const pullY = (distanceY / threshold) * 18

        gsap.to(card, {
          x: pullX,
          y: pullY,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        // Out of range, spring-reset
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.4)',
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`opacity-0 flex-shrink-0 relative ${className}`}
      aria-hidden="false"
    >
      {/* Editorial photo frame with offset backing card */}
      <div className="relative inline-block animate-float">
        <div ref={cardRef} className="relative transform-style-3d">
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
          {/* Floating badge — availability status */}
          <div
            className="availability-badge absolute -bottom-3 -right-3 flex items-center gap-2 bg-[#fcfaf7] dark:bg-[#1e1b19] border border-[#111111]/8 dark:border-[#e5ded4]/12 rounded-full px-3 py-1.5 shadow-md z-10 w-fit"
          >
            <span className="tooltip">Available for freelance/full-time</span>
            <div className="flex items-center gap-[2px] h-3.5 w-3 justify-center" aria-hidden="true">
              <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-1" />
              <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-2" />
              <span className="w-[2px] bg-[#7C3AED] rounded-full animate-signal-3" />
            </div>
            <span className="text-[10px] font-mono text-[#111111] dark:text-[#e5ded4] font-semibold tracking-wide">
              {profile.availabilityLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

HeroAvatar.displayName = 'HeroAvatar'
