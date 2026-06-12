import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Pause } from '@/components/sections/Pause'
import { HowIThink } from '@/components/sections/HowIThink'
import { WhatImBuildingNext } from '@/components/sections/WhatImBuildingNext'
import { Connect } from '@/components/sections/Connect'
import { InteractiveSVGDivider } from '@/components/ui/InteractiveSVGDivider'
import { prisma } from '@/lib/db'
import type { ProjectItem } from '@/types'

async function getProjectsFromDb(): Promise<ProjectItem[]> {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('johndoe')) {
    return []
  }

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return dbProjects.map((p) => ({
      id: p.id,
      name: p.title,
      tagline: p.description.slice(0, 80) + '...',
      description: p.description,
      problem: p.problem,
      solution: p.results,
      architecture: p.architecture,
      challenges: p.challenges,
      results: p.results,
      metrics: p.metrics ? [p.metrics] : [],
      techStack: p.techStack,
      tags: p.techStack.slice(0, 3),
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
      imageUrl: p.imageUrl || undefined,
      featured: p.featured,
      status: 'production',
      lessonsLearned: '',
    }))
  } catch (err) {
    console.error('Error fetching database projects, falling back to static projects:', err)
    return []
  }
}

export default async function HomePage() {
  const dbProjects = await getProjectsFromDb()

  return (
    <>
      <Hero />

      <InteractiveSVGDivider />

      <Skills />

      <InteractiveSVGDivider />

      <SelectedWork initialProjects={dbProjects} />

      <InteractiveSVGDivider />

      <Pause />

      <InteractiveSVGDivider />

      <HowIThink />

      <InteractiveSVGDivider />

      <WhatImBuildingNext />

      <InteractiveSVGDivider />

      <Connect />
    </>
  )
}


