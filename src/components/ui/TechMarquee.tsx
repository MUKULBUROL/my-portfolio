'use client'

import React from 'react'

/**
 * Each item has an inline SVG icon — no emojis, no external dependencies.
 * Skills sourced from resume: C++, Java, Python, Spring Boot, FastAPI,
 * Node.js, PostgreSQL, MySQL, Redis, gRPC, WebSockets, Docker, Linux,
 * Git, AWS, React/Next.js, Tailwind, SOME/IP, DSA, System Design.
 */
const marqueeItems = [
  {
    name: 'C++',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="#00599C" />
        <text x="16" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold" fontFamily="monospace">C++</text>
      </svg>
    ),
  },
  {
    name: 'Java',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M11 22c0 0 -1 0.6 2.8 0.5 4.2 0 6.5 -1.4 6.5 -1.4S21.5 22.7 19 23.5c-3.2 1 -10 0.9 -8 -1.5z" fill="#E76F00"/>
        <path d="M10 20c0 0 -1.2 0.9 3.2 0.7 5.2 -0.2 8.3 -1.8 8.3 -1.8s-1.5 1.5 -5.2 2.1c-4.3 0.7 -10.5 0 -6.3 -1z" fill="#E76F00"/>
        <path d="M18 13s2 1.2 -2 2.2c-3.5 0.9 -8.5 1 -8.5 0.4 0 -0.5 1.5 -1 3.5 -1.3 2.5 -0.4 5.2 -1.5 7 -1.3z" fill="#E76F00"/>
        <path d="M15.5 5c0 0 3.5 3.5 -3.5 8.8C6 18.3 10 21 10 21c0 0 -4.5 -2.4 -4 -6 0.6 -4.2 9.5 -6 9.5 -10z" fill="#E76F00"/>
        <path d="M16.5 26.5c3.7 0.2 9.5 -0.2 9.5 -0.2s-1 0.9 -7 1.2c-7 0.4 -9 -0.5 -9 -0.5S8.5 27.3 16.5 26.5z" fill="#E76F00"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M16 3c-4.5 0-8 1.8-8 4v4c0 2.2 3.5 4 8 4s8-1.8 8-4V7c0-2.2-3.5-4-8-4z" fill="#3776AB"/>
        <path d="M8 11v4c0 2.2 3.5 4 8 4h1v2H12c-2.2 0-4-1.8-4-4v-6h0z" fill="#3776AB"/>
        <path d="M24 11v4c0 2.2-3.5 4-8 4h-1v2h5c2.2 0 4-1.8 4-4v-6h0z" fill="#FFD43B"/>
        <circle cx="13" cy="8" r="1.5" fill="white"/>
        <circle cx="19" cy="23" r="1.5" fill="#3776AB"/>
      </svg>
    ),
  },
  {
    name: 'Spring Boot',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="16" cy="16" r="13" fill="#6DB33F"/>
        <path d="M11 21.5c-3.5-2-5.5-5.8-4.8-9.5C7 8.2 10.5 5.5 14 5c-2 3-2 7.5 1 11 1.5 1.8 3.5 3 5.5 3.5-1.5 1.5-3.5 2.5-5.5 2.5-1.5 0-2.8-0.5-4-0.5z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="16" cy="16" r="13" fill="#009688"/>
        <path d="M17 8l-7 11h6l-1 5 7-11h-6z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#339933"/>
        <path d="M16 7l-8 4.5v9L16 25l8-4.5v-9L16 7z" fill="#339933"/>
        <text x="16" y="20" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="monospace">NODE</text>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <ellipse cx="16" cy="10" rx="9" ry="6" fill="#336791"/>
        <rect x="7" y="10" width="18" height="12" fill="#336791"/>
        <ellipse cx="16" cy="22" rx="9" ry="3" fill="#264D6E"/>
        <path d="M25 10v12" stroke="#264D6E" strokeWidth="1"/>
        <path d="M7 10v12" stroke="#264D6E" strokeWidth="1"/>
        <ellipse cx="16" cy="10" rx="9" ry="3.5" fill="#4A90D9"/>
      </svg>
    ),
  },
  {
    name: 'MySQL',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M5 18c0 5 5 9 11 9s11-4 11-9V14c0-5-5-9-11-9S5 9 5 14v4z" fill="#00618A"/>
        <ellipse cx="16" cy="14" rx="11" ry="5" fill="#00618A"/>
        <ellipse cx="16" cy="14" rx="11" ry="3" fill="#F79300"/>
        <text x="16" y="24" textAnchor="middle" fontSize="5" fill="white" fontFamily="monospace" fontWeight="bold">MySQL</text>
      </svg>
    ),
  },
  {
    name: 'Redis',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M4 20l12 5 12-5-12-5-12 5z" fill="#A41E11"/>
        <path d="M4 16l12 5 12-5-12-5-12 5z" fill="#D82C20"/>
        <path d="M4 12l12 5 12-5-12-5-12 5z" fill="#A41E11"/>
        <path d="M16 17l12-5v4l-12 5z" fill="#821710"/>
        <path d="M16 17L4 12v4l12 5z" fill="#D82C20"/>
      </svg>
    ),
  },
  {
    name: 'gRPC',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <rect x="3" y="3" width="26" height="26" rx="4" fill="#244C5A"/>
        <text x="16" y="19" textAnchor="middle" fontSize="7.5" fill="#00BCD4" fontWeight="bold" fontFamily="monospace">gRPC</text>
      </svg>
    ),
  },
  {
    name: 'WebSockets',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="16" cy="16" r="13" stroke="#7C3AED" strokeWidth="2" fill="none"/>
        <path d="M8 16h6M18 16h6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="3" fill="#7C3AED"/>
        <path d="M16 8v3M16 21v3" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'SOME/IP',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <rect x="3" y="8" width="26" height="16" rx="3" fill="#1A237E"/>
        <path d="M8 16h16" stroke="#90CAF9" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="8" cy="16" r="2" fill="#42A5F5"/>
        <circle cx="24" cy="16" r="2" fill="#42A5F5"/>
        <text x="16" y="24" textAnchor="middle" fontSize="4.5" fill="#90CAF9" fontFamily="monospace">SOME/IP</text>
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M26 14c-0.5-3-4-5.5-9-5.5H17v2h0.5c3.5 0 6.5 1.5 7 3.5h1.5z" fill="#2396ED"/>
        <rect x="5" y="14" width="22" height="7" rx="2" fill="#2396ED"/>
        <rect x="8" y="11" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="12" y="11" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="16" y="11" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="8" y="15" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="12" y="15" width="3" height="3" rx="0.5" fill="white"/>
        <rect x="16" y="15" width="3" height="3" rx="0.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Linux',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M16 3c-3.5 0-6 5-6 10 0 2 0.5 4 1 5.5-1.5 1-3 2.5-3 4.5 0 3 3 5 8 5s8-2 8-5c0-2-1.5-3.5-3-4.5 0.5-1.5 1-3.5 1-5.5 0-5-2.5-10-6-10z" fill="#F5A623"/>
        <circle cx="13" cy="13" r="1.5" fill="#1A1A1A"/>
        <circle cx="19" cy="13" r="1.5" fill="#1A1A1A"/>
        <path d="M13 17c0 0 1 2 3 2s3-2 3-2" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M29 15l-12-12a2 2 0 00-3 0L12 5l4 4a2 2 0 002.4 2.4L22 15a2 2 0 102.4 2.4L20 13v-1l4-4 5 5a2 2 0 010 3z" fill="#F05032"/>
        <circle cx="11" cy="21" r="3" stroke="#F05032" strokeWidth="2"/>
        <circle cx="25" cy="17" r="3" stroke="#F05032" strokeWidth="2"/>
        <line x1="11" y1="18" x2="11" y2="7" stroke="#F05032" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <path d="M9 19l-3 2 3 2v-4zM23 19l3 2-3 2v-4z" fill="#FF9900"/>
        <path d="M9 21h14" stroke="#FF9900" strokeWidth="1.5"/>
        <path d="M7 12c0-4 4-7 9-7s9 3 9 7c2 0 4 1.5 4 3.5S27 19 25 19H7c-2 0-4-1.5-4-3.5S5 12 7 12z" fill="#FF9900" opacity=".85"/>
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="16" cy="16" r="13" fill="#111111"/>
        <path d="M12 11v10l12-10v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'DSA',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <circle cx="8" cy="16" r="4" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="8" r="4" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="24" r="4" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
        <line x1="12" y1="14" x2="20" y2="10" stroke="#7C3AED" strokeWidth="1.5"/>
        <line x1="12" y1="18" x2="20" y2="22" stroke="#7C3AED" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'System Design',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
        <rect x="4" y="10" width="8" height="6" rx="1.5" stroke="#06B6D4" strokeWidth="1.5" fill="none"/>
        <rect x="20" y="6" width="8" height="6" rx="1.5" stroke="#06B6D4" strokeWidth="1.5" fill="none"/>
        <rect x="20" y="20" width="8" height="6" rx="1.5" stroke="#06B6D4" strokeWidth="1.5" fill="none"/>
        <line x1="12" y1="13" x2="20" y2="9" stroke="#06B6D4" strokeWidth="1.2"/>
        <line x1="12" y1="13" x2="20" y2="23" stroke="#06B6D4" strokeWidth="1.2"/>
      </svg>
    ),
  },
]

export function TechMarquee() {
  return (
    <div className="tech-marquee" aria-label="Technical skills marquee scroller">
      <div className="tech-marquee-track">
        {[...marqueeItems, ...marqueeItems].map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="tech-marquee-item">
            <div className="tech-marquee-icon">
              {tech.icon}
            </div>
            <span className="text-[11px] font-mono text-[#111111] tracking-wide font-bold opacity-80">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
