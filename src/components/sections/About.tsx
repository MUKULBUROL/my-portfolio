'use client'

import React from 'react'
import { useUI } from '@/context/UIContext'
import { Quote, Award, Code, CheckCircle, FileCheck } from 'lucide-react'

const stats = [
  { value: '450+', label: 'DSA solved (LeetCode/Codeforces)', icon: <Code size={18} className="text-[#FF5C35]" /> },
  { value: '1671', label: 'Peak LeetCode rating', icon: <Award size={18} className="text-[#38BDF8]" /> },
  { value: 'Top 100', label: 'Adobe India Hackathon (60K+)', icon: <Award size={18} className="text-[#A3E635]" /> },
  { value: 'Inter-IIT', label: 'Volleyball (IIT Hyderabad)', icon: <CheckCircle size={18} className="text-[#FF5C35]" /> },
]

export function About() {
  const { parsedResume } = useUI()

  return (
    <section
      id="about"
      aria-label="About Mukul Kumar"
      className="relative py-24 bg-[#FACC15] dark:bg-[#181611] text-[#121212] dark:text-[#FAF7F0] border-b-3 border-[#121212] dark:border-[#FAF7F0] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="border-b-2.5 border-[#121212] dark:border-[#FAF7F0]/30 pb-6 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-2 bg-[#FAF7F0] dark:bg-[#222222] border-2 border-[#121212] dark:border-[#FAF7F0] px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#121212] dark:shadow-[2px_2px_0px_0px_#000000]">
            <span>ABOUT // PHILOSOPHY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
            Curious about how systems fit.
          </h2>
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Narrative Story (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#121212] dark:text-[#FAF7F0] font-medium">
              I’m pursuing my B.Tech at IIT Hyderabad (GPA: 6.85 / 10) with a strong focus on backend engineering, distributed protocols, and AI applications. From engineering C++ vehicle-signal bridges at People Tech Group to contributing upstream metadata fixes to Budibase, I value writing clear, tested, and resilient software. I also qualified Stage I &amp; II of the National Talent Search Examination (NTSE).
            </p>

            {/* Pull Quote Box */}
            <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#222222] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000] relative">
              <Quote className="w-8 h-8 text-[#FF5C35] mb-2" />
              <blockquote className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0] leading-snug">
                “I may be early in my career, but curiosity compounds faster than experience standing still.”
              </blockquote>
            </div>

            {/* "Now" Strip */}
            <div className="border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#121212] dark:bg-[#121212] text-[#FAF7F0] p-4 shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000] flex items-center gap-3 font-mono text-xs sm:text-sm">
              <div className="w-2.5 h-2.5 bg-[#A3E635] flex-shrink-0 animate-pulse" />
              <div className="flex-1">
                <span className="font-bold text-[#A3E635] uppercase mr-2">Now:</span>
                <span>Deepening backend architectures · Contributing to open source · Learning from production code</span>
              </div>
            </div>
          </div>

          {/* Stats Grid Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] p-5 shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs font-bold text-[#555555] dark:text-[#A3A3A3]">0{i + 1}</span>
                  {stat.icon}
                </div>
                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] font-bold text-[#555555] dark:text-[#A3A3A3] uppercase leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dynamic Parsed Resume Extract Banner (if resume has been loaded) */}
        {parsedResume && (
          <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000] animate-fadeIn">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5C35] mb-2">
              <FileCheck size={16} />
              <span>Parsed Resume Extract Active</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              {parsedResume.name && (
                <div>
                  <span className="text-[#555555] dark:text-[#A3A3A3] uppercase block">Parsed Candidate:</span>
                  <span className="font-bold text-sm">{parsedResume.name}</span>
                </div>
              )}
              {parsedResume.email && (
                <div>
                  <span className="text-[#555555] dark:text-[#A3A3A3] uppercase block">Parsed Email:</span>
                  <span className="font-bold">{parsedResume.email}</span>
                </div>
              )}
              <div>
                <span className="text-[#555555] dark:text-[#A3A3A3] uppercase block">Detected Skills ({parsedResume.skills.length}):</span>
                <span className="font-bold text-[#FF5C35]">{parsedResume.skills.join(', ')}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
