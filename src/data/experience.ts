import type { ExperienceItem } from '@/types'

export const experience: ExperienceItem[] = [
  {
    company: 'Stealth AI Startup',
    role: 'Senior AI Engineer',
    location: 'San Francisco, CA (Remote)',
    startDate: 'Jan 2025',
    endDate: 'Present',
    summary:
      'Building the AI reasoning layer of a next-generation developer tooling product. Designing multi-agent orchestration systems that automate code generation, review, and deployment workflows.',
    achievements: [
      'Architected a multi-agent code generation system that reduced manual implementation time by 65%',
      'Designed a semantic context compression algorithm cutting LLM API costs by 40% while maintaining output quality',
      'Led the AI infrastructure migration from OpenAI to a hybrid multi-provider setup with automatic failover',
      'Built an internal RAG platform adopted by all 12 engineers for knowledge retrieval',
    ],
    techStack: ['Python', 'LangGraph', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
    type: 'full-time',
  },
  {
    company: 'TechCorp Enterprise',
    role: 'Software Engineer II',
    location: 'Seattle, WA',
    startDate: 'Mar 2023',
    endDate: 'Dec 2024',
    summary:
      'Core member of the platform engineering team responsible for the API gateway, developer tooling, and internal infrastructure serving 200+ microservices.',
    achievements: [
      'Rebuilt the API gateway to reduce P99 latency from 800ms to under 120ms through connection pooling and response caching',
      'Designed and shipped a distributed rate-limiting system handling 50,000 requests/second without coordination overhead',
      'Introduced TypeScript strict mode across 3 major services, eliminating an entire class of runtime null errors',
      'Mentored 4 junior engineers in system design thinking and production readiness practices',
    ],
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS', 'Go'],
    type: 'full-time',
  },
  {
    company: 'OpenSource AI Lab',
    role: 'Core Maintainer (Volunteer)',
    location: 'Remote',
    startDate: 'Jun 2022',
    endDate: 'Present',
    summary:
      'Maintainer of an open-source LLM evaluation framework with 2,400+ GitHub stars. Responsible for architecture decisions, contributor reviews, and release management.',
    achievements: [
      'Grew the project from 200 to 2,400+ GitHub stars through improved documentation and community engagement',
      'Designed a plugin architecture enabling external contributors to add custom evaluation metrics without modifying core code',
      'Implemented a deterministic test runner that makes benchmark results reproducible across environments',
    ],
    techStack: ['Python', 'PyTorch', 'FastAPI', 'TypeScript', 'GitHub Actions'],
    type: 'freelance',
  },
  {
    company: 'FinTech Scale-up',
    role: 'Junior Software Engineer',
    location: 'New York, NY',
    startDate: 'Jul 2021',
    endDate: 'Feb 2023',
    summary:
      'Full-stack engineer on the payments product team, building features across the React frontend and Node.js backend.',
    achievements: [
      'Shipped the recurring payments feature used by 15,000+ active subscriptions within 3 months of joining',
      'Reduced checkout form abandonment by 23% through UX improvements and performance optimization',
      'Introduced integration testing with a 200+ test suite that caught a data integrity bug before production',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    type: 'full-time',
  },
]
