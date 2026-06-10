import React from 'react'
import { cn } from '@/lib/utils'

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
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111111] leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-[#6b6b6b] text-sm sm:text-base leading-relaxed max-w-2xl', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
