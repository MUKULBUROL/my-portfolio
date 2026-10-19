'use client'

import React, { useState, useRef, useMemo } from 'react'
import { useUI } from '@/context/UIContext'
import { GripVertical, RotateCcw, Sparkles } from 'lucide-react'

interface DraggableTech {
  id: string
  name: string
  category: string
  bgColor: string
  textColor: string
  borderAccent?: string
  isCustom?: boolean
}

const defaultTechnologies: DraggableTech[] = [
  { id: 'cpp', name: 'C++', category: 'Systems', bgColor: '#FF5C35', textColor: '#FAF7F0' },
  { id: 'java', name: 'Java', category: 'Backend', bgColor: '#FACC15', textColor: '#121212' },
  { id: 'python', name: 'Python', category: 'AI & Data', bgColor: '#38BDF8', textColor: '#121212' },
  { id: 'typescript', name: 'TypeScript', category: 'Open Source', bgColor: '#3178C6', textColor: '#FAF7F0' },
  { id: 'springboot', name: 'Spring Boot', category: 'Backend', bgColor: '#A3E635', textColor: '#121212' },
  { id: 'fastapi', name: 'FastAPI', category: 'Async APIs', bgColor: '#FAF7F0', textColor: '#121212' },
  { id: 'someip', name: 'SOME/IP', category: 'Automotive SDV', bgColor: '#FF5C35', textColor: '#FAF7F0' },
  { id: 'protobuf', name: 'Protobuf', category: 'Serialization', bgColor: '#FACC15', textColor: '#121212' },
  { id: 'docker', name: 'Docker', category: 'DevOps', bgColor: '#121212', textColor: '#FAF7F0' },
  { id: 'jest', name: 'Jest', category: 'Testing', bgColor: '#C21325', textColor: '#FAF7F0' },
]

export function Skills() {
  const { parsedResume } = useUI()
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const dragStartRef = useRef<{ id: string; startX: number; startY: number; initialX: number; initialY: number } | null>(null)

  // Derive tech list including detected resume skills without setting state in an effect
  const techList = useMemo(() => {
    if (parsedResume && parsedResume.skills && parsedResume.skills.length > 0) {
      const palette = ['#FF5C35', '#A3E635', '#38BDF8', '#FACC15', '#FAF7F0']
      const existingNames = new Set(defaultTechnologies.map((t) => t.name.toLowerCase()))
      
      const newCustomTechs: DraggableTech[] = parsedResume.skills
        .filter((skill) => !existingNames.has(skill.toLowerCase()))
        .map((skill, index) => ({
          id: `custom-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          name: skill,
          category: 'Resume Match',
          bgColor: palette[index % palette.length],
          textColor: palette[index % palette.length] === '#121212' || palette[index % palette.length] === '#FF5C35' ? '#FAF7F0' : '#121212',
          isCustom: true,
        }))

      return [...defaultTechnologies, ...newCustomTechs]
    }
    return defaultTechnologies
  }, [parsedResume])

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    // Only accept primary pointer button
    if (e.button !== 0 && e.pointerType === 'mouse') return

    const currentPos = positions[id] || { x: 0, y: 0 }
    dragStartRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y,
    }

    // For mouse, immediately capture and start dragging
    if (e.pointerType !== 'touch') {
      e.preventDefault()
      const target = e.currentTarget
      try {
        if (typeof target.setPointerCapture === 'function') {
          target.setPointerCapture(e.pointerId)
        }
      } catch {}
      setActiveDragId(id)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const currentDrag = dragStartRef.current
    if (!currentDrag) return

    const deltaX = e.clientX - currentDrag.startX
    const deltaY = e.clientY - currentDrag.startY

    // If on touch device, verify horizontal intent before locking scroll
    if (e.pointerType === 'touch' && activeDragId !== currentDrag.id) {
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        try {
          if (typeof e.currentTarget.setPointerCapture === 'function') {
            e.currentTarget.setPointerCapture(e.pointerId)
          }
        } catch {}
        setActiveDragId(currentDrag.id)
      } else if (Math.abs(deltaY) > 8) {
        // Vertical swipe intent: do not trap scroll
        dragStartRef.current = null
        return
      } else {
        return
      }
    }

    if (currentDrag.id !== activeDragId) return

    const targetId = currentDrag.id
    const nextX = Math.round(currentDrag.initialX + deltaX)
    const nextY = Math.round(currentDrag.initialY + deltaY)

    setPositions((prev) => ({
      ...prev,
      [targetId]: {
        x: nextX,
        y: nextY,
      },
    }))
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget && typeof e.currentTarget.hasPointerCapture === 'function') {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
      }
    } catch {}
    setActiveDragId(null)
    dragStartRef.current = null
  }

  const handleDoubleClick = (id: string) => {
    setPositions((prev) => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
  }

  const handleResetAll = () => {
    setPositions({})
    setActiveDragId(null)
    dragStartRef.current = null
  }

  return (
    <section
      id="skills"
      aria-label="Draggable Technical Stack"
      className="relative py-20 bg-[#FAF7F0] dark:bg-[#121212] border-t-3 border-[#121212] dark:border-[#FAF7F0] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2.5 border-[#121212] dark:border-[#FAF7F0] pb-6 mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FF5C35] mb-2">
              <span>STACK // INTERACTION</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#121212] dark:text-[#FAF7F0]">
              Move the stack around.
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#555555] dark:text-[#A3A3A3] mt-2">
              Drag the objects. Double-click one to snap it back.
            </p>
          </div>

          <button
            onClick={handleResetAll}
            className="self-start sm:self-auto brutal-btn flex items-center gap-2 bg-[#FAF7F0] dark:bg-[#1C1C1C] text-[#121212] dark:text-[#FAF7F0] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset stack</span>
          </button>
        </div>

        {/* Draggable Sandbox Arena */}
        <div className="relative min-h-[360px] sm:min-h-[320px] border-2.5 border-dashed border-[#121212]/40 dark:border-[#FAF7F0]/40 bg-[#FAF7F0]/50 dark:bg-[#181818]/50 p-6 flex flex-wrap gap-4 sm:gap-6 items-center justify-center touch-pan-y">
          
          {techList.map((item) => {
            const pos = positions[item.id] || { x: 0, y: 0 }
            const isDragging = activeDragId === item.id

            return (
              <div
                key={item.id}
                onPointerDown={(e) => handlePointerDown(item.id, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handlePointerUp}
                onDoubleClick={() => handleDoubleClick(item.id)}
                className={`relative cursor-grab active:cursor-grabbing border-2.5 border-[#121212] dark:border-[#FAF7F0] p-4 sm:p-5 flex items-center gap-3 select-none ${
                  isDragging
                    ? 'z-50 shadow-[10px_10px_0px_0px_#121212] dark:shadow-[10px_10px_0px_0px_#000000] scale-105 touch-none'
                    : 'z-10 shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#121212] touch-pan-y'
                }`}
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.15s ease',
                  willChange: isDragging ? 'transform' : 'auto',
                }}
              >
                {/* Drag Grip Handle */}
                <GripVertical className="w-4 h-4 opacity-70 flex-shrink-0" />

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight leading-none">
                      {item.name}
                    </span>
                    {item.isCustom && (
                      <span className="font-mono text-[9px] font-bold uppercase bg-[#FF5C35] text-[#FAF7F0] px-1 py-0.5 ml-1 border border-[#121212]">
                        DETECTED
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider opacity-80 mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>
            )
          })}

        </div>

        {/* Micro instructions strip */}
        <div className="flex items-center justify-between border-t-2 border-[#121212]/20 dark:border-[#FAF7F0]/20 pt-4 mt-6 font-mono text-[11px] text-[#555555] dark:text-[#A3A3A3]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Touch-safe vertical scrolling · Pointer interactive</span>
          </div>
          <span className="hidden sm:inline font-bold uppercase">Double-click any object to reset position</span>
        </div>

      </div>
    </section>
  )
}
