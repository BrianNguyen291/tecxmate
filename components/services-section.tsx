"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Bot } from "lucide-react"

export function ServicesSection() {

  const services = [
    {
      id: "ai-applications",
      icon: Brain,
      title: "AI Application Development",
      description: "Build intelligent applications powered by machine learning, natural language processing, and computer vision. From chatbots to predictive analytics, we create AI solutions that drive business value.",
    },
    {
      id: "business-automation",
      icon: Zap,
      title: "Business Automation",
      description: "Automate repetitive workflows, streamline operations, and integrate systems to boost efficiency. Reduce manual work and focus on what matters most to your business.",
    },
    {
      id: "ai-integration",
      icon: Bot,
      title: "AI Integration & Consulting",
      description: "Integrate existing AI tools into your workflow or get expert guidance on AI strategy. We help you identify automation opportunities and implement the right solutions.",
    },
  ]

  return (
    <section id="services" className="bg-white py-24 md:py-28 lg:py-32">
      <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl mb-4 tracking-tight text-gray-900">Our Services</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Technology solutions designed to work for you—from AI applications to streamlined operations.
              </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-6 flex-1">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/10 shadow-sm transition-all duration-200">
                    <IconComponent className="w-6 h-6 text-alt-gray-600 group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-alt-black mb-3">{service.title}</h3>
                  <p className="text-alt-gray-500 leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-auto">
                  <Link href={`/services/${service.id === 'ai-applications' ? 'ai-application-development' : service.id === 'ai-integration' ? 'ai-integration-consulting' : service.id}`} className="text-primary hover:underline text-sm font-medium inline-flex items-center">
                    Learn More →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-alt-gray-200 hover:border-primary hover:text-primary transition-colors duration-200"
            asChild
          >
            <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
              Book a Consultation Call
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
