'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ParsedResumeInfo } from '@/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface UIContextType {
  // Navigation Transition
  isTransitioning: boolean
  transitionProgress: number
  transitionPhase: 'resolve' | 'build' | 'launch'
  targetSection: string | null
  navigateWithTransition: (targetSectionId: string) => void

  // Resume Modal & State
  isResumeOpen: boolean
  openResumeDialog: () => void
  closeResumeDialog: () => void
  parsedResume: ParsedResumeInfo | null
  setParsedResume: (info: ParsedResumeInfo | null) => void
  showResumeBanner: boolean
  dismissResumeBanner: () => void

  // Theatrical Curtain State
  isCurtainActive: boolean
  triggerCurtain: () => void
  dismissCurtain: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  // Target Section State
  const [targetSection, setTargetSection] = useState<string | null>(null)

  // Resume State
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [parsedResume, setParsedResumeState] = useState<ParsedResumeInfo | null>(null)
  const [showResumeBanner, setShowResumeBanner] = useState(false)

  const openResumeDialog = useCallback(() => setIsResumeOpen(true), [])
  const closeResumeDialog = useCallback(() => setIsResumeOpen(false), [])

  const setParsedResume = useCallback((info: ParsedResumeInfo | null) => {
    setParsedResumeState(info)
    if (info) {
      setShowResumeBanner(true)
    }
  }, [])

  const dismissResumeBanner = useCallback(() => {
    setShowResumeBanner(false)
  }, [])

  // Theatrical Curtain State
  const [isCurtainActive, setIsCurtainActive] = useState(false)
  const triggerCurtain = useCallback(() => setIsCurtainActive(true), [])
  const dismissCurtain = useCallback(() => setIsCurtainActive(false), [])

  const scrollToElement = useCallback((targetId: string) => {
    const cleanId = targetId.replace(/^#/, '')
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, opts?: { offset?: number; immediate?: boolean; duration?: number }) => void } }).__lenis

    if (!cleanId || cleanId === 'top' || cleanId === 'hero') {
      if (lenis) {
        lenis.scrollTo(0, { immediate: prefersReduced, duration: 1.0 })
      } else {
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
      }
      return
    }

    const element = document.getElementById(cleanId)
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -70, immediate: prefersReduced, duration: 1.0 })
      } else {
        element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      }
    }
  }, [prefersReduced])

  const navigateWithTransition = useCallback((targetSectionId: string) => {
    setTargetSection(targetSectionId)
    scrollToElement(targetSectionId)
  }, [scrollToElement])

  return (
    <UIContext.Provider
      value={{
        isTransitioning: false,
        transitionProgress: 0,
        transitionPhase: 'resolve',
        targetSection,
        navigateWithTransition,
        isResumeOpen,
        openResumeDialog,
        closeResumeDialog,
        parsedResume,
        setParsedResume,
        showResumeBanner,
        dismissResumeBanner,
        isCurtainActive,
        triggerCurtain,
        dismissCurtain,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
