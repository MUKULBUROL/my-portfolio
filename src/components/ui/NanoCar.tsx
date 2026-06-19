'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

/* ─── dimensions ─────────────────────────────────────────────────────────── */
const CAR_W = 84   // SVG width in px
const CAR_H = 44   // SVG height in px (includes full wheel radius + shadow)

interface NanoCarProps {
  activeTab: number
  tabCount: number
  tabColors: string[]
  /** Fires the instant the user clicks — move the pill ahead of time */
  onDriveStart: (nextTab: number) => void
  /** Fires after the car arrives — change content */
  onArrival: (nextTab: number) => void
}

/* ─── Horizontal side-profile car (faces RIGHT) ─────────────────────────── */
/* Rear wheel centre: cx=19, cy=33   Front wheel centre: cx=65, cy=33       */
function CarSVG({
  color,
  rearRef,
  frontRef,
}: {
  color: string
  rearRef: React.RefObject<SVGGElement | null>
  frontRef: React.RefObject<SVGGElement | null>
}) {
  return (
    <svg
      viewBox="0 0 84 44"
      width={CAR_W}
      height={CAR_H}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {/* Ground shadow */}
      <ellipse cx="42" cy="43" rx="30" ry="2" fill="#00000018" />

      {/* ── Main body shell ── */}
      <path
        d="M8,29 L8,18 Q10,12 18,10 L32,5 Q44,1 58,3 L73,8 Q82,12 82,18 L82,29 Z"
        fill={color}
      />
      {/* Underbody / side skirt */}
      <rect x="8" y="27" width="74" height="7" rx="3" fill="#0d0515" />

      {/* ── Cockpit glass ── */}
      <path d="M20,10 L33,5 Q44,1 56,3 L70,10 Z" fill="#150a24" />
      <path d="M24,10 L36,5.5 Q44,2.5 54,4 L65,10 Z" fill="#ffffff1a" />

      {/* ── Rear spoiler (left = back) ── */}
      <rect x="3"  y="7"  width="4"  height="10" rx="1.5" fill={color} />
      <rect x="1"  y="7"  width="10" height="3"  rx="1.5" fill={color} />
      <rect x="2"  y="9"  width="8"  height="1.5" rx="0.75" fill="#00000020" />

      {/* ── Exhaust pipes ── */}
      <rect x="7"  y="30" width="3" height="5" rx="1" fill="#555" />
      <rect x="11" y="30" width="3" height="5" rx="1" fill="#555" />

      {/* ── Headlights (front = right) ── */}
      <rect x="80" y="15" width="4" height="5"   rx="2"    fill="#ffffffee" />
      <rect x="80" y="15" width="4" height="5"   rx="2"    fill={color} opacity="0.45" />
      <rect x="79" y="21" width="5" height="1.5" rx="0.75" fill={color} opacity="0.6" />

      {/* ── Tail lights (back = left) ── */}
      <rect x="5" y="15" width="4" height="8" rx="2" fill="#ff3333" />
      <rect x="5" y="15" width="4" height="8" rx="2" fill="#ff6666" opacity="0.35" />

      {/* ── Side accent trim ── */}
      <path d="M12,23 L78,23" stroke={color} strokeWidth="0.8" opacity="0.22" />

      {/* ── Hood air vent ── */}
      <rect x="70" y="10" width="9" height="1.5" rx="0.75" fill={color} opacity="0.4" />

      {/* ── Neon underglow ── */}
      <rect x="18" y="34" width="48" height="1.5" rx="0.75" fill={color} opacity="0.65" />

      {/* ══ Rear wheel  cx=19  cy=33  r=9 ══ */}
      {/*   NOTE: no style on <g> — GSAP uses svgOrigin to spin correctly   */}
      <g ref={rearRef as React.RefObject<SVGGElement>}>
        <circle cx="19" cy="33" r="9"   fill="#111" />
        <circle cx="19" cy="33" r="5.5" fill="#252525" />
        <circle cx="19" cy="33" r="2"   fill="#4a4a4a" />
        {/* 4 main spokes */}
        <line x1="19" y1="25"   x2="19" y2="41"   stroke="#383838" strokeWidth="1.5" />
        <line x1="11" y1="33"   x2="27" y2="33"   stroke="#383838" strokeWidth="1.5" />
        {/* 4 diagonal spokes */}
        <line x1="13.3" y1="27.3" x2="24.7" y2="38.7" stroke="#383838" strokeWidth="1.2" />
        <line x1="24.7" y1="27.3" x2="13.3" y2="38.7" stroke="#383838" strokeWidth="1.2" />
      </g>

      {/* ══ Front wheel  cx=65  cy=33  r=9 ══ */}
      <g ref={frontRef as React.RefObject<SVGGElement>}>
        <circle cx="65" cy="33" r="9"   fill="#111" />
        <circle cx="65" cy="33" r="5.5" fill="#252525" />
        <circle cx="65" cy="33" r="2"   fill="#4a4a4a" />
        {/* 4 main spokes */}
        <line x1="65" y1="25"   x2="65" y2="41"   stroke="#383838" strokeWidth="1.5" />
        <line x1="57" y1="33"   x2="73" y2="33"   stroke="#383838" strokeWidth="1.5" />
        {/* 4 diagonal spokes */}
        <line x1="59.3" y1="27.3" x2="70.7" y2="38.7" stroke="#383838" strokeWidth="1.2" />
        <line x1="70.7" y1="27.3" x2="59.3" y2="38.7" stroke="#383838" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

/* ─── Steering wheel / U-turn icon ──────────────────────────────────────── */
function SteeringIcon({ color, isReset }: { color: string; isReset: boolean }) {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
      {isReset ? (
        <>
          <circle cx="16" cy="16" r="12.5" fill="none" stroke={color} strokeWidth="2" />
          <path d="M9 11 Q9 5 16 5 Q23 5 23 11 L23 20"
            fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="19,15 23,20 27,15"
            fill="none" stroke={color} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <circle cx="16" cy="16" r="12.5" fill="none" stroke={color} strokeWidth="2.5" />
          <circle cx="16" cy="16" r="3.5" fill={color} />
          <line x1="16" y1="12.5" x2="16" y2="4.5"   stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="19.5" x2="9.5" y2="27"   stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="19.5" x2="22.5" y2="27"  stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export function NanoCar({
  activeTab,
  tabCount,
  tabColors,
  onDriveStart,
  onArrival,
}: NanoCarProps) {
  const trackRef      = useRef<HTMLDivElement>(null)
  const carRef        = useRef<HTMLDivElement>(null)
  const rearWheelRef  = useRef<SVGGElement>(null)
  const frontWheelRef = useRef<SVGGElement>(null)
  const iconBtnRef    = useRef<HTMLButtonElement>(null)

  const isAnimating   = useRef(false)
  const currentCarTab = useRef(activeTab)
  const isOwnChange   = useRef(false)
  const prevActiveTab = useRef(activeTab)

  const isLastTab    = activeTab === tabCount - 1
  const currentColor = tabColors[activeTab] ?? '#7C3AED'

  /* stop-marker positions (centres), recomputed on layout changes */
  const [stopXs, setStopXs] = useState<number[]>([])

  /* ── Core position formula ──────────────────────────────────────────────
   * The track spans the FULL container width (same as the tab strip).
   * Each of the N tabs occupies  W/N  of horizontal space.
   * The car CENTRE at tab i = (i + 0.5) × W/N
   * The car LEFT  at tab i = car_centre − CAR_W/2
   *
   * This guarantees the car halts exactly under each tab label when the
   * tab strip uses flex-1 buttons (equal-width).
   * ─────────────────────────────────────────────────────────────────── */
  const getCarX = (index: number): number => {
    if (!trackRef.current) return 0
    const W        = trackRef.current.offsetWidth
    const halfStep = W / (tabCount * 2)          // = W / (2N)
    return halfStep * (2 * index + 1) - CAR_W / 2
  }

  /* stop marker centres */
  const updateStops = () => {
    if (!trackRef.current) return
    const W        = trackRef.current.offsetWidth
    const halfStep = W / (tabCount * 2)
    setStopXs(
      Array.from({ length: tabCount }, (_, i) => halfStep * (2 * i + 1))
    )
  }

  /* ── Drive animation ────────────────────────────────────────────────── */
  const driveTo = (toTab: number, instant = false) => {
    const car = carRef.current
    if (!car) return

    const fromTab = currentCarTab.current
    const toX     = getCarX(toTab)
    const hops    = Math.abs(toTab - fromTab)
    const dir     = toTab >= fromTab ? 1 : -1

    currentCarTab.current = toTab

    if (instant) {
      gsap.set(car, { x: toX, rotateZ: 0, scaleX: 1, y: 0 })
      return
    }

    const duration = 0.44 + hops * 0.17   // e.g. 1 hop ≈ 0.61s, 4 hops ≈ 1.12s
    const degrees  = hops * 3.5 * 360     // wheel spin in degrees

    isAnimating.current = true

    /* flip to face direction of travel */
    gsap.to(car, { scaleX: dir < 0 ? -1 : 1, duration: 0.18, ease: 'power2.inOut' })

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false },
    })

    /* hop up → land with bounce */
    tl.to(car, { y: -6, duration: 0.12, ease: 'power2.out' }, 0)
    tl.to(car, { y: 0,  duration: 0.22, ease: 'bounce.out' }, duration - 0.18)

    /* lean into accel / settle */
    tl.to(car, { rotateZ: dir * -2.5, duration: 0.14, ease: 'power2.out' }, 0.04)
    tl.to(car, { rotateZ: 0,          duration: 0.18, ease: 'power2.in'  }, duration - 0.14)

    /* main travel */
    tl.to(car, { x: toX, duration, ease: 'power3.inOut' }, 0)

    /* ── Wheel spin — svgOrigin tells GSAP the rotation axis
     *   in SVG user-unit coordinates, avoiding the transformBox bug ──── */
    const spinDir = dir > 0 ? degrees : -degrees
    if (rearWheelRef.current) {
      gsap.to(rearWheelRef.current, {
        rotation:  `+=${spinDir}`,
        svgOrigin: '19 33',        // rear wheel centre in SVG coords
        duration,
        ease: 'power3.inOut',
      })
    }
    if (frontWheelRef.current) {
      gsap.to(frontWheelRef.current, {
        rotation:  `+=${spinDir}`,
        svgOrigin: '65 33',        // front wheel centre in SVG coords
        duration,
        ease: 'power3.inOut',
      })
    }

    /* headlight flare on forward drive */
    if (dir > 0) {
      gsap.fromTo(
        car,
        { filter: `drop-shadow(0 2px 16px ${currentColor}ee)` },
        { filter: `drop-shadow(0 2px 6px ${currentColor}50)`,
          duration: duration * 0.8, ease: 'power2.out' }
      )
    }

    /* un-flip after reversing back to start */
    tl.call(() => {
      if (dir < 0 && toTab === 0) {
        gsap.to(car, { scaleX: 1, duration: 0.22, ease: 'power2.inOut' })
      }
    })
  }

  /* ── React to activeTab prop changes (external tab-button clicks) ─── */
  useEffect(() => {
    if (isOwnChange.current) {
      isOwnChange.current = false
      prevActiveTab.current = activeTab
      return
    }
    if (activeTab !== prevActiveTab.current) {
      driveTo(activeTab)
      prevActiveTab.current = activeTab
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  /* ── Initial position ────────────────────────────────────────────── */
  useEffect(() => {
    requestAnimationFrame(() => {
      driveTo(activeTab, true)
      updateStops()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Resize ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      updateStops()
      if (!isAnimating.current) driveTo(currentCarTab.current, true)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Idle pulse on steering icon ─────────────────────────────────── */
  useEffect(() => {
    const btn = iconBtnRef.current
    if (!btn) return
    const pulse = gsap.to(btn, {
      scale: 1.07, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1,
    })
    return () => { pulse.kill() }
  }, [])

  /* ── User click handler ──────────────────────────────────────────── */
  const handleAdvance = () => {
    if (isAnimating.current) return

    const next  = isLastTab ? 0 : activeTab + 1
    const hops  = Math.abs(next - activeTab)
    const arrMs = (0.44 + hops * 0.17) * 1000 + 90

    /* spin steering wheel */
    gsap.killTweensOf(iconBtnRef.current, 'scale')
    gsap.to(iconBtnRef.current, {
      rotation: isLastTab ? '-=360' : '+=360',
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () =>
        gsap.to(iconBtnRef.current, {
          scale: 1.07, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1,
        }),
    })

    onDriveStart(next)           // move pill immediately
    driveTo(next)                 // start car animation

    isOwnChange.current = true
    setTimeout(() => onArrival(next), arrMs)  // change content on arrival
  }

  return (
    <div
      className="relative w-full mb-6 select-none"
      style={{ height: 72 }}
      aria-hidden="true"
    >
      {/* ── Steering wheel — anchored to the far LEFT of the first stop ── */}
      <button
        ref={iconBtnRef}
        onClick={handleAdvance}
        data-cursor-no-label="true"
        title={isLastTab ? 'Reset to Languages' : 'Drive to next section'}
        className="absolute z-20 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 cursor-pointer"
        style={{
          width:  46,
          height: 46,
          top:    '50%',
          left:   -10,
          transform: 'translateY(-50%)',
          background:  `${currentColor}18`,
          border:      `1.5px solid ${currentColor}45`,
          boxShadow:   `0 0 14px ${currentColor}28`,
          transition:  'background 0.35s, border-color 0.35s, box-shadow 0.35s',
        }}
        onMouseEnter={e => {
          gsap.to(e.currentTarget, { scale: 1.1, duration: 0.18 })
          e.currentTarget.style.background = `${currentColor}28`
        }}
        onMouseLeave={e => {
          gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })
          e.currentTarget.style.background = `${currentColor}18`
        }}
      >
        <SteeringIcon color={currentColor} isReset={isLastTab} />
      </button>

      {/* ── Full-width track ── */}
      <div
        ref={trackRef}
        className="absolute inset-0"
      >
        {/* Road surface */}
        <div
          className="absolute left-0 right-0 rounded-full"
          style={{
            bottom: 10,
            height: 14,
            background: '#11111110',
            border: '1px solid #11111108',
          }}
        />

        {/* Dashed centre line */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom:          16,
            height:          2,
            backgroundImage: `repeating-linear-gradient(
              to right,
              ${currentColor}45 0,
              ${currentColor}45 10px,
              transparent 10px,
              transparent 22px
            )`,
            transition: 'background-image 0.3s',
          }}
        />

        {/* Tab-stop markers — one per tab, centred under each tab label */}
        {stopXs.map((cx, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left:      cx,
              bottom:    12,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Tick line */}
            <div
              style={{
                width:        2,
                height:       i === activeTab ? 14 : 9,
                borderRadius: 1,
                background:   i <= activeTab ? currentColor : `${currentColor}30`,
                boxShadow:    i === activeTab ? `0 0 7px ${currentColor}90` : 'none',
                margin:       '0 auto',
                transition:   'all 0.35s',
              }}
            />
            {/* Dot on top of tick */}
            <div
              style={{
                width:        i === activeTab ? 8 : 5,
                height:       i === activeTab ? 8 : 5,
                borderRadius: '50%',
                background:   i <= activeTab ? currentColor : `${currentColor}28`,
                boxShadow:    i === activeTab ? `0 0 8px ${currentColor}90` : 'none',
                margin:       '0 auto',
                marginTop:    2,
                transition:   'all 0.35s',
              }}
            />
          </div>
        ))}

        {/* ── The car (GSAP owns x-position) ── */}
        <div
          ref={carRef}
          onClick={handleAdvance}
          data-cursor-no-label="true"
          className="absolute cursor-pointer z-10"
          style={{
            bottom:     8,
            left:       0,
            width:      CAR_W,
            willChange: 'transform',
          }}
          title={isLastTab ? 'Click to reset' : 'Click to advance'}
        >
          <CarSVG
            color={currentColor}
            rearRef={rearWheelRef}
            frontRef={frontWheelRef}
          />
        </div>
      </div>

      {/* ── Progress dots — right side ── */}
      <div
        className="absolute z-20 flex items-center gap-1.5"
        style={{ right: 4, top: '50%', transform: 'translateY(-50%)' }}
      >
        {Array.from({ length: tabCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width:      i === activeTab ? 15 : 5,
              height:     5,
              background: i <= activeTab ? currentColor : `${currentColor}28`,
              boxShadow:  i === activeTab ? `0 0 7px ${currentColor}75` : 'none',
              transition: 'all 0.35s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
