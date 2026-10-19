'use client'

import React from 'react'
import { useUI } from '@/context/UIContext'
import { Rocket, Cpu, CheckCircle2, ArrowRight } from 'lucide-react'

export function CompileTransition() {
  const { isTransitioning, transitionProgress, transitionPhase, targetSection } = useUI()

  if (!isTransitioning) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Compiling and navigating"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#121212]/95 backdrop-blur-md text-[#FAF7F0] p-4 select-none"
    >
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid-dark pointer-events-none opacity-40" />

      {/* Centered Compile Panel */}
      <div className="relative z-10 w-full max-w-md border-3 border-[#FAF7F0] bg-[#121212] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#FF5C35]">
        
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#FAF7F0]/30 pb-3 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF5C35] inline-block border border-[#121212]" />
            <span className="w-3 h-3 bg-[#FACC15] inline-block border border-[#121212]" />
            <span className="w-3 h-3 bg-[#A3E635] inline-block border border-[#121212]" />
            <span className="font-bold uppercase tracking-wider ml-1 text-[#FAF7F0]">COMPILER // RUN</span>
          </div>
          <span className="text-[#A3E635] font-bold text-[11px] animate-pulse">
            LIVE_EXEC
          </span>
        </div>

        {/* Heading & Dots */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="text-[#FF5C35] w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#FAF7F0]">
              Compiling your request
              <span className="inline-flex overflow-hidden tracking-normal">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
              </span>
            </h3>
          </div>
          <p className="font-mono text-xs text-[#FAF7F0]/70">
            Target destination: <span className="text-[#38BDF8] font-bold">#{targetSection || 'system'}</span>
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-6">
          <div className="flex justify-between items-center font-mono text-xs mb-2">
            <span className="text-[#FAF7F0]/80 uppercase">Progress</span>
            <span className="text-[#A3E635] font-bold">{Math.round(transitionProgress)}%</span>
          </div>
          <div className="w-full h-4 border-2 border-[#FAF7F0] bg-[#1C1C1C] p-0.5 overflow-hidden">
            <div
              className="h-full bg-[#A3E635] progress-striped transition-all duration-150 ease-out"
              style={{ width: `${transitionProgress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators: resolve → build → launch */}
        <div className="flex items-center justify-between font-mono text-[11px] border-t-2 border-[#FAF7F0]/20 pt-4 mb-6">
          <div className={`flex items-center gap-1.5 font-bold ${transitionPhase === 'resolve' ? 'text-[#FF5C35]' : 'text-[#A3E635]'}`}>
            {transitionPhase !== 'resolve' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-ping" />}
            <span>RESOLVE</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#FAF7F0]/40" />
          <div className={`flex items-center gap-1.5 font-bold ${transitionPhase === 'build' ? 'text-[#FACC15]' : transitionPhase === 'launch' ? 'text-[#A3E635]' : 'text-[#FAF7F0]/40'}`}>
            {transitionPhase === 'launch' ? <CheckCircle2 className="w-3.5 h-3.5" /> : transitionPhase === 'build' ? <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping" /> : null}
            <span>BUILD</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#FAF7F0]/40" />
          <div className={`flex items-center gap-1.5 font-bold ${transitionPhase === 'launch' ? 'text-[#38BDF8]' : 'text-[#FAF7F0]/40'}`}>
            {transitionPhase === 'launch' && <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />}
            <span>LAUNCH</span>
          </div>
        </div>

        {/* Rocket Launch Animation Container */}
        <div className="relative h-16 border-2 border-dashed border-[#FAF7F0]/30 bg-[#141414] overflow-hidden flex items-center justify-center">
          <div
            className="absolute transition-transform duration-300 ease-in-out flex flex-col items-center"
            style={{
              transform: transitionPhase === 'launch'
                ? 'translateY(-120px) scale(1.1)'
                : transitionPhase === 'build'
                ? 'translateY(0px) scale(1)'
                : 'translateY(6px) scale(0.95)',
            }}
          >
            <Rocket className="w-7 h-7 text-[#FF5C35] -rotate-45" />
            {/* Rocket exhaust trail */}
            {transitionPhase === 'launch' && (
              <div className="w-2 h-8 bg-gradient-to-t from-transparent via-[#FACC15] to-[#FF5C35] animate-pulse rounded-full mt-1" />
            )}
          </div>
          <div className="absolute bottom-1 right-2 font-mono text-[9px] text-[#FAF7F0]/40">
            ENGINE_THRUST: ACTIVE
          </div>
        </div>

      </div>
    </div>
  )
}
