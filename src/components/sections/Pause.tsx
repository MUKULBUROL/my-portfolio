'use client'

import React from 'react'

export function Pause() {
  return (
    <section id="pause" className="py-40 md:py-52 bg-[#f5efe8] relative overflow-hidden select-none" aria-label="Philosophy">
      <div className="max-w-4xl mx-auto px-8 md:px-16 flex flex-col justify-center min-h-[30vh]">
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] text-[#111111] max-w-3xl">
            I believe software should feel effortless.
          </p>
          <p className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] text-[#6b6b6b]/70 max-w-3xl pl-4 sm:pl-8 border-l border-[#111111]/15">
            The best systems disappear.
          </p>
        </div>
      </div>
    </section>
  )
}
