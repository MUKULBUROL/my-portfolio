import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Experience } from '@/components/sections/Experience'
import { About } from '@/components/sections/About'
import { Connect } from '@/components/sections/Connect'
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
      category: (p.techStack.includes('Python') ? 'AI' : p.techStack.includes('C++') ? 'Systems' : 'Backend') as 'Backend' | 'AI' | 'Systems',
      tagline: p.description.slice(0, 80) + '...',
      description: p.description,
      problem: p.problem,
      solution: p.results,
      architecture: p.architecture,
      challenges: p.challenges,
      results: p.results,
      highlights: p.metrics ? [p.metrics] : [],
      metrics: p.metrics ? [p.metrics] : [],
      techStack: p.techStack,
      tags: p.techStack.slice(0, 3),
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
      imageUrl: p.imageUrl || undefined,
      featured: p.featured,
      status: 'production',
      lessonsLearned: '',
      accentColor: '#FF5C35',
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
      {/* 01. Hero Section */}
      <Hero />

      {/* 02. Draggable Stack Section */}
      <Skills />

      {/* 03. Work Section */}
      <SelectedWork initialProjects={dbProjects} />

      {/* 04. Experience Section */}
      <Experience />

      {/* 05. About Section */}
      <About />

      {/* 06. Contact Section */}
      <Connect />

    </>
  )
}
