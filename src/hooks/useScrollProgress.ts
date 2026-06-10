'use client'

import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress(totalHeight > 0 ? scrolled / totalHeight : 0)

      // Detect active section via IntersectionObserver logic
      const sectionIds = ['hero', 'about', 'projects', 'skills', 'thinking', 'journey', 'contact']
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, activeSection }
}
