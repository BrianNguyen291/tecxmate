"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const MeshGradient = dynamic(() => import("@paper-design/shaders-react").then(m => m.MeshGradient), {
  ssr: false,
})

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [disableWebGL, setDisableWebGL] = useState(true) // Disable WebGL by default for M1 Mac performance

  useEffect(() => {
    setMounted(true)
    // Detect platform for performance optimizations
    const userAgent = navigator.userAgent.toLowerCase()
    setIsAndroid(userAgent.includes('android'))
    setIsMobile(window.innerWidth <= 768)
    
    // Debounce resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768)
      }, 250)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  if (!mounted) return null

  return (
    <div 
      id="hero" 
      ref={containerRef} 
      className="min-h-screen md:min-h-[100dvh] bg-white relative overflow-hidden snap-start -mt-16 pt-16"
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'auto', // Reduce will-change for better performance
        backfaceVisibility: 'hidden',
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      }}
    >
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Conditional rendering for mobile performance */}
      {!isAndroid && !isMobile && !disableWebGL ? (
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#ffffff", "#e9d5ff", "#dbeafe", "#fde68a", "#f3e8ff"]}
          speed={0.15}
        />
      ) : (
        /* Fallback gradient for mobile and Android - CSS gradient for better performance */
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-purple-50 to-blue-50"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 25%, #dbeafe 50%, #fde68a 75%, #ffffff 100%)'
          }}
        />
      )}

      {children}
    </div>
  )
}
