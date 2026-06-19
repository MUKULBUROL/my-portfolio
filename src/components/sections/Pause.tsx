'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Pause() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const elements = containerRef.current?.querySelectorAll('.quote-line')
    if (!elements || elements.length === 0) return

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 })
      return
    }

    const anim = gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [prefersReducedMotion])

  return (
    <section id="pause" className="py-40 md:py-52 bg-[#f5efe8] relative overflow-hidden select-none" aria-label="Philosophy">
      <div ref={containerRef} className="max-w-4xl mx-auto px-8 md:px-16 flex flex-col justify-center min-h-[30vh]">
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="quote-line text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] text-[#111111] max-w-3xl opacity-0">
            I believe software should feel effortless.
          </p>
          <p className="quote-line text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] text-[#6b6b6b]/70 max-w-3xl pl-4 sm:pl-8 border-l border-[#111111]/15 opacity-0">
            The best systems disappear.
          </p>
        </div>
      </div>
    </section>
  )
}
