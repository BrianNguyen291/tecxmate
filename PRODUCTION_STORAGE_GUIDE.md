# Production Storage Guide for Blog View Counter

## ⚠️ Current Limitation

**The current implementation saves data to `/data/blog-views.json` on the filesystem.**

### Why This Doesn't Work in Production (Serverless Platforms)

If you're deploying to **Vercel, Netlify, or other serverless platforms**:

1. **Ephemeral Filesystem** - Files written to disk are **lost** when the serverless function ends
2. **No Persistence** - Each request may run on a different server instance
3. **Deployments Reset** - Every new deployment creates a fresh filesystem
4. **Read-Only Filesystem** - Some platforms make the filesystem read-only

**Result:** View counts will reset to 0 after each deployment or function restart! ❌

## ✅ Production Solutions

### Option 1: Vercel KV (Recommended for Vercel)

Vercel KV is a Redis-compatible key-value store, perfect for view counts.

#### Setup:

1. **Install Vercel KV:**
   ```bash
   npm install @vercel/kv
   ```

2. **Create KV Database:**
   - Go to Vercel Dashboard → Storage → Create Database
   - Choose "KV" (Redis)
   - Note the connection details

3. **Add Environment Variables:**
   ```
   KV_URL=your-kv-url
   KV_REST_API_URL=your-rest-api-url
   KV_REST_API_TOKEN=your-token
   ```

4. **Update the API route** (see example below)

#### Cost: Free tier available, then pay-as-you-go

---

### Option 2: Upstash Redis (Recommended - Works Everywhere)

Upstash is a serverless Redis that works with any platform.

#### Setup:

1. **Sign up:** https://upstash.com (free tier: 10K commands/day)

2. **Create a database** and get connection details

3. **Install:**
   ```bash
   npm install @upstash/redis
   ```

4. **Add Environment Variables:**
   ```
   UPSTASH_REDIS_REST_URL=your-url
   UPSTASH_REDIS_REST_TOKEN=your-token
   ```

5. **Update the API route** (see example below)

#### Cost: Free tier: 10K commands/day, then $0.20 per 100K commands

---

### Option 3: Vercel Postgres / Supabase

For more complex data needs, use a PostgreSQL database.

#### Setup:

1. **Create database** in Vercel Dashboard or Supabase

2. **Install:**
   ```bash
   npm install @vercel/postgres
   # or
   npm install @supabase/supabase-js
   ```

3. **Create table:**
   ```sql
   CREATE TABLE blog_views (
     slug VARCHAR(255) PRIMARY KEY,
     views INTEGER DEFAULT 0,
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Update API route** to use SQL queries

#### Cost: Free tier available, then pay-as-you-go

---

### Option 4: PlanetScale (MySQL)

Serverless MySQL database with generous free tier.

#### Setup:

1. **Sign up:** https://planetscale.com

2. **Create database** and get connection string

3. **Install:**
   ```bash
   npm install @planetscale/database
   ```

4. **Create table:**
   ```sql
   CREATE TABLE blog_views (
     slug VARCHAR(255) PRIMARY KEY,
     views INT DEFAULT 0,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

#### Cost: Free tier: 1 database, 1GB storage, 1B reads/month

---

## 🔧 Implementation Example: Upstash Redis

Here's how to update your API route to use Upstash Redis:

### 1. Install Upstash:
```bash
npm install @upstash/redis
```

### 2. Update `app/api/blog/views/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Track a view for a blog post
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      )
    }

    // Increment view count atomically
    const views = await redis.incr(`blog:views:${slug}`)

    return NextResponse.json({
      success: true,
      views,
      slug
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    )
  }
}

// Get view counts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const slugs = searchParams.get('slugs')?.split(',')

    if (slug) {
      // Single post
      const views = await redis.get(`blog:views:${slug}`) || 0
      return NextResponse.json({ slug, views: Number(views) })
    } else if (slugs && slugs.length > 0) {
      // Multiple posts
      const keys = slugs.map(s => `blog:views:${s}`)
      const values = await redis.mget(...keys)
      const result: Record<string, number> = {}
      slugs.forEach((s, i) => {
        result[s] = Number(values[i]) || 0
      })
      return NextResponse.json(result)
    } else {
      // All posts (get all keys matching pattern)
      const keys = await redis.keys('blog:views:*')
      const result: Record<string, number> = {}
      if (keys.length > 0) {
        const values = await redis.mget(...keys)
        keys.forEach((key, i) => {
          const slug = key.replace('blog:views:', '')
          result[slug] = Number(values[i]) || 0
        })
      }
      return NextResponse.json(result)
    }
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json(
      { error: 'Failed to get views' },
      { status: 500 }
    )
  }
}
```

### 3. Add Environment Variables:

In Vercel Dashboard → Settings → Environment Variables:
```
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## 📊 Comparison Table

| Solution | Cost | Setup | Best For |
|----------|------|-------|----------|
| **Upstash Redis** | Free tier: 10K/day | Easy | Any platform |
| **Vercel KV** | Free tier available | Easy | Vercel only |
| **Vercel Postgres** | Free tier available | Medium | Complex data |
| **Supabase** | Free tier: 500MB | Medium | Complex data |
| **PlanetScale** | Free tier: 1GB | Medium | MySQL preference |

---

## 🚀 Quick Migration Path

### For Vercel Users (Easiest):

1. **Use Vercel KV** (built-in, no external service)
2. Follow Vercel's KV setup guide
3. Update API route to use `@vercel/kv`

### For Any Platform (Recommended):

1. **Use Upstash Redis** (works everywhere)
2. Sign up at upstash.com (free)
3. Create database
4. Install `@upstash/redis`
5. Update API route (example above)
6. Add environment variables
7. Deploy!

---

## 🔄 Migration from File System

If you have existing view counts in `/data/blog-views.json`:

1. Export the data:
   ```bash
   cat data/blog-views.json
   ```

2. Import to your new database:
   ```typescript
   // One-time migration script
   const views = JSON.parse(fs.readFileSync('data/blog-views.json'))
   for (const [slug, count] of Object.entries(views)) {
     await redis.set(`blog:views:${slug}`, count)
   }
   ```

---

## ✅ Recommended Solution

**For your use case, I recommend Upstash Redis:**

✅ Works on any platform (Vercel, Netlify, Railway, etc.)  
✅ Generous free tier (10K commands/day)  
✅ Fast and reliable  
✅ Easy to set up  
✅ Perfect for view counters  

Would you like me to update your code to use Upstash Redis or another solution?

