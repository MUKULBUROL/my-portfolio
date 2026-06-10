'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { twMerge } from 'tailwind-merge'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  range?: number
  speed?: number
}

export function MagneticButton({
  children,
  className,
  range = 35,
  speed = 0.8,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // QuickTo for high-performance updates directly mapping to styles
    const xTo = gsap.quickTo(button, 'x', { duration: speed, ease: 'power3.out' })
    const yTo = gsap.quickTo(button, 'y', { duration: speed, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = button.getBoundingClientRect()
      
      const x = clientX - (rect.left + rect.width / 2)
      const y = clientY - (rect.top + rect.height / 2)

      const distance = Math.hypot(x, y)
      const activeRange = Math.max(rect.width, rect.height) / 2 + range

      if (distance < activeRange) {
        xTo(x * 0.4)
        yTo(y * 0.4)
      } else {
        xTo(0)
        yTo(0)
      }
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [range, speed])

  return (
    <button
      ref={buttonRef}
      className={twMerge(
        'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors select-none duration-200 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
