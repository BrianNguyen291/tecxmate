import { NextResponse } from "next/server"
import { wpGetPostBySlug } from "@/lib/wordpress"

// Fallback data for specific posts
const getFallbackPost = (slug: string) => {
  return {
    id: `fallback-${slug}`,
    slug: slug,
    title: "Sample Blog Post",
    excerpt: "This is a sample blog post that appears when the Notion API is unavailable.",
    date: "January 1, 2023",
    readTime: "5 min read",
    category: "General",
    coverImage: "/placeholder.svg?height=600&width=1200",
    content:
      "# Sample Content\n\nThis is a sample blog post content. The actual content could not be loaded from Notion.\n\n## Why am I seeing this?\n\nThis could be due to:\n- Notion API connection issues\n- Missing or incorrect environment variables\n- Database configuration issues\n\nPlease check your Notion integration setup and try again later.",
  }
}

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params
    const post = await wpGetPostBySlug(slug)
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    const { slug } = await context.params
    return NextResponse.json(getFallbackPost(slug))
  }
}
