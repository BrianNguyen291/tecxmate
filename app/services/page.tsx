import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Bot, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "Our Services - AI Development, Business Automation & Tech Consulting | Tecxmate",
  description: "Discover Tecxmate's comprehensive technology services: AI application development, business automation, AI integration consulting, and digital transformation. Expert solutions for SMEs and startups.",
  keywords: [
    "AI development services",
    "business automation",
    "AI integration consulting",
    "technology consultancy",
    "digital transformation",
    "machine learning development",
    "workflow automation",
    "tech consulting services",
    "SME technology solutions",
    "startup tech consulting"
  ].join(", "),
  alternates: {
    canonical: `${baseUrl}/services`,
  },
  openGraph: {
    title: "Our Services - AI Development, Business Automation & Tech Consulting | Tecxmate",
    description: "Discover Tecxmate's comprehensive technology services: AI application development, business automation, AI integration consulting, and digital transformation.",
    url: `${baseUrl}/services`,
    siteName: "Tecxmate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "Tecxmate Services - AI Development and Business Automation",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - AI Development, Business Automation & Tech Consulting | Tecxmate",
    description: "Discover Tecxmate's comprehensive technology services: AI application development, business automation, and digital transformation.",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
  },
}

const services = [
  {
    id: "ai-applications",
    slug: "ai-application-development",
    icon: Brain,
    title: "AI Application Development",
    description: "Build intelligent applications powered by machine learning, natural language processing, and computer vision. From chatbots to predictive analytics, we create AI solutions that drive business value.",
    features: [
      "Machine Learning & Deep Learning",
      "Natural Language Processing (NLP)",
      "Computer Vision Solutions",
      "Predictive Analytics",
      "Chatbots & Virtual Assistants",
      "Custom AI Solutions"
    ],
  },
  {
    id: "business-automation",
    slug: "business-automation",
    icon: Zap,
    title: "Business Automation",
    description: "Automate repetitive workflows, streamline operations, and integrate systems to boost efficiency. Reduce manual work and focus on what matters most to your business.",
    features: [
      "Workflow Automation",
      "System Integration",
      "Process Optimization",
      "API Development",
      "Data Pipeline Automation",
      "Custom Automation Solutions"
    ],
  },
  {
    id: "ai-integration",
    slug: "ai-integration-consulting",
    icon: Bot,
    title: "AI Integration & Consulting",
    description: "Integrate existing AI tools into your workflow or get expert guidance on AI strategy. We help you identify automation opportunities and implement the right solutions.",
    features: [
      "AI Strategy Consulting",
      "Tool Integration",
      "AI Implementation",
      "Performance Optimization",
      "Training & Support",
      "AI Roadmap Planning"
    ],
  },
]

export default function ServicesPage() {
  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tecxmate Services",
    "description": "Comprehensive technology services including AI development, business automation, and AI integration consulting",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "url": `${baseUrl}/services/${service.slug}`,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Tecxmate"
        }
      }
    }))
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
        "name": "Services",
        "item": `${baseUrl}/services`
      }
    ]
  }

  return (
    <>
      <Script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />
      <Script
        id="services-breadcrumb-jsonld"
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
                  Our Services
                </h1>
                <p className="text-lg text-gray-600 md:text-xl/relaxed">
                  Comprehensive technology solutions to transform your business. From AI development to business automation, we deliver innovative solutions tailored to your needs.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <div
                      key={service.id}
                      className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col"
                    >
                      <div className="mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                      </div>
                      <div className="flex-1 mb-6">
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="text-primary mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href={`/services/${service.slug}`}>
                        <Button variant="outline" className="w-full group">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white" asChild>
                  <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                    Book a Free Consultation
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
