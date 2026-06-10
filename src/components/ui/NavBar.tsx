'use client'

import React, { useState, useEffect } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Selected Work', href: '#selected-work', id: 'selected-work' },
  { label: 'Thinking', href: '#how-i-think', id: 'how-i-think' },
  { label: 'Journey', href: '#my-journey', id: 'my-journey' },
  { label: 'Next', href: '#next-building', id: 'next-building' },
  { label: 'Connect', href: '#connect', id: 'connect' },
]

export function NavBar() {
  const { activeSection } = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (sectionId: string) => {
    setMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header className="fixed top-[40px] left-0 w-full z-50 px-6 sm:px-12 md:px-16 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-heading font-black text-xl tracking-tight text-[#111111] hover:opacity-75 transition-opacity cursor-pointer select-none"
            aria-label="Scroll to top"
          >
            ALEX
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 font-sans text-xs tracking-wider uppercase font-semibold text-[#6b6b6b]" role="list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id} className="relative py-2 flex flex-col items-center">
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'nav-link transition-colors duration-300 hover:text-[#111111] focus-visible:outline-none cursor-pointer',
                      isActive ? 'text-[#111111] font-bold' : 'text-[#6b6b6b]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                  {/* Underline grows from left on hover is handled in CSS, active dot here */}
                  {isActive && (
                    <span className="nav-dot" />
                  )}
                </li>
              )
            })}
          </ul>

          {/* Availability / Status (Upper right, very subtle) */}
          <div className="hidden sm:block text-[10px] font-mono tracking-widest uppercase text-[#111111]/60 font-medium select-none">
            Open for meaningful work.
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#6b6b6b] hover:text-[#111111] transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-[5px] w-5">
              <span className={cn('h-[1.5px] bg-current rounded transition-all duration-300', menuOpen && 'rotate-45 translate-y-[6.5px]')} />
              <span className={cn('h-[1.5px] bg-current rounded transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
              <span className={cn('h-[1.5px] bg-current rounded transition-all duration-300', menuOpen && '-rotate-45 -translate-y-[6.5px]')} />
            </div>
          </button>
        </div>

        {/* Mobile Menu (Minimal overlay layout) */}
        {menuOpen && (
          <div className="md:hidden absolute top-[50px] left-6 right-6 bg-[#fcfaf7] border border-[#111111]/10 rounded-xl p-4 shadow-lg pointer-events-auto">
            <ul className="flex flex-col gap-4 font-sans text-xs tracking-wider uppercase font-semibold text-[#6b6b6b]" role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'w-full text-left py-2 border-b border-[#111111]/5 transition-all',
                      activeSection === item.id ? 'text-[#111111] font-bold' : 'text-[#6b6b6b]'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 text-[10px] font-mono tracking-widest text-[#111111]/60">
                Open for meaningful work.
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}

