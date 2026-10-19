// src/lib/soundEffects.ts
/**
 * Soothing Musical Click Synthesizer (Web Audio API)
 *
 * Rotates through 3 harmonious musical click notes:
 * 1. Warm Kalimba / Bamboo Bell (C5 - 523.25 Hz)
 * 2. Crystal Dewdrop / Glass Chime (E5 - 659.25 Hz)
 * 3. Zen Marimba / Wooden Resonance (G5 - 783.99 Hz)
 *
 * Forms a calming C-Major triad (C - E - G) that feels tactile,
 * gentle, and musical without requiring external audio files.
 */

type SoundProfile = {
  name: string
  note: string
  frequency: number
  type: 'kalimba' | 'dewdrop' | 'marimba'
}

const SOUND_PROFILES: SoundProfile[] = [
  { name: 'Warm Kalimba', note: 'C5', frequency: 523.25, type: 'kalimba' },
  { name: 'Crystal Dewdrop', note: 'E5', frequency: 659.25, type: 'dewdrop' },
  { name: 'Zen Marimba', note: 'G5', frequency: 783.99, type: 'marimba' },
]

class SoundManager {
  private ctx: AudioContext | null = null
  private currentIndex = 0
  private muted = false
  private listeners: Set<(muted: boolean) => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('portfolio_sound_enabled')
        // Default to muted / OFF unless user explicitly enabled it
        this.muted = stored !== 'true'
      } catch {
        this.muted = true
      }
    } else {
      this.muted = true
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }

    return this.ctx
  }

  public isMuted(): boolean {
    return this.muted
  }

  public setMuted(muted: boolean) {
    this.muted = muted
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_sound_enabled', muted ? 'false' : 'true')
      } catch {}
    }
    this.listeners.forEach((listener) => listener(this.muted))
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted)
    return this.muted
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public getCurrentIndex(): number {
    return this.currentIndex
  }

  /**
   * Plays the next sound in the 3-note soothing rotation.
   * Advances the index so consecutive clicks create an arpeggiated musical pattern.
   */
  public playRotatingClick(): void {
    if (this.muted) return

    const profile = SOUND_PROFILES[this.currentIndex]
    this.currentIndex = (this.currentIndex + 1) % SOUND_PROFILES.length

    this.playSound(profile)
  }

  /**
   * Direct synthesis of each soothing sound profile
   */
  public playSound(profile: SoundProfile): void {
    if (this.muted) return

    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime

      // Add tiny subtle organic pitch drift (±1%) so rapid clicks sound alive, not robotic
      const pitchDrift = 1 + (Math.random() * 0.02 - 0.01)
      const baseFreq = profile.frequency * pitchDrift

      switch (profile.type) {
        case 'kalimba': {
          // Warm wooden/tine click: C5 fundamental + short strike overtone
          const osc1 = ctx.createOscillator()
          const osc2 = ctx.createOscillator()
          const gain = ctx.createGain()

          osc1.type = 'sine'
          osc1.frequency.setValueAtTime(baseFreq, now)

          // Soft strike harmonic
          osc2.type = 'triangle'
          osc2.frequency.setValueAtTime(baseFreq * 2.01, now)

          const strikeGain = ctx.createGain()
          strikeGain.gain.setValueAtTime(0.04, now)
          strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

          gain.gain.setValueAtTime(0.09, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

          osc1.connect(gain)
          osc2.connect(strikeGain)
          strikeGain.connect(gain)
          gain.connect(ctx.destination)

          osc1.start(now)
          osc2.start(now)
          osc1.stop(now + 0.09)
          osc2.stop(now + 0.03)
          break
        }

        case 'dewdrop': {
          // Glass dewdrop: subtle micro upward pitch-bend for an airy, refreshing pop
          const osc = ctx.createOscillator()
          const filter = ctx.createBiquadFilter()
          const gain = ctx.createGain()

          osc.type = 'sine'
          osc.frequency.setValueAtTime(baseFreq * 0.94, now)
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.05, now + 0.025)
          osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.08)

          filter.type = 'bandpass'
          filter.frequency.setValueAtTime(baseFreq, now)
          filter.Q.setValueAtTime(2, now)

          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

          osc.connect(filter)
          filter.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.1)
          break
        }

        case 'marimba': {
          // Resonant wooden marimba: warm triangle with low-pass dampening
          const osc = ctx.createOscillator()
          const filter = ctx.createBiquadFilter()
          const gain = ctx.createGain()

          osc.type = 'triangle'
          osc.frequency.setValueAtTime(baseFreq, now)

          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(1400, now)
          filter.frequency.exponentialRampToValueAtTime(300, now + 0.08)

          gain.gain.setValueAtTime(0.085, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.095)

          osc.connect(filter)
          filter.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.095)
          break
        }
      }
    } catch {
      // Audio autoplay policy fallback or unmounted context
    }
  }

  /**
   * Realistic Velvet Fabric Whoosh Synthesizer
   * Simulates the friction and air displacement of heavy theatrical velvet
   * parting across a stage track.
   */
  public playCurtainWhoosh(): void {
    if (this.muted) return

    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime
      const duration = 1.1
      const sampleRate = ctx.sampleRate
      const bufferSize = Math.floor(sampleRate * duration)
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate)
      const output = noiseBuffer.getChannelData(0)

      // Pinkish/velvet filtered noise generator
      let b0 = 0, b1 = 0, b2 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        output[i] = (b0 + b1 + b2) * 0.25
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer

      // Resonant bandpass filter sweeping downward like dragging fabric
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.Q.setValueAtTime(1.8, now)
      filter.frequency.setValueAtTime(750, now)
      filter.frequency.exponentialRampToValueAtTime(180, now + duration)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.16, now + 0.18)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      whiteNoise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      whiteNoise.start(now)
      whiteNoise.stop(now + duration)
    } catch {
      // Ignored for autoplay policy
    }
  }

  /**
   * Welcoming Harmonic Curtain Reveal Chime
   * Plays a delicate, resonant major chord that marks the unveil of the stage.
   */
  public playCurtainChime(): void {
    if (this.muted) return

    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime
      const freqs = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      const chordGain = ctx.createGain()
      chordGain.gain.setValueAtTime(0.001, now)
      chordGain.gain.linearRampToValueAtTime(0.08, now + 0.05)
      chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4)
      chordGain.connect(ctx.destination)

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now)

        const oscGain = ctx.createGain()
        oscGain.gain.setValueAtTime(0.05 / (idx + 1), now)
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1)

        osc.connect(oscGain)
        oscGain.connect(chordGain)

        osc.start(now + idx * 0.03)
        osc.stop(now + 1.4)
      })
    } catch {}
  }
}

export const soundEffects = new SoundManager()
