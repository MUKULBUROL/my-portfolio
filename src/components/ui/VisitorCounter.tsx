'use client'

import React, { useEffect, useState } from 'react'

interface VisitorStats {
  totalViews: number
  uniqueVisitors: number
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const end = value
    if (end === 0) {
      return
    }

    const duration = 1.2 // seconds
    const totalFrames = 60 * duration
    let frame = 0

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      // Ease out quad
      const ease = progress * (2 - progress)
      const current = Math.round(ease * end)
      
      setDisplayValue(current)

      if (frame >= totalFrames) {
        clearInterval(counter)
        setDisplayValue(end)
      }
    }, 1000 / 60)

    return () => clearInterval(counter)
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          method: 'POST',
        })
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (err) {
        console.error('Error fetching visitor stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div 
        id="visitor-counter-loader"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/5 animate-pulse text-[10px] font-mono text-[#6b6b6b]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#6b6b6b]/40 animate-ping" />
        <span>Loading stats...</span>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div 
      id="visitor-counter"
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/5 dark:bg-[#e5ded4]/10 border border-[#111111]/10 dark:border-[#e5ded4]/10 transition-all duration-300 hover:border-[#111111]/25 dark:hover:border-[#e5ded4]/25 hover:bg-[#111111]/8 dark:hover:bg-[#e5ded4]/15"
      title="Visitor tracking stats (Unique Visitors / Total Views)"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-[10px] font-mono text-[#6b6b6b] dark:text-[#e5ded4]/80">
        <AnimatedNumber value={stats.uniqueVisitors} /> visitors • <AnimatedNumber value={stats.totalViews} /> views
      </span>
    </div>
  )
}
