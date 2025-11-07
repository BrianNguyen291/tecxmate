"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost as BlogPost } from "@/lib/wordpress"
import React from "react"
import { useRouter } from "next/navigation"
import { RelatedPosts } from "@/components/related-posts"
import { BlogSidebar } from "@/components/blog-sidebar"
import { BlogTags } from "@/components/blog-tags"

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1200}
          height={630}
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
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Main Content - Left side */}
            <div className="flex-1 min-w-0 lg:pl-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to all posts
            </Link>
          </nav>

          <div 
            className="wp-content prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-lg prose-img:shadow-md" 
            dangerouslySetInnerHTML={{ __html: post.content || "" }} 
          />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <BlogTags tags={post.tags} />
              )}
            </div>

            {/* Sidebar - Right side */}
            <div className="lg:w-80 flex-shrink-0">
              <BlogSidebar currentPostSlug={post.slug} />
            </div>
          </div>
        </div>
      </div>
      
      <RelatedPosts 
        currentPostSlug={post.slug} 
        currentCategory={post.category}
        currentTags={post.tags}
      />
    </article>
  )
}
