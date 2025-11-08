import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Bot, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

const services = {
  "ai-application-development": {
    id: "ai-applications",
    icon: Brain,
    title: "AI Application Development",
    description: "Build intelligent applications powered by machine learning, natural language processing, and computer vision. From chatbots to predictive analytics, we create AI solutions that drive business value.",
    longDescription: "Transform your business with cutting-edge AI applications. Our team specializes in developing intelligent solutions that leverage machine learning, natural language processing, and computer vision to solve real-world business challenges. Whether you need chatbots, predictive analytics, or custom AI solutions, we deliver applications that drive measurable business value.",
    features: [
      "Machine Learning & Deep Learning Models",
      "Natural Language Processing (NLP)",
      "Computer Vision & Image Recognition",
      "Predictive Analytics & Forecasting",
      "Chatbots & Virtual Assistants",
      "Custom AI Solution Development",
      "AI Model Training & Optimization",
      "API Integration & Deployment"
    ],
    benefits: [
      "Improved decision-making through data insights",
      "Enhanced customer experience with AI-powered interactions",
      "Reduced operational costs through automation",
      "Scalable solutions that grow with your business",
      "Competitive advantage through innovation"
    ],
    useCases: [
      "Customer service chatbots",
      "Predictive maintenance systems",
      "Image and document recognition",
      "Personalized recommendation engines",
      "Fraud detection systems",
      "Supply chain optimization"
    ],
  },
  "business-automation": {
    id: "business-automation",
    icon: Zap,
    title: "Business Automation",
    description: "Automate repetitive workflows, streamline operations, and integrate systems to boost efficiency. Reduce manual work and focus on what matters most to your business.",
    longDescription: "Streamline your business operations with intelligent automation solutions. We help you identify repetitive tasks, automate workflows, and integrate systems to maximize efficiency. From data entry automation to complex workflow orchestration, our solutions reduce manual work and free up your team to focus on strategic initiatives.",
    features: [
      "Workflow Automation & Orchestration",
      "System Integration & API Development",
      "Process Optimization & Reengineering",
      "Data Pipeline Automation",
      "Custom Automation Solutions",
      "RPA (Robotic Process Automation)",
      "Business Process Management",
      "Third-party Tool Integration"
    ],
    benefits: [
      "Significant time savings on repetitive tasks",
      "Reduced human errors and improved accuracy",
      "Enhanced productivity and efficiency",
      "Better resource allocation",
      "Scalable processes that adapt to growth"
    ],
    useCases: [
      "Invoice processing automation",
      "Customer onboarding workflows",
      "Data migration and synchronization",
      "Report generation and distribution",
      "Inventory management automation",
      "Email and communication automation"
    ],
  },
  "ai-integration-consulting": {
    id: "ai-integration",
    icon: Bot,
    title: "AI Integration & Consulting",
    description: "Integrate existing AI tools into your workflow or get expert guidance on AI strategy. We help you identify automation opportunities and implement the right solutions.",
    longDescription: "Get expert guidance on AI strategy and implementation. Whether you want to integrate existing AI tools into your workflow or develop a comprehensive AI roadmap, our consultants help you identify opportunities, evaluate solutions, and implement the right AI technologies for your business needs.",
    features: [
      "AI Strategy Consulting & Planning",
      "AI Tool Evaluation & Selection",
      "AI Integration & Implementation",
      "Performance Optimization & Tuning",
      "Training & Knowledge Transfer",
      "AI Roadmap Development",
      "ROI Analysis & Business Case Development",
      "Ongoing Support & Maintenance"
    ],
    benefits: [
      "Strategic AI implementation aligned with business goals",
      "Reduced implementation risks",
      "Faster time to value",
      "Expert guidance throughout the process",
      "Long-term AI strategy and roadmap"
    ],
    useCases: [
      "AI tool selection and evaluation",
      "Integrating ChatGPT/Claude into workflows",
      "Developing AI adoption strategies",
      "AI performance optimization",
      "AI training and change management",
      "Building AI capabilities within your team"
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    return {
      title: "Service Not Found | Tecxmate",
    }
  }

  return {
    title: `${service.title} - Expert Services | Tecxmate`,
    description: service.description,
    keywords: [
      service.title.toLowerCase(),
      "technology consultancy",
      "SME solutions",
      "business automation",
      "AI development",
      "digital transformation",
      "tech consulting",
    ].join(", "),
    alternates: {
      canonical: `${baseUrl}/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} - Expert Services | Tecxmate`,
      description: service.description,
      url: `${baseUrl}/services/${slug}`,
      siteName: "Tecxmate",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/tecxmate-logo-cropped.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} - Tecxmate`,
          type: "image/png",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} - Expert Services | Tecxmate`,
      description: service.description,
      images: [`${baseUrl}/tecxmate-logo-cropped.png`],
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  const IconComponent = service.icon

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Tecxmate",
      "url": baseUrl,
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "serviceType": service.title,
    "url": `${baseUrl}/services/${slug}`,
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${baseUrl}/services/${slug}`
      }
    ]
  }

  return (
    <>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <Script
        id="service-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <section className="bg-primary/5 py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <Link href="/services" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back to All Services
              </Link>
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {service.title}
                  </h1>
                </div>
                <p className="text-lg text-gray-600 md:text-xl/relaxed mb-8">
                  {service.longDescription}
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-6xl">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">Benefits</h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {service.useCases.map((useCase, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white" asChild>
                  <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                    Get Started with {service.title}
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

