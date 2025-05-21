import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-2 text-3xl font-bold">Post Not Found</h2>
      <p className="mb-8 text-gray-500">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/blog">Back to Blog</Link>
      </Button>
    </div>
  )
}
