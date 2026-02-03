"use client"

import type React from "react"
import { GlobeBackground } from "@/components/globe-background"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div 
      id="hero" 
      className="min-h-screen md:min-h-[100dvh] bg-white relative overflow-hidden snap-start -mt-16 pt-16"
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
        backfaceVisibility: 'hidden',
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      }}
    >
      <GlobeBackground />
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(250,245,255,0.4) 40%, rgba(240,249,255,0.4) 70%, rgba(255,255,255,0.8) 100%)',
        }}
        aria-hidden
      />
      {/* Stronger center wash on mobile so globe dots don't compete with hero text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none md:opacity-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 50%, transparent 75%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  )
}
