'use client'

import React, { useEffect } from 'react'
import { useUI } from '@/context/UIContext'
import { resume } from '@/data/resume'
import { X, FileText, ArrowUpRight, ExternalLink } from 'lucide-react'

export function ResumeDialog() {
  const { isResumeOpen, closeResumeDialog } = useUI()

  // Close on Escape key
  useEffect(() => {
    if (!isResumeOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeResumeDialog()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isResumeOpen, closeResumeDialog])

  if (!isResumeOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
      className="fixed inset-0 z-[99990] flex items-center justify-center bg-[#121212]/85 backdrop-blur-md p-3 sm:p-6"
    >
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={closeResumeDialog}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl border-3 border-[#121212] bg-[#FAF7F0] dark:bg-[#181818] p-4 sm:p-6 shadow-[10px_10px_0px_0px_#FF5C35] dark:border-[#FAF7F0] dark:shadow-[10px_10px_0px_0px_#000000] z-10 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2.5 border-[#121212] dark:border-[#FAF7F0] pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF5C35] border-2 border-[#121212] text-[#121212] flex items-center justify-center font-heading font-black text-sm shadow-[2px_2px_0px_0px_#121212]">
              MK
            </div>
            <div>
              <h3 id="resume-dialog-title" className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0] leading-tight">
                Mukul Kumar — Resume Preview
              </h3>
              <p className="font-mono text-[11px] text-[#555555] dark:text-[#A3A3A3] uppercase">
                Software Engineer · IIT Hyderabad &apos;26
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Open in new tab button */}
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FACC15] text-[#121212] font-mono text-xs font-bold uppercase tracking-wider"
              title="Open full PDF in a new browser tab"
            >
              <span>Open in New Tab</span>
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            </a>

            {/* Close button */}
            <button
              onClick={closeResumeDialog}
              aria-label="Close resume preview"
              className="w-9 h-9 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#202020] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212] hover:bg-[#FF5C35] hover:text-[#FAF7F0] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Preview Frame */}
        <div className="relative w-full flex-1 min-h-[55vh] sm:min-h-[68vh] border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] shadow-inner overflow-hidden">
          <iframe
            src={`${resume.pdfPath}#toolbar=1&navpanes=0&view=FitH`}
            className="w-full h-full block"
            title="Mukul Kumar Resume PDF Document"
          />
        </div>

        {/* Footer controls & fallback link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-3 border-t-2 border-[#121212]/20 dark:border-[#FAF7F0]/20 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#555555] dark:text-[#A3A3A3]">
            <FileText size={13} className="text-[#FF5C35]" />
            <span>Updated {resume.lastUpdated} · PDF format</span>
            <span className="hidden md:inline">·</span>
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-[#FF5C35] hover:underline font-bold"
            >
              <span>Direct Link</span>
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={resume.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn sm:hidden flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FACC15] text-[#121212] font-mono text-xs font-bold uppercase tracking-wider text-center"
            >
              <span>Open in New Tab</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={closeResumeDialog}
              className="brutal-btn px-4 py-2 bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212] font-mono text-xs font-bold uppercase cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
