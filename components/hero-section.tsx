"use client"

import ShaderBackground from "@/components/shader-background"
import HeroContent from "@/components/hero-content"
import { LogoCarousel } from "@/components/logo-carousel"

export function HeroSection() {
  return (
    <ShaderBackground>
      <HeroContent />
      <LogoCarousel />
    </ShaderBackground>
  )
}
