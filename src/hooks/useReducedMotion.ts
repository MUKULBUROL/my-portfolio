'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const initialCheck = () => setPrefersReduced(mediaQuery.matches)
    const rafId = requestAnimationFrame(initialCheck)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => {
      cancelAnimationFrame(rafId)
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return prefersReduced
}
