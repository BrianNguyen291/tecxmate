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
      <ServicesSection />
      <DemoProductsSection />
      <TeamSection />
      <Footer />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  return {
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      url: baseUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}
