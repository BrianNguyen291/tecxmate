import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Script from "next/script"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "About Us - Technology Consultancy Team | Tecxmate",
  description: "Learn about Tecxmate - a premier technology consultancy specializing in AI development, business automation, and digital transformation for SMEs and startups. Founded in 2025 in Taipei, Taiwan.",
  keywords: [
    "about tecxmate",
    "technology consultancy team",
    "AI development company",
    "Taiwan tech consultancy",
    "business automation experts",
    "digital transformation consultants",
    "SME technology solutions",
    "startup consulting team"
  ].join(", "),
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Us - Technology Consultancy Team | Tecxmate",
    description: "Learn about Tecxmate - a premier technology consultancy specializing in AI development, business automation, and digital transformation for SMEs and startups.",
    url: `${baseUrl}/about`,
    siteName: "Tecxmate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "About Tecxmate - Technology Consultancy Team",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Technology Consultancy Team | Tecxmate",
    description: "Learn about Tecxmate - a premier technology consultancy specializing in AI development, business automation, and digital transformation.",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
  },
}

export default function AboutPage() {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Tecxmate",
      "foundingDate": "2025",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Taipei",
        "addressRegion": "Taiwan",
        "addressCountry": "TW"
      },
      "description": "Premier technology consultancy specializing in AI development, business automation, and digital transformation for SMEs and startups.",
      "url": baseUrl,
    }
  }

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
        "name": "About",
        "item": `${baseUrl}/about`
      }
    ]
  }

  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />
      <Script
        id="about-breadcrumb-jsonld"
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
                  About Tecxmate
                </h1>
                <p className="text-lg text-gray-600 md:text-xl/relaxed">
                  Empowering SMEs and Founders with premier technology consultancy and solutions
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Tecxmate, we believe that technology should be accessible and transformative for businesses of all sizes. Founded in 2025 in Taipei, Taiwan, we specialize in delivering cutting-edge technology solutions that help SMEs and startups thrive in the digital age.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We incorporate AI into our core operations while leveraging human talents to achieve maximum delivery speed and product quality. Our mission is to give every business the tools they need to stay competitive and benefit from the world of modern technology.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We provide comprehensive technology consultancy and solutions, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>AI Application Development - Building intelligent applications powered by machine learning, NLP, and computer vision</li>
                    <li>Business Automation - Automating workflows, streamlining operations, and integrating systems</li>
                    <li>AI Integration & Consulting - Integrating AI tools and providing expert guidance on AI strategy</li>
                    <li>Digital Transformation - Helping businesses transform their operations with modern technology</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We combine the power of AI with human expertise to deliver fast, high-quality solutions. Our approach focuses on:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Fast delivery without compromising quality</li>
                    <li>Innovative solutions tailored to your business needs</li>
                    <li>Cost-effective solutions for SMEs and startups</li>
                    <li>Ongoing support and partnership</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Why Choose Tecxmate</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We serve clients worldwide with professional, high-quality technology solutions. Whether you're a startup looking to build your first AI application or an established SME seeking to automate operations, we're here to help you build the future.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

