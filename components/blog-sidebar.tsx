"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost } from "@/lib/wordpress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface BlogSidebarProps {
  currentPostSlug?: string
  excludeSlug?: string
}

export function BlogSidebar({ currentPostSlug, excludeSlug }: BlogSidebarProps) {
  const [allPosts, setAllPosts] = useState<WPBlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/blog/posts")
        if (response.ok) {
          const posts: WPBlogPost[] = await response.json()
          setAllPosts(Array.isArray(posts) ? posts : [])
        } else {
          console.error("Failed to fetch posts:", response.status)
          setAllPosts([])
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error)
        setAllPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  // Get recent posts (excluding current post, limit to 3)
  const excludeSlugValue = currentPostSlug || excludeSlug
  const recentPosts = allPosts
    .filter(post => !excludeSlugValue || post.slug !== excludeSlugValue)
    .slice(0, 3)

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.category)))]

  if (loading) {
    return (
      <div className="sticky top-24 space-y-6">
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Search */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Search</h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search articles..." 
              className="w-full bg-white pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link href={category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2"
                >
                  {category}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Recent Posts</h3>
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md relative">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=50&width=50"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="64px"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="line-clamp-2 text-sm font-medium group-hover:text-primary">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent posts available.</p>
        )}
      </div>
    </div>
  )
}

