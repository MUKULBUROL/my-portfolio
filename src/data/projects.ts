import type { ProjectItem } from '@/types'

export const projects: ProjectItem[] = [
  {
    id: 'autonomous-agents-orchestrator',
    name: 'Autonomous Agents Orchestrator',
    tagline: 'Enterprise multi-agent framework for automated software QA',
    description:
      'A production-grade orchestration layer that coordinates multiple LLM agents to perform automated code review, regression testing, and documentation generation across large engineering teams.',
    problem:
      'Manual QA and verification bottlenecks consumed 30+ engineering hours per release cycle, creating unpredictable delivery timelines and increasing the risk of regression bugs reaching production.',
    solution:
      'Designed a hierarchical agent system where a coordinator LLM decomposes tasks and delegates to specialized sub-agents. Each sub-agent has a constrained context window and a specific tool set, ensuring focused, reliable outputs.',
    architecture:
      'Event-driven distributed architecture. Next.js Server Actions coordinate task distribution to a Python FastAPI layer managing agent containers. Redis queues handle task spikes and rate-limiting. A vector store (pgvector) enables semantic execution memory and deduplication.',
    challenges:
      'API rate-limiting and token exhaustion at scale. Solved with a hierarchical context compressor that summarizes prior agent states and caches them in Redis, reducing total token consumption by 40%.',
    results:
      'Reduced QA cycle time by 90%. Eliminated major regression escapes. Enabled 3-day release cadences without increasing QA headcount.',
    metrics: [
      '90% QA cycle time reduction',
      '40% token cost savings',
      '1.2s average agent response time',
      'Zero regression escapes in 6 months',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Python',
      'LangGraph',
      'PostgreSQL',
      'Redis',
      'Docker',
      'AWS ECS',
    ],
    tags: ['AI', 'Next.js', 'Python', 'Agents'],
    githubUrl: 'https://github.com/alexchen/agents-orchestrator',
    liveUrl: 'https://agents.alexchen.dev',
    featured: true,
    status: 'production',
    lessonsLearned: 'Agent workflows require strict task boundaries; giving an agent too broad a tool set leads to prompt drift and loops. Constrained contexts and deterministic routing graphs are essential for system stability.',
  },
  {
    id: 'synthetic-healthcare-data',
    name: 'Synthetic Healthcare Data Factory',
    tagline: 'HIPAA-compliant patient profile generation for staging environments',
    description:
      'A generative platform that produces statistically valid, relationship-consistent synthetic medical records for healthcare engineering teams who cannot use production data during development.',
    problem:
      'HIPAA regulations prevent using real patient data in staging environments, forcing teams to test against unrealistic dummy data, leading to edge-case failures discovered only in production.',
    solution:
      'Built a deep-learning generative pipeline using a conditional variational autoencoder trained on publicly available medical datasets. A Next.js dashboard allows teams to configure schema constraints, demographics, and data volumes.',
    architecture:
      'PyTorch inference service wrapped in FastAPI. Next.js dashboard orchestrates schema definitions via tRPC. PostgreSQL stores generation jobs and output metadata. Outputs are delivered as SQL dumps or JSON for direct import.',
    challenges:
      'Generated records must satisfy complex temporal constraints (e.g. prescription dates after diagnosis dates) and clinical plausibility rules. Implemented a constraint-satisfaction post-processing layer using a rule engine.',
    results:
      'Unblocked staging environments for 5 healthcare product teams. Each can now generate statistically valid patient cohorts in under 30 seconds.',
    metrics: [
      '100% HIPAA compliant by design',
      '50,000 profiles per minute throughput',
      '5 product teams unblocked',
      '<30 second generation for 10k profiles',
    ],
    techStack: ['Next.js', 'TypeScript', 'Python', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker'],
    tags: ['AI', 'Python', 'Healthcare', 'Next.js'],
    githubUrl: 'https://github.com/alexchen/synthetic-health-data',
    featured: true,
    status: 'production',
    lessonsLearned: 'Statistically valid data is only useful if it respects domain-specific logical invariants. Post-generation rule validation is more performant than trying to embed every constraint into the generative model\'s latent space.',
  },
  {
    id: 'rag-document-intelligence',
    name: 'RAG Document Intelligence Platform',
    tagline: 'Semantic search and Q&A across enterprise knowledge bases',
    description:
      'A retrieval-augmented generation system that enables engineering teams to ask natural language questions across codebases, architecture documents, runbooks, and Confluence wikis.',
    problem:
      "Knowledge is siloed across Notion, Confluence, GitHub wikis, and internal Slack threads. Engineers waste hours searching for architectural decisions or on-call procedures.",
    solution:
      'Built a document ingestion pipeline that chunks, embeds, and indexes content from multiple sources into pgvector. A Next.js frontend provides a chat interface where users can ask questions, cite sources, and refine answers.',
    architecture:
      'Ingestion workers use LangChain document loaders to pull from Confluence, GitHub, and Notion APIs. Content is chunked with semantic-aware splitters and embedded using OpenAI Ada-002. Retrieval uses hybrid BM25 + vector similarity scoring.',
    challenges:
      'Handling stale document versions and conflicting information across sources. Solved by implementing freshness scoring in the retrieval ranking, weighting recently updated documents higher.',
    results:
      'Reduced time-to-answer for internal technical questions from 25 minutes to under 90 seconds. Adopted by 40+ engineers.',
    metrics: [
      '94% answer accuracy on internal benchmarks',
      '40+ daily active users',
      '25min → 90sec time-to-answer',
      '12 knowledge sources integrated',
    ],
    techStack: ['Next.js', 'TypeScript', 'LangChain', 'pgvector', 'PostgreSQL', 'OpenAI', 'Redis'],
    tags: ['AI', 'RAG', 'Next.js', 'TypeScript'],
    githubUrl: 'https://github.com/alexchen/rag-platform',
    featured: true,
    status: 'production',
    lessonsLearned: 'Semantic search alone is not a silver bullet; indexing freshness, document metadata filtering, and keyword fallbacks (hybrid search) are critical to ensuring user trust in enterprise search.',
  },
  {
    id: 'distributed-task-scheduler',
    name: 'Distributed Task Scheduler',
    tagline: 'Fault-tolerant job scheduling with exactly-once semantics',
    description:
      'A production-grade distributed task scheduler handling millions of scheduled jobs with guaranteed exactly-once execution, built as an open-source alternative to Temporal for smaller teams.',
    problem:
      'Temporal is powerful but operationally complex for small teams. Cron jobs are brittle and invisible. Teams needed reliable background job scheduling without the overhead of a full workflow engine.',
    solution:
      'Designed a lightweight scheduler using PostgreSQL advisory locks for distributed coordination, Redis for real-time job state, and a Next.js admin dashboard for visibility.',
    architecture:
      'Worker nodes compete for job ownership using PostgreSQL advisory locks. Job state is replicated to Redis for fast status reads. Dead letter queues handle failed jobs. Admin dashboard provides real-time visibility.',
    challenges:
      'Ensuring exactly-once semantics across worker failures required careful state machine design and idempotency key management.',
    results:
      '3M+ jobs processed per month. Zero duplicate executions in 8 months of production operation.',
    metrics: [
      '3M+ jobs/month',
      '99.97% reliability',
      '0 duplicate executions in 8 months',
      '<500ms scheduling latency p99',
    ],
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Next.js', 'Docker'],
    tags: ['Open Source', 'Node.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/alexchen/dist-scheduler',
    featured: false,
    status: 'open-source',
    lessonsLearned: 'Distributed state management should lean on database primitives (like advisory locks) as long as possible before introducing dedicated orchestration tools, keeping operational overhead low.',
  },
]
