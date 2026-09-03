import type { Metadata } from 'next'
import { getProjectById } from '@/lib/db'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)

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
