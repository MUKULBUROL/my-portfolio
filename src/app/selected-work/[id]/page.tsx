import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/db'
import { ProjectMinimalVisual } from '@/components/ui/ProjectMinimalVisual'
import { ExternalLink, ShieldAlert, Cpu, GitBranch, Layers, TrendingUp } from 'lucide-react'
import { BackButton } from '@/components/ui/BackButton'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#f5efe8] pt-32 pb-24 text-[#111111] select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Link — smart navigation preserves scroll position */}
        <BackButton />

        {/* Article Header */}
        <header className="mb-12 border-b border-[#111111]/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider mb-3">
            <span>Chapter: Selected Work</span>
            <span>/</span>
            <span className="bg-[#111111]/5 border border-[#111111]/10 px-2 py-0.5 rounded">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-none text-[#111111] mb-4">
            {project.name}
          </h1>
          
          <p className="text-lg sm:text-xl text-[#6b6b6b] font-mono max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </header>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Column (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Story / Overview */}
            <section aria-labelledby="section-story">
              <h2 id="section-story" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <span>01 // The Story</span>
              </h2>
              <p className="text-[#6b6b6b] text-base leading-relaxed font-sans font-medium">
                {project.description}
              </p>
            </section>

            {/* Problem */}
            <section aria-labelledby="section-problem">
              <h2 id="section-problem" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <ShieldAlert size={12} />
                <span>02 // The Problem</span>
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.problem}
              </p>
            </section>

            {/* Approach */}
            <section aria-labelledby="section-approach">
              <h2 id="section-approach" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <Cpu size={12} />
                <span>03 // The Approach</span>
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.solution}
              </p>
            </section>

            {/* System Architecture */}
            <section aria-labelledby="section-architecture">
              <h2 id="section-architecture" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <GitBranch size={12} />
                <span>04 // System Architecture</span>
              </h2>
              <div className="p-6 border border-[#111111]/10 rounded-2xl bg-[#fcfaf7] mb-6">
                <ProjectMinimalVisual projectId={project.id} />
              </div>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.architecture}
              </p>
            </section>

            {/* Challenges */}
            <section aria-labelledby="section-challenges">
              <h2 id="section-challenges" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <Layers size={12} />
                <span>05 // Challenges & Mitigation</span>
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans">
                {project.challenges}
              </p>
            </section>

            {/* Results & Lessons */}
            <section aria-labelledby="section-results">
              <h2 id="section-results" className="text-[10px] font-mono uppercase text-[#6b6b6b] tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-[#111111]/5 pb-2">
                <TrendingUp size={12} />
                <span>06 // Results & Lessons Learned</span>
              </h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans mb-6">
                {project.results}
              </p>
              {project.lessonsLearned && (
                <div className="p-5 border-l border-[#111111]/15 bg-[#111111]/2 rounded-r-xl">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#111111] block mb-1">Lesson Learned</span>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed font-sans italic">
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
              <div className="p-6 border border-[#111111]/8 rounded-2xl bg-[#fcfaf7]">
                <h3 className="text-[9px] font-mono uppercase text-[#6b6b6b] tracking-widest mb-4 font-bold border-b border-[#111111]/5 pb-2">
                  Metrics &amp; Performance
                </h3>
                <ul className="flex flex-col gap-3">
                  {project.metrics.map((metric, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#111111] font-bold text-xs mt-0.5">↳</span>
                      <span className="text-xs text-[#6b6b6b] font-mono">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="p-6 border border-[#111111]/8 rounded-2xl bg-[#fcfaf7]">
              <h3 className="text-[9px] font-mono uppercase text-[#6b6b6b] tracking-widest mb-4 font-bold border-b border-[#111111]/5 pb-2">
                System Components
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-0.5 rounded text-[#111111]/80"
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
                  className="flex items-center justify-center gap-2 py-3.5 bg-[#111111] hover:bg-[#222222] text-[#f5efe8] rounded-xl text-xs font-mono font-bold transition-all hover:shadow-sm"
                >
                  <ExternalLink size={13} />
                  <span>Launch Live System</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 border border-[#111111]/10 hover:bg-[#111111]/5 text-[#111111] rounded-xl text-xs font-mono font-bold transition-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
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
