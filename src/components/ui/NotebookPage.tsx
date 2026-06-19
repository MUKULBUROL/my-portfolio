'use client'

import React from 'react'
import Link from 'next/link'
import { ProjectMinimalVisual } from './ProjectMinimalVisual'
import type { ProjectItem } from '@/types'

interface NotebookPageProps {
  project: ProjectItem
  idx: number
  totalCount: number
  addPageRef: (el: HTMLDivElement | null, idx: number) => void
}

export function NotebookPage({ project, idx, totalCount, addPageRef }: NotebookPageProps) {
  return (
    <div
      ref={(el) => addPageRef(el, idx)}
      className="page absolute inset-0 notebook-page-container"
      style={{
        zIndex: 10 + (totalCount - 1 - idx),
      }}
      data-cursor-label="Scroll"
    >
      {/* ── FRONT FACE (current project) ── */}
      <div className="page-face page-front absolute inset-0 flex overflow-hidden project-card notebook-page-front">
        {/* Paper texture lines */}
        <div className="absolute inset-0 pointer-events-none notebook-page-lines" aria-hidden="true" />

        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 pointer-events-none notebook-page-red-margin" aria-hidden="true" />

        {/* Page edge right */}
        <div className="absolute top-0 right-0 bottom-0 pointer-events-none notebook-page-edge-right" aria-hidden="true" />

        {/* Content layout */}
        <div className="flex flex-col md:flex-row w-full h-full p-6 md:p-10 gap-6">
          {/* Left: project visual */}
          <div className="hidden md:flex flex-1 items-center justify-center min-h-0">
            <div className="w-full h-full max-h-64 md:max-h-none">
              <ProjectMinimalVisual projectId={project.id} />
            </div>
          </div>

          {/* Right: project details */}
          <div className="flex-1 flex flex-col justify-center gap-3 md:pl-6 md:border-l border-[#111111]/10">
            <span className="font-mono text-[8px] text-[#9b8b78] uppercase tracking-[0.25em]">
              Page {String(idx + 1).padStart(2, '0')} · {project.status.toUpperCase()}
            </span>

            <h3 className="text-2xl sm:text-3xl font-heading font-black leading-tight text-[#111111]">
              {project.name}
            </h3>

            <p className="text-xs text-[#6b6b6b] leading-relaxed font-sans line-clamp-3">
              {project.results || project.solution}
            </p>

            <div className="flex flex-wrap gap-1 mt-1">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="tech-tag text-[9px] font-mono px-2 py-0.5 rounded-full text-[#111111]/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={`/selected-work/${project.id}`}
              className="read-story mt-2 self-start text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] pb-0.5 hover:text-[#7C3AED] transition-colors"
            >
              Read Story →
            </Link>
          </div>
        </div>

        {/* Corner page number */}
        <span className="absolute bottom-3 right-5 font-mono text-[9px] text-[#9b8b78]" aria-hidden="true">
          {idx + 1}
        </span>
      </div>

      {/* ── BACK FACE (what you see mid-flip) ── */}
      <div className="page-face page-back absolute inset-0 notebook-page-back">
        {/* Paper grain on back */}
        <div className="absolute inset-0 notebook-page-back-lines" aria-hidden="true" />
        <span className="font-mono text-[9px] text-[#9b8b78] uppercase tracking-widest rotate-180">
          — Flip —
        </span>
      </div>
    </div>
  )
}
