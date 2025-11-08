import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DemoProductsSection } from "@/components/demo-products-section"
import type { Metadata } from "next"
import Script from "next/script"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "Our Projects - Portfolio & Case Studies | Tecxmate",
  description: "Explore Tecxmate's portfolio of successful projects including CryptED, HealthMaxers, Chi Chi Vietnamese, IPRPSHIELD, and more. See how we've helped businesses transform with technology.",
  keywords: [
    "tecxmate portfolio",
    "technology projects",
    "case studies",
    "web development projects",
    "AI development projects",
    "business automation projects",
    "success stories",
    "client projects"
  ].join(", "),
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: "Our Projects - Portfolio & Case Studies | Tecxmate",
    description: "Explore Tecxmate's portfolio of successful projects including CryptED, HealthMaxers, Chi Chi Vietnamese, and more.",
    url: `${baseUrl}/projects`,
    siteName: "Tecxmate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "Tecxmate Projects - Portfolio & Case Studies",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects - Portfolio & Case Studies | Tecxmate",
    description: "Explore Tecxmate's portfolio of successful technology projects and case studies.",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
  },
}

export default function ProjectsPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${baseUrl}/projects`
      }
    ]
  }

  return (
    <>
      <Script
        id="projects-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Our Projects
              </h1>
              <p className="text-lg text-gray-600 md:text-xl/relaxed">
                Explore our portfolio of successful technology projects and see how we've helped businesses transform with innovative solutions.
              </p>
            </div>
          </div>
        </section>
        <DemoProductsSection />
      </main>
      <Footer />
    </div>
    </>
  )
}

