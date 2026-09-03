'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    // If there is a previous history entry in this session, go back to it
    // (preserves scroll position in the horizontal reel).
    // Otherwise fall back to the home page selected-work anchor.
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/#selected-work')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-[10px] font-mono text-[#6b6b6b] hover:text-[#111111] uppercase tracking-[0.2em] mb-12 group transition-colors cursor-pointer"
      aria-label="Back to selected work"
    >
      <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
      <span>Back to Selected Work</span>
    </button>
  )
}
