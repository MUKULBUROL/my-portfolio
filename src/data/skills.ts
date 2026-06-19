import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    color: '#7C3AED',
    skills: [
      { name: 'C++', proficiency: 5, highlighted: true, description: 'System level programming, SDV wrapper classes, latency optimization' },
      { name: 'Java', proficiency: 5, highlighted: true, description: 'Backend service development, Spring Boot, OOP principles' },
      { name: 'Python', proficiency: 5, highlighted: true, description: 'FastAPI, AI orchestrations, document ingestion, data processing' },
      { name: 'SQL', proficiency: 4, description: 'MySQL, PostgreSQL, normalized schemas, complex queries' },
    ],
  },
  {
    name: 'Backend & Distributed',
    color: '#06B6D4',
    skills: [
      { name: 'Spring Boot', proficiency: 5, highlighted: true, description: 'REST APIs, service-repository architecture, Spring Data JPA' },
      { name: 'FastAPI', proficiency: 5, highlighted: true, description: 'Async REST endpoints, semantic search pipelines' },
      { name: 'Node.js & Express.js', proficiency: 4, description: 'Backend development, middleware, REST APIs' },
      { name: 'gRPC & Protobuf', proficiency: 4, description: 'High-performance real-time RPC services, type-safe serialization' },
      { name: 'WebSockets & SOME/IP', proficiency: 4, description: 'Real-time bidirectional communication, automotive middleware' },
    ],
  },
  {
    name: 'Developer Tools',
    color: '#F59E0B',
    skills: [
      { name: 'Docker', proficiency: 4, highlighted: true, description: 'Containerization, environment isolation, deployment' },
      { name: 'Linux', proficiency: 4, description: 'Process management, networking, bash scripting' },
      { name: 'Git & GitHub', proficiency: 5, description: 'Version control, code collaboration, reviews' },
      { name: 'Postman', proficiency: 4, description: 'API endpoint testing and documentation' },
    ],
  },
  {
    name: 'CS Fundamentals',
    color: '#8B5CF6',
    skills: [
      { name: 'Data Structures & Algorithms', proficiency: 5, highlighted: true, description: 'Graph traversal, priority queues, greedy settlement optimization' },
      { name: 'OOP & System Design', proficiency: 5, description: 'Object-oriented design patterns, scalable architectures' },
      { name: 'DBMS', proficiency: 4, description: 'Relational database design, normalization' },
      { name: 'Operating Systems & Networks', proficiency: 4, description: 'Concurreny, socket programming, network protocols' },
    ],
  },
  {
    name: 'Frontend (Auxiliary)',
    color: '#EC4899',
    skills: [
      { name: 'React & Next.js', proficiency: 4, description: 'Dynamic component rendering, UI states' },
      { name: 'Tailwind CSS & Animations', proficiency: 4, description: 'Utility styling, Framer Motion, GSAP scroll controls' },
    ],
  },
]

