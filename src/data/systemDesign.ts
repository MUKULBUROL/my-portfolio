import type { SystemDesignDiagram } from '@/types'

export const systemDesignDiagrams: SystemDesignDiagram[] = [
  {
    id: 'scalable-web-app',
    title: 'Scalable Web Application',
    description:
      'How I approach building web applications that remain fast and reliable at scale — separating concerns, caching aggressively, and designing for observability from day one.',
    category: 'web-app',
    nodes: [
      { id: 'cdn', label: 'CDN / Edge', sublabel: 'Cloudflare', type: 'cdn', position: { x: 2, y: 0 } },
      { id: 'client', label: 'Browser Client', sublabel: 'Next.js App', type: 'client', position: { x: 2, y: 1 } },
      { id: 'api', label: 'API Gateway', sublabel: 'Rate Limit + Auth', type: 'api', position: { x: 2, y: 2 } },
      { id: 'cache', label: 'Cache Layer', sublabel: 'Redis', type: 'cache', position: { x: 4, y: 2 } },
      { id: 'service', label: 'Business Logic', sublabel: 'Service Layer', type: 'service', position: { x: 2, y: 3 } },
      { id: 'db', label: 'Primary DB', sublabel: 'PostgreSQL', type: 'database', position: { x: 2, y: 4 } },
      { id: 'queue', label: 'Job Queue', sublabel: 'Background Tasks', type: 'queue', position: { x: 4, y: 3 } },
    ],
    connections: [
      { from: 'cdn', to: 'client', label: 'Static assets' },
      { from: 'client', to: 'api', label: 'API requests' },
      { from: 'api', to: 'cache', label: 'Cache check' },
      { from: 'api', to: 'service', label: 'Cache miss' },
      { from: 'service', to: 'db', label: 'Read / Write' },
      { from: 'service', to: 'queue', label: 'Async jobs' },
    ],
  },
  {
    id: 'ai-agent-system',
    title: 'AI Agent Orchestration',
    description:
      'My approach to building reliable multi-agent systems — deterministic routing, context compression, and fail-safe fallbacks ensure agents remain predictable in production.',
    category: 'ai-system',
    nodes: [
      { id: 'client', label: 'User / System', sublabel: 'Task Input', type: 'client', position: { x: 2, y: 0 } },
      { id: 'coordinator', label: 'Coordinator Agent', sublabel: 'Task Decomposition', type: 'ai', position: { x: 2, y: 1 } },
      { id: 'agent-a', label: 'Specialist Agent A', sublabel: 'Code Analysis', type: 'ai', position: { x: 1, y: 2 } },
      { id: 'agent-b', label: 'Specialist Agent B', sublabel: 'Test Generation', type: 'ai', position: { x: 3, y: 2 } },
      { id: 'memory', label: 'Vector Memory', sublabel: 'pgvector', type: 'cache', position: { x: 0, y: 2 } },
      { id: 'tools', label: 'Tool Registry', sublabel: 'Code, Search, APIs', type: 'service', position: { x: 2, y: 3 } },
      { id: 'output', label: 'Verified Output', sublabel: 'Structured Result', type: 'service', position: { x: 2, y: 4 } },
    ],
    connections: [
      { from: 'client', to: 'coordinator', label: 'Task' },
      { from: 'coordinator', to: 'agent-a', label: 'Sub-task A' },
      { from: 'coordinator', to: 'agent-b', label: 'Sub-task B' },
      { from: 'agent-a', to: 'memory', label: 'Context fetch', bidirectional: true },
      { from: 'agent-a', to: 'tools', label: 'Tool calls' },
      { from: 'agent-b', to: 'tools', label: 'Tool calls' },
      { from: 'coordinator', to: 'output', label: 'Aggregated result' },
    ],
  },
  {
    id: 'rag-pipeline',
    title: 'RAG Knowledge Pipeline',
    description:
      'How I design retrieval-augmented generation systems that remain accurate as document volume grows — hybrid retrieval, re-ranking, and freshness weighting keep answers relevant.',
    category: 'ai-system',
    nodes: [
      { id: 'sources', label: 'Knowledge Sources', sublabel: 'Confluence, GitHub, Notion', type: 'client', position: { x: 2, y: 0 } },
      { id: 'chunker', label: 'Semantic Chunker', sublabel: 'Smart Splitting', type: 'service', position: { x: 2, y: 1 } },
      { id: 'embedder', label: 'Embedding Model', sublabel: 'OpenAI Ada-002', type: 'ai', position: { x: 2, y: 2 } },
      { id: 'vectordb', label: 'Vector Store', sublabel: 'pgvector', type: 'database', position: { x: 1, y: 3 } },
      { id: 'bm25', label: 'BM25 Index', sublabel: 'Keyword Search', type: 'database', position: { x: 3, y: 3 } },
      { id: 'reranker', label: 'Re-ranker', sublabel: 'Hybrid Scoring', type: 'service', position: { x: 2, y: 4 } },
      { id: 'llm', label: 'LLM', sublabel: 'GPT-4o', type: 'ai', position: { x: 2, y: 5 } },
    ],
    connections: [
      { from: 'sources', to: 'chunker', label: 'Raw docs' },
      { from: 'chunker', to: 'embedder', label: 'Chunks' },
      { from: 'embedder', to: 'vectordb', label: 'Embed' },
      { from: 'embedder', to: 'bm25', label: 'Index' },
      { from: 'vectordb', to: 'reranker', label: 'Vector hits' },
      { from: 'bm25', to: 'reranker', label: 'Keyword hits' },
      { from: 'reranker', to: 'llm', label: 'Top-K context' },
    ],
  },
]
