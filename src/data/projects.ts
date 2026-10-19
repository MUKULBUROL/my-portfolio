import type { ProjectItem } from '@/types'

export const projects: ProjectItem[] = [
  {
    id: 'budibase-plugin-pruning',
    name: 'Budibase Open Source Contribution',
    category: 'Backend',
    tagline: 'Fixed stale plugin tracking causing HTTP 404 errors during app initialization',
    description:
      'Open-source contribution to Budibase resolving a bug where deleted or uninstalled custom plugins remained in application metadata (workspace.usedPlugins), causing client applications to request missing assets and emit HTTP 404 errors during startup.',
    problem:
      'When custom component plugins were removed from screens or uninstalled globally, Budibase failed to prune them from workspace metadata. Client applications continuously requested missing bundle assets on startup, causing HTTP 404 network errors.',
    solution:
      'Updated plugin tracking to remove unused references when publishing and filter out uninstalled plugins before loading, while safely preserving plugins still in use by other screens.',
    architecture:
      'Implemented lightweight additions on screen save, full reconciliation during publishing across dev and prod metadata, runtime asset filtering, and automated regression coverage.',
    challenges:
      'Ensuring builder saves remain fast ($O(1)$) without traversing the entire workspace while reliably distinguishing shared multi-screen dependencies.',
    results:
      'Added automated regression tests covering component removal, screen deletion, and shared plugin usage; contribution merged into master via PR #19667.',
    highlights: [
      'Fixed bug causing 404 errors during application loading (PR #19667)',
      'Reconciled workspace usedPlugins metadata during publishing',
      'Filtered uninstalled plugins before loading while preserving active shared plugins',
      'Added automated regression tests in Jest covering component and screen deletion',
    ],
    metrics: [
      'Merged upstream PR #19667 in Budibase',
      'Zero 404 network errors for uninstalled plugins',
      'Automated regression tests in Jest',
    ],
    techStack: ['TypeScript', 'Node.js', 'Jest', 'REST APIs'],
    tags: ['Open Source', 'TypeScript', 'Node.js', 'Jest'],
    githubUrl: 'https://github.com/Budibase/budibase/pull/19667',
    accentColor: '#A3E635', // Lime Green
    featured: true,
    status: 'open-source',
    lessonsLearned:
      'In collaborative metadata platforms, atomic reconciliation during publish phases prevents runtime client degradation without burdening frequent authoring operations.',
  },
  {
    id: 'documind-ai',
    name: 'DocuMind AI',
    category: 'AI',
    tagline: 'Document intelligence platform for semantic search and audio podcast generation',
    description:
      'A document intelligence platform supporting PDF ingestion, semantic search, and an audio-based Podcast Mode built using FastAPI.',
    problem:
      'Extracting and synthesizing key insights from technical PDF documents is slow and cumbersome, lacking natural conversational retrieval and alternate audio formats.',
    solution:
      'Integrated OpenAI embeddings for semantic retrieval, Google Gemini for contextual content generation, and Azure TTS for automated audio generation.',
    architecture:
      'FastAPI asynchronous service managing PDF document ingestion, vector embeddings creation, semantic search retrieval, and text-to-speech audio pipelines containerized with Docker.',
    challenges:
      'Orchestrating multi-model synthesis pipelines reliably between embeddings, LLM generation, and speech synthesis APIs.',
    results:
      'Ranked among the Top 100 teams in the Adobe India Hackathon 2025, which attracted 60,000+ participants.',
    highlights: [
      'PDF ingestion and semantic search using FastAPI',
      'Integrated OpenAI embeddings, Google Gemini, and Azure TTS',
      'Audio-based Podcast Mode generation',
      'Top 100 teams in Adobe India Hackathon 2025 (60,000+ competitors)',
    ],
    metrics: [
      'Top 100 teams / 60,000+ participants (Adobe Hackathon)',
      'Multi-model AI pipeline (OpenAI + Gemini + Azure TTS)',
      'Containerized with Docker',
    ],
    techStack: ['Python', 'FastAPI', 'Gemini', 'OpenAI Embeddings', 'Azure TTS', 'Docker'],
    tags: ['AI', 'Python', 'FastAPI', 'Gemini', 'Docker'],
    githubUrl: 'https://github.com/AkshatP07/DocuMind-AI-docker',
    accentColor: '#38BDF8', // Sky Blue
    featured: true,
    status: 'production',
    lessonsLearned:
      'Building multi-model AI applications requires structured error handling and asynchronous coordination across embedding, generation, and speech services.',
  },
  {
    id: 'splitwise-backend',
    name: 'Splitwise Backend',
    category: 'Backend',
    tagline: 'Java-based expense-sharing platform with optimized debt settlements',
    description:
      'An expense-sharing backend for groups, balances, and optimized settlements structured with service-repository architecture principles.',
    problem:
      'Expense tracking and settlement calculations become computationally inefficient and error-prone as group sizes expand and cyclic debt paths multiply.',
    solution:
      'Built a backend in Spring Boot exposing REST APIs for expense tracking, dynamic balances, and debt reduction with ACID isolation.',
    architecture:
      'Structured application layers with Spring Data JPA and normalized MySQL schemas. Applied a Greedy Settlement Algorithm to minimize transaction count across multi-party debts.',
    challenges:
      'Handling cyclic debt loops and maintaining consistent transactional isolation across multi-user balance updates.',
    results:
      'Implemented a Greedy Settlement Algorithm to minimize overall transaction counts across complex group debts.',
    highlights: [
      'Normalized MySQL relational schema and Spring Boot REST API layer',
      'Greedy settlement algorithm to minimize settlement transactions',
      'Service-repository design with Spring Data JPA',
    ],
    metrics: [
      'Greedy algorithm transaction minimization',
      'Service-repository architecture with Spring Boot',
      'ACID transactional isolation with MySQL',
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    tags: ['Java', 'Spring Boot', 'MySQL', 'Algorithms'],
    githubUrl: 'https://github.com/MUKULBUROL/Splitwise-Springboot-project',
    accentColor: '#FF5C35', // Coral
    featured: true,
    status: 'production',
    lessonsLearned:
      'Modeling financial entities requires strict constraints and transactional safety to prevent state divergence during multi-party settlement calculations.',
  },
  {
    id: 'vehicle-signal-bridge',
    name: 'Vehicle Signal Bridge',
    category: 'Systems',
    tagline: 'C++ middleware bridge transferring vehicle signals from ECUs to KUKSA Databroker',
    description:
      'A C++ middleware bridge to transfer vehicle-signal data from SOME/IP-based ECUs to the KUKSA Databroker for software-defined vehicle applications.',
    problem:
      'Heterogeneous electronic control units (ECUs) transmit vehicle signals over SOME/IP that must be parsed and bridged safely into the KUKSA Databroker.',
    solution:
      'Implemented a VSOMEIP adapter in C++ to parse binary vehicle-signal payloads and convert them into typed Protocol Buffers messages for downstream communication.',
    architecture:
      'C++ service integrating VSOMEIP and KUKSA Databroker APIs configured with CMake for cross-module build configuration.',
    challenges:
      'Safe binary payload parsing and deterministic communication across multiple software-defined vehicle modules.',
    results:
      'Integrated and tested vehicle-signal communication across multiple SDV modules using VSOMEIP and KUKSA at People Tech Group Inc.',
    highlights: [
      'Built C++ middleware bridge for vehicle-signal data transport',
      'Implemented VSOMEIP adapter converting binary payloads to Protocol Buffers',
      'Integrated and tested across multiple SDV modules with CMake',
    ],
    metrics: [
      'SOME/IP to KUKSA Databroker communication bridge',
      'Typed Protocol Buffers payload conversion',
      'Multi-module SDV validation',
    ],
    techStack: ['C++', 'VSOMEIP', 'KUKSA', 'Protocol Buffers', 'CMake'],
    tags: ['C++', 'Systems', 'SOME/IP', 'Protocol Buffers', 'SDV'],
    accentColor: '#FACC15', // Yellow/Gold
    experienceLink: '#experience',
    featured: true,
    status: 'production',
    lessonsLearned:
      'Low-level vehicle communications require strict boundary serialization to ensure binary payload integrity between proprietary ECUs and modern databrokers.',
  },
]
