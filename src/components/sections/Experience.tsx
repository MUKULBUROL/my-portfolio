'use client'

import React from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle2, Cpu, Wrench } from 'lucide-react'

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="relative py-24 bg-[#FAF7F0] dark:bg-[#121212] text-[#121212] dark:text-[#FAF7F0] border-t-3 border-b-3 border-[#121212] dark:border-[#FAF7F0] overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="border-b-2.5 border-[#121212] dark:border-[#FAF7F0]/30 pb-6 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FF5C35] dark:text-[#A3E635] mb-2">
            <Briefcase size={14} />
            <span>EXPERIENCE // HISTORY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
            Under the hood.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#555555] dark:text-[#A3A3A3] mt-2">
            Engineering software-defined vehicle telemetry systems and production distributed components.
          </p>
        </div>

        {/* Experience Main Card */}
        <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#121212] dark:shadow-[8px_8px_0px_0px_#FF5C35]">
          
          {/* Card Top: Editorial Stamp, Title, Company & Location */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between border-b-2 border-[#121212]/20 dark:border-[#FAF7F0]/20 pb-6 mb-8 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#FF5C35] text-[#FAF7F0] border border-[#121212] dark:border-[#FAF7F0]">
                  Automotive SDV
                </span>
                <span className="font-mono text-xs font-bold uppercase text-[#121212] dark:text-[#A3E635] font-semibold">
                  Internship
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
                People Tech Group Inc
              </h3>
              <p className="font-mono text-base text-[#FF5C35] dark:text-[#38BDF8] font-bold mt-1">
                Software Developer Intern – Software-Defined Vehicles
              </p>
            </div>

            {/* Date & Location Editorial Stamp */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 font-mono text-xs border-2 border-[#121212]/30 dark:border-[#FAF7F0]/40 p-3 bg-[#FAF7F0] dark:bg-[#202020]">
              <div className="flex items-center gap-2 text-[#121212] dark:text-[#FACC15] font-bold">
                <Calendar size={13} className="text-[#FF5C35]" />
                <span>Jun – Aug 2025</span>
              </div>
              <div className="flex items-center gap-2 text-[#555555] dark:text-[#FAF7F0]/80">
                <MapPin size={13} />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Core Responsibilities & Impact Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Bullet Points (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#FAF7F0]/60 mb-1 flex items-center gap-2">
                <Cpu size={14} className="text-[#FF5C35] dark:text-[#A3E635]" />
                <span>Technical Contributions</span>
              </h4>

              <ul className="flex flex-col gap-3 font-sans text-sm sm:text-base leading-relaxed text-[#222222] dark:text-[#FAF7F0]/90 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#FF5C35] dark:text-[#A3E635] shrink-0 mt-0.5" />
                  <span>
                    Built a <strong className="text-[#121212] dark:text-[#FAF7F0] font-semibold">C++ middleware bridge</strong> to transfer vehicle-signal data from <strong className="text-[#FF5C35] dark:text-[#38BDF8]">SOME/IP-based ECUs</strong> to the <strong className="font-semibold text-[#121212] dark:text-[#FACC15]">KUKSA Databroker</strong> for software-defined vehicle applications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#FF5C35] dark:text-[#A3E635] shrink-0 mt-0.5" />
                  <span>
                    Implemented a <strong className="text-[#121212] dark:text-[#FAF7F0] font-semibold">VSOMEIP adapter</strong> to parse binary vehicle-signal payloads and convert them into typed <strong className="text-[#121212] dark:text-[#FAF7F0] font-semibold">Protocol Buffers messages</strong> for downstream communication.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#FF5C35] dark:text-[#A3E635] shrink-0 mt-0.5" />
                  <span>
                    Integrated and tested vehicle-signal communication across multiple SDV modules using <strong className="text-[#FF5C35] dark:text-[#38BDF8]">VSOMEIP</strong> and <strong className="font-semibold text-[#121212] dark:text-[#FACC15]">KUKSA</strong>, with <strong className="text-[#121212] dark:text-[#FAF7F0] font-semibold">CMake</strong> for build configuration.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Stack & Tools Applied (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="border-2 border-[#121212]/20 dark:border-[#FAF7F0]/30 bg-[#FAF7F0] dark:bg-[#202020] p-4 shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#000000]">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0]/80 mb-3 flex items-center gap-2">
                  <Wrench size={14} className="text-[#FF5C35]" />
                  <span>Tools &amp; Protocols</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {['C++', 'VSOMEIP', 'KUKSA', 'SOME/IP', 'Protocol Buffers', 'CMake', 'Linux'].map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs font-bold bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212] px-2 py-0.5 border border-[#121212]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
