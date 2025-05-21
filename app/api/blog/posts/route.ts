import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/notion"

// Fallback data in case Notion API fails
const fallbackPosts = [
  {
    id: "fallback-1",
    slug: "web-design-trends",
    title: "Web Design Trends to Watch",
    excerpt: "Explore the latest web design trends that are shaping the digital landscape this year.",
    date: "January 15, 2023",
    readTime: "5 min read",
    category: "Design",
    coverImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "fallback-2",
    slug: "improving-website-speed",
    title: "Improving Website Loading Speed",
    excerpt: "Learn practical tips and techniques to optimize your website's performance.",
    date: "February 3, 2023",
    readTime: "7 min read",
    category: "Performance",
    coverImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "fallback-3",
    slug: "mobile-first-design",
    title: "Mobile-First Design Importance",
    excerpt: "With mobile traffic continuing to rise, designing for mobile-first is no longer optional.",
    date: "March 12, 2023",
    readTime: "6 min read",
    category: "Design",
    coverImage: "/placeholder.svg?height=200&width=400",
  },
]

export async function GET() {
  try {
    console.log("API route: Attempting to fetch blog posts")

    // Check if environment variables are set
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.log("API route: Environment variables missing, returning fallback data")
      return NextResponse.json(fallbackPosts)
    }

    // Try to fetch posts from Notion
    const posts = await getAllPosts()

    // If we got posts, return them
    if (posts && posts.length > 0) {
      console.log(`API route: Successfully fetched ${posts.length} posts from Notion`)
      return NextResponse.json(posts)
    }

    // If no posts were returned, use fallback data
    console.log("API route: No posts returned from Notion, using fallback data")
    return NextResponse.json(fallbackPosts)
  } catch (error) {
    console.error("API route error:", error)
    console.log("API route: Error occurred, returning fallback data")
    return NextResponse.json(fallbackPosts)
  }
}
