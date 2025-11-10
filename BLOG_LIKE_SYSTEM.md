# Blog Like System Feature

## Overview

Your blog now has a fully integrated like system! Users can like blog posts, and like counts are persisted in Upstash Redis (same database as view counts).

## Features

✅ **Persistent Likes** - Like counts are stored in Upstash Redis  
✅ **User State Tracking** - Uses localStorage to remember if user has liked a post  
✅ **Like/Unlike Toggle** - Users can like and unlike posts  
✅ **Like Count Display** - Shows like count on blog posts and listing pages  
✅ **Real-time Updates** - Like counts update immediately  
✅ **Formatted Numbers** - Large numbers are formatted with commas  

## How It Works

### 1. **Like Tracking**
- When a user clicks the like button, the like count is incremented/decremented
- Like state is stored in localStorage (per browser)
- Like counts are stored in Upstash Redis with key: `blog:likes:{slug}`

### 2. **Like Display Locations**

#### Blog Post Page (`/blog/[slug]`)
- Shows like button with count: "Like (42)" or "Liked (42)"
- Button shows loading state while processing
- Star icon is filled when liked

#### Blog Listing Page (`/blog`)
- Shows like count with star icon (⭐) next to views
- Only displays if post has likes

### 3. **Storage**
- Like counts stored in **Upstash Redis** (same as views)
- Keys: `blog:likes:{slug}`
- User's liked posts tracked in browser localStorage

## API Endpoints

### Toggle Like
```http
POST /api/blog/likes
Content-Type: application/json

{
  "slug": "your-post-slug",
  "action": "like"  // or "unlike"
}
```

**Response:**
```json
{
  "success": true,
  "likes": 42,
  "slug": "your-post-slug",
  "liked": true
}
```

### Get Like Counts

**Single post:**
```http
GET /api/blog/likes?slug=your-post-slug
```

**Response:**
```json
{
  "slug": "your-post-slug",
  "likes": 42
}
```

**Multiple posts:**
```http
GET /api/blog/likes?slugs=post-1,post-2,post-3
```

**Response:**
```json
{
  "post-1": 100,
  "post-2": 50,
  "post-3": 25
}
```

## User Experience

1. **User visits blog post** → Like count is loaded
2. **User clicks Like button** → Count increments, button shows "Liked"
3. **User clicks again** → Count decrements, button shows "Like"
4. **User refreshes page** → Like state is remembered (localStorage)
5. **Like count persists** → Stored in Redis, survives deployments

## Technical Details

### localStorage Usage
- Stores array of liked post slugs: `["post-1", "post-2"]`
- Key: `likedPosts`
- Used to remember user's liked posts across page refreshes

### Redis Storage
- Key format: `blog:likes:{slug}`
- Value: Number (like count)
- Uses atomic increment/decrement operations

### Error Handling
- Gracefully handles Redis connection errors
- Falls back to 0 likes if Redis is not configured
- Shows toast notifications on errors

## Files Created/Modified

- `app/api/blog/likes/route.ts` - API endpoint for likes
- `components/blog-post-content.tsx` - Added like functionality
- `components/blog-listing.tsx` - Added like count display

## Setup

**No additional setup required!** The like system uses the same Upstash Redis database as the view counter.

Just make sure you have:
- ✅ Upstash Redis configured (see `VERCEL_KV_SETUP.md`)
- ✅ Environment variables set:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

## Limitations

- **localStorage-based tracking** - Likes are tracked per browser (not per user account)
- **No user accounts** - Cannot prevent multiple likes from different devices
- **Browser-specific** - Clearing browser data will reset liked state

## Future Enhancements

If you want to improve the like system:

1. **User Authentication** - Track likes per user account
2. **IP-based Tracking** - Prevent multiple likes from same IP
3. **Like Analytics** - Track which posts are most liked
4. **Like Notifications** - Notify authors when posts are liked
5. **Popular Posts Widget** - Show most liked posts in sidebar

## Testing

1. **Visit a blog post** → Click the like button
2. **Check like count** → Should increment to 1
3. **Click again** → Should decrement to 0
4. **Refresh page** → Like state should be remembered
5. **Check blog listing** → Like count should appear if > 0

---

✅ **Like system is fully integrated and ready to use!**

