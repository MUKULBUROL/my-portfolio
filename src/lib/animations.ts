import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Single element reveal on scroll entry.
 */
export function revealOnScroll(
  el: Element | null,
  options: { from?: gsap.TweenVars; to?: gsap.TweenVars; start?: string } = {}
) {
  if (!el) return
  const {
    from = { y: 40, opacity: 0 },
    to = { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    start = 'top 80%',
  } = options

  return gsap.fromTo(el, from, {
    ...to,
    scrollTrigger: {
      trigger: el,
      start,
      once: true,
    },
  })
}

