import { NextRequest } from 'next/server'

interface RateLimitRecord {
  timestamps: number[]
}

const ipCache = new Map<string, RateLimitRecord>()

// Clean cache every 5 minutes to prevent memory leaks in long-running processes
if (typeof global !== 'undefined') {
  const globalForCache = global as unknown as { rateLimitCacheCleanupInterval?: ReturnType<typeof setInterval> }
  if (!globalForCache.rateLimitCacheCleanupInterval) {
    globalForCache.rateLimitCacheCleanupInterval = setInterval(() => {
      const now = Date.now()
      for (const [ip, record] of ipCache.entries()) {
        // Remove timestamps older than 5 minutes (300,000 ms)
        record.timestamps = record.timestamps.filter((t) => now - t < 300000)
        if (record.timestamps.length === 0) {
          ipCache.delete(ip)
        }
      }
    }, 300000) // 5 minutes
  }
}

const MAX_CACHE_SIZE = 10000

export function rateLimit(
  req: NextRequest,
  limit: number,
  windowMs: number = 60000
): { success: boolean; currentCount: number } {
  // Extract client IP address securely:
  // 1. req.ip is populated securely by Next.js edge and Vercel runtime
  // 2. Fall back to trusted proxy headers if present
  const ip = (req as any).ip ||
             req.headers.get('x-real-ip') ||
             req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             '127.0.0.1'
  
  const now = Date.now()
  let record = ipCache.get(ip)
  
  if (!record) {
    // Prevent memory exhaustion (DoS) by enforcing a maximum size on the cache Map
    if (ipCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = ipCache.keys().next().value
      if (oldestKey !== undefined) {
        ipCache.delete(oldestKey)
      }
    }
    record = { timestamps: [] }
    ipCache.set(ip, record)
  }
  
  // Filter out timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs)
  
  if (record.timestamps.length >= limit) {
    return { success: false, currentCount: record.timestamps.length }
  }
  
  record.timestamps.push(now)
  return { success: true, currentCount: record.timestamps.length }
}
