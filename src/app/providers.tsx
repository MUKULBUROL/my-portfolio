'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { UIProvider } from '@/context/UIContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (prefersReduced) {
      gsap.globalTimeline.timeScale(10)
      return
    }

    const lenis = new Lenis({
      duration: 1.0,
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
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis
      lenis.destroy()
      gsap.ticker.remove(ticker)
      ScrollTrigger.killAll()
      document.documentElement.classList.remove('lenis')
    }
  }, [prefersReduced])

  return <UIProvider>{children}</UIProvider>
}
