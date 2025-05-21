import { NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/notion"

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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    console.log(`API route: Fetching blog post with slug: ${slug}`)

    // Check if environment variables are set
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.log("API route: Environment variables missing, returning fallback post")
      return NextResponse.json(getFallbackPost(slug))
    }

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    console.log(`API route: Successfully fetched post: ${post.title}`)
    return NextResponse.json(post)
  } catch (error) {
    console.error("API route error:", error)
    console.log("API route: Error occurred, returning fallback post")
    return NextResponse.json(getFallbackPost(params.slug))
  }
}
