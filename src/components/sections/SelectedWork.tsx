'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { projects as staticProjects } from '@/data/projects'
import type { ProjectItem } from '@/types'
import { useUI } from '@/context/UIContext'
import { BackendProofWidget } from '../ui/BackendProofWidget'
import { ChevronDown, ChevronUp, ExternalLink, ArrowRight, Cpu, Layers } from 'lucide-react'

interface SelectedWorkProps {
  initialProjects?: ProjectItem[]
}

type FilterCategory = 'All' | 'Backend' | 'AI' | 'Systems'

export function SelectedWork({ initialProjects }: SelectedWorkProps) {
  const { navigateWithTransition } = useUI()
  const allProjects = initialProjects && initialProjects.length > 0 ? initialProjects : staticProjects
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'budibase-plugin-pruning': true, // open Budibase open-source contribution by default
  })

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'All') return true
    return p.category === activeFilter
  })

  const filterOptions: FilterCategory[] = ['All', 'Backend', 'AI', 'Systems']

  return (
    <section
      id="work"
      aria-label="Selected Engineering Work"
      className="relative py-20 bg-[#FAF7F0] dark:bg-[#121212] border-t-3 border-[#121212] dark:border-[#FAF7F0] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2.5 border-[#121212] dark:border-[#FAF7F0] pb-6 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-2">
              <span>WORK // PORTFOLIO</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
              Built to do real work.
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#555555] dark:text-[#A3A3A3] mt-2">
              Production backends, AI pipelines, and systems bridges with real architectural trade-offs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project category filters">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  aria-selected={isActive}
                  className={`brutal-btn px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    isActive
                      ? 'bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212]'
                      : 'bg-[#FAF7F0] text-[#121212] dark:bg-[#1C1C1C] dark:text-[#FAF7F0]'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project) => {
            const isExpanded = !!expandedProjects[project.id]
            const accentBg = project.accentColor || '#FF5C35'

            return (
              <article
                key={project.id}
                className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#181818] shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000] transition-all"
              >
                {/* Card Header Bar (Clickable Toggle) */}
                {/* Card Header Bar (Semantic Accessible Toggle Button) */}
                <button
                  type="button"
                  onClick={() => toggleExpand(project.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`project-content-${project.id}`}
                  className="w-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#121212]/5 dark:hover:bg-[#FAF7F0]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C35]"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Color Index Block */}
                    <div
                      className="w-10 h-10 border-2 border-[#121212] text-[#121212] font-mono font-black text-sm flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#121212]"
                      style={{ backgroundColor: accentBg }}
                    >
                      <Layers size={18} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[#121212] bg-[#FAF7F0] dark:bg-[#202020] text-[#121212] dark:text-[#FAF7F0]">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-[#555555] dark:text-[#A3A3A3]">
                          {project.techStack.join(' · ')}
                        </span>
                      </div>
                      <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="font-mono text-xs font-bold uppercase text-[#555555] dark:text-[#A3A3A3] hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Expand Details'}
                    </span>
                    <div className="w-8 h-8 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#202020] text-[#121212] dark:text-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_0px_#121212]">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Content Area */}
                {isExpanded && (
                  <div
                    id={`project-content-${project.id}`}
                    role="region"
                    aria-label={`${project.name} details`}
                    className="border-t-2.5 border-[#121212] dark:border-[#FAF7F0] p-6 sm:p-8 bg-[#FAF7F0]/90 dark:bg-[#1C1C1C]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Column: Description & Highlights (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-5">
                        <div>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#A3A3A3] mb-2">
                            Overview
                          </h4>
                          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#121212] dark:text-[#FAF7F0] font-medium">
                            {project.description}
                          </p>
                        </div>

                        {/* Bullet Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div className="border-2 border-[#121212] dark:border-[#FAF7F0]/30 bg-[#FAF7F0] dark:bg-[#222222] p-4 shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#000000]">
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-3 flex items-center gap-1.5">
                              <Cpu size={14} className="text-[#FF5C35]" />
                              <span>Key Architectural Highlights</span>
                            </h4>
                            <ul className="flex flex-col gap-2 font-mono text-xs text-[#555555] dark:text-[#cccccc] list-none pl-0">
                              {project.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#FF5C35] font-black text-sm">↳</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Actions, Stack Badges & Links (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col gap-5">
                        {/* Tech Stack List */}
                        <div className="border-2 border-[#121212] dark:border-[#FAF7F0]/30 p-4 bg-[#FAF7F0] dark:bg-[#222222] shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#000000]">
                          <span className="font-mono text-xs font-bold uppercase text-[#555555] dark:text-[#A3A3A3] block mb-2">
                            System Components
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-xs font-bold bg-[#FACC15] text-[#121212] border-1.5 border-[#121212] px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_#121212]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons & Links */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
                          <Link
                            href={`/selected-work/${project.id}`}
                            className="brutal-btn flex items-center justify-center gap-2 bg-[#FF5C35] text-[#FAF7F0] py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider hover:brightness-105"
                          >
                            <span>Read Full Case Study</span>
                            <ArrowRight size={14} />
                          </Link>

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="brutal-btn flex items-center justify-center gap-2 bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212] py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                              <span>View Source Code</span>
                              <ExternalLink size={12} />
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="brutal-btn flex items-center justify-center gap-2 bg-[#38BDF8] text-[#121212] py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider"
                            >
                              <ExternalLink size={14} />
                              <span>Live Deployment</span>
                            </a>
                          )}

                          {/* Vehicle Signal Bridge link to Experience */}
                          {project.experienceLink && (
                            <button
                              onClick={() => navigateWithTransition('experience')}
                              className="brutal-btn flex items-center justify-center gap-2 bg-[#A3E635] text-[#121212] py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                              <span>View Internship Experience</span>
                              <ArrowRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>


        {/* Interactive Backend Proof Sandbox */}
        <BackendProofWidget />
      </div>
    </section>
  )
}
