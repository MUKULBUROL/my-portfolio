// ============================================================
// AI Engineer OS — Centralized Type Definitions
// All content models live here. Update data/ files only.
// ============================================================

export interface Profile {
  name: string
  headline: string
  bio: string
  shortBio: string
  location: string
  timezone: string
  availabilityStatus: 'available' | 'open' | 'unavailable'
  availabilityLabel: string
  pronouns?: string
}

export interface SocialLink {
  label: string
  url: string
  icon: string // lucide icon name
  username?: string
}

export interface ResumeData {
  pdfPath: string
  lastUpdated: string
  version: string
}

export interface ProjectItem {
  id: string
  name: string
  tagline: string
  description: string
  problem: string
  solution: string
  architecture: string
  challenges: string
  results: string
  metrics?: string[]
  techStack: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  status: 'production' | 'archived' | 'experimental' | 'open-source'
  lessonsLearned: string
}

export interface ExperienceItem {
  company: string
  role: string
  location: string
  startDate: string
  endDate: string | 'Present'
  summary: string
  achievements: string[]
  techStack: string[]
  type: 'full-time' | 'freelance' | 'contract' | 'internship'
}

export interface SkillCategory {
  name: string
  color: string
  skills: SkillItem[]
}

export interface SkillItem {
  name: string
  proficiency: 1 | 2 | 3 | 4 | 5
  highlighted?: boolean
  description?: string
}

export interface EducationItem {
  degree: string
  field: string
  institution: string
  location: string
  startYear: number
  endYear: number | 'Present'
  gpa?: string
  highlights?: string[]
}

export interface Achievement {
  title: string
  description: string
  year: string
  icon?: string
}

export interface JourneyMilestone {
  id: string
  year: string
  title: string
  description: string
  type: 'start' | 'work' | 'project' | 'learning' | 'milestone' | 'vision'
  highlight?: boolean
  tech?: string[]
}

export interface SystemDesignDiagram {
  id: string
  title: string
  description: string
  nodes: DiagramNode[]
  connections: DiagramConnection[]
  category: 'web-app' | 'ai-system' | 'data-pipeline' | 'microservices' | 'caching'
}

export interface DiagramNode {
  id: string
  label: string
  sublabel?: string
  type: 'client' | 'api' | 'service' | 'database' | 'cache' | 'queue' | 'ai' | 'cdn' | 'auth'
  position: { x: number; y: number }
}

export interface DiagramConnection {
  from: string
  to: string
  label?: string
  bidirectional?: boolean
}

export interface NavItem {
  label: string
  href: string
  sectionId: string
}

export interface ChapterMilestone {
  year: string
  title: string
  description: string
  tech?: string[]
  highlight?: boolean
}

export interface JourneyChapter {
  id: string
  number: string
  title: string
  description: string
  milestones: ChapterMilestone[]
}

