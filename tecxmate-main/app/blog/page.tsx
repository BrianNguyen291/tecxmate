import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogListing } from "@/components/blog-listing"
import { EnvChecker } from "@/components/env-checker"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl">Our Blog</h1>
              <p className="mt-4 max-w-lg text-muted-foreground mx-auto">
                Insights, tutorials, and updates from our team of web development experts
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <EnvChecker />
            <BlogListing />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
