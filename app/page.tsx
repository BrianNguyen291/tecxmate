import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { DemoProductsSection } from "@/components/demo-products-section"
import { CampaignsSection } from "@/components/campaigns-section"
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
            "@type": "ProfessionalService",
            "name": "Tecxmate",
            "alternateName": "tecxmate",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com",
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"}/tecxmate-logo-cropped.png`,
            "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"}/tecxmate-logo-cropped.png`,
            "description": "Premier technology consultancy providing AI development, web development, business automation, and digital transformation services for SMEs and startups.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Taipei",
              "addressRegion": "Taiwan",
              "addressCountry": "TW"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@tecxmate.com",
              "contactType": "Customer Service",
              "availableLanguage": ["English", "Chinese"]
            },
            "sameAs": [
              "https://www.facebook.com/tecxmate",
              "https://x.com/tecxmate",
              "https://www.instagram.com/tecxmate",
              "https://tw.linkedin.com/company/tecxmate"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Technology Consultancy Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Development & Integration",
                    "description": "Cutting-edge AI application development and integration services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom web development and software solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Automation",
                    "description": "Streamline operations with automated workflows and system integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Transformation",
                    "description": "Comprehensive digital transformation consulting for SMEs"
                  }
                }
              ]
            }
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
      <CampaignsSection />
      <TeamSection />
      <Footer />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  return {
    title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups | AI Development & Web Solutions",
    description: "Transform your business with Tecxmate's cutting-edge technology solutions. Expert AI integration, web development, business automation, and digital transformation services. Fast delivery, innovative solutions for SMEs and founders. Book your free consultation today.",
    keywords: [
      "technology consultancy",
      "AI development",
      "business automation",
      "web development",
      "startup consulting",
      "SME solutions",
      "digital transformation",
      "software development",
      "AI integration",
      "tech consulting Taiwan",
      "business technology",
      "blockchain development",
      "mobile app development",
      "enterprise solutions",
      "Taiwan tech consultancy"
    ].join(", "),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
      description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting for SMEs and founders. Book your free discovery call.",
      url: baseUrl,
      siteName: "Tecxmate",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/tecxmate-logo-cropped.png`,
          width: 1200,
          height: 630,
          alt: "Tecxmate - Premier Technology Consultancy for SMEs and Startups",
          type: "image/png",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
      description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting.",
      images: [`${baseUrl}/tecxmate-logo-cropped.png`],
      creator: "@tecxmate",
    },
  }
}
