'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { skillCategories, galaxyNodes } from '@/data/skills'
import { revealOnScroll } from '@/lib/animations'
import { cn } from '@/lib/utils'

const CanvasContainer = dynamic(
  () => import('../3d/CanvasContainer').then((m) => m.CanvasContainer),
  { ssr: false }
)
const SkillsGalaxy = dynamic(
  () => import('../3d/SkillsGalaxy').then((m) => m.SkillsGalaxy),
  { ssr: false }
)

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>('AI & LLMs')
  const headerRef = useRef<HTMLDivElement>(null)

  const activeNode = galaxyNodes.find((n) => n.name === activeSkill)

  useEffect(() => {
    revealOnScroll(headerRef.current)
  }, [])

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Technical Depth"
            eyebrowNumber="04"
            title="Skills Galaxy"
            subtitle="Interact with the 3D galaxy — hover nodes to see details, click to focus and explore each technology."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skill categories list */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {skillCategories.map((cat) => (
              <GlassCard
                key={cat.name}
                className="p-4 border-white/6 hover:border-white/12"
                hoverEffect={false}
                glowColor="none"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                    aria-hidden="true"
                  />
                  <h3 className="text-xs font-mono text-white font-semibold uppercase tracking-widest">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.slice(0, 5).map((skill) => (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(skill.name)}
                      className={cn(
                        'text-[9px] font-mono px-2 py-0.5 rounded border transition-all duration-200',
                        skill.name === activeSkill
                          ? 'bg-white text-[#050816] border-white font-bold'
                          : skill.highlighted
                          ? 'bg-white/8 border-white/15 text-white'
                          : 'bg-white/3 border-white/6 text-muted hover:text-white'
                      )}
                      aria-pressed={skill.name === activeSkill}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Galaxy Canvas + info panel */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* 3D Canvas */}
            <div className="h-[380px] lg:h-[440px] glass rounded-2xl overflow-hidden border-white/6 relative">
              <div className="absolute top-3 left-4 z-10 pointer-events-none select-none">
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest">orbit: galaxy_space</span>
              </div>
              <CanvasContainer cameraPosition={[0, 1.5, 8]} fov={58}>
                <SkillsGalaxy activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
              </CanvasContainer>
            </div>

            {/* Active skill info */}
            {activeNode && (
              <GlassCard
                className="p-5 border-white/6"
                glowColor="none"
                hoverEffect={false}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeNode.color, boxShadow: `0 0 10px ${activeNode.color}` }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                    {activeNode.category}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{activeNode.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{activeNode.description}</p>

                {/* Proficiency bar */}
                <div className="mt-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-muted">Proficiency</span>
                    <span className="text-[9px] font-mono text-white">{activeNode.proficiency * 20}%</span>
                  </div>
                  <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${activeNode.proficiency * 20}%`,
                        backgroundColor: activeNode.color,
                        boxShadow: `0 0 8px ${activeNode.color}`,
                      }}
                    />
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
