import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ValuesSection } from "@/components/values-section"
import { DemoProductsSection } from "@/components/demo-products-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3F1]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DemoProductsSection />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
