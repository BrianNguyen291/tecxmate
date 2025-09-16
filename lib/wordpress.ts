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

function getWordpressSite(): string {
  return process.env.WORDPRESS_SITE || "phucphanblog.wordpress.com"
}

function computeReadTimeFromHtml(html: string): string {
  const text = html.replace(/<[^>]*>/g, " ")
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function mapWpPostToBlogPost(post: any): WPBlogPost {
  const rawTitle = post.title?.rendered || "Untitled"
  const title = decodeHtmlEntities(rawTitle)
  const excerptHtml = post.excerpt?.rendered || ""
  const contentHtml = post.content?.rendered || ""
  const date = post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""
  const readTime = computeReadTimeFromHtml(contentHtml || excerptHtml)

  let coverImage = "/placeholder.svg?height=600&width=1200"
  try {
    const media = post._embedded?.["wp:featuredmedia"]?.[0]
    if (media?.source_url) coverImage = media.source_url
  } catch {}

  // Fallback: extract first image from content if no featured image
  if (!coverImage || coverImage.includes("placeholder")) {
    const match = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i)
    if (match && match[1]) {
      coverImage = match[1]
    }
  }

  let category = "Blog"
  try {
    const cats = post._embedded?.["wp:term"]?.flat()?.filter((t: any) => t.taxonomy === "category")
    if (cats && cats.length > 0 && cats[0].name) category = cats[0].name
  } catch {}

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt: decodeHtmlEntities(excerptHtml.replace(/<[^>]*>/g, " ").trim()),
    date,
    readTime,
    category,
    coverImage,
    content: decodeHtmlEntities(contentHtml),
  }
}

function decodeHtmlEntities(html: string): string {
  // Basic named entities
  let decoded = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")

  // Numeric entities (decimal)
  decoded = decoded.replace(/&#(\d+);/g, (_m, dec) => {
    const code = parseInt(dec, 10)
    return Number.isFinite(code) ? String.fromCharCode(code) : _m
  })

  // Numeric entities (hex)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => {
    const code = parseInt(hex, 16)
    return Number.isFinite(code) ? String.fromCharCode(code) : _m
  })

  return decoded
}

export async function wpGetAllPosts(): Promise<WPBlogPost[]> {
  const site = getWordpressSite()
  const url = `https://public-api.wordpress.com/wp/v2/sites/${site}/posts?per_page=20&_embed`
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? data.map(mapWpPostToBlogPost) : []
}

export async function wpGetPostBySlug(slug: string): Promise<WPBlogPost | null> {
  const site = getWordpressSite()
  const url = `https://public-api.wordpress.com/wp/v2/sites/${site}/posts?slug=${encodeURIComponent(slug)}&_embed`
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) return null
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) return null
  return mapWpPostToBlogPost(data[0])
}


