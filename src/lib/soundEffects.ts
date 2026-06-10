'use client'

// ============================================================
// Web Audio API Sound Synthesizer for UI Feedback
// Programmatic audio generation — no external audio assets needed.
// ============================================================

let isMutedGlobal = false

if (typeof window !== 'undefined') {
  isMutedGlobal = localStorage.getItem('portfolio-muted') === 'true'
}

export function isMuted(): boolean {
  return isMutedGlobal
}

export function setMuted(muted: boolean) {
  isMutedGlobal = muted
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-muted', String(muted))
  }
}

// Helper to safely initialize and get AudioContext
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioCtxClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtxClass) return null
  return new AudioCtxClass()
}

// 1. playIntroStart: Soft ambient sine chime (A3 -> E4 chord)
export async function playIntroStart() {
  if (isMutedGlobal) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const now = ctx.currentTime

    // Create soft sine oscillator for a warm ambient swell
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(220, now) // A3
    osc.frequency.exponentialRampToValueAtTime(329.63, now + 1.2) // E4

    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.3) // soft swell
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8) // slow fade

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 2.0)
  } catch {
    // Suppress autoplay blocks or context errors silently
  }
}

// 2. playNameComplete: Crisp, ultra-short high-frequency click
export async function playNameComplete() {
  if (isMutedGlobal) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const now = ctx.currentTime

    // Minimal digital tick (triangle wave at 1600Hz decaying in 40ms)
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1600, now)

    gainNode.gain.setValueAtTime(0.04, now)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.05)
  } catch {
    // Suppress silently
  }
}

// 3. playRoleComplete: Soft double confirm chime (E5 -> A5)
export async function playRoleComplete() {
  if (isMutedGlobal) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const now = ctx.currentTime

    // First blip
    const osc1 = ctx.createOscillator()
    const gainNode1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(659.25, now) // E5
    gainNode1.gain.setValueAtTime(0.03, now)
    gainNode1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
    osc1.connect(gainNode1)
    gainNode1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.1)

    // Second blip (offset by 80ms)
    const osc2 = ctx.createOscillator()
    const gainNode2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(880.00, now + 0.08) // A5
    gainNode2.gain.setValueAtTime(0.03, now + 0.08)
    gainNode2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
    osc2.connect(gainNode2)
    gainNode2.connect(ctx.destination)
    osc2.start(now + 0.08)
    osc2.stop(now + 0.2)
  } catch {
    // Suppress silently
  }
}
