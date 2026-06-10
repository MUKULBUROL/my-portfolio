import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Fade-up reveal with stagger — attach to a container of children.
 */
export function fadeUpStagger(
  container: Element | null,
  childSelector = ':scope > *',
  options: { delay?: number; stagger?: number; duration?: number } = {}
) {
  if (!container) return
  const { delay = 0, stagger = 0.08, duration = 0.7 } = options
  const children = Array.from(container.querySelectorAll(childSelector))
  return gsap.fromTo(
    children,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    }
  )
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

/**
 * Text reveal — splits heading into lines and staggers each.
 */
export function headingReveal(el: HTMLElement | null, delay = 0) {
  if (!el) return
  return gsap.fromTo(
    el,
    { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.0,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    }
  )
}

/**
 * Animate a counter from 0 to target value.
 */
export function animateCounter(
  el: HTMLElement | null,
  target: number,
  suffix = '',
  duration = 1.5
) {
  if (!el) return
  const counter = { value: 0 }
  gsap.to(counter, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(counter.value) + suffix
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  })
}
