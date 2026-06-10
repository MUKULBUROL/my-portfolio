import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI & Machine Learning',
    color: '#7C3AED',
    skills: [
      { name: 'LangChain / LangGraph', proficiency: 5, highlighted: true, description: 'Multi-agent orchestrations, graph-based workflows' },
      { name: 'LlamaIndex', proficiency: 4, highlighted: true, description: 'RAG pipelines and document indexing' },
      { name: 'OpenAI API', proficiency: 5, highlighted: true, description: 'GPT-4o, embeddings, function calling' },
      { name: 'PyTorch', proficiency: 4, description: 'Model fine-tuning, custom training loops' },
      { name: 'Hugging Face', proficiency: 4, description: 'Model hosting, datasets, transformers' },
      { name: 'Vector Databases', proficiency: 5, highlighted: true, description: 'pgvector, ChromaDB, Pinecone' },
      { name: 'Prompt Engineering', proficiency: 5, description: 'Chain-of-thought, few-shot, RLHF-aligned prompting' },
    ],
  },
  {
    name: 'Frontend',
    color: '#06B6D4',
    skills: [
      { name: 'React 19', proficiency: 5, highlighted: true, description: 'Compiler, concurrent features, RSC' },
      { name: 'Next.js 15', proficiency: 5, highlighted: true, description: 'App Router, Server Actions, PPR' },
      { name: 'TypeScript', proficiency: 5, highlighted: true, description: 'Strict mode, generics, conditional types' },
      { name: 'Tailwind CSS', proficiency: 5, description: 'v4 design systems, custom tokens' },
      { name: 'GSAP', proficiency: 4, description: 'ScrollTrigger, timeline animations' },
      { name: 'Framer Motion', proficiency: 4, description: 'Layout animations, gestures' },
      { name: 'Three.js / R3F', proficiency: 3, description: 'Interactive 3D, WebGL shaders' },
    ],
  },
  {
    name: 'Backend & APIs',
    color: '#22C55E',
    skills: [
      { name: 'Node.js', proficiency: 5, highlighted: true, description: 'Event loop, streams, worker threads' },
      { name: 'Python', proficiency: 5, highlighted: true, description: 'FastAPI, async, data processing' },
      { name: 'REST API Design', proficiency: 5, description: 'OpenAPI specs, versioning, rate limiting' },
      { name: 'GraphQL', proficiency: 3, description: 'Schema-first design, DataLoader patterns' },
      { name: 'tRPC', proficiency: 4, description: 'End-to-end type safety, Next.js integration' },
      { name: 'WebSockets', proficiency: 4, description: 'Real-time systems, pub/sub patterns' },
    ],
  },
  {
    name: 'Databases & Storage',
    color: '#F59E0B',
    skills: [
      { name: 'PostgreSQL', proficiency: 5, highlighted: true, description: 'Advanced indexing, query optimization, JSONB' },
      { name: 'Redis', proficiency: 5, highlighted: true, description: 'Caching strategies, pub/sub, sorted sets' },
      { name: 'Prisma ORM', proficiency: 5, description: 'Schema migrations, type-safe queries' },
      { name: 'pgvector', proficiency: 4, description: 'Semantic search, hybrid retrieval' },
      { name: 'MongoDB', proficiency: 3, description: 'Document modeling, aggregation pipelines' },
    ],
  },
  {
    name: 'Infrastructure & DevOps',
    color: '#EC4899',
    skills: [
      { name: 'AWS', proficiency: 4, highlighted: true, description: 'ECS, Lambda, S3, CloudFront, VPC' },
      { name: 'Docker', proficiency: 5, highlighted: true, description: 'Multi-stage builds, compose, optimization' },
      { name: 'Kubernetes', proficiency: 3, description: 'Deployments, services, horizontal scaling' },
      { name: 'GitHub Actions', proficiency: 5, description: 'CI/CD pipelines, matrix builds, secrets' },
      { name: 'Vercel', proficiency: 5, description: 'Edge functions, ISR, preview deployments' },
      { name: 'Terraform', proficiency: 3, description: 'IaC, state management, module composition' },
    ],
  },
]

// Flat list for the 3D galaxy nodes
export const galaxyNodes = skillCategories.flatMap((cat) =>
  cat.skills.filter((s) => s.highlighted).map((s) => ({
    name: s.name,
    category: cat.name,
    color: cat.color,
    description: s.description ?? '',
    proficiency: s.proficiency,
  }))
)
