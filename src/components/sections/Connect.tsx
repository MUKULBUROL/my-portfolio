'use client'

import React, { useState } from 'react'
import { ContactForm } from '../ui/ContactForm'
import { Mail, Copy, Check, ArrowUpRight, Radio } from 'lucide-react'
import { useUI } from '@/context/UIContext'

export function Connect() {
  const { triggerCurtain } = useUI()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mukulburoli@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact and Signal"
      className="relative py-24 bg-[#FF5C35] dark:bg-[#181210] text-[#121212] dark:text-[#FAF7F0] border-t-3 border-[#121212] dark:border-[#FAF7F0] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="border-b-3 border-[#121212] dark:border-[#FAF7F0]/30 pb-6 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-2 bg-[#FAF7F0] dark:bg-[#222222] border-2 border-[#121212] dark:border-[#FAF7F0] px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000]">
            <Radio size={14} className="text-[#FF5C35] animate-pulse" />
            <span>CONTACT // TRANSMISSION</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#FAF7F0]">
            Send a signal.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#121212] dark:text-[#A3A3A3] font-bold mt-2">
            I’m open to software engineering roles and thoughtful collaborations.
          </p>
        </div>

        {/* 2-Column Grid: Direct Links & Info (5 cols) | Contact Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Connect Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Email Card with Copy button */}
            <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1816] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <div className="flex items-center justify-between font-mono text-xs text-[#555555] dark:text-[#A3A3A3] uppercase font-bold mb-2">
                <span>Direct Dispatch</span>
                <Mail size={16} className="text-[#FF5C35]" />
              </div>
              <a
                href="mailto:mukulburoli@gmail.com"
                className="font-mono font-bold text-base sm:text-lg text-[#121212] dark:text-[#FAF7F0] hover:text-[#FF5C35] transition-colors break-all block mb-4"
              >
                mukulburoli@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="brutal-btn w-full flex items-center justify-center gap-2 bg-[#FACC15] text-[#121212] py-2 px-3 font-mono text-xs font-bold uppercase cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Social Channels Card */}
            <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#1C1816] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000] flex flex-col gap-3">
              <span className="font-mono text-xs text-[#555555] dark:text-[#A3A3A3] uppercase font-bold block mb-1">
                Verified Profiles
              </span>

              {/* GitHub */}
              <a
                href="https://github.com/MUKULBUROL"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center justify-between p-3 bg-[#121212] text-[#FAF7F0] font-mono text-xs font-bold uppercase"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub // @MUKULBUROL</span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mukul-kumar-036587254/"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center justify-between p-3 bg-[#38BDF8] text-[#121212] font-mono text-xs font-bold uppercase"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn // Mukul Kumar</span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/mukul_kumar200/"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center justify-between p-3 bg-[#FACC15] text-[#121212] font-mono text-xs font-bold uppercase"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607 2.66 2.66 0 0 1 .388-.392l4.255-4.556a1.377 1.377 0 0 0 .047-1.933L14.444.438A1.371 1.371 0 0 0 13.482 0z"/>
                  </svg>
                  <span>LeetCode // @mukul_kumar200</span>
                </div>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Timezone & Location badge */}
            <div className="border-2.5 border-[#121212] bg-[#A3E635] text-[#121212] p-4 font-mono text-xs font-bold shadow-[4px_4px_0px_0px_#121212] flex items-center justify-between">
              <span>LOCATION: INDIA (IST · UTC+5:30)</span>
              <span>AVAILABLE NOW</span>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        {/* Bottom Footer Credits & Replay Control */}
        <div className="mt-16 pt-6 border-t-2.5 border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold text-[#121212]">
          <span>© {new Date().getFullYear()} Mukul Kumar</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={triggerCurtain}
              className="underline hover:text-[#FAF7F0] transition-colors cursor-pointer"
              title="Replay curtain introduction"
            >
              Replay intro
            </button>
            <span className="hidden sm:inline text-[#121212]/40">•</span>
            <span>Designed &amp; Engineered for Production.</span>
          </div>
        </div>

      </div>
    </section>
  )
}
