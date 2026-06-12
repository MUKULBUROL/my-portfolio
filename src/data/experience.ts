import type { ExperienceItem } from '@/types'

export const experience: ExperienceItem[] = [
  {
    company: 'People Tech Group Inc',
    role: 'SDE Intern',
    location: 'Remote',
    startDate: 'Jun 2025',
    endDate: 'Jul 2025',
    summary:
      'Developed a high-performance C++ middleware bridge for real-time data transfer from legacy SOME/IP-based ECUs to the KUKSA Databroker, supporting scalable data architecture for software-defined vehicles.',
    achievements: [
      'Developed a high-performance C++ middleware bridge to enable real-time data transfer from legacy SOME/IP-based ECUs to the KUKSA Databroker',
      'Applied knowledge of C++, gRPC, Protobuf, and Linux networking to design and test robust backend systems, optimizing for reliability and performance',
      'Built and maintained the VSOMEIP adapter, implementing advanced CAN signal parsing and translating binary payloads into Protobuf messages for type safety and cross-platform compatibility',
      'Leveraged database management principles to enhance data integrity and support efficient data flow within distributed automotive systems',
      'Collaborated closely with product management and design teams to align middleware features with user requirements',
    ],
    techStack: ['C++', 'gRPC', 'Protobuf', 'Linux Networking', 'SOME/IP', 'KUKSA Databroker'],
    type: 'full-time',
  },
]
