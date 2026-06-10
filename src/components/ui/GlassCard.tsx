import React from 'react'
import { twMerge } from 'tailwind-merge'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowColor?: 'purple' | 'cyan' | 'green' | 'none'
  hoverEffect?: boolean
}

export function GlassCard({
  children,
  className,
  glowColor = 'none',
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  void glowColor;
  return (
    <div
      className={twMerge(
        'bg-[#fcfaf7] border border-[#111111]/8 rounded-2xl relative overflow-hidden transition-all duration-300',
        hoverEffect && 'hover:border-[#111111]/15 hover:shadow-[0_4px_20px_rgba(17,17,17,0.02)]',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}

