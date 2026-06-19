'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { MukulLogo } from './MukulLogo'

const navItems = [
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Selected Work', href: '#selected-work', id: 'selected-work' },
  { label: 'Thinking', href: '#how-i-think', id: 'how-i-think' },
  { label: 'Next', href: '#next-building', id: 'next-building' },
  { label: 'Connect', href: '#connect', id: 'connect' },
]

export function NavBar() {
  const { activeSection } = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

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

      <header className="navbar fixed top-[40px] left-0 w-full z-50 px-6 sm:px-12 md:px-16 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          {/* Logo / Name */}
          <Link
            href="/"
            className="flex items-center no-underline hover:opacity-85 transition-opacity"
            aria-label="Home"
          >
            <MukulLogo height={32} className="h-8 sm:h-[34px] w-auto transition-all duration-300" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 font-sans text-xs tracking-wider uppercase font-semibold text-[#6b6b6b] dark:text-[#a69e96]" role="list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id} className="relative py-2 flex flex-col items-center">
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'nav-link transition-colors duration-300 hover:text-[#111111] dark:hover:text-[#e5ded4] focus-visible:outline-none cursor-pointer',
                      isActive ? 'text-[#111111] dark:text-[#e5ded4] font-bold' : 'text-[#6b6b6b] dark:text-[#a69e96]'
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

          {/* Controls section (Theme toggle + Status / Hamburger) */}
          <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[#6b6b6b] hover:text-[#111111] dark:text-[#a69e96] dark:hover:text-[#e5ded4] transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              data-cursor-label="Theme"
            >
              {theme === 'light' ? (
                <Moon size={15} className="transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun size={15} className="transition-transform duration-300 hover:rotate-45" />
              )}
            </button>

            {/* Availability / Status (Upper right, very subtle) */}
            <div className="hidden sm:flex flex-col items-end gap-0.5 select-none">
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/60 dark:text-[#e5ded4]/60 font-medium">
                Open for meaningful work.
              </div>
              <a href="mailto:mukulburoli@gmail.com" className="text-[10px] font-mono tracking-wider lowercase text-[#111111]/40 hover:text-[#111111]/70 dark:text-[#e5ded4]/40 dark:hover:text-[#e5ded4]/70 transition-colors duration-300">
                mukulburoli@gmail.com
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-[#6b6b6b] hover:text-[#111111] dark:text-[#a69e96] dark:hover:text-[#e5ded4] transition-all cursor-pointer"
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
        </div>

        {/* Mobile Menu (Minimal overlay layout) */}
        {menuOpen && (
          <div className="md:hidden absolute top-[50px] left-6 right-6 bg-[#fcfaf7] dark:bg-[#1e1b19] border border-[#111111]/10 dark:border-[#e5ded4]/10 rounded-xl p-4 shadow-lg pointer-events-auto">
            <ul className="flex flex-col gap-4 font-sans text-xs tracking-wider uppercase font-semibold text-[#6b6b6b] dark:text-[#a69e96]" role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'w-full text-left py-2 border-b border-[#111111]/5 dark:border-[#e5ded4]/5 transition-all',
                      activeSection === item.id ? 'text-[#111111] dark:text-[#e5ded4] font-bold' : 'text-[#6b6b6b] dark:text-[#a69e96]'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 text-[10px] font-mono tracking-widest text-[#111111]/60 dark:text-[#e5ded4]/60">
                Open for meaningful work.
              </li>
              <li>
                <a href="mailto:mukulburoli@gmail.com" className="text-[10px] font-mono tracking-wider lowercase text-[#111111]/40 hover:text-[#111111]/70 dark:text-[#e5ded4]/40 dark:hover:text-[#e5ded4]/70 transition-colors duration-300">
                  mukulburoli@gmail.com
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}

