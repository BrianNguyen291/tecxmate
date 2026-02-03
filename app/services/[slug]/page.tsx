import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactFormTrigger } from "@/components/contact-form-trigger"
import { Brain, Zap, Bot, ArrowLeft, Check, TrendingUp, Users } from "lucide-react"
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
    valueOutcomes: {
      moreCustomers: [
        "Reach and convert more leads with 24/7 AI chatbots and personalized experiences that don’t scale with headcount.",
        "Keep more customers with smarter recommendations, faster support, and experiences that feel tailored to each user.",
        "Win new segments by launching digital products and intelligent features that set you apart from competitors.",
      ],
      moreRevenue: [
        "Increase conversion and average order value through personalization, smart recommendations, and frictionless flows.",
        "Turn data into new revenue streams—predictive insights, premium features, or automated services that customers pay for.",
        "Grow revenue without growing cost linearly; scale to many more users with the same or smaller team.",
      ],
    },
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
    valueOutcomes: {
      moreCustomers: [
        "Serve more customers without adding staff—automate onboarding, follow-ups, and support so every lead gets a fast, consistent experience.",
        "Win and retain more accounts by responding faster, reducing errors, and delivering a professional, reliable impression at scale.",
        "Reallocate your team to high-value activities (sales, relationships, strategy) that directly grow your customer base.",
      ],
      moreRevenue: [
        "Cut operational cost and errors so more of every dollar becomes profit; typical projects deliver 20–40% time savings on automated processes.",
        "Handle higher volume without proportional headcount—grow revenue while keeping margins healthy.",
        "Scale repeatably: once workflows are automated, adding new customers or orders costs far less per unit.",
      ],
    },
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
    valueOutcomes: {
      moreCustomers: [
        "Deploy AI that actually gets used—we align tools with your sales and marketing flow so you convert and retain more leads.",
        "Differentiate with AI-powered experiences (support, content, recommendations) that attract and keep customers.",
        "Build a clear roadmap so your team can sell and deliver AI-backed value without guesswork or wasted effort.",
      ],
      moreRevenue: [
        "Get to revenue faster: we help you pick and implement the right AI so you see ROI in months, not years.",
        "Avoid costly mistakes—wrong tools, underused licenses, or dead-end pilots; our guidance maximizes return on every AI dollar.",
        "Turn AI into a repeatable advantage: better margins, higher throughput, and offerings that justify premium pricing.",
      ],
    },
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

          {"valueOutcomes" in service && service.valueOutcomes && (
            <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
              <div className="container px-4 md:px-6 max-w-6xl">
                <h2 className="text-2xl font-semibold mb-2 text-center">What You Get</h2>
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                  We focus on outcomes: more customers and more revenue. Here’s how this service creates value for you.
                </p>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">More Customers</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.valueOutcomes.moreCustomers.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">More Revenue</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.valueOutcomes.moreRevenue.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

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
                <ContactFormTrigger
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  Get Started with {service.title}
                </ContactFormTrigger>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

