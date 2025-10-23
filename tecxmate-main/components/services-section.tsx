"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Zap, PenToolIcon as Tool, Palette, Search, Calendar } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ComprehensiveOnboardingForm } from "@/components/comprehensive-onboarding-form"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function ServicesSection() {
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const services = [
    {
      id: "mvp",
      image: "/graphics/Idea Launchpad.png",
      title: "Idea Launchpad",
      subtitle: "Quickly turn early-stage ideas into validated business concepts.",
      description:
        "We help visionary founders go from rough ideas and sketches to a polished Minimum Lovable Product (MLP). It is not just functional, but also engaging and delightful from the start.",
      deliverables:
        "Deliverables: Figma wireframes, clickable prototype, dev-ready assets, analytics setup, landing page, admin panel.",
      forWhom: "For founders raising pre-seed and validating ideas.",
      color: "orange",
    },
    {
      id: "product",
      image: "/graphics/Software Development.png",
      title: "Product Development",
      subtitle: "Build scalable websites and mobile apps with modern frameworks and AI-driven workflows.",
      description:
        "From custom websites to iOS & Android apps, we craft scalable digital tools using modern frameworks and AI-driven workflows.",
      deliverables: "Deliverables: Website, responsive UI/UX, API integrations, admin panels.",
      forWhom: "For lean teams scaling with tech and needing reliable delivery.",
      color: "blue",
    },
    {
      id: "design",
      image: "/graphics/UI_UX & Brand Design.png",
      title: "UI/UX & Brand Design",
      subtitle: "Stand out with bold UI/UX design built to engage users and boost conversions.",
      description:
        "We design intuitive interfaces and bold visual identities. From product flows to full branding kits, we make your product look and feel world-class.",
      deliverables: "Includes: UI kits, design systems, brand palettes, logo + asset packs",
      forWhom: "For bold brands seeking standout design that converts.",
      color: "pink",
    },
    {
      id: "research",
      image: "/graphics/Strategy & Research.png",
      title: "Strategy & Research",
      subtitle: "Validate product ideas, explore new markets, and find your competitive edge.",
      description:
        "We analyze your market, audience, and competitors to shape a strategic product blueprint. Decide with clarity—then build with confidence.",
      deliverables: "Includes: market research, industry analysis, tech feasibility report, roadmap suggestions.",
      forWhom: "For visionaries exploring product-market fit or new verticals.",
      color: "green",
    },
    {
      id: "premium",
      image: "/graphics/Premium Package.png",
      title: "Premium Package",
      subtitle: "Get instant service — book a personalized strategy call with our team.",
      description:
        "Get personalized consultation and immediate support from our expert team. We'll help you identify the best path forward for your unique business needs.",
      deliverables: "Includes: 30-minute strategy call, personalized recommendations, priority support",
      forWhom: "Book a call with our experts to get instant consultation.",
      color: "gold",
      isSpecial: true,
    },
  ]

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "premium") {
      window.open("https://cal.com/nikolasdoan/30min", "_blank")
    } else {
      setSelectedService(serviceId)
      setShowDemoForm(true)
    }
  }

  const getIconColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "text-orange-500"
      case "blue":
        return "text-blue-500"
      case "pink":
        return "text-pink-500"
      case "green":
        return "text-green-500"
      case "gold":
        return "text-amber-500"
      default:
        return "text-primary"
    }
  }

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "border-orange-500/30"
      case "blue":
        return "border-blue-500/30"
      case "pink":
        return "border-pink-500/30"
      case "green":
        return "border-green-500/30"
      case "gold":
        return "border-amber-500/30"
      default:
        return "border-primary/30"
    }
  }

  const getButtonColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-500 hover:bg-orange-600"
      case "blue":
        return "bg-blue-500 hover:bg-blue-600"
      case "pink":
        return "bg-pink-500 hover:bg-pink-600"
      case "green":
        return "bg-green-500 hover:bg-green-600"
      case "gold":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-primary hover:bg-primary/90"
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === "left" ? -container.clientWidth / 2 : container.clientWidth / 2
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="bg-[#F6F3F1] py-16 md:py-20 snap-start border-t border-b border-[rgba(55,50,47,0.12)]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-mono font-bold tracking-tighter sm:text-4xl md:text-5xl">Services</h2>
        </div>

        <div className="relative mt-16">
          {/* Navigation buttons */}
          <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
          </div>
          <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-8 pt-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service) => {
              // Define gradient backgrounds for each color
              const cardGradient = {
                orange: 'radial-gradient(circle at 60% 40%, #ffedd5 0%, #fdba74 100%)',
                blue: 'radial-gradient(circle at 60% 40%, #dbeafe 0%, #60a5fa 100%)',
                pink: 'radial-gradient(circle at 60% 40%, #fce7f3 0%, #f472b6 100%)',
                green: 'radial-gradient(circle at 60% 40%, #dcfce7 0%, #4ade80 100%)',
                gold: 'radial-gradient(circle at 60% 40%, #fef9c3 0%, #fbbf24 100%)',
              }[service.color] || '#fff';
              return (
                <motion.div
                  key={service.id}
                  className="relative flex-shrink-0 overflow-hidden rounded-3xl transition-all duration-300 border border-[#e0dedb] shadow-sm"
                  style={{
                    width: isMobile ? "85vw" : "350px",
                    height: "500px",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    padding: 0,
                    background: cardGradient,
                    boxShadow: "0 -8px 24px -8px rgba(0,0,0,0.10)",
                  }}
                  // hover/tap animations removed per request
                >
                  {/* Card image background */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover z-0"
                    style={{borderRadius: '1.5rem'}}
                  />
                  {/* Overlay removed per request: no dark tint over cards */}
                  {/* Decorative lines for special cards */}
                  {service.isSpecial && (
                    <div className="absolute top-6 left-6 right-6 z-10 space-y-1">
                      <div className="w-full h-0.5 bg-white/20"></div>
                      <div className="w-32 h-0.5 bg-white/60"></div>
                    </div>
                  )}
                  
                  {/* Card content */}
                  <div className="relative z-20 flex flex-col justify-between h-full w-full p-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{service.title}</h3>
                    </div>
                    {/* CTA button with plus sign removed per request */}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden border-primary/20 px-8"
            onClick={() => setShowDemoForm(true)}
          >
            <span className="relative z-10">Help Me Choose</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>

      <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <ComprehensiveOnboardingForm onClose={() => setShowDemoForm(false)} />
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
