"use client"

import Link from "next/link"
import { Tag } from "lucide-react"

interface BlogTagsProps {
  tags: string[]
}

export function BlogTags({ tags }: BlogTagsProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

