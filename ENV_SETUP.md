# Environment Variables Setup Guide

This document explains all environment variables needed for the Tecxmate project.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values in `.env.local`

3. Restart your development server

## Required Variables

### `NEXT_PUBLIC_SITE_URL`
**Required** | **Public**

Your site's public URL. Used for:
- SEO metadata (sitemap, robots.txt)
- OpenGraph and Twitter card images
- Canonical URLs
- Structured data (JSON-LD)

**Examples:**
- Production: `https://www.tecxmate.com`
- Development: `http://localhost:3000`
- Preview: `https://tecxmate-git-main.vercel.app`

**Default:** `https://www.tecxmate.com`

---

### `WORDPRESS_SITE_URL`
**Required** | **Server-side only**

Your WordPress site URL. Used to fetch blog posts.

**For WordPress.com sites:**
```
WORDPRESS_SITE_URL=yoursite.wordpress.com
```

**For self-hosted WordPress:**
```
WORDPRESS_SITE_URL=blog.yoursite.com
```

**Default:** `phucphanblog.wordpress.com`

---

## Optional Variables

### `WORDPRESS_REVALIDATE_TIME`
**Optional** | **Server-side only**

Cache revalidation time in seconds for WordPress API requests.

**Default:** `300` (5 minutes)

**Example:**
```env
WORDPRESS_REVALIDATE_TIME=600  # 10 minutes
```

Set to `0` to disable caching (not recommended for production).

---

### `WORDPRESS_POSTS_PER_PAGE`
**Optional** | **Server-side only**

Number of blog posts to display per page.

**Default:** `9`

**Example:**
```env
WORDPRESS_POSTS_PER_PAGE=12
```

---

## Environment Variable Rules

### Public vs Private Variables

- **`NEXT_PUBLIC_*`**: Exposed to the browser. Use only for non-sensitive configuration.
- **No prefix**: Server-side only. Use for API keys and sensitive data.

### WordPress Configuration

The WordPress configuration automatically detects:
- **WordPress.com sites**: Uses public API (`public-api.wordpress.com`)
- **Self-hosted sites**: Uses REST API (`/wp-json/wp/v2`)

Make sure your self-hosted WordPress has the REST API enabled.

---

## Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all required variables
4. Set different values for Production, Preview, and Development if needed

### Other Platforms

Set environment variables according to your platform's documentation:
- **Netlify**: Site settings → Environment variables
- **Railway**: Project → Variables
- **Docker**: Use `-e` flag or `.env` file

---

## Verification

After setting up environment variables, you can verify them:

1. **Check environment status endpoint:**
   ```
   GET /api/check-env
   ```

2. **Check WordPress connection:**
   - Visit `/blog` page
   - If posts load, WordPress is configured correctly

3. **Check SEO metadata:**
   - View page source
   - Look for `<meta>` tags in `<head>`
   - Check for structured data (JSON-LD)

---

## Troubleshooting

### WordPress posts not loading

1. Verify `WORDPRESS_SITE_URL` is correct
2. Check if WordPress site is publicly accessible
3. For self-hosted sites, ensure REST API is enabled
4. Check browser console and server logs for errors

### SEO metadata not working

1. Verify `NEXT_PUBLIC_SITE_URL` is set correctly
2. Ensure it matches your actual domain
3. Check that URLs are absolute (start with `http://` or `https://`)

### Environment variables not loading

1. Restart your development server after changing `.env.local`
2. Ensure `.env.local` is in the project root (not in a subdirectory)
3. Check that variable names match exactly (case-sensitive)
4. For production, verify variables are set in your deployment platform

---

## Security Notes

⚠️ **Never commit `.env.local` to version control**

- `.env.local` is already in `.gitignore`
- Use `.env.example` as a template
- Never commit API keys or secrets
- Use different keys for development and production

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify all required variables are set
4. Test WordPress API access directly

