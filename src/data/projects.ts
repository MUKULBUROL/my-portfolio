import type { ProjectItem } from '@/types'

export const projects: ProjectItem[] = [
  {
    id: 'documind-ai',
    name: 'DocuMind AI',
    tagline: 'AI-powered document intelligence platform supporting semantic search',
    description:
      'An AI-powered document intelligence platform supporting semantic search and retrieval. Designed a semantic retrieval pipeline using OpenAI embeddings and Google Gemini.',
    problem:
      'Finding relevant information across large document collections is time-consuming and inefficient. Users need a smarter way to search, understand, and consume document content.',
    solution:
      'Built an AI-powered document intelligence platform supporting semantic search and retrieval. Designed a semantic retrieval pipeline using OpenAI embeddings and Google Gemini.',
    architecture:
      'Designed a semantic retrieval pipeline using OpenAI embeddings and Google Gemini. Processed 10K+ document chunks while maintaining sub-second retrieval latency.',
    challenges:
      'Ensuring sub-second retrieval latency while processing large datasets of 10K+ document chunks and integrating multiple LLM APIs.',
    results:
      'Ranked among the Top 100 teams out of 60,000+ participants in Adobe India Hackathon 2025.',
    metrics: [
      'Top 100 teams out of 60,000+ participants in Adobe India Hackathon 2025',
      'Processed 10K+ document chunks',
      'Sub-second retrieval latency',
      'OpenAI embeddings and Google Gemini integration',
    ],
    techStack: [
      'Python',
      'OpenAI Embeddings',
      'Gemini',
      'Docker',
    ],
    tags: ['AI', 'Python', 'Embeddings', 'Gemini'],
    featured: true,
    status: 'production',
    lessonsLearned: 'Processing large document collections in real-time requires careful orchestration of vector databases and embedding APIs to maintain low latency.',
  },
  {
    id: 'smart-expense-splitter',
    name: 'Splitwise Backend',
    tagline: 'Java-based expense-sharing platform with optimized settlements',
    description:
      'A backend expense-sharing platform using Spring Boot and MySQL, exposing REST APIs for expense tracking, balance computation, and debt settlement. Engineered a Greedy Settlement Algorithm to minimize transaction count.',
    problem:
      'Group expense tracking and fair settlement calculations are complex and inefficient when multiple users share costs across various activities.',
    solution:
      'Built a backend expense-sharing platform using Spring Boot and MySQL, exposing REST APIs for expense tracking, balance computation, and debt settlement.',
    architecture:
      'Structured application layers following service-repository architecture principles. Modeled many-to-many user-expense relationships using Spring Data JPA and normalized relational schemas.',
    challenges:
      'Modeling complex database relationships and design patterns while ensuring optimal settlement execution.',
    results:
      'Implemented a Greedy Settlement Algorithm reducing transaction count by nearly 40%.',
    metrics: [
      'Greedy Settlement Algorithm reduces transaction count by nearly 40%',
      'Exposed REST APIs for tracking, balance computation, and debt settlement',
      'Many-to-many user-expense relationships via Spring Data JPA',
      'Highly normalized relational database schema',
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Spring Data JPA', 'REST APIs'],
    tags: ['Java', 'Backend', 'Database', 'Algorithms'],
    githubUrl: 'https://github.com/MUKULBUROL/Splitwise-Springboot-project',
    featured: true,
    status: 'production',
    lessonsLearned: 'Modeling relational schemas for financial structures requires strict constraints and transactional safety to prevent inconsistencies during settlement calculations.',
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
