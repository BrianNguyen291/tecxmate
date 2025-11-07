"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import type { WPBlogPost as BlogPost } from "@/lib/wordpress"

export function BlogListing() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const selectedTag = searchParams.get("tag")
  const searchParam = searchParams.get("search")

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog/posts")

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`)
        }

        const data = await response.json()
        setBlogPosts(data)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParam])

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
    {
      id: "placeholder-4",
      slug: "#",
      title: "Understanding SEO for Developers",
      excerpt: "A comprehensive guide to search engine optimization for web developers.",
      date: "January 1, 2023",
      readTime: "8 min read",
      category: "SEO",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "placeholder-5",
      slug: "#",
      title: "The Future of JavaScript Frameworks",
      excerpt: "An in-depth look at where JavaScript frameworks are headed in the coming years.",
      date: "January 1, 2023",
      readTime: "9 min read",
      category: "Development",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "placeholder-6",
      slug: "#",
      title: "Building Accessible Web Applications",
      excerpt: "Learn how to create web applications that are accessible to all users.",
      date: "January 1, 2023",
      readTime: "7 min read",
      category: "Accessibility",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Use real posts if available, otherwise use placeholders
  const allPosts = blogPosts.length > 0 ? blogPosts : placeholderPosts

  // Filter posts based on category, tag, or search
  let filteredPosts = allPosts

  if (selectedCategory && selectedCategory !== "All") {
    filteredPosts = filteredPosts.filter(post => post.category === selectedCategory)
  }

  if (selectedTag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags && post.tags.includes(selectedTag)
    )
  }

  if (searchQuery || searchParam) {
    const query = searchQuery || searchParam || ""
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    )
  }

  const displayPosts = filteredPosts

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.category)))]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const clearFilters = () => {
    window.location.href = "/blog"
  }

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
            <h3 className="mb-2 text-lg font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-3">
            {displayPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No posts found matching your criteria.</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                {(selectedCategory || selectedTag || searchParam) && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Found {displayPosts.length} post{displayPosts.length !== 1 ? "s" : ""}
                      {selectedTag && ` tagged with "${selectedTag}"`}
                      {selectedCategory && selectedCategory !== "All" && ` in category "${selectedCategory}"`}
                      {searchParam && ` matching "${searchParam}"`}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {displayPosts.map((post) => (
                <Card
                  key={post.id}
                  className="h-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
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
                    <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight line-clamp-2">{post.title}</h3>
                    <p className="mb-4 text-gray-500 line-clamp-3">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link
                      href={blogPosts.length > 0 ? `/blog/${post.slug}` : "/blog"}
                      className="group inline-flex items-center gap-1 font-medium text-primary"
                    >
                      Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
                </div>
              </>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
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

              {(selectedCategory || selectedTag || searchParam) && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">Active Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedCategory && selectedCategory !== "All" && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                        <span className="text-primary">{selectedCategory}</span>
                        <Link href="/blog" className="text-primary hover:text-primary-dark">
                          <X className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                    {selectedTag && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                        <span className="text-primary">{selectedTag}</span>
                        <Link href="/blog" className="text-primary hover:text-primary-dark">
                          <X className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link href={category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start px-2 ${
                            selectedCategory === category ? "bg-primary/10 text-primary" : ""
                          }`}
                        >
                          {category}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Recent Posts</h3>
                <ul className="space-y-4">
                  {displayPosts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                          <img
                            src={post.coverImage || "/placeholder.svg?height=50&width=50"}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
