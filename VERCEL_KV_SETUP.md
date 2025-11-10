# Vercel KV Setup Guide for Blog View Counter

## Overview

This guide will help you set up Vercel KV (Redis-compatible key-value store) to persist blog view counts in production.

## Step 1: Create Vercel KV Database

**Note:** Vercel KV is now available through the Marketplace via Upstash.

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in to your account
   - Select your project (or create one if needed)

2. **Navigate to Storage:**
   - Click on your project
   - Go to the **Storage** tab (in the top navigation)
   - Click **Create Database**

3. **Find Upstash in Marketplace:**
   - You'll see a banner at the top: **"KV and Postgres are now available through the Marketplace. Learn more"**
   - Scroll down to the **"Marketplace Database Providers"** section
   - Look for **Upstash** with description: "Serverless DB (Redis, Vector, Queue, Search)"
   - Click the **arrow button (→)** or **"Create"** button next to Upstash
   - **Location:** It's in the Marketplace section, NOT in the main storage options (Edge Config, Blob)

4. **Create Upstash Redis Database:**
   - You'll be redirected to create an Upstash account (if needed) or connect existing account
   - Create a new Redis database
   - Give it a name (e.g., "blog-views" or "tecxmate-kv")
   - Select a region (choose closest to your users)
   - Click **Create**

5. **Get Connection Details:**
   - After creation, you'll see connection details in Upstash dashboard
   - Go to your Redis database → REST API section
   - You'll need:
     - `UPSTASH_REDIS_REST_URL` - The REST API URL
     - `UPSTASH_REDIS_REST_TOKEN` - The REST API token
   - **Note:** The code uses `Redis.fromEnv()` which automatically reads these environment variables

## Step 2: Add Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project
   - Navigate to **Settings** → **Environment Variables**

2. **Add the following variables:**

   For **Production**:
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token-here
   ```

   For **Preview** (optional, same values):
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token-here
   ```

   For **Development** (optional, for local testing):
   - Add to your `.env.local` file:
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token-here
   ```

   **Note:** The code uses `@upstash/redis` with `Redis.fromEnv()`, which automatically reads these exact variable names.

3. **Save the variables**

## Step 3: Install Package (Already Done)

The `@upstash/redis` package has already been installed. If you need to reinstall:

```bash
npm install @upstash/redis
```

## Step 4: Deploy

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add Vercel KV for blog view counter"
   git push
   ```

2. **Vercel will automatically deploy:**
   - The deployment will use the environment variables you set
   - View counts will now persist in production!

## Step 5: Verify It Works

1. **Visit a blog post** on your production site
2. **Check the view count** - it should show "1 view"
3. **Refresh the page** - it should increment to "2 views"
4. **Deploy a new version** - view counts should persist (not reset!)

## How It Works

- **Key Format:** `blog:views:{slug}`
  - Example: `blog:views:hello-world`
  
- **Storage:** View counts are stored as integers in Vercel KV
- **Atomic Operations:** Uses `kv.incr()` for thread-safe increments
- **Persistence:** Data persists across deployments and server restarts

## Development Without KV

If you're developing locally and don't have KV configured:
- The API will still work but return 0 views
- No errors will be thrown
- You can test the UI without KV setup

## Pricing

**Vercel KV Free Tier:**
- 256 MB storage
- 10,000 commands/day
- Perfect for view counters!

**Paid Plans:**
- Start at $0.20 per 100K commands
- Scales automatically

## Troubleshooting

### Views not incrementing?

1. **Check environment variables:**
   - Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set in Vercel
   - Make sure they're set for the correct environment (Production/Preview)

2. **Check Vercel logs:**
   - Go to your project → **Deployments** → Click on a deployment → **Functions** tab
   - Look for errors in the `/api/blog/views` function

3. **Verify KV database:**
   - Go to **Storage** → Click on your KV database
   - Check if keys are being created (should see `blog:views:*` keys)

### Getting "KV not configured" warning?

- This is normal in development if you haven't set up KV locally
- In production, make sure environment variables are set in Vercel

### View counts resetting?

- Check if you're using the same KV database across environments
- Verify environment variables are set correctly
- Check Vercel KV dashboard to see if data exists

## Migration from File System

If you had view counts in `/data/blog-views.json`:

1. **Export the data:**
   ```bash
   cat data/blog-views.json
   ```

2. **Import to Vercel KV** (one-time script):
   ```typescript
   import { kv } from '@vercel/kv'
   import fs from 'fs'
   
   const views = JSON.parse(fs.readFileSync('data/blog-views.json', 'utf-8'))
   
   for (const [slug, count] of Object.entries(views)) {
     await kv.set(`blog:views:${slug}`, count)
     console.log(`Migrated ${slug}: ${count} views`)
   }
   ```

## Support

- **Vercel KV Docs:** https://vercel.com/docs/storage/vercel-kv
- **Vercel Support:** https://vercel.com/support

---

✅ **You're all set!** Your blog view counter will now persist in production using Vercel KV.

