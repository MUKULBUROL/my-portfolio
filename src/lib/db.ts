import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { projects as staticProjects } from '@/data/projects'
import type { ProjectItem } from '@/types'

const connectionString = process.env.DATABASE_URL

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
} else {
  if (!globalForPrisma.prisma) {
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }
  prisma = globalForPrisma.prisma
}

export { prisma }

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  // First check static projects
  const staticProj = staticProjects.find((p) => p.id === id)
  if (staticProj) {
    return staticProj
  }

  // Fallback to database
  const dbUrl = process.env.DATABASE_URL
  if (dbUrl && !dbUrl.includes('johndoe')) {
    try {
      const p = await prisma.project.findUnique({
        where: { id },
      })
      if (p) {
        return {
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
        }
      }
    } catch (err) {
      console.error('Error fetching project from DB by ID:', err)
    }
  }

  return null
}
