"use client"

import { useState, useEffect, memo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost as BlogPost } from "@/lib/wordpress"

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog/posts")

        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data)
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Placeholder posts for when real posts aren't available
  const placeholderPosts = [
    {
      id: "placeholder-1",
      slug: "#",
      title: "Web Design Trends to Watch",
      excerpt: "Explore the latest web design trends that are shaping the digital landscape this year.",
      date: "January 1, 2023",
      readTime: "5 min read",
      category: "Design",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "placeholder-2",
      slug: "#",
      title: "Improving Website Loading Speed",
      excerpt: "Learn practical tips and techniques to optimize your website's performance.",
      date: "January 1, 2023",
      readTime: "7 min read",
      category: "Performance",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "placeholder-3",
      slug: "#",
      title: "Mobile-First Design Importance",
      excerpt: "With mobile traffic continuing to rise, designing for mobile-first is no longer optional.",
      date: "January 1, 2023",
      readTime: "6 min read",
      category: "Design",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Use real posts if available, otherwise use placeholders
  const displayPosts = blogPosts.length > 0 ? blogPosts.slice(0, 3) : placeholderPosts

  return (
    <section id="blog" className="bg-white py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">News & Insights</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Insights</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Stay updated with the latest trends and insights in web development and design
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={blogPosts.length > 0 ? `/blog/${post.slug}` : "/blog"}
              className="group block h-full"
            >
              <Card className="h-full overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-primary hover:shadow-md transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden relative">
                  <Image
                    src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
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
                  <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mb-4 text-gray-500 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="inline-flex items-center gap-1 font-medium text-primary">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/blog">
              View All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
