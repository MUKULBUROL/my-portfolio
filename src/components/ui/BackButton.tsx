'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/#work')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="brutal-btn inline-flex items-center gap-2 px-4 py-2 bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs font-bold uppercase tracking-wider mb-8 cursor-pointer"
      aria-label="Back to selected work"
    >
      <ArrowLeft size={14} />
      <span>Back to Work</span>
    </button>
  )
}
