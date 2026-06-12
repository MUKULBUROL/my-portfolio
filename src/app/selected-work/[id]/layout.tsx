import type { Metadata } from 'next'
import { projects } from '@/data/projects'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Mukul Kumar`,
      description: project.tagline,
      type: 'article',
      tags: project.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Mukul Kumar`,
      description: project.tagline,
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
