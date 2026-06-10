'use client'

import React, { useState, useEffect } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

const navItems = [
  { label: 'Selected Work', href: '#selected-work', id: 'selected-work' },
  { label: 'How I Think', href: '#how-i-think', id: 'how-i-think' },
  { label: 'My Journey', href: '#my-journey', id: 'my-journey' },
  { label: 'What I\'m Building Next', href: '#next-building', id: 'next-building' },
  { label: 'Connect', href: '#connect', id: 'connect' },
]

export function NavBar() {
  const { activeSection, progress } = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Check initial state asynchronously to avoid React 19 cascading render warning
    const initialCheck = () => setScrolled(window.scrollY > 60)
    const rafId = requestAnimationFrame(initialCheck)

    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handler)
    }
  }, [])

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

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] bg-[#111111] transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          'fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
          scrolled ? 'w-[min(94vw,900px)]' : 'w-[min(98vw,1100px)]'
        )}
      >
        <nav
          className={cn(
            'glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500',
            scrolled && 'border-[#111111]/10 shadow-[0_8px_30px_rgba(17,17,17,0.04)]'
          )}
          aria-label="Main navigation"
          role="navigation"
        >
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 group"
            aria-label="Scroll to top"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#111111]/5 border border-[#111111]/10 group-hover:border-[#111111]/25 transition-all duration-300">
              <span className="text-[#111111] font-bold font-mono text-sm leading-none">A</span>
            </div>
            <span className="font-heading font-semibold text-sm text-[#111111]/90 hidden sm:block group-hover:text-[#111111] transition-colors">
              {profile.name.split(' ')[0]}
              <span className="text-[#6b6b6b] font-normal font-sans">
                {' '}{profile.name.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-300',
                      isActive
                        ? 'bg-[#111111]/10 text-[#111111] border border-[#111111]/15 font-semibold'
                        : 'text-[#6b6b6b] hover:text-[#111111] hover:bg-[#111111]/5'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('connect')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 border border-[#111111]/10 hover:border-[#111111]/20 bg-[#111111]/5 hover:bg-[#111111]/10 text-[#111111] rounded-lg text-xs font-mono font-medium transition-all duration-200"
            >
              <span className="status-dot w-1.5 h-1.5 inline-block bg-[#10B981]" />
              <span>Available</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-[#6b6b6b] hover:text-[#111111] hover:bg-[#111111]/5 transition-all"
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
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden glass mt-2 rounded-2xl overflow-hidden transition-all duration-300',
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <ul className="p-3 flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    activeSection === item.id
                      ? 'bg-[#111111]/10 text-[#111111]'
                      : 'text-[#6b6b6b] hover:text-[#111111] hover:bg-[#111111]/5'
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo('connect')}
                className="w-full mt-2 py-3 bg-[#111111] text-[#f5efe8] hover:bg-[#222222] rounded-xl text-sm font-semibold transition-colors duration-200"
              >
                Get In Touch
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

