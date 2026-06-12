'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeaderProps {
  eyebrow: string
  eyebrowNumber?: string
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  eyebrowNumber,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const titleEl = titleRef.current
    if (!titleEl) return

    // Split title into characters for reveal
    const chars = title.split('')
    titleEl.innerHTML = chars.map(char =>
      char === ' ' ? ' ' : `<span class="inline-block section-char">${char}</span>`
    ).join('')

    // Animate characters on scroll
    const charEls = titleEl.querySelectorAll('.section-char')
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleEl,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        onEnter: () => setIsActive(true),
        onLeaveBack: () => setIsActive(false),
      },
    })

    tl.from(charEls, {
      opacity: 0,
      y: 20,
      rotateX: -45,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power3.out',
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [title])

  return (
    <div className={cn('mb-14 md:mb-20', align === 'center' && 'text-center', className)}>
      <div className={cn('flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}>
        {eyebrowNumber && (
          <span className="text-[10px] font-mono text-[#111111]/60 tabular-nums">
            {eyebrowNumber}
          </span>
        )}
        <span className="h-px w-6 bg-[#111111]/20" aria-hidden="true" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b6b6b]">
          {eyebrow}
        </span>
      </div>
      <h2
        ref={titleRef}
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111111] leading-tight tracking-tight',
          'section-header-underline',
          isActive && 'active'
        )}
      />
      {subtitle && (
        <p className={cn('mt-4 text-[#6b6b6b] text-sm sm:text-base leading-relaxed max-w-2xl', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
