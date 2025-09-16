"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost as BlogPost } from "@/lib/wordpress"
import { useRouter } from "next/navigation"

interface BlogPostContentProps {
  slug: string
}

export function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/post/${slug}`)

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/blog/not-found")
            return
          }
          throw new Error(`Failed to fetch post: ${response.status}`)
        }

        const data = await response.json()
        setPost(data)
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("Failed to load blog post. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, router])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
            <h3 className="mb-2 text-lg font-semibold">Error</h3>
            <p>{error || "Failed to load blog post"}</p>
            <Link href="/blog" className="mt-4 inline-block text-primary">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article>
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <img
          src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-primary/80 px-3 py-1 text-sm font-medium">
              {post.category}
            </span>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to all posts
          </Link>

          <div className="wp-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
      </div>
    </article>
  )
}
