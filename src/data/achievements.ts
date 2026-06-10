import type { JourneyChapter } from '@/types'

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'chapter-1',
    number: '01',
    title: 'Curiosity',
    description: 'The spark of interest that started it all — scraping the web and learning the fundamentals of computer systems.',
    milestones: [
      {
        year: '2018',
        title: 'First Line of Code',
        description: 'Wrote my first Python script — a web scraper to track sneaker prices. Immediately hooked on the idea that software could automate the boring parts of life.',
        highlight: true,
      },
      {
        year: '2019',
        title: 'Computer Science Degree',
        description: 'Enrolled in CS at UC Berkeley. Fell in love with algorithms, operating systems, and distributed systems. Started contributing to open-source projects on GitHub.',
        tech: ['Python', 'C++', 'Java', 'Algorithms'],
      }
    ]
  },
  {
    id: 'chapter-2',
    number: '02',
    title: 'First Internship',
    description: 'Transitioning from classroom theory to production reality, learning the value of shipping robust, tested code.',
    milestones: [
      {
        year: '2021',
        title: 'First Engineering Internship',
        description: 'Joined a FinTech startup as a software engineering intern. Shipped a real feature to production within 2 weeks. Learned what "production-ready" actually means.',
        tech: ['React', 'Node.js', 'PostgreSQL'],
      },
      {
        year: '2021',
        title: 'Junior Software Engineer',
        description: 'Converted to full-time after internship. Built the recurring payments feature used by 15,000+ subscriptions. Discovered a love for system design and backend architecture.',
        highlight: true,
        tech: ['TypeScript', 'React', 'Node.js', 'Stripe', 'AWS'],
      }
    ]
  },
  {
    id: 'chapter-3',
    number: '03',
    title: 'Building Products',
    description: 'Designing systems for scale, optimizing APIs, and starting to explore the paradigm shift of large language models.',
    milestones: [
      {
        year: '2023',
        title: 'Platform Engineering at Scale',
        description: 'Joined the platform team at a larger enterprise. Redesigned the API gateway, bringing P99 latency from 800ms to 120ms. First time owning infrastructure used by 200+ services.',
        highlight: true,
        tech: ['Go', 'Kubernetes', 'Redis', 'PostgreSQL'],
      },
      {
        year: '2024',
        title: 'Deep Dive into AI Engineering',
        description: 'GPT-4 changed everything. Spent 6 months rebuilding my mental model of software — not just building tools, but building systems that can reason, adapt, and augment human work.',
        highlight: true,
        tech: ['LangChain', 'OpenAI', 'pgvector', 'Python'],
      }
    ]
  },
  {
    id: 'chapter-4',
    number: '04',
    title: 'AI Engineering',
    description: 'Engineering the reasoning layer: multi-agent system coordination, advanced retrieval mechanisms, and reliable reasoning paths.',
    milestones: [
      {
        year: '2025',
        title: 'Senior AI Engineer',
        description: 'Building the AI reasoning layer at a stealth startup. Orchestrating multi-agent systems, designing semantic search architectures, and pushing the boundary of what autonomous software can do.',
        highlight: true,
        tech: ['LangGraph', 'Next.js', 'Python', 'Redis', 'AWS'],
      },
      {
        year: 'Next',
        title: "What's Next",
        description: "I want to build AI-native software products that are genuinely useful — where intelligence is woven into the product experience, not bolted on. Seeking teams that share that ambition.",
        highlight: true,
      }
    ]
  }
]

