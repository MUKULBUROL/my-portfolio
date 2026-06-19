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


