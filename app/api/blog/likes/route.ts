import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis using environment variables
const redis = Redis.fromEnv()

// Toggle like for a blog post
export async function POST(request: NextRequest) {
  try {
    const { slug, action } = await request.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      )
    }

    const likesKey = `blog:likes:${slug}`
    
    if (action === 'like') {
      // Increment like count
      const likes = await redis.incr(likesKey)
      return NextResponse.json({
        success: true,
        likes,
        slug,
        liked: true
      })
    } else if (action === 'unlike') {
      // Decrement like count (don't go below 0)
      const currentLikes = await redis.get<number>(likesKey) || 0
      if (currentLikes > 0) {
        const likes = await redis.decr(likesKey)
        return NextResponse.json({
          success: true,
          likes: Math.max(0, likes),
          slug,
          liked: false
        })
      }
      return NextResponse.json({
        success: true,
        likes: 0,
        slug,
        liked: false
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "like" or "unlike"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    // If Redis is not configured, return gracefully
    if (error instanceof Error && error.message.includes('UPSTASH')) {
      return NextResponse.json({
        success: true,
        likes: 0,
        slug: '',
        liked: false,
        warning: 'Redis not configured'
      })
    }
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}

// Get like counts for one or multiple posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const slugs = searchParams.get('slugs')?.split(',')

    if (slug) {
      // Return like count for a single post
      const likes = await redis.get<number>(`blog:likes:${slug}`) || 0
      return NextResponse.json({
        slug,
        likes: Number(likes)
      })
    } else if (slugs && slugs.length > 0) {
      // Return like counts for multiple posts
      const result: Record<string, number> = {}
      const keys = slugs.map(s => `blog:likes:${s}`)
      const values = await redis.mget<number[]>(keys)
      
      slugs.forEach((s, i) => {
        result[s] = Number(values[i]) || 0
      })
      return NextResponse.json(result)
    } else {
      // Return empty object
      return NextResponse.json({})
    }
  } catch (error) {
    console.error('Error getting likes:', error)
    // If Redis is not configured, return empty counts gracefully
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const slugs = searchParams.get('slugs')?.split(',')
    
    if (slug) {
      return NextResponse.json({ slug, likes: 0 })
    } else if (slugs && slugs.length > 0) {
      const result: Record<string, number> = {}
      slugs.forEach(s => {
        result[s] = 0
      })
      return NextResponse.json(result)
    }
    return NextResponse.json({})
  }
}

