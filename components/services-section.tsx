"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ComprehensiveOnboardingForm } from "@/components/comprehensive-onboarding-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Zap, Bot } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const [showDemoForm, setShowDemoForm] = useState(false)

  const services = [
    {
      id: "ai-applications",
      icon: Brain,
      title: "AI Application Development",
      description: "Build intelligent applications powered by machine learning, natural language processing, and computer vision. From chatbots to predictive analytics, we create AI solutions that drive business value.",
      blogLink: "/blog",
    },
    {
      id: "business-automation",
      icon: Zap,
      title: "Business Automation",
      description: "Automate repetitive workflows, streamline operations, and integrate systems to boost efficiency. Reduce manual work and focus on what matters most to your business.",
      blogLink: "/blog",
    },
    {
      id: "ai-integration",
      icon: Bot,
      title: "AI Integration & Consulting",
      description: "Integrate existing AI tools into your workflow or get expert guidance on AI strategy. We help you identify automation opportunities and implement the right solutions.",
      blogLink: "/blog",
    },
  ]

  return (
    <section id="services" className="bg-alt-gray-100 py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-accent font-normal md:text-4xl lg:text-5xl mb-6">Our Services</h2>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col h-full"
              >
                <div className="mb-6 flex-1">
                  <div className="w-12 h-12 bg-alt-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-alt-gray-600 group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-alt-black mb-3">{service.title}</h3>
                  <p className="text-alt-gray-500 leading-relaxed">{service.description}</p>
                </div>
                <Link
                  href={service.blogLink}
                  className="flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-200 mt-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
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

      <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <ComprehensiveOnboardingForm onClose={() => setShowDemoForm(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
