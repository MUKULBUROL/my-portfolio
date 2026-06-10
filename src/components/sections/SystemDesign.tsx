'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { systemDesignDiagrams } from '@/data/systemDesign'
import { cn } from '@/lib/utils'
import { revealOnScroll } from '@/lib/animations'
import { ShieldAlert, GitBranch, Info } from 'lucide-react'

// Rich architectural parameters mapped to each component node
const COMPONENT_DETAILS: Record<
  string,
  { title: string; role: string; scaling: string; failure: string; tradeoff: string }
> = {
  // scalable-web-app nodes
  cdn: {
    title: 'Edge CDN (Cloudflare)',
    role: 'Static content caching, DDoS protection, SSL termination, and edge routing policies.',
    scaling: 'Scales horizontally via global point-of-presence (PoP) edge server instances.',
    failure: 'Heavy origin load on edge cache invalidation delays or miss stampedes.',
    tradeoff: 'Microsecond global response times vs eventual consistency for dynamic content updates.'
  },
  client: {
    title: 'Browser Client (Next.js)',
    role: 'Performs React client-side rendering, coordinates states hydration, and triggers data fetch runs.',
    scaling: 'Bound exclusively by the client device hardware memory and CPU capacities.',
    failure: 'Hydration mismatches or blocking main-thread JS scripts that freeze interaction.',
    tradeoff: 'Instant Static Site Generation (SSG) loading vs high-context Server-Side Rendering (SSR).'
  },
  api: {
    title: 'API Gateway / Rate Limiter',
    role: 'Traffic parsing, token rate limiting, CORS management, and JWT signature verification.',
    scaling: 'Bottlenecked by CPU resources required for cryptographic signature checks.',
    failure: 'Downstream connection pool starvation under sudden traffic spikes.',
    tradeoff: 'Centralized schema and security verification vs microservice decoupling granularity.'
  },
  cache: {
    title: 'Redis Cache Cluster',
    role: 'In-memory caching of database queries, sessions, metadata, and task coordinates.',
    scaling: 'Constrained by allocated memory limits and single-thread write throughput.',
    failure: 'Cache penetrations or database load cascade if key eviction sweeps occur.',
    tradeoff: 'Sub-millisecond access speeds vs handling cache-invalidation sync overhead.'
  },
  service: {
    title: 'Stateless Service Layer',
    role: 'Processes logic flows, runs input audits, executes transactions, and schedules async background jobs.',
    scaling: 'Scales out frictionlessly by spinning up stateless containers behind a load balancer.',
    failure: 'Thread pool exhaustion, out-of-memory errors under heavy arrays parsing, or API timeouts.',
    tradeoff: 'Simplicity of a clean monolith vs network latency overhead of split services.'
  },
  db: {
    title: 'Primary Postgres Database',
    role: 'Relational storage providing strict ACID transactional compliance.',
    scaling: 'Restricted by single-node write capabilities and storage IOPS capacities.',
    failure: 'Row-lock contention on rapid updates; connection limit exhaustion.',
    tradeoff: 'Strict schema constraint guarantees vs horizontal scaling speed of document stores.'
  },
  queue: {
    title: 'Redis/RabbitMQ Job Queue',
    role: 'Buffers asynchronous workloads and triggers retry state machines.',
    scaling: 'Bound by RAM capacity and disk synchronization latency.',
    failure: 'Task queue lag buildup during worker outages, resulting in delayed processing.',
    tradeoff: 'Immediate request return response times vs deferred background execution completions.'
  },

  // ai-agent-system nodes
  coordinator: {
    title: 'Coordinator Agent LLM',
    role: 'Parses complex requests, plans execution chains, and delegates to specialist workers.',
    scaling: 'Limited by model token context window and prompt processing times.',
    failure: 'Prompt loops, hallucinations in tool selections, or context window exhaustion.',
    tradeoff: 'Dynamic task-routing flexibility vs rigid, predictable execution paths.'
  },
  'agent-a': {
    title: 'Code Review Specialist Agent',
    role: 'Processes file content, reviews syntactical patterns, and outputs structured code suggestions.',
    scaling: 'Bound by API model token rate-limiting quotas.',
    failure: 'Hallucinating variables or missing semantic files context.',
    tradeoff: 'LLM semantic overview understanding vs deterministic compiler validations.'
  },
  'agent-b': {
    title: 'Unit Test Specialist Agent',
    role: 'Analyzes code models and drafts structural test assertions.',
    scaling: 'Subject to LLM concurrency caps and tokens throughput speeds.',
    failure: 'Creating broken syntax in tests, or creating logical verification loops.',
    tradeoff: 'Heuristic-based test coverage vs static boilerplate test models.'
  },
  memory: {
    title: 'Semantic Memory Store (pgvector)',
    role: 'Indexes historical query context and agent steps for semantic recall.',
    scaling: 'HNSW vector index builds demand high RAM as record volume grows.',
    failure: 'Reduced recall accuracy on high dimensionality or long index builds.',
    tradeoff: 'Approximate nearest neighbor query speed vs exact retrieval accuracy.'
  },
  tools: {
    title: 'Safe Execution Sandbox',
    role: 'Executes actions such as searches, file edits, and validations under safe isolation.',
    scaling: 'Restricted by CPU overhead of containerized sandbox executions.',
    failure: 'Command injections or filesystem permissions escapes.',
    tradeoff: 'Broad tool access permissions vs absolute system sandbox security.'
  },
  output: {
    title: 'Structured Output Formatter',
    role: 'Validates JSON schemes and assembles final structured results.',
    scaling: 'Negligible CPU cost; runs deterministic scheme validations.',
    failure: 'Rejection of outputs due to schema non-compliance on LLM variance.',
    tradeoff: 'Flexible text completion vs strict schema compliance.'
  },

  // rag-pipeline nodes
  sources: {
    title: 'Knowledge API Integrations',
    role: 'Extracts documents and messages from Slack, GitHub, and Confluence APIs.',
    scaling: 'Subject to external partner API rate limit capacities.',
    failure: 'Authentication failures, token expirations, or missing document events.',
    tradeoff: 'High-overhead real-time event updates vs predictable batch index sweeps.'
  },
  chunker: {
    title: 'Semantic Text Chunker',
    role: 'Splits long documents into coherent paragraphs preserving code contexts.',
    scaling: 'CPU processing bounds on large document ingestion spikes.',
    failure: 'Loss of global context on short blocks or orphans without parent metadata.',
    tradeoff: 'Small chunk sizes (high precision) vs large text blocks (high context).'
  },
  embedder: {
    title: 'Embedding Model API',
    role: 'Vectorizes document chunks into dense multidimensional floats representing meaning.',
    scaling: 'API rate limits and context length limits.',
    failure: 'HTTP connection timeouts or API key allocation blocks.',
    tradeoff: 'High-accuracy third-party models vs low-latency self-hosted models.'
  },
  vectordb: {
    title: 'pgvector Database Index',
    role: 'Indexes dense vector floats to serve quick similarity distance checks.',
    scaling: 'Memory limits required to keep indexing files (HNSW) in RAM.',
    failure: 'High query search latencies on unindexed databases under load.',
    tradeoff: 'Cosine distance accuracy vs indexing storage and calculation times.'
  },
  bm25: {
    title: 'BM25 Keyword Index',
    role: 'Performs classical lexical text queries for exact matching strings.',
    scaling: 'Disk space bounds on reverse indices.',
    failure: 'Fails to map concepts when synonyms or alternative words are queried.',
    tradeoff: 'Fast exact string lookup vs semantic understanding capabilities.'
  },
  reranker: {
    title: 'Cross-Encoder Reranker',
    role: 'Evaluates and merges semantic and keyword outputs to bubble up top relevancies.',
    scaling: 'Highly CPU-bound; adds latency overhead to query processing.',
    failure: 'Server thread starvation during parallel search spikes.',
    tradeoff: 'Highest query result relevancy vs latency overhead.'
  },
  llm: {
    title: 'LLM Generator (GPT-4o)',
    role: 'Assembles search hits into natural language summaries referencing sources.',
    scaling: 'Cost and token limits on third-party APIs.',
    failure: 'Fact hallucination when source context contains conflicting information.',
    tradeoff: 'Highly smart models vs cost-effective low-latency edge models.'
  }
}

// Convert coordinates to pixels inside a responsive viewBox
function getCoords(pos: { x: number; y: number }) {
  const x = 50 + pos.x * 65
  const y = 30 + pos.y * 36
  return { x, y }
}

export function SystemDesign() {
  const [activeTab, setActiveTab] = useState(systemDesignDiagrams[0].id)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const activeDiagram = systemDesignDiagrams.find((d) => d.id === activeTab)!

  useEffect(() => {
    revealOnScroll(headerRef.current)
    // Clear node selection asynchronously when switching diagrams to avoid React 19 cascading render warning
    const clearNode = () => setSelectedNode(null)
    const rafId = requestAnimationFrame(clearNode)
    return () => cancelAnimationFrame(rafId)
  }, [activeTab])

  const nodeDetails = selectedNode ? COMPONENT_DETAILS[selectedNode] : null

  return (
    <section id="thinking" className="py-24 relative overflow-hidden bg-[#f5efe8]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="How I Think"
            eyebrowNumber="03"
            title="System Architecture"
            subtitle="System design isn't about choosing the trendiest tech — it's about evaluating tradeoffs under specific constraints."
          />
        </div>

        {/* Tab selection */}
        <div ref={tabsRef} className="flex flex-wrap gap-1.5 mb-10" role="tablist" aria-label="Architecture tabs">
          {systemDesignDiagrams.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveTab(d.id)}
              role="tab"
              aria-selected={activeTab === d.id}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200',
                activeTab === d.id
                  ? 'bg-[#111111] text-[#f5efe8] border-[#111111] font-semibold'
                  : 'bg-[#111111]/5 text-[#6b6b6b] border-[#111111]/8 hover:text-[#111111] hover:bg-[#111111]/10'
              )}
            >
              {d.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive SVG Diagram Card */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <GlassCard className="p-6 border-[#111111]/8 min-h-[380px] flex flex-col relative" hoverEffect={false} glowColor="none">
              <div className="mb-6">
                <span className="text-[9px] font-mono text-[#111111] uppercase tracking-widest font-semibold">{'// Interactive SVG System Blueprint'}</span>
                <p className="text-[#6b6b6b] text-xs sm:text-sm mt-1">{activeDiagram.description}</p>
              </div>

              {/* Dynamic SVG canvas container */}
              <div className="flex-grow rounded-xl border border-[#111111]/8 overflow-hidden relative min-h-[260px] flex items-center justify-center p-4 bg-[#fcfaf7]">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" aria-hidden="true" />

                <svg viewBox="0 0 400 240" className="w-full h-auto z-10 select-none">
                  {/* Define markers/defs */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#111111" opacity="0.6" />
                    </marker>
                  </defs>

                  {/* Draw connection lines */}
                  {activeDiagram.connections.map((conn) => {
                    const fromNode = activeDiagram.nodes.find((n) => n.id === conn.from)
                    const toNode = activeDiagram.nodes.find((n) => n.id === conn.to)
                    if (!fromNode || !toNode) return null

                    const start = getCoords(fromNode.position)
                    const end = getCoords(toNode.position)

                    return (
                      <g key={`${conn.from}-${conn.to}`}>
                        {/* Background path line */}
                        <line
                          x1={start.x}
                          y1={start.y}
                          x2={end.x}
                          y2={end.y}
                          stroke="rgba(17, 17, 17, 0.06)"
                          strokeWidth="1.5"
                        />
                        {/* Active running pulse lines */}
                        <line
                          x1={start.x}
                          y1={start.y}
                          x2={end.x}
                          y2={end.y}
                          stroke="#111111"
                          strokeWidth="1.2"
                          strokeOpacity="0.75"
                          markerEnd="url(#arrow)"
                          style={{
                            strokeDasharray: '4, 4',
                            animation: 'flow 6s linear infinite'
                          }}
                        />
                      </g>
                    )
                  })}

                  {/* Draw Nodes */}
                  {activeDiagram.nodes.map((node) => {
                    const coords = getCoords(node.position)
                    const isNodeSelected = selectedNode === node.id

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${coords.x}, ${coords.y})`}
                        onClick={() => setSelectedNode(isNodeSelected ? null : node.id)}
                        className="cursor-pointer"
                      >
                        {/* Box outline */}
                        <rect
                          x="-35"
                          y="-14"
                          width="70"
                          height="28"
                          rx="4"
                          className={cn(
                            'transition-all duration-300',
                            isNodeSelected
                              ? 'fill-[#fcfaf7] stroke-[#111111] stroke-[1.5] filter drop-shadow-[0_2px_8px_rgba(17,17,17,0.04)]'
                              : 'fill-[#fcfaf7] stroke-[#111111]/8 hover:stroke-[#111111]/15 stroke-[1]'
                          )}
                        />
                        {/* Node Label Text */}
                        <text
                          x="0"
                          y="-1"
                          textAnchor="middle"
                          className={cn(
                            'font-sans text-[7.5px] font-semibold tracking-tight pointer-events-none fill-none stroke-none',
                            isNodeSelected ? 'fill-[#111111] font-bold' : 'fill-[#111111]/80'
                          )}
                        >
                          {node.label.length > 15 ? `${node.label.slice(0, 13)}…` : node.label}
                        </text>
                        {/* Sublabel Text */}
                        {node.sublabel && (
                          <text
                            x="0"
                            y="8"
                            textAnchor="middle"
                            className="font-mono text-[5.5px] fill-[#6b6b6b]/60 pointer-events-none"
                          >
                            {node.sublabel.length > 18 ? `${node.sublabel.slice(0, 16)}…` : node.sublabel}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Inline dynamic style for marching ants running pulse lines */}
              <style jsx global>{`
                @keyframes flow {
                  to {
                    stroke-dashoffset: -40;
                  }
                }
              `}</style>
            </GlassCard>
          </div>

          {/* Right: Selected Node Tradeoffs Inspector Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <GlassCard className="p-6 border-[#111111]/8 min-h-[380px] flex flex-col" hoverEffect={false} glowColor="none">
              <h3 className="font-mono text-xs uppercase text-[#6b6b6b] tracking-widest mb-5 border-b border-[#111111]/8 pb-3">{'// Tradeoff Inspector'}</h3>

              {nodeDetails ? (
                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-[9px] font-mono text-[#111111] uppercase tracking-wider">Component</span>
                    <h4 className="text-base font-heading font-bold text-[#111111] mt-0.5">{nodeDetails.title}</h4>
                  </div>

                  <div>
                    <h5 className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-wider flex items-center gap-1">
                      <Info size={10} className="text-[#111111]" />
                      <span>Role</span>
                    </h5>
                    <p className="text-[#6b6b6b] text-xs mt-1 leading-relaxed font-sans">{nodeDetails.role}</p>
                  </div>

                  <div>
                    <h5 className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert size={10} className="text-[#111111]" />
                      <span>Scaling Limits</span>
                    </h5>
                    <p className="text-[#6b6b6b] text-xs mt-1 leading-relaxed font-sans">{nodeDetails.scaling}</p>
                  </div>

                  <div>
                    <h5 className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert size={10} className="text-rose-600" />
                      <span>Failure Modes</span>
                    </h5>
                    <p className="text-[#6b6b6b] text-xs mt-1 leading-relaxed font-sans">{nodeDetails.failure}</p>
                  </div>

                  <div>
                    <h5 className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-wider flex items-center gap-1">
                      <GitBranch size={10} className="text-[#111111]" />
                      <span>Architecture Tradeoff</span>
                    </h5>
                    <p className="text-[#111111] text-xs mt-1 leading-relaxed font-sans font-semibold">{nodeDetails.tradeoff}</p>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-[#fcfaf7] border border-dashed border-[#111111]/10 rounded-xl min-h-[280px]">
                  <GitBranch size={20} className="text-[#6b6b6b]/40 mb-3 animate-pulse" />
                  <p className="font-mono text-[10px] text-[#6b6b6b] leading-relaxed max-w-[200px]">
                    Click any node in the architecture diagram to inspect operational tradeoffs, failures, and scaling limits.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  )
}
