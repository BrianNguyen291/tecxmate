import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogPostContent } from "@/components/blog-post-content"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogPostContent slug={slug} />
      <Footer />
    </div>
  )
}
