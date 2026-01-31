"use client"

import ShaderBackground from "@/components/shader-background"
import { LogoCarousel } from "@/components/logo-carousel"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <ShaderBackground>
      <LogoCarousel />
      <div className="absolute left-4 right-4 md:left-8 bottom-4 md:bottom-6 z-20 flex flex-wrap gap-3">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white"
          asChild
        >
          <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
            Book a Call
          </a>
        </Button>
      </div>
    </ShaderBackground>
  )
}
