import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database with real projects...')

  // Clean existing tables
  await prisma.project.deleteMany({})

  // 1. Create Real Projects
  await prisma.project.create({
    data: {
      id: 'documind-ai',
      title: 'DocuMind AI – Document Intelligence Platform',
      description: 'An AI-powered platform enabling PDF upload, semantic search, and audio insights via Podcast Mode. Ranked in the Top 100 out of 60,000+ teams at Adobe Hackathon.',
      problem: 'Finding relevant information across large document collections is time-consuming and inefficient. Users need a smarter way to search, understand, and consume document content.',
      architecture: 'FastAPI backend with APIs for document ingestion and semantic queries. Google Gemini for AI processing, OpenAI embeddings for vector search, and Docker for scalable, modular deployment.',
      techStack: ['Python', 'FastAPI', 'Google Gemini', 'OpenAI', 'Docker', 'Azure TTS'],
      challenges: 'Integrating multiple AI services (Gemini, OpenAI) while maintaining low latency and ensuring accurate semantic retrieval across diverse document formats.',
      results: 'Ranked in the Top 100 out of 60,000+ teams at Adobe Hackathon. Delivered a fully functional platform with document ingestion, semantic search, and podcast-mode audio generation.',
      metrics: 'Top 100 out of 60,000+ teams at Adobe Hackathon',
      githubUrl: '',
      liveUrl: '',
      featured: true,
    },
  })

  await prisma.project.create({
    data: {
      id: 'smart-expense-splitter',
      title: 'Smart Expense Splitter System',
      description: 'A high-performance backend platform for managing group expenses with optimized settlements, built with Java 17 and Spring Boot.',
      problem: 'Group expense tracking and fair settlement is complex when multiple people share costs across various activities. Manual calculation is error-prone and time-consuming.',
      architecture: 'Spring Boot REST API with Spring Data JPA for ORM. MySQL database with highly normalized schema handling complex Many-to-Many relationships. Greedy Settlement Algorithm minimizes total transaction count.',
      techStack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
      challenges: 'Resolving bidirectional ORM dependency issues to ensure stable JSON serialization and faster REST API responses. Optimizing the settlement algorithm for minimal transactions.',
      results: 'Developed a scalable backend using Java 17 and Spring Boot with a highly normalized MySQL database via Spring Data JPA. Engineered a Greedy Settlement Algorithm to compute net balances and optimally match debtors with creditors.',
      metrics: 'Greedy algorithm optimized transaction counts',
      githubUrl: 'https://github.com/MUKULBUROL/Splitwise-Springboot-project',
      liveUrl: '',
      featured: true,
    },
  })

  await prisma.project.create({
    data: {
      id: 'graph-recommendation-system',
      title: 'Graph-Based Recommendation System',
      description: 'A high-performance recommendation engine modeling user-item interactions as weighted graphs with real-time updates, developed in C++17.',
      problem: 'Traditional recommendation systems often lack real-time responsiveness and multi-metric similarity analysis, leading to less relevant suggestions.',
      architecture: 'Graph-based data structure modeling user-item interactions as weighted edges. Multi-metric similarity computation with priority-queue traversal for efficient top-K recommendation retrieval.',
      techStack: ['C++17', 'Graph Algorithms', 'Priority Queues', 'Data Structures'],
      challenges: 'Achieving sub-millisecond latency while computing multiple similarity metrics across large graphs required careful optimization of data structures and algorithms.',
      results: 'Developed in C++17 with multi-metric similarity (Cosine, Jaccard, Pearson, Euclidean) and priority-queue traversal for top-K recommendations. Optimized for sub-millisecond latency.',
      metrics: 'Sub-millisecond latency retrieval',
      githubUrl: 'https://github.com/MUKULBUROL/GraphBasesRecommendationSystem',
      liveUrl: '',
      featured: false,
    },
  })



  console.log('Database successfully seeded with portfolio data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
