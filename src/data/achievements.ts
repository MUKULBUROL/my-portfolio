import type { JourneyChapter } from '@/types'

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'chapter-1',
    number: '01',
    title: 'Curiosity',
    description: 'The spark of interest that started it all — qualifying competitive exams and choosing engineering at IIT Hyderabad.',
    milestones: [
      {
        year: '2019',
        title: 'First Line of Code',
        description: 'Wrote my first programs during school years. Fascinated by how code could solve real-world problems. Started exploring Python and C++.',
        highlight: true,
      },
      {
        year: '2020',
        title: 'NTSE Scholar',
        description: 'Qualified NTSE Stage-I & Stage-II (2020–2021). Demonstrated strong analytical and problem-solving abilities through one of India\'s most competitive national-level scholarship exams.',
        tech: ['Problem Solving', 'Analytical Thinking', 'Scholarship'],
      }
    ]
  },
  {
    id: 'chapter-2',
    number: '02',
    title: 'IIT Hyderabad',
    description: 'Starting my B.Tech in Chemical Engineering at IIT Hyderabad, while diving deep into computer science fundamentals.',
    milestones: [
      {
        year: '2022',
        title: 'Started B.Tech at IIT Hyderabad',
        description: 'Enrolled in B.Tech Chemical Engineering at IIT Hyderabad (GPA: 7.14). Started learning DSA, OS, DBMS, and OOPs alongside core curriculum.',
        highlight: true,
        tech: ['Python', 'C++', 'Data Structures', 'Algorithms'],
      },
      {
        year: '2023',
        title: 'Deep Dive into Backend & Systems',
        description: 'Started building projects in C++ and Java. Explored distributed systems, database design, and scalable architectures.',
        highlight: true,
        tech: ['C++', 'Java', 'Spring Boot', 'MySQL', 'Docker'],
      }
    ]
  },
  {
    id: 'chapter-3',
    number: '03',
    title: 'Building Products',
    description: 'Applying skills to real-world projects — from hackathons to recommendation systems.',
    milestones: [
      {
        year: '2024',
        title: 'DocuMind AI — Adobe Hackathon',
        description: 'Built DocuMind AI, an AI-powered document intelligence platform. Ranked in the Top 100 out of 60,000+ teams at Adobe Hackathon. Integrated Google Gemini, OpenAI embeddings, and Azure TTS.',
        highlight: true,
        tech: ['Python', 'FastAPI', 'OpenAI', 'Docker', 'Azure TTS'],
      },
      {
        year: '2024',
        title: 'Graph-Based Recommendation System',
        description: 'Developed a high-performance recommendation engine in C++17 with multi-metric similarity and sub-millisecond latency for real-time recommendations.',
        tech: ['C++17', 'Graph Algorithms', 'Data Structures', 'Priority Queues'],
      }
    ]
  },
  {
    id: 'chapter-4',
    number: '04',
    title: 'Professional Growth',
    description: 'Entering the industry with hands-on experience in automotive middleware and scalable data systems.',
    milestones: [
      {
        year: '2025',
        title: 'SDE Intern at People Tech Group',
        description: 'Developed a high-performance C++ middleware bridge for real-time data transfer in software-defined vehicles. Applied gRPC, Protobuf, and Linux networking to build robust backend systems.',
        highlight: true,
        tech: ['C++', 'gRPC', 'Protobuf', 'Linux Networking', 'SOME/IP'],
      },
      {
        year: 'Next',
        title: "What's Next",
        description: "Looking for open source contributions, building production-ready websites, and diving into complex architectures to understand and implement them at scale.",
        highlight: true,
      }
    ]
  },
  {
    id: 'chapter-5',
    number: '05',
    title: 'Awards & Recognition',
    description: 'Competitive exams and recognitions that shaped discipline, leadership, and a growth mindset.',
    milestones: [
      {
        year: '2020',
        title: 'UPSC NDA Qualified',
        description: 'Qualified the UPSC National Defence Academy examination — one of India\'s most competitive tests for future military officers. Demonstrated aptitude in mathematics, general ability, and analytical reasoning.',
        highlight: true,
        tech: ['Leadership', 'Discipline', 'Analytical Reasoning'],
      },
      {
        year: '2020',
        title: 'NTSE Scholar',
        description: 'Qualified NTSE Stage-I & Stage-II (2020–2021). Recognized for academic excellence and problem-solving aptitude at the national level.',
        highlight: true,
        tech: ['Problem Solving', 'Academic Excellence'],
      }
    ]
  }
]
