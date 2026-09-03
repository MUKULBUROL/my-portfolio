import { NextRequest, NextResponse } from 'next/server'
import { incrementViews, getViews } from '@/lib/visitor'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting: Max 30 updates per minute per IP
    const { success } = rateLimit(req, 30, 60000)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const cookies = req.cookies
    const visited = cookies.has('portfolio_visited')
    
    const isUnique = !visited
    const stats = await incrementViews(isUnique)
    
    const response = NextResponse.json(stats)
    
    if (isUnique) {
      response.cookies.set('portfolio_visited', 'true', {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }
    
    return response
  } catch (err) {
    console.error('Failed to update analytics:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Rate Limiting: Max 60 reads per minute per IP
    const { success } = rateLimit(req, 60, 60000)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const stats = await getViews()
    return NextResponse.json(stats)
  } catch (err) {
    console.error('Failed to get analytics:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
