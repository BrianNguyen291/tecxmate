import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogPostContent } from "@/components/blog-post-content"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogPostContent slug={params.slug} />
      <Footer />
    </div>
  )
}
