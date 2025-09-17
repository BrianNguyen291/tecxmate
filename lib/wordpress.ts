export type WPBlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  coverImage: string
  content?: string
}

import { WORDPRESS_API_URL } from "./wp-config"

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

function decodeHtmlEntities(text: string) {
  if (!text) return ""
  // Named entities
  const named = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  let result = text.replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) => (named as any)[m] || m)
  // Numeric decimal entities
  result = result.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
  // Numeric hex entities
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  return result
}

function estimateReadTime(text: string) {
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function wpFeaturedImage(post: any) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0]
  if (media?.source_url) return media.source_url
  if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url
  if (typeof post.featured_image === "string" && post.featured_image) return post.featured_image
  return "/placeholder.svg?height=200&width=400"
}

function wpPrimaryCategory(post: any) {
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]
  return cat?.name || "Uncategorized"
}

export async function wpGetAllPosts(): Promise<WPBlogPost[]> {
  const url = `${WORDPRESS_API_URL}/posts?per_page=20&_embed=1`
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: decodeHtmlEntities(stripHtml(p.title?.rendered || "Untitled")),
    excerpt: decodeHtmlEntities(stripHtml(p.excerpt?.rendered || "")),
    date: new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: estimateReadTime(stripHtml(p.content?.rendered || "")),
    category: wpPrimaryCategory(p),
    coverImage: wpFeaturedImage(p),
  }))
}

export async function wpGetPostBySlug(slug: string): Promise<WPBlogPost | null> {
  const url = `${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed=1`
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) return null
  const arr = await res.json()
  const p = arr?.[0]
  if (!p) return null
  const contentHtml = p.content?.rendered || ""
  return {
    id: p.id,
    slug: p.slug,
    title: decodeHtmlEntities(stripHtml(p.title?.rendered || "Untitled")),
    excerpt: decodeHtmlEntities(stripHtml(p.excerpt?.rendered || "")),
    date: new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: estimateReadTime(stripHtml(contentHtml)),
    category: wpPrimaryCategory(p),
    coverImage: wpFeaturedImage(p),
    content: contentHtml,
  }
}


