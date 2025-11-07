"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import type { WPBlogPost } from "@/lib/wordpress"
import { Input } from "@/components/ui/input"

interface BlogSidebarProps {
  currentPostSlug?: string
  excludeSlug?: string
}

export function BlogSidebar({ currentPostSlug, excludeSlug }: BlogSidebarProps) {
  const [recentPosts, setRecentPosts] = useState<WPBlogPost[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/blog/posts")
        if (response.ok) {
          const allPosts: WPBlogPost[] = await response.json()
          
          // Get recent posts (excluding current post)
          const recent = allPosts
            .filter(post => post.slug !== (currentPostSlug || excludeSlug))
            .slice(0, 5)
          
          setRecentPosts(recent)
          
          // Count posts by category
          const categoryMap = new Map<string, number>()
          allPosts.forEach(post => {
            const category = post.category || "Uncategorized"
            categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
          })
          
          const categoryList = Array.from(categoryMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
          
          setCategories(categoryList)
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPostSlug, excludeSlug])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  if (loading) {
    return (
      <aside className="w-full lg:w-80 flex-shrink-0">
        <div className="space-y-6">
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics/Categories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Topics</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="text-sm text-gray-700 group-hover:text-primary">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

