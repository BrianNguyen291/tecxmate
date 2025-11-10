# Blog View Counter Feature

## Overview

Your blog now tracks and displays how many users have read each blog post! The view counter automatically increments when someone visits a blog post and displays the count on both the blog listing page and individual post pages.

## How It Works

### 1. **Automatic View Tracking**
- When a user visits a blog post, the view count is automatically incremented
- Views are tracked once per page load
- The count is stored in **Vercel KV** (Redis-compatible database) for persistence

### 2. **View Display Locations**

#### Blog Post Page (`/blog/[slug]`)
- Shows view count in the meta information section (next to date and read time)
- Format: "X views" or "1 view" (singular)

#### Blog Listing Page (`/blog`)
- Shows view count on each blog post card
- Displays next to the date and read time
- Only shows if the post has views

### 3. **Storage**
- View counts are stored in **Vercel KV** (production) or file system (development fallback)
- In production: Uses Vercel KV for persistent, scalable storage
- In development: Falls back gracefully if KV is not configured
- Keys are stored as: `blog:views:{slug}`

## API Endpoints

### Track a View
```http
POST /api/blog/views
Content-Type: application/json

{
  "slug": "your-post-slug"
}
```

**Response:**
```json
{
  "success": true,
  "views": 42,
  "slug": "your-post-slug"
}
```

### Get View Counts

**Single post:**
```http
GET /api/blog/views?slug=your-post-slug
```

**Response:**
```json
{
  "slug": "your-post-slug",
  "views": 42
}
```

**Multiple posts:**
```http
GET /api/blog/views?slugs=post-1,post-2,post-3
```

**Response:**
```json
{
  "post-1": 100,
  "post-2": 50,
  "post-3": 25
}
```

**All posts:**
```http
GET /api/blog/views
```

**Response:**
```json
{
  "post-1": 100,
  "post-2": 50,
  "post-3": 25
}
```

## Features

✅ **Automatic Tracking** - Views are tracked automatically when posts are viewed  
✅ **Real-time Updates** - View counts update immediately after tracking  
✅ **Persistent Storage** - View counts are saved to disk and persist across server restarts  
✅ **Multiple Display Locations** - Shows on both listing and post pages  
✅ **Formatted Numbers** - Large numbers are formatted with commas (e.g., "1,234 views")  
✅ **Error Handling** - Gracefully handles errors without breaking the page  

## File Structure

```
app/
  api/
    blog/
      views/
        route.ts          # API endpoint using Vercel KV
components/
  blog-post-content.tsx   # Updated to track and display views
  blog-listing.tsx        # Updated to display view counts
```

## Setup Required

**Before deploying to production, you must:**

1. **Create Upstash Redis database** via Vercel Marketplace
2. **Add environment variables:**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. **See `VERCEL_KV_SETUP.md` for detailed instructions**
4. **See `ENV_SETUP.md` for environment variable documentation**

## Future Enhancements

If you want to upgrade this system later, you could:

1. **Use a Database** - Replace JSON file with a database (PostgreSQL, MongoDB, etc.)
2. **Add Unique Visitor Tracking** - Track unique visitors using cookies/IP addresses
3. **Add Time-based Analytics** - Track views by day/week/month
4. **Add Popular Posts Widget** - Show most viewed posts in sidebar
5. **Add Admin Dashboard** - View analytics in an admin panel
6. **Add Rate Limiting** - Prevent view count manipulation

## Testing

To test the view counter:

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit a blog post:**
   - Go to `/blog/[any-post-slug]`
   - Check the meta information - you should see "1 view"

3. **Refresh the page:**
   - View count should increment to "2 views"

4. **Check the blog listing:**
   - Go to `/blog`
   - You should see view counts on each post card

5. **Check Vercel KV (production):**
   - Go to Vercel Dashboard → Storage → Your KV database
   - Should see keys like `blog:views:your-post-slug` with values

## Notes

- View counts are tracked per page load (not per unique visitor)
- **Production Ready**: Now uses **Vercel KV** for persistent storage in production ✅
- View counts persist across deployments and server restarts
- Works in both development and production
- See `VERCEL_KV_SETUP.md` for setup instructions

## Troubleshooting

### Views not showing?
- Check browser console for errors
- Verify Vercel KV is set up (see `VERCEL_KV_SETUP.md`)
- Check environment variables are set in Vercel Dashboard
- Check server logs for API errors

### Views not incrementing?
- Check network tab to see if POST request to `/api/blog/views` is successful
- Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
- Check Vercel KV dashboard to see if keys are being created
- Check server logs for errors

### Want to reset view counts?
- Go to Vercel Dashboard → Storage → Your KV database
- Delete keys matching `blog:views:*` pattern
- Or use Vercel CLI: `vercel kv del blog:views:your-slug`

