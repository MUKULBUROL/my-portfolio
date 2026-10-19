'use client'

import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useUI } from '@/context/UIContext'
import { resume } from '@/data/resume'
import { 
  X, 
  FileText, 
  ArrowUpRight, 
  ExternalLink, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Sparkles,
  Eye
} from 'lucide-react'

const emptySubscribe = () => () => {}

export function ResumeDialog() {
  const { isResumeOpen, closeResumeDialog } = useUI()
  const [activeTab, setActiveTab] = useState<'pdf' | 'overview'>('pdf')
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false)

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isResumeOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeResumeDialog()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isResumeOpen, closeResumeDialog])

  if (!isClient || !isResumeOpen) return null

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
      onClick={closeResumeDialog}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#121212]/80 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in"
      style={{ isolation: 'isolate' }}
    >
      {/* Dialog Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl border-3 border-[#121212] bg-[#FAF7F0] dark:bg-[#181818] p-3 sm:p-6 shadow-[10px_10px_0px_0px_#FF5C35] dark:border-[#FAF7F0] dark:shadow-[10px_10px_0px_0px_#000000] z-10 flex flex-col h-[90vh] max-h-[92vh] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2.5 border-[#121212] dark:border-[#FAF7F0] pb-3 mb-3 sm:mb-4 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF5C35] border-2 border-[#121212] text-[#FAF7F0] flex items-center justify-center font-heading font-black text-sm shadow-[2px_2px_0px_0px_#121212] shrink-0">
              MK
            </div>
            <div>
              <h3 id="resume-dialog-title" className="font-heading font-black text-base sm:text-xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0] leading-tight">
                Mukul Kumar — Resume Preview
              </h3>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#555555] dark:text-[#A3A3A3] uppercase">
                Software Engineer · IIT Hyderabad &apos;26
              </p>
            </div>
          </div>

          {/* Controls: View Tabs & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="inline-flex border-2 border-[#121212] dark:border-[#FAF7F0] p-0.5 bg-[#EAE5D9] dark:bg-[#242424]">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'pdf'
                    ? 'bg-[#FF5C35] text-[#FAF7F0] shadow-sm'
                    : 'text-[#555555] dark:text-[#CCCCCC] hover:text-[#121212] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <FileText size={12} />
                <span>PDF Document</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'overview'
                    ? 'bg-[#FF5C35] text-[#FAF7F0] shadow-sm'
                    : 'text-[#555555] dark:text-[#CCCCCC] hover:text-[#121212] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <Eye size={12} />
                <span>Quick Text</span>
              </button>
            </div>

            {/* Direct Open in New Tab */}
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FACC15] text-[#121212] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              title="Open raw PDF in new browser tab"
            >
              <span>New Tab</span>
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            </a>

            {/* Close Button */}
            <button
              onClick={closeResumeDialog}
              aria-label="Close resume preview"
              className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#202020] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] hover:bg-[#FF5C35] hover:text-[#FAF7F0] transition-colors cursor-pointer shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative w-full flex-1 min-h-0 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#111111] shadow-inner overflow-hidden flex flex-col">
          {activeTab === 'pdf' ? (
            /* PDF Document Viewer */
            <div className="relative w-full h-full flex-1 bg-[#525659]">
              <iframe
                src={`${resume.pdfPath}#toolbar=1&navpanes=0&view=FitH`}
                className="w-full h-full block border-0"
                title="Mukul Kumar Resume PDF Document"
              />
            </div>
          ) : (
            /* Structured Clean Text View */
            <div className="w-full h-full overflow-y-auto p-4 sm:p-8 font-sans bg-[#FAF7F0] dark:bg-[#181818] text-[#121212] dark:text-[#FAF7F0] space-y-6">
              {/* Profile Intro */}
              <div className="border-b-2 border-[#121212]/20 dark:border-[#FAF7F0]/20 pb-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
                    Mukul Kumar
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#FF5C35]">
                    IIT Hyderabad · B.Tech ’26
                  </span>
                </div>
                <p className="font-sans text-sm text-[#444444] dark:text-[#CCCCCC] mt-1">
                  Software Engineer specializing in backend systems, distributed architectures, and AI applications.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5C35]">
                  <GraduationCap size={15} />
                  <span>Education</span>
                </div>
                <div className="border-2 border-[#121212] dark:border-[#FAF7F0] p-3.5 bg-[#FFFFFF] dark:bg-[#202020]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 font-heading font-bold text-base">
                    <span>Indian Institute of Technology Hyderabad (IITH)</span>
                    <span className="font-mono text-xs text-[#666666] dark:text-[#AAAAAA]">2022 – 2026</span>
                  </div>
                  <p className="font-mono text-xs text-[#555555] dark:text-[#CCCCCC] mt-1">
                    B.Tech in Chemical Engineering · Minor / Specialization Focus in Computer Science
                  </p>
                  <p className="font-mono text-xs text-[#888888] dark:text-[#999999] mt-0.5">
                    Coursework: Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Computer Networks.
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5C35]">
                  <Briefcase size={15} />
                  <span>Work Experience</span>
                </div>
                <div className="border-2 border-[#121212] dark:border-[#FAF7F0] p-3.5 bg-[#FFFFFF] dark:bg-[#202020] space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 font-heading font-bold text-base">
                    <span className="text-[#FF5C35]">People Tech Group Inc</span>
                    <span className="font-mono text-xs text-[#666666] dark:text-[#AAAAAA]">Jun 2025 – Aug 2025</span>
                  </div>
                  <p className="font-mono text-xs font-semibold text-[#121212] dark:text-[#FAF7F0]">
                    Software Developer Intern – Software-Defined Vehicles (SDV)
                  </p>
                  <ul className="list-disc list-inside font-sans text-xs text-[#444444] dark:text-[#CCCCCC] space-y-1 pl-1">
                    <li>
                      Engineered high-throughput SOME/IP message bridging middleware using C++ and vsomeip.
                    </li>
                    <li>
                      Implemented zero-copy Protobuf serialization pipelines for real-time CAN/Ethernet ECU signal exchange.
                    </li>
                    <li>
                      Optimized end-to-end packet processing latency under heavy synthetic bus load simulations.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Technical Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5C35]">
                  <Code2 size={15} />
                  <span>Technical Competencies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="border border-[#121212] dark:border-[#FAF7F0] p-2.5 bg-[#FFFFFF] dark:bg-[#202020]">
                    <span className="font-bold text-[#FF5C35] block mb-1">Languages:</span>
                    <span>C++, Java, Python, TypeScript, SQL, Bash</span>
                  </div>
                  <div className="border border-[#121212] dark:border-[#FAF7F0] p-2.5 bg-[#FFFFFF] dark:bg-[#202020]">
                    <span className="font-bold text-[#FF5C35] block mb-1">Backend &amp; Frameworks:</span>
                    <span>Spring Boot, FastAPI, Node.js, Express, Next.js</span>
                  </div>
                  <div className="border border-[#121212] dark:border-[#FAF7F0] p-2.5 bg-[#FFFFFF] dark:bg-[#202020]">
                    <span className="font-bold text-[#FF5C35] block mb-1">Systems &amp; Middleware:</span>
                    <span>SOME/IP (vsomeip), Protocol Buffers, POSIX, Docker</span>
                  </div>
                  <div className="border border-[#121212] dark:border-[#FAF7F0] p-2.5 bg-[#FFFFFF] dark:bg-[#202020]">
                    <span className="font-bold text-[#FF5C35] block mb-1">Databases &amp; Tools:</span>
                    <span>PostgreSQL, Redis, SQLite, Git, Linux, Jest</span>
                  </div>
                </div>
              </div>

              {/* Open Source Contribution */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5C35]">
                  <Sparkles size={15} />
                  <span>Open Source</span>
                </div>
                <div className="border-2 border-[#121212] dark:border-[#FAF7F0] p-3.5 bg-[#FFFFFF] dark:bg-[#202020]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 font-heading font-bold text-base">
                    <span>Budibase (Open Source Low-Code Platform)</span>
                    <a
                      href="https://github.com/Budibase/budibase/pull/19667"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#FF5C35] hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      <span>PR #19667 Merged</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <p className="font-sans text-xs text-[#444444] dark:text-[#CCCCCC] mt-1">
                    Resolved component unmount race conditions in custom plugin architectures, optimizing re-render overhead.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls & fallback links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 mt-3 border-t-2 border-[#121212]/20 dark:border-[#FAF7F0]/20 font-mono text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#555555] dark:text-[#A3A3A3]">
            <FileText size={13} className="text-[#FF5C35]" />
            <span>Updated {resume.lastUpdated}</span>
            <span className="hidden md:inline">·</span>
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-[#FF5C35] hover:underline font-bold"
            >
              <span>Direct PDF Link</span>
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Download Button */}
            <a
              href={resume.pdfPath}
              download="Mukul_Kumar_Resume.pdf"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] border-2 border-[#121212] dark:border-[#FAF7F0] hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-[#121212] transition-colors font-bold uppercase text-[11px] sm:text-xs"
            >
              <Download size={13} />
              <span>Download</span>
            </a>

            {/* Open in New Tab for Mobile */}
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FACC15] text-[#121212] border-2 border-[#121212] font-bold uppercase text-[11px]"
            >
              <span>New Tab</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Close */}
            <button
              onClick={closeResumeDialog}
              className="px-4 py-1.5 bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212] font-mono text-xs font-bold uppercase cursor-pointer hover:bg-[#FF5C35] dark:hover:bg-[#FF5C35] dark:hover:text-[#FAF7F0] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
