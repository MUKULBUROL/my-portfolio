import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages & Core',
    color: '#FF5C35',
    skills: [
      { name: 'C++', proficiency: 5, highlighted: true, description: 'Systems programming, VSOMEIP, Protobuf, KUKSA middleware' },
      { name: 'Java', proficiency: 5, highlighted: true, description: 'Spring Boot, Spring Data JPA, settlement algorithms, REST' },
      { name: 'Python', proficiency: 5, highlighted: true, description: 'FastAPI, vector embeddings, Gemini API integration, LLM pipelines' },
      { name: 'TypeScript', proficiency: 5, highlighted: true, description: 'Node.js, full-stack application logic, Jest test suites' },
      { name: 'SQL', proficiency: 5, highlighted: true, description: 'Relational data modeling, schema normalization, ACID safety' },
    ],
  },
  {
    name: 'Backend & Systems',
    color: '#38BDF8',
    skills: [
      { name: 'Spring Boot', proficiency: 5, highlighted: true, description: 'Service-repository architecture, transactional isolation, REST APIs' },
      { name: 'FastAPI', proficiency: 5, highlighted: true, description: 'High-performance async API services, document ingestion' },
      { name: 'Node.js', proficiency: 5, highlighted: true, description: 'Server-side runtime, metadata reconciliation pipelines' },
      { name: 'REST APIs', proficiency: 5, highlighted: true, description: 'Stateless endpoints, defensive serialization, error contracts' },
      { name: 'MySQL & PostgreSQL', proficiency: 5, highlighted: true, description: 'Structured storage, indexing, query execution' },
    ],
  },
  {
    name: 'Protocols, Tools & Testing',
    color: '#A3E635',
    skills: [
      { name: 'SOME/IP & VSOMEIP', proficiency: 5, highlighted: true, description: 'Vehicle ECU telemetry, payload parsing, SDV integration' },
      { name: 'Protocol Buffers & gRPC', proficiency: 5, highlighted: true, description: 'Typed serialization schema contracts, low-latency bridges' },
      { name: 'Docker & Linux', proficiency: 5, highlighted: true, description: 'Containerization, reproducible deployment, shell automation' },
      { name: 'Git & CMake', proficiency: 5, highlighted: true, description: 'Version control, collaborative workflows, C++ build configuration' },
      { name: 'Jest & Postman', proficiency: 5, highlighted: true, description: 'Automated regression test suites, API endpoint validation' },
      { name: 'Data Structures & OOP', proficiency: 5, highlighted: true, description: 'Graph algorithms, DBMS, operating systems, system design' },
    ],
  },
]
