import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages & Core',
    color: '#7C3AED',
    skills: [
      { name: 'Python', proficiency: 5, highlighted: true, description: 'FastAPI, data processing, scripting, AI integration' },
      { name: 'C++', proficiency: 5, highlighted: true, description: 'C++17, high-performance systems, graph algorithms' },
      { name: 'Java', proficiency: 4, highlighted: true, description: 'Java 17, Spring Boot, backend systems' },
      { name: 'SQL', proficiency: 4, description: 'MySQL, PostgreSQL, complex queries, normalization' },
    ],
  },
  {
    name: 'Backend & APIs',
    color: '#06B6D4',
    skills: [
      { name: 'FastAPI', proficiency: 5, highlighted: true, description: 'Async REST APIs, document ingestion, AI pipelines' },
      { name: 'Spring Boot', proficiency: 4, highlighted: true, description: 'REST APIs, Spring Data JPA, ORM' },
      { name: 'gRPC', proficiency: 4, description: 'Protocol Buffers, service communication, low-latency' },
      { name: 'Protobuf', proficiency: 4, description: 'Serialization, type-safe messaging' },
      { name: 'Docker', proficiency: 4, highlighted: true, description: 'Multi-stage builds, containerization, deployment' },
    ],
  },
  {
    name: 'Frontend',
    color: '#EC4899',
    skills: [
      { name: 'React', proficiency: 4, highlighted: true, description: 'Hooks, component architecture, modern UI' },
      { name: 'Tailwind CSS', proficiency: 4, highlighted: true, description: 'Utility-first styling, responsive design' },
      { name: 'Framer Motion', proficiency: 3, description: 'Animations, transitions, gesture-driven UI' },
      { name: 'Vite', proficiency: 4, description: 'Build tooling, fast dev server, optimized bundling' },
    ],
  },
  {
    name: 'CS Fundamentals',
    color: '#8B5CF6',
    skills: [
      { name: 'Data Structures & Algorithms', proficiency: 5, highlighted: true, description: 'Graph algorithms, priority queues, greedy algorithms' },
      { name: 'Operating Systems', proficiency: 4, description: 'Linux, process management, concurrency' },
      { name: 'DBMS', proficiency: 4, description: 'Database design, normalization, ORM' },
      { name: 'OOPs', proficiency: 5, description: 'Object-oriented design, design patterns' },
      { name: 'System Design', proficiency: 4, highlighted: true, description: 'Scalable web apps, AI orchestration, RAG pipelines' },
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
