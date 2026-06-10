import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean existing tables (optional, clean dev data)
  await prisma.message.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.user.deleteMany({})

  // 1. Create Projects
  await prisma.project.create({
    data: {
      title: 'Autonomous Agents Orchestrator',
      description: 'Enterprise multi-agent framework orchestrating LLMs for automated code generation and QA.',
      problem: 'Manual QA and verification bottlenecks slowed release velocity, consuming up to 30 engineering hours per release cycle.',
      architecture: 'Distributed event-driven architecture. Next.js Server Actions coordinate task distribution, while FastAPI workers manage agent containers. Redis queues manage task spikes, and vector search enables semantic execution memory.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Python', 'LangChain'],
      challenges: 'Faced high API rate-limiting and token exhaustion. Solved by designing a hierarchical context compressor and caching agent states in high-performance PostgreSQL buffers, resulting in 40% cost reduction.',
      results: 'Accelerated development release cycles and reduced code review overhead. Standard commits now pass automated agent audits prior to deployment, eliminating major regression bugs.',
      metrics: '90% QA speedup, 40% token cost reduction, 1.2s agent response time',
      githubUrl: 'https://github.com/example/agents-orchestrator',
      liveUrl: 'https://agents.example.com',
      featured: true,
    },
  })

  await prisma.project.create({
    data: {
      title: 'Synthetic Healthcare Data Factory',
      description: 'Generative platform synthesizing structured, HIPAA-compliant patient profiles for medical software testing.',
      problem: 'Strict compliance environments restrict engineering teams from using production clinical records during staging verification, causing hard-to-debug edge case failures in production.',
      architecture: 'A deep-learning generative pipeline built in PyTorch, wrapped with FastAPI. A Next.js dashboard orchestrates data schemas, mapping outputs directly to Prisma models, and serving outputs in PostgreSQL dumps.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Python', 'PyTorch', 'Prisma', 'PostgreSQL', 'Docker'],
      challenges: 'Synthesized medical records must satisfy strict relational database constraints (e.g. prescription dates succeeding diagnosis dates) without leaking patient identity characteristics.',
      results: 'Unblocked staging deployments across 5 healthcare platforms. Enabled developers to simulate millions of virtual patients with high statistical fidelity.',
      metrics: '100% HIPAA compliant, 50k profiles/sec generation speed',
      githubUrl: 'https://github.com/example/healthcare-data-factory',
      liveUrl: 'https://factory.example.com',
      featured: true,
    },
  })

  // 2. Create Blog Posts
  await prisma.blogPost.create({
    data: {
      title: 'Next.js 15 App Router Security Best Practices',
      slug: 'nextjs-15-security-best-practices',
      summary: 'Learn how to secure Next.js 15 server action endpoints, configure custom CSP headers for inline scripts, and audit input validations using Zod.',
      content: `## Next.js 15 Security Deep Dive

In Next.js 15, route handlers and Server Actions provide powerful primitives for full-stack react applications. However, exposing backend execution contexts directly to client triggers demands strict defense-in-depth measures.

### 1. Hardening Server Actions

Unlike standard API routes, Server Actions look like standard typescript imports. It is crucial to validate all payloads server-side:

\`\`\`typescript
// src/lib/actions.ts
'use server'

import { z } from 'zod'

const ContactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10)
})

export async function submitContact(payload: unknown) {
  const result = ContactSchema.safeParse(payload)
  if (!result.success) {
    throw new Error('Invalid input data structure.')
  }
  
  // Safe processing continues...
}
\`\`\`

### 2. Custom Content Security Policy (CSP)

Next.js 15 apps can define middleware to append custom CSP headers, blocking cross-site scripting (XSS) and unauthorized data egress:

- Configure custom nonces for inline scripting.
- Limit \`connect-src\` to verified endpoints (Analytics, Sentry, Resend).

Implementing these configurations guarantees that code injections cannot query client states or extract credentials.`,
      tags: ['Security', 'Next.js', 'Web Development'],
      published: true,
      views: 1024,
      readingTime: 6,
      publishedAt: new Date(),
    },
  })

  await prisma.blogPost.create({
    data: {
      title: 'Optimizing WebGL Canvas performance in React 19',
      slug: 'optimizing-webgl-canvas-react-19',
      summary: 'Strategies to maximize frame rates, throttle pixel ratios on mobile screens, and handle React 19 fiber reconciliations inside interactive Three.js canvasses.',
      content: `## Achieving 60fps in WebGL Portfolios

Integrating Three.js (via React Three Fiber) with Next.js 15 offers a premium user experience. However, poor optimization can lead to thermal throttling and frame drops, particularly on high-DPI displays.

### 1. Smart Pixel Ratio Throttling

A default device pixel ratio of 3 or 4 (common on Retina screens) forces the GPU to render millions of redundant pixels. Throttle the pixel ratio to a maximum of 2:

\`\`\`tsx
import { Canvas } from '@react-three/fiber'

export function AppCanvas({ children }) {
  return (
    <Canvas
      dpr={[1, 2]} // Throttled to max 2x for optimal mobile performance
      gl={{ antialias: true, alpha: true }}
    >
      {children}
    </Canvas>
  )
}
\`\`\`

### 2. Decouple Animations from React Render Loops

Never write animated coordinates inside standard React state updates. Re-triggering component re-renders 60 times a second degrades performance. Use the \`useFrame\` hook to access the render loop directly and modify object refs:

\`\`\`tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingMesh() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return <mesh ref={ref} />
}
\`\`\`

Applying these techniques yields immediate framerate benefits.`,
      tags: ['3D Graphics', 'React 19', 'Performance'],
      published: true,
      views: 512,
      readingTime: 5,
      publishedAt: new Date(),
    },
  })

  console.log('Database successfully seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
