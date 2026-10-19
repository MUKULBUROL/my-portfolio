'use client'

import { useEffect } from 'react'
import { soundEffects } from '@/lib/soundEffects'

/**
 * ClickSoundListener
 *
 * Attaches a capture-phase global click listener that plays the rotating
 * soothing musical click whenever the user interacts with buttons, links,
 * tabs, or interactive controls.
 */
export function ClickSoundListener() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Detect interactive elements or elements explicitly marked clickable
      const interactive = target.closest(
        'button, a, input, select, textarea, summary, [role="button"], [role="tab"], [role="switch"], [data-clickable], .cursor-pointer'
      )

      if (interactive) {
        soundEffects.playRotatingClick()
      }
    }

    window.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [])

  return null
}
