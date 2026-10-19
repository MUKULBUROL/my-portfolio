import { prisma } from './db'
import fs from 'fs'
import path from 'path'
import os from 'os'

export interface VisitorStatsData {
  totalViews: number
  uniqueVisitors: number
}

// In-memory fallback to preserve statistics if the environment is strictly read-only
const globalForStats = global as unknown as { inMemoryStats?: VisitorStatsData }
if (!globalForStats.inMemoryStats) {
  globalForStats.inMemoryStats = { totalViews: 0, uniqueVisitors: 0 }
}

function getFallbackFilePath(): string {
  const localPath = path.join(process.cwd(), 'src/data/visitor-stats.json')
  try {
    const dir = path.dirname(localPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // Attempt writing a temporary test file to verify directory write access
    const testFile = path.join(dir, `.write-test-${Math.random().toString(36).substring(2)}`)
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    return localPath
  } catch {
    // If local project directory is read-only (e.g., Vercel / serverless), write to OS temp dir
    return path.join(os.tmpdir(), 'new-portfolio-visitor-stats.json')
  }
}

const FALLBACK_FILE_PATH = getFallbackFilePath()

function ensureFallbackFileExists() {
  if (!fs.existsSync(FALLBACK_FILE_PATH)) {
    try {
      const dir = path.dirname(FALLBACK_FILE_PATH)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify({ totalViews: 0, uniqueVisitors: 0 }, null, 2))
    } catch (err) {
      console.warn('Error creating fallback analytics file (will use in-memory fallback):', err)
    }
  }
}

function getFallbackStats(): VisitorStatsData {
  ensureFallbackFileExists()
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const content = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8')
      const parsed = JSON.parse(content) as VisitorStatsData
      globalForStats.inMemoryStats = parsed
      return parsed
    }
  } catch (err) {
    console.warn('Error reading fallback stats file:', err)
  }
  return globalForStats.inMemoryStats || { totalViews: 0, uniqueVisitors: 0 }
}

function updateFallbackStats(stats: VisitorStatsData) {
  globalForStats.inMemoryStats = stats
  ensureFallbackFileExists()
  try {
    if (fs.existsSync(path.dirname(FALLBACK_FILE_PATH))) {
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(stats, null, 2))
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('Error writing fallback stats file:', msg)
  }
}

export async function incrementViews(isUnique: boolean): Promise<VisitorStatsData> {
  const dbUrl = process.env.DATABASE_URL
  const useDb = dbUrl && !dbUrl.includes('johndoe')

  if (useDb) {
    try {
      const stats = await prisma.visitorStats.upsert({
        where: { id: 'global' },
        update: {
          totalViews: { increment: 1 },
          uniqueVisitors: { increment: isUnique ? 1 : 0 },
        },
        create: {
          id: 'global',
          totalViews: 1,
          uniqueVisitors: isUnique ? 1 : 0,
        },
      })
      return {
        totalViews: stats.totalViews,
        uniqueVisitors: stats.uniqueVisitors,
      }
    } catch (err) {
      console.error('Database analytics update failed, falling back to local storage:', err)
    }
  }

  // Fallback to local JSON file
  const stats = getFallbackStats()
  stats.totalViews += 1
  if (isUnique) {
    stats.uniqueVisitors += 1
  }
  updateFallbackStats(stats)
  return stats
}

export async function getViews(): Promise<VisitorStatsData> {
  const dbUrl = process.env.DATABASE_URL
  const useDb = dbUrl && !dbUrl.includes('johndoe')

  if (useDb) {
    try {
      const stats = await prisma.visitorStats.findUnique({
        where: { id: 'global' },
      })
      if (stats) {
        return {
          totalViews: stats.totalViews,
          uniqueVisitors: stats.uniqueVisitors,
        }
      }
    } catch (err) {
      console.error('Database analytics fetch failed, falling back to local storage:', err)
    }
  }

  return getFallbackStats()
}
