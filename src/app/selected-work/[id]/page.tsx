import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/db'
import { projects } from '@/data/projects'
import { ExternalLink, ShieldAlert, Cpu, GitBranch, Layers, TrendingUp } from 'lucide-react'
import { BackButton } from '@/components/ui/BackButton'

export function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#FAF7F0] dark:bg-[#121212] pt-32 pb-24 text-[#121212] dark:text-[#FAF7F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <BackButton />

        {/* Article Header */}
        <header className="mb-12 border-b-3 border-[#121212] dark:border-[#FAF7F0] pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="text-[#FF5C35]">Chapter: Selected Work</span>
            <span>/</span>
            <span className="border border-[#121212] dark:border-[#FAF7F0] px-2 py-0.5 bg-[#FAF7F0] dark:bg-[#1C1C1C]">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-none uppercase text-[#121212] dark:text-[#FAF7F0] mb-4">
            {project.name}
          </h1>
          
          <p className="text-base sm:text-lg text-[#555555] dark:text-[#A3A3A3] font-mono max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </header>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Column (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Story / Overview */}
            <section aria-labelledby="section-story" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-story" className="font-mono text-xs uppercase font-bold tracking-wider text-[#FF5C35] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <span>01 // Overview</span>
              </h2>
              <p className="text-[#121212] dark:text-[#FAF7F0] text-base leading-relaxed font-sans font-medium">
                {project.description}
              </p>
            </section>

            {/* Problem */}
            <section aria-labelledby="section-problem" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-problem" className="font-mono text-xs uppercase font-bold tracking-wider text-[#FF5C35] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <ShieldAlert size={14} />
                <span>02 // The Problem</span>
              </h2>
              <p className="text-[#555555] dark:text-[#A3A3A3] text-sm leading-relaxed font-sans">
                {project.problem}
              </p>
            </section>

            {/* Approach */}
            <section aria-labelledby="section-approach" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-approach" className="font-mono text-xs uppercase font-bold tracking-wider text-[#38BDF8] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <Cpu size={14} />
                <span>03 // Technical Approach</span>
              </h2>
              <p className="text-[#555555] dark:text-[#A3A3A3] text-sm leading-relaxed font-sans">
                {project.solution}
              </p>
            </section>

            {/* System Architecture */}
            <section aria-labelledby="section-architecture" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-architecture" className="font-mono text-xs uppercase font-bold tracking-wider text-[#FACC15] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <GitBranch size={14} />
                <span>04 // System Architecture</span>
              </h2>
              <p className="text-[#555555] dark:text-[#A3A3A3] text-sm leading-relaxed font-sans">
                {project.architecture}
              </p>
            </section>

            {/* Challenges */}
            <section aria-labelledby="section-challenges" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-challenges" className="font-mono text-xs uppercase font-bold tracking-wider text-[#A3E635] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <Layers size={14} />
                <span>05 // Challenges &amp; Mitigation</span>
              </h2>
              <p className="text-[#555555] dark:text-[#A3A3A3] text-sm leading-relaxed font-sans">
                {project.challenges}
              </p>
            </section>

            {/* Results & Lessons */}
            <section aria-labelledby="section-results" className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#181818] p-6 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#000000]">
              <h2 id="section-results" className="font-mono text-xs uppercase font-bold tracking-wider text-[#FF5C35] mb-3 flex items-center gap-1.5 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                <TrendingUp size={14} />
                <span>06 // Results &amp; Lessons Learned</span>
              </h2>
              <p className="text-[#555555] dark:text-[#A3A3A3] text-sm leading-relaxed font-sans mb-4">
                {project.results}
              </p>
              {project.lessonsLearned && (
                <div className="p-4 border-2 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#202020]">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5C35] block mb-1">
                    Lesson Learned
                  </span>
                  <p className="text-xs text-[#121212] dark:text-[#FAF7F0] leading-relaxed font-sans italic">
                    &quot;{project.lessonsLearned}&quot;
                  </p>
                </div>
              )}
            </section>

          </main>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
            
            {/* Key Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#181818] p-6 shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000]">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5C35] mb-4 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                  Key Metrics
                </h3>
                <ul className="flex flex-col gap-2.5 font-mono text-xs text-[#121212] dark:text-[#FAF7F0]">
                  {project.metrics.map((metric, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF5C35] font-bold">↳</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#181818] p-6 shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#000000]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-4 border-b border-[#121212]/10 dark:border-[#FAF7F0]/10 pb-2">
                System Components
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs font-bold bg-[#FACC15] text-[#121212] border border-[#121212] px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Links */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-btn flex items-center justify-center gap-2 py-3.5 bg-[#38BDF8] text-[#121212] font-mono text-xs font-bold uppercase"
                >
                  <ExternalLink size={14} />
                  <span>Launch Live System</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-btn flex items-center justify-center gap-2 py-3.5 bg-[#121212] text-[#FAF7F0] dark:bg-[#FAF7F0] dark:text-[#121212] font-mono text-xs font-bold uppercase"
                >
                  <span>Explore Source Code</span>
                </a>
              )}
            </div>

          </aside>

        </div>

      </div>
    </article>
  )
}
