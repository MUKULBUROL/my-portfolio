'use client'

import React from 'react'

interface MukulLogoProps {
  className?: string
  height?: number
}

export function MukulLogo({ className, height = 40 }: MukulLogoProps) {
  // Calculations for aspect ratio: viewBox width=240, height=48
  const width = (height / 48) * 240

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="MUKUL KUMAR Logo"
    >
      <defs>
        {/* Stencil mask with diagonal cuts parallel to the ///// slashes */}
        <mask id="stencil-mask">
          {/* Base: show everything */}
          <rect x="-10" y="-10" width="260" height="70" fill="white" />
          
          {/* Diagonal slits (black) cut through the letters at a 45-degree angle */}
          {/* Cut 1 & 2: M (offset 0) */}
          <line x1="-2" y1="20" x2="6" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="2" y1="12" x2="10" y2="4" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 3: U (offset 24) */}
          <line x1="22" y1="20" x2="30" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 4 & 5: K (offset 46) */}
          <line x1="44" y1="20" x2="52" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="52" y1="20" x2="60" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 6: U (offset 68) */}
          <line x1="66" y1="20" x2="74" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 7: L (offset 90) */}
          <line x1="88" y1="20" x2="96" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 8 & 9: K (offset 120) */}
          <line x1="118" y1="20" x2="126" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="126" y1="20" x2="134" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 10: U (offset 142) */}
          <line x1="140" y1="20" x2="148" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 11 & 12: M (offset 164) */}
          <line x1="162" y1="20" x2="170" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="166" y1="12" x2="174" y2="4" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 13: A (offset 188) */}
          <line x1="190" y1="19" x2="198" y2="11" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          
          {/* Cut 14 & 15: R (offset 210) */}
          <line x1="208" y1="20" x2="216" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="220" y1="22" x2="228" y2="14" stroke="black" strokeWidth="2.5" strokeLinecap="square" />
        </mask>
      </defs>

      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
        mask="url(#stencil-mask)"
        className="text-[#111111] dark:text-[#e5ded4] transition-colors duration-300"
      >
        {/* === MUKUL === */}
        {/* M */}
        <g transform="translate(0, 0)">
          <path d="M 2 24 L 2 0" />
          <path d="M 2 0 L 10 16 L 18 0" />
          <path d="M 18 0 L 18 24" />
        </g>
        
        {/* U */}
        <g transform="translate(24, 0)">
          <path d="M 2 0 L 2 20" />
          <path d="M 6 24 L 10 24" />
          <path d="M 14 0 L 14 20" />
        </g>

        {/* K */}
        <g transform="translate(46, 0)">
          <path d="M 2 0 L 2 24" />
          <path d="M 14 0 L 6 12 L 14 24" />
        </g>

        {/* U */}
        <g transform="translate(68, 0)">
          <path d="M 2 0 L 2 20" />
          <path d="M 6 24 L 10 24" />
          <path d="M 14 0 L 14 20" />
        </g>

        {/* L */}
        <g transform="translate(90, 0)">
          <path d="M 2 0 L 2 20" />
          <path d="M 6 24 L 14 24" />
        </g>

        {/* === KUMAR === */}
        {/* K */}
        <g transform="translate(120, 0)">
          <path d="M 2 0 L 2 24" />
          <path d="M 14 0 L 6 12 L 14 24" />
        </g>

        {/* U */}
        <g transform="translate(142, 0)">
          <path d="M 2 0 L 2 20" />
          <path d="M 6 24 L 10 24" />
          <path d="M 14 0 L 14 20" />
        </g>

        {/* M */}
        <g transform="translate(164, 0)">
          <path d="M 2 24 L 2 0" />
          <path d="M 2 0 L 10 16 L 18 0" />
          <path d="M 18 0 L 18 24" />
        </g>

        {/* A */}
        <g transform="translate(188, 0)">
          <path d="M 2 24 L 8.5 4" />
          <path d="M 11.5 4 L 18 24" />
          <circle cx="10" cy="16" r="2.2" fill="currentColor" stroke="none" />
        </g>

        {/* R */}
        <g transform="translate(210, 0)">
          <path d="M 2 0 L 2 24" />
          <path d="M 2 0 H 14 V 12 H 6" />
          <path d="M 10 12 L 18 24" />
        </g>
      </g>

      {/* Underline and slashes/year below */}
      {/* Broken underline that leaves gaps for slashes and year */}
      <line
        x1="34"
        y1="34"
        x2="206"
        y2="34"
        strokeWidth="1"
        className="stroke-[#111111]/30 dark:stroke-[#e5ded4]/30"
      />
      
      {/* Slashes ///// */}
      <text
        x="0"
        y="37"
        className="font-mono text-[8px] font-bold tracking-wider fill-[#111111]/50 dark:fill-[#e5ded4]/50 select-none"
      >
        {"/////"}
      </text>

      {/* Year / 2026 */}
      <text
        x="240"
        y="37"
        textAnchor="end"
        className="font-mono text-[8px] font-bold tracking-wider fill-[#111111]/50 dark:fill-[#e5ded4]/50 select-none"
      >
        {"/ 2026"}
      </text>
    </svg>
  )
}

