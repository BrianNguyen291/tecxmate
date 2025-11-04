import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { DemoProductsSection } from "@/components/demo-products-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Script from "next/script"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3F1]">
      <Navbar />
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "tecxmate",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com",
            "logo": (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com") + "/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/tecxmate"
            ]
          }),
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "tecxmate",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com") + "/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
      <HeroSection />
      <DemoProductsSection />
      <ServicesSection />
      <TeamSection />
      <Footer />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  return {
    title: "Tecxmate - Technology Consultancy & Solutions for SMEs | Build the Future",
    description: "Empowering SMEs and Founders with premier technology consultancy and solutions. Expert web development, software solutions, business technology, and digital transformation services.",
    keywords: "technology consultancy, SME solutions, startup consulting, web development, software solutions, business technology, digital transformation, tech consulting, software development, business strategy",
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: "Tecxmate - Technology Consultancy & Solutions for SMEs",
      description: "Empowering SMEs and Founders with premier technology consultancy and solutions.",
      url: baseUrl,
      siteName: "Tecxmate",
      type: "website",
      images: [
        {
          url: `${baseUrl}/tecxmate-logo-cropped.png`,
          width: 1200,
          height: 630,
          alt: "Tecxmate - Technology Consultancy",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tecxmate - Technology Consultancy & Solutions for SMEs",
      description: "Empowering SMEs and Founders with premier technology consultancy and solutions.",
      images: [`${baseUrl}/tecxmate-logo-cropped.png`],
    },
  }
}
