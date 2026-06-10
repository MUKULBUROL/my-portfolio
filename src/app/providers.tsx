'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (prefersReduced) {
      // Disable smooth scroll and keep GSAP animations minimal
      gsap.globalTimeline.timeScale(10)
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis')
    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
      ScrollTrigger.killAll()
      document.documentElement.classList.remove('lenis', 'custom-cursor-active')
    }
  }, [prefersReduced])

  return <>{children}</>
}
