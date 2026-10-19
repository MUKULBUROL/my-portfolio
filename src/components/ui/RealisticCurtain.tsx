'use client'

import React, { useEffect, useState, useRef, useCallback, useSyncExternalStore } from 'react'
import { useUI } from '@/context/UIContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { WebGLCurtainScene } from '@/lib/curtain/webglCurtain'

// Exact cubic-bezier evaluator for smooth, natural motion without bounce
function cubicBezier(t: number, p1x = 0.4, p1y = 0.0, p2x = 0.2, p2y = 1.0): number {
  let s = t
  for (let i = 0; i < 5; i++) {
    const currentX = 3 * (1 - s) * (1 - s) * s * p1x + 3 * (1 - s) * s * s * p2x + s * s * s - t
    const currentSlope =
      3 * (1 - s) * (1 - s) * p1x + 6 * (1 - s) * s * (p2x - p1x) + 3 * s * s * (1 - p2x)
    if (Math.abs(currentSlope) < 1e-5) break
    s -= currentX / currentSlope
    s = Math.max(0, Math.min(1, s))
  }
  return 3 * (1 - s) * (1 - s) * s * p1y + 3 * (1 - s) * s * s * p2y + s * s * s
}

// Session store for first-time visitor check
let dismissedListeners: Array<() => void> = []
function notifyDismissed() {
  dismissedListeners.forEach((l) => l())
}

function subscribeDismissed(callback: () => void) {
  dismissedListeners.push(callback)
  return () => {
    dismissedListeners = dismissedListeners.filter((l) => l !== callback)
  }
}

function getInitialCurtainDismissedSnapshot() {
  if (typeof window === 'undefined') return true
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('curtain') === 'true' || urlParams.get('curtain') === '1') {
    return false
  }
  return sessionStorage.getItem('mk_curtain_revealed') === 'true'
}

function getServerCurtainDismissedSnapshot() {
  return true
}

const UI_TEXT_COLOR = '#FFF7E8'

export function RealisticCurtain() {
  const { isCurtainActive, dismissCurtain } = useUI()
  const prefersReduced = useReducedMotion()

  const isSessionDismissed = useSyncExternalStore(
    subscribeDismissed,
    getInitialCurtainDismissedSnapshot,
    getServerCurtainDismissedSnapshot
  )

  const [hasFinishedAnimation, setHasFinishedAnimation] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  // Direct DOM references to keep frame-by-frame updates outside React state
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sceneRef = useRef<WebGLCurtainScene | null>(null)
  const centerUIRef = useRef<HTMLDivElement | null>(null)
  const headerLabelRef = useRef<HTMLDivElement | null>(null)
  const skipBtnRef = useRef<HTMLButtonElement | null>(null)

  // Animation lifecycle refs
  const idleFrameRef = useRef<number | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const mountTimeRef = useRef<number>(0)
  const isOpeningRef = useRef(false)
  const heroAnimatedRef = useRef(false)
  const isPausedRef = useRef(false)

  const isVisible = (!isSessionDismissed || isCurtainActive) && !hasFinishedAnimation && !prefersReduced

  // Helper to safely restore hero elements to normal state
  const restoreHeroElements = useCallback(() => {
    if (typeof document === 'undefined') return
    const heroEls = document.querySelectorAll<HTMLElement>('[data-hero-reveal]')
    heroEls.forEach((el) => {
      el.style.opacity = ''
      el.style.transform = ''
      el.style.transition = ''
      el.style.willChange = ''
    })
  }, [])

  // Helper to prime hero elements for reveal ONLY if curtain has initialized
  const primeHeroElements = useCallback(() => {
    if (typeof document === 'undefined') return
    const heroEls = document.querySelectorAll<HTMLElement>('[data-hero-reveal]')
    heroEls.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'
      el.style.willChange = 'opacity, transform'
    })
  }, [])

  // Lock and unlock scroll + set inert on underlying content
  const lockScrollAndInert = useCallback(() => {
    if (typeof document === 'undefined') return
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const main = document.getElementById('main-content')
    const nav = document.querySelector('header')
    main?.setAttribute('inert', '')
    nav?.setAttribute('inert', '')

    const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis
    lenis?.stop()
  }, [])

  const unlockScrollAndRemoveInert = useCallback(() => {
    if (typeof document === 'undefined') return
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''

    const main = document.getElementById('main-content')
    const nav = document.querySelector('header')
    main?.removeAttribute('inert')
    nav?.removeAttribute('inert')

    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis
    lenis?.start()

    // Restore focus to main heading without scrolling
    const heading = document.querySelector('h1') as HTMLElement | null
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }

    // Reset underlying page scale to 1.0
    if (main) {
      main.style.transform = 'scale(1)'
      main.style.transition = 'transform 0.3s ease-out'
    }

    restoreHeroElements()
  }, [restoreHeroElements])

  // Sync scroll lock and inert with visibility
  useEffect(() => {
    if (isVisible) {
      lockScrollAndInert()
      const main = document.getElementById('main-content')
      if (main) {
        main.style.transform = 'scale(0.99)'
        main.style.transformOrigin = 'center center'
      }
    } else {
      unlockScrollAndRemoveInert()
    }
  }, [isVisible, lockScrollAndInert, unlockScrollAndRemoveInert])

  // Reset state on replay trigger
  const prevCurtainActiveRef = useRef(isCurtainActive)
  useEffect(() => {
    if (isCurtainActive && !prevCurtainActiveRef.current) {
      setHasFinishedAnimation(false)
      setIsOpening(false)
      isOpeningRef.current = false
      heroAnimatedRef.current = false
      mountTimeRef.current = performance.now()

      if (centerUIRef.current) centerUIRef.current.style.opacity = '1'
      if (headerLabelRef.current) headerLabelRef.current.style.opacity = '1'
      if (skipBtnRef.current) skipBtnRef.current.style.opacity = '1'

      if (sceneRef.current) {
        sceneRef.current.setProgress(0)
      }
    }
    prevCurtainActiveRef.current = isCurtainActive
  }, [isCurtainActive])

  // Skip Intro Handler (Escape key or Skip button)
  const handleSkip = useCallback(() => {
    if (hasFinishedAnimation) return

    if (idleFrameRef.current) {
      cancelAnimationFrame(idleFrameRef.current)
      idleFrameRef.current = null
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }

    try {
      sessionStorage.setItem('mk_curtain_revealed', 'true')
    } catch {}

    setHasFinishedAnimation(true)
    setIsOpening(false)
    isOpeningRef.current = false
    restoreHeroElements()
    notifyDismissed()
    dismissCurtain()
    unlockScrollAndRemoveInert()
  }, [hasFinishedAnimation, dismissCurtain, unlockScrollAndRemoveInert, restoreHeroElements])

  // Opening Choreography Timeline (Single coordinated sequence)
  const handleStartOpening = useCallback(() => {
    if (isOpeningRef.current || hasFinishedAnimation) return
    isOpeningRef.current = true
    setIsOpening(true)

    // Stop idle motion loop immediately
    if (idleFrameRef.current) {
      cancelAnimationFrame(idleFrameRef.current)
      idleFrameRef.current = null
    }

    // Reduced motion bypass
    if (prefersReduced) {
      handleSkip()
      return
    }

    try {
      sessionStorage.setItem('mk_curtain_revealed', 'true')
    } catch {}

    startTimeRef.current = performance.now()
    heroAnimatedRef.current = false

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current

      // 1. Fade central UI and header controls over the first 120ms
      const textAlpha = Math.max(0, 1 - elapsed / 120)
      if (centerUIRef.current) centerUIRef.current.style.opacity = String(textAlpha)
      if (headerLabelRef.current) headerLabelRef.current.style.opacity = String(textAlpha)
      if (skipBtnRef.current) skipBtnRef.current.style.opacity = String(textAlpha)

      // 2. Open and gather curtains over approx 1300ms
      const drawDuration = 1300
      const rawP = Math.min(1.0, elapsed / drawDuration)
      const easedP = cubicBezier(rawP, 0.4, 0.0, 0.2, 1.0)

      // 3. One restrained settling motion near the end (1050ms to 1300ms, single half-pulse)
      let settleTime = 0
      if (elapsed >= 1050 && elapsed <= 1300) {
        settleTime = (elapsed - 1050) / 250
      }

      // Update WebGL scene directly outside React state
      if (sceneRef.current) {
        sceneRef.current.setProgress(easedP, settleTime)
      }

      // 4. Hero Reveal: As opening exposes the hero (around 450ms / 25% parted),
      // animate heading, supporting text, visual, and buttons from opacity 0 and translateY(8px)
      // over 280ms with 60ms stagger.
      if (elapsed >= 450 && !heroAnimatedRef.current) {
        heroAnimatedRef.current = true
        const heroEls = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-reveal]'))
        heroEls.forEach((el, index) => {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'translateY(0px)' },
            ],
            {
              duration: 280,
              delay: index * 60,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'forwards',
            }
          )
        })
      }

      // Scale underlying page subtly from 0.99 to 1.0
      const main = document.getElementById('main-content')
      if (main) {
        const pageScale = 0.99 + easedP * 0.01
        main.style.transform = `scale(${pageScale})`
      }

      // 5. Completion: Finished by 1350ms (clean unmount)
      if (elapsed < 1350) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        restoreHeroElements()
        setHasFinishedAnimation(true)
        setIsOpening(false)
        isOpeningRef.current = false
        notifyDismissed()
        dismissCurtain()
        unlockScrollAndRemoveInert()
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [hasFinishedAnimation, prefersReduced, handleSkip, dismissCurtain, unlockScrollAndRemoveInert, restoreHeroElements])

  // Initialize WebGL Scene, Idle Motion Loop & Visibility Handling
  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const scene = new WebGLCurtainScene({
      canvas,
      isMobile,
      textureUrl: '/curtain-velvet.jpg',
    })

    if (!scene.isSupported) {
      setWebglSupported(false)
      return
    }

    sceneRef.current = scene
    mountTimeRef.current = performance.now()

    // Prime hero elements for the eventual coordinated reveal
    primeHeroElements()

    // Idle animation loop: 5-7 second slow cycle, anchored top, 2-4px bottom displacement
    const renderIdleLoop = (now: number) => {
      if (!isOpeningRef.current && sceneRef.current) {
        if (!isPausedRef.current) {
          const timeSec = (now - mountTimeRef.current) / 1000
          sceneRef.current.setIdleTime(timeSec)
        }
        idleFrameRef.current = requestAnimationFrame(renderIdleLoop)
      }
    }
    idleFrameRef.current = requestAnimationFrame(renderIdleLoop)

    // Pause rendering when document is hidden
    const handleVisibilityChange = () => {
      isPausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const handleResize = () => {
      scene.setMobile(window.innerWidth < 768)
      scene.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      if (idleFrameRef.current) {
        cancelAnimationFrame(idleFrameRef.current)
        idleFrameRef.current = null
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      scene.destroy()
      sceneRef.current = null
      restoreHeroElements()
    }
  }, [isVisible, prefersReduced, handleSkip, primeHeroElements, restoreHeroElements])

  // Keyboard accessibility: Escape to skip, Space/Enter to start
  useEffect(() => {
    if (!isVisible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleSkip()
      } else if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target as HTMLElement | null
        if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT')) return
        e.preventDefault()
        handleStartOpening()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, handleSkip, handleStartOpening])

  // Double-tap or double-click to open
  useEffect(() => {
    if (!isVisible) return

    let lastTap = 0
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button') || target?.closest('a')) return

      const now = performance.now()
      if (now - lastTap < 300) {
        handleStartOpening()
      }
      lastTap = now
    }

    window.addEventListener('click', handleTap)
    window.addEventListener('touchend', handleTap, { passive: true })
    return () => {
      window.removeEventListener('click', handleTap)
      window.removeEventListener('touchend', handleTap)
    }
  }, [isVisible, handleStartOpening])

  // If already opened and unmounted, render nothing
  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curtain Introduction"
      className="fixed inset-0 z-[999999] overflow-hidden select-none"
    >
      {/* ======================================================== */}
      {/* 1. WEBGL CANVAS LAYER (Velvet Photo Texture Drapery)     */}
      {/* ======================================================== */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />
      ) : (
        /* ====================================================== */
        /* CSS TWO-PANEL FALLBACK (Still fabric, no mesh deform)  */
        /* ====================================================== */
        <div className="absolute inset-0 w-full h-full pointer-events-none flex overflow-hidden">
          {/* Left Panel */}
          <div
            className="w-1/2 h-full origin-left transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: "url('/curtain-velvet.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              transform: isOpening ? 'translateX(-100%) scaleX(0.2)' : 'translateX(0) scaleX(1)',
            }}
          />
          {/* Right Panel */}
          <div
            className="w-1/2 h-full origin-right transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: "url('/curtain-velvet.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              transform: isOpening ? 'translateX(100%) scaleX(0.2)' : 'translateX(0) scaleX(1)',
            }}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. RESTRAINED HTML UI LAYER (Upper corners & Centered UI)*/}
      {/* ======================================================== */}

      {/* Upper-Left: Small "Mukul Kumar" label */}
      <div
        ref={headerLabelRef}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold pointer-events-none transition-opacity duration-150"
        style={{ color: UI_TEXT_COLOR, opacity: 1 }}
      >
        Mukul Kumar
      </div>

      {/* Upper-Right: "Skip intro" button */}
      <button
        ref={skipBtnRef}
        type="button"
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 font-mono text-xs uppercase tracking-wider px-3.5 py-2 border transition-all duration-150 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF7E8] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{
          color: UI_TEXT_COLOR,
          borderColor: `${UI_TEXT_COLOR}50`,
          backgroundColor: 'transparent',
          opacity: 1,
        }}
      >
        <span>Skip intro</span>
      </button>

      {/* Centered Content: "A little introduction." & "Enter portfolio" */}
      <div
        ref={centerUIRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none transition-opacity duration-120"
        style={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center text-center pointer-events-auto">
          {/* Subtle heading */}
          <p
            className="font-heading font-medium text-xl sm:text-2xl md:text-3xl tracking-tight mb-6"
            style={{ color: UI_TEXT_COLOR }}
          >
            A little introduction.
          </p>

          {/*
            Polished Enter Button:
            - Dimensions: 180 × 48 px preserved
            - Hover: translate upward by 2px, transition background fill over 180ms
            - Focus: clear focus outline
            - Press: scale to 0.98 briefly
            - Label: stable, does not move independently
          */}
          <button
            type="button"
            onClick={handleStartOpening}
            className="w-[180px] h-[48px] border-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer min-w-[44px] min-h-[44px] hover:-translate-y-[2px] hover:bg-[#FFF7E8] hover:text-[#121212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF7E8] focus-visible:ring-offset-4 focus-visible:ring-offset-black active:scale-[0.98] active:-translate-y-[2px] transition-[transform,background-color,color,box-shadow] duration-[180ms] ease-out active:duration-75"
            style={{
              color: UI_TEXT_COLOR,
              borderColor: UI_TEXT_COLOR,
              backgroundColor: 'transparent',
              boxShadow: `0 4px 16px rgba(0,0,0,0.35)`,
            }}
          >
            Enter portfolio
          </button>
        </div>
      </div>
    </div>
  )
}
