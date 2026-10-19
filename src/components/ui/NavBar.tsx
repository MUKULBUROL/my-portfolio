'use client'

import React, { useState, useSyncExternalStore } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useUI } from '@/context/UIContext'
import { Sun, Moon, Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { soundEffects } from '@/lib/soundEffects'

const navLinks = [
  { label: 'Work', targetId: 'work' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'About', targetId: 'about' },
  { label: 'Contact', targetId: 'contact' },
]

export function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const { navigateWithTransition } = useUI()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMuted = useSyncExternalStore(
    (callback) => soundEffects.subscribe(callback),
    () => soundEffects.isMuted(),
    () => false
  )

  const handleToggleSound = () => {
    const nextMuted = soundEffects.toggleMute()
    if (!nextMuted) {
      soundEffects.playRotatingClick()
    }
  }

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false)
    navigateWithTransition(targetId)
  }

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a href="#hero" className="skip-to-content">
        Skip to content
      </a>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-6xl mx-auto pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto flex items-center justify-between border-2.5 border-[#121212] bg-[#FAF7F0]/90 dark:bg-[#121212]/90 backdrop-blur-md px-4 sm:px-6 py-3 shadow-[4px_4px_0px_0px_#121212] dark:border-[#FAF7F0] dark:shadow-[4px_4px_0px_0px_#000000]"
        >
          {/* Logo / Brand — MK badge + Mukul Kumar */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none cursor-pointer"
            aria-label="Scroll to top / Hero"
          >
            <div className="w-9 h-9 bg-[#FF5C35] border-2 border-[#121212] text-[#121212] font-heading font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_#121212] transition-all">
              MK
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base tracking-tight text-[#121212] dark:text-[#FAF7F0] leading-none group-hover:text-[#FF5C35] transition-colors">
                Mukul Kumar
              </span>
              <span className="font-mono text-[10px] text-[#555555] dark:text-[#A3A3A3] tracking-wider uppercase font-semibold">
                Software Eng.
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider" role="list">
            {navLinks.map((link) => (
              <li key={link.targetId}>
                <button
                  onClick={() => handleNavClick(link.targetId)}
                  className="px-3.5 py-1.5 border-2 border-transparent hover:border-[#121212] dark:hover:border-[#FAF7F0] hover:bg-[#FAF7F0] dark:hover:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] transition-all cursor-pointer rounded-none hover:shadow-[2px_2px_0px_0px_#121212] dark:hover:shadow-[2px_2px_0px_0px_#000000]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Controls: Audio Toggle + Light/Dark Toggle + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Audio / Click Sound Toggle Button */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? 'Enable sound effects' : 'Mute sound effects'}
              title={isMuted ? 'Sound: Muted (Click to enable)' : 'Sound: Active (Click to mute)'}
              aria-pressed={!isMuted}
              className="w-9 h-9 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FF5C35] hover:text-[#FAF7F0] dark:hover:bg-[#FF5C35] dark:hover:text-[#FAF7F0] transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX size={16} className="stroke-[2.5]" />
              ) : (
                <Volume2 size={16} className="stroke-[2.5] text-[#FF5C35]" />
              )}
            </button>

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Theme: ${theme === 'light' ? 'Light' : 'Dark'} (Click to switch)`}
              className="w-9 h-9 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-[#121212] transition-colors cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon size={16} className="stroke-[2.5]" />
              ) : (
                <Sun size={16} className="stroke-[2.5] text-[#FACC15]" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-9 h-9 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#181818] p-4 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
            <ul className="flex flex-col gap-2 font-mono text-sm font-bold uppercase tracking-wider" role="list">
              {navLinks.map((link) => (
                <li key={link.targetId}>
                  <button
                    onClick={() => handleNavClick(link.targetId)}
                    className="w-full flex items-center justify-between p-2.5 border-2 border-transparent hover:border-[#121212] dark:hover:border-[#FAF7F0] hover:bg-[#FF5C35] hover:text-[#FAF7F0] text-left text-[#121212] dark:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
