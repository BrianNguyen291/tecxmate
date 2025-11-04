"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost } from "@/lib/wordpress"

interface RelatedPostsProps {
  currentPostSlug: string
  currentCategory: string
}

export function RelatedPosts({ currentPostSlug, currentCategory }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<WPBlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        const response = await fetch("/api/blog/posts")
        if (response.ok) {
          const allPosts: WPBlogPost[] = await response.json()
          
          // Filter out current post and get posts from same category or recent posts
          const filtered = allPosts
            .filter(post => post.slug !== currentPostSlug)
            .filter(post => 
              post.category === currentCategory || 
              post.category !== "Uncategorized"
            )
            .slice(0, 3)
          
          // If not enough posts in same category, add recent posts
          if (filtered.length < 3) {
            const recent = allPosts
              .filter(post => post.slug !== currentPostSlug && !filtered.some(p => p.slug === post.slug))
              .slice(0, 3 - filtered.length)
            setRelatedPosts([...filtered, ...recent])
          } else {
            setRelatedPosts(filtered)
          }
        }
      } catch (error) {
        console.error("Error fetching related posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentPostSlug, currentCategory])

  if (loading || relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <Card
              key={post.id}
              className="h-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={200}
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight">{post.title}</h3>
                <p className="mb-4 text-gray-500 line-clamp-2">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group inline-flex items-center gap-1 font-medium text-primary"
                >
                  Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

