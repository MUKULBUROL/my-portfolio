import type { ProjectItem } from '@/types'

export const projects: ProjectItem[] = [
  {
    id: 'documind-ai',
    name: 'DocuMind AI – Document Intelligence Platform',
    tagline: 'AI-powered platform for semantic search and audio insights via Podcast Mode',
    description:
      'An AI-powered platform enabling PDF upload, semantic search, and audio insights via Podcast Mode. Ranked in the Top 100 out of 60,000+ teams at Adobe Hackathon.',
    problem:
      'Finding relevant information across large document collections is time-consuming and inefficient. Users need a smarter way to search, understand, and consume document content.',
    solution:
      'Built an end-to-end document intelligence platform with FastAPI backend, semantic search using OpenAI embeddings, and an Azure TTS pipeline for automated audio generation in Podcast Mode.',
    architecture:
      'FastAPI backend with APIs for document ingestion and semantic queries. Google Gemini for AI processing, OpenAI embeddings for vector search, and Docker for scalable, modular deployment.',
    challenges:
      'Integrating multiple AI services (Gemini, OpenAI) while maintaining low latency and ensuring accurate semantic retrieval across diverse document formats.',
    results:
      'Ranked in the Top 100 out of 60,000+ teams at Adobe Hackathon. Delivered a fully functional platform with document ingestion, semantic search, and podcast-mode audio generation.',
    metrics: [
      'Top 100 out of 60,000+ teams at Adobe Hackathon',
      'End-to-end document ingestion pipeline',
      'Semantic search with OpenAI embeddings',
      'Azure TTS for automated audio generation',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'Google Gemini',
      'OpenAI',
      'Docker',
      'Azure TTS',
    ],
    tags: ['AI', 'Python', 'FastAPI', 'NLP'],
    featured: true,
    status: 'production',
    lessonsLearned: 'Combining multiple AI services requires careful orchestration. Semantic search alone is not enough — pairing it with audio generation creates a more accessible and versatile platform.',
  },
  {
    id: 'smart-expense-splitter',
    name: 'Smart Expense Splitter System',
    tagline: 'High-performance backend for managing group expenses with optimized settlements',
    description:
      'A high-performance backend platform for managing group expenses with optimized settlements, built with Java 17 and Spring Boot.',
    problem:
      'Group expense tracking and fair settlement is complex when multiple people share costs across various activities. Manual calculation is error-prone and time-consuming.',
    solution:
      'Developed a scalable backend using Java 17 and Spring Boot with a highly normalized MySQL database via Spring Data JPA. Engineered a Greedy Settlement Algorithm to compute net balances and optimally match debtors with creditors.',
    architecture:
      'Spring Boot REST API with Spring Data JPA for ORM. MySQL database with highly normalized schema handling complex Many-to-Many relationships. Greedy Settlement Algorithm minimizes total transaction count.',
    challenges:
      'Resolving bidirectional ORM dependency issues to ensure stable JSON serialization and faster REST API responses. Optimizing the settlement algorithm for minimal transactions.',
    results:
      'Efficiently manages group expenses with optimal settlement calculations. Minimized total transaction count through greedy algorithm optimization.',
    metrics: [
      'Optimized settlement algorithm',
      'Normalized MySQL database design',
      'Fast REST API responses',
      'Handles complex Many-to-Many relationships',
    ],
    techStack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
    tags: ['Java', 'Backend', 'Database', 'Algorithms'],
    githubUrl: 'https://github.com/MUKULBUROL/Splitwise-Springboot-project',
    featured: true,
    status: 'production',
    lessonsLearned: 'ORM bidirectional dependencies can cause serialization issues. Careful schema design and algorithm optimization are critical for performance in financial systems.',
  },
  {
    id: 'graph-recommendation-system',
    name: 'Graph-Based Recommendation System',
    tagline: 'High-performance recommendation engine with real-time updates',
    description:
      'A high-performance recommendation engine modeling user-item interactions as weighted graphs with real-time updates, developed in C++17.',
    problem:
      'Traditional recommendation systems often lack real-time responsiveness and multi-metric similarity analysis, leading to less relevant suggestions.',
    solution:
      'Developed in C++17 with multi-metric similarity (Cosine, Jaccard, Pearson, Euclidean) and priority-queue traversal for top-K recommendations. Optimized for sub-millisecond latency.',
    architecture:
      'Graph-based data structure modeling user-item interactions as weighted edges. Multi-metric similarity computation with priority-queue traversal for efficient top-K recommendation retrieval.',
    challenges:
      'Achieving sub-millisecond latency while computing multiple similarity metrics across large graphs required careful optimization of data structures and algorithms.',
    results:
      'Sub-millisecond latency for real-time recommendations. Supports multiple similarity metrics for diverse recommendation scenarios.',
    metrics: [
      'Sub-millisecond latency',
      '4 similarity metrics (Cosine, Jaccard, Pearson, Euclidean)',
      'Real-time graph updates',
      'Priority-queue traversal for top-K',
    ],
    techStack: ['C++17', 'Graph Algorithms', 'Priority Queues', 'Data Structures'],
    tags: ['C++', 'Algorithms', 'Machine Learning', 'Graph Theory'],
    githubUrl: 'https://github.com/MUKULBUROL/GraphBasesRecommendationSystem',
    featured: false,
    status: 'experimental',
    lessonsLearned: 'Graph-based approaches excel at capturing complex relationships. Multi-metric similarity provides more nuanced recommendations than single-metric approaches.',
  },
]
