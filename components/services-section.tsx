"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ComprehensiveOnboardingForm } from "@/components/comprehensive-onboarding-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Code, Palette, Search, Phone } from "lucide-react"

export function ServicesSection() {
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const services = [
    {
      id: "mvp",
      icon: Lightbulb,
      title: "Idea Launchpad",
      description: "Quickly turn early-stage ideas into validated business concepts with our comprehensive MVP development process.",
    },
    {
      id: "product",
      icon: Code,
      title: "Product Development",
      description: "Build scalable websites and mobile apps with modern frameworks and AI-driven workflows.",
    },
    {
      id: "design",
      icon: Palette,
      title: "UI/UX & Brand Design",
      description: "Stand out with bold UI/UX design built to engage users and boost conversions.",
    },
    {
      id: "research",
      icon: Search,
      title: "Strategy & Research",
      description: "Validate product ideas, explore new markets, and find your competitive edge.",
    },
    {
      id: "premium",
      icon: Phone,
      title: "Premium Package",
      description: "Get instant service — book a personalized strategy call with our team.",
      isSpecial: true,
    },
  ]

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "premium") {
      if (isClient) {
        window.open("https://cal.com/nikolasdoan/30min", "_blank")
      }
    } else {
      setShowDemoForm(true)
    }
  }

  return (
    <section id="services" className="bg-alt-gray-100 py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl mb-6">Our Services</h2>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-alt-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-alt-gray-600 group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-alt-black mb-3">{service.title}</h3>
                  <p className="text-alt-gray-500 leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-200">
                  <span>{service.isSpecial ? 'Book a Call' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
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
            onClick={() => setShowDemoForm(true)}
          >
            Help Me Choose
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
