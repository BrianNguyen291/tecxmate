# Quick Setup: Where to Find KV in Vercel

## 📍 Exact Location

1. **Go to:** Vercel Dashboard → Your Project
2. **Click:** **Storage** tab (top navigation)
3. **Click:** **Create Database** button
4. **Look for:** Banner that says "KV and Postgres are now available through the Marketplace"
5. **Scroll down** to **"Marketplace Database Providers"** section
6. **Find:** **Upstash** (shows "Serverless DB (Redis, Vector, Queue, Search)")
7. **Click:** The arrow (→) button next to Upstash

## 🎯 Visual Guide

```
Vercel Dashboard
  └── Your Project
      └── Storage Tab
          └── Create Database
              ├── Edge Config (top section)
              ├── Blob (top section)
              ├── ⚠️ Banner: "KV and Postgres are now available through the Marketplace"
              └── Marketplace Database Providers (scroll down)
                  ├── Neon
                  ├── Upstash ← CLICK HERE
                  ├── Supabase
                  └── ... (more options)
```

## ✅ After Clicking Upstash

1. You'll be redirected to create/connect Upstash account
2. Create a new Redis database
3. Copy the connection details:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Add these to Vercel Environment Variables

## 🔑 Environment Variables

Add to Vercel → Settings → Environment Variables:

```
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**Note:** The code uses `@upstash/redis` with `Redis.fromEnv()`, which automatically reads these exact variable names.

**Where to get these:**
1. Go to Upstash Dashboard → Your Redis Database
2. Click on "REST API" tab
3. Copy the "UPSTASH_REDIS_REST_URL" and "UPSTASH_REDIS_REST_TOKEN"

