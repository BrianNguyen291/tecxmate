"use client"

import type React from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  // Simplified component - removed all state and effects to reduce TBT
  return (
    <div 
      id="hero" 
      className="min-h-screen md:min-h-[100dvh] bg-white relative overflow-hidden snap-start -mt-16 pt-16"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 25%, #dbeafe 50%, #fde68a 75%, #ffffff 100%)',
        transform: 'translateZ(0)', // Force hardware acceleration
        backfaceVisibility: 'hidden',
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      }}
    >
      {children}
    </div>
  )
}
