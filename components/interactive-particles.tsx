"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [touchActive, setTouchActive] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const isInitializedRef = useRef(false)

  // Colors from the primary purple theme
  const colors = [
    "rgba(140, 82, 255, 0.8)", // Primary
    "rgba(140, 82, 255, 0.6)",
    "rgba(140, 82, 255, 0.4)",
    "rgba(160, 102, 255, 0.7)",
    "rgba(120, 62, 235, 0.7)",
  ]

  const initializeParticles = (width: number, height: number) => {
    const particleCount = Math.min(Math.floor((width * height) / 10000), 100)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    particlesRef.current = particles
  }

  const updateDimensions = () => {
    if (containerRef.current && canvasRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
      canvasRef.current.width = width
      canvasRef.current.height = height

      if (!isInitializedRef.current || particlesRef.current.length === 0) {
        initializeParticles(width, height)
        isInitializedRef.current = true
      }
    }
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseLeave = () => {
      setMousePosition(null)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        })
        setTouchActive(true)
      }
    }

    const handleTouchEnd = () => {
      setTouchActive(false)
      setTimeout(() => {
        setMousePosition(null)
      }, 500)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("touchmove", handleTouchMove)
      container.addEventListener("touchend", handleTouchEnd)
      container.addEventListener("touchcancel", handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
        container.removeEventListener("touchcancel", handleTouchEnd)
      }
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY = -particle.speedY
        }

        // Mouse/touch interaction
        if (mousePosition) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.speedX += (dx / distance) * force * 0.02
            particle.speedY += (dy / distance) * force * 0.02
          }
        }

        // Speed limit
        const maxSpeed = 1.5
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed
          particle.speedY = (particle.speedY / speed) * maxSpeed
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 100

            if (distance < maxDistance) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              const opacity = (maxDistance - distance) / maxDistance
              ctx.strokeStyle = `rgba(140, 82, 255, ${opacity * 0.2})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, mousePosition])

  return (
    <motion.div
      ref={containerRef}
      className="relative h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" style={{ width: "100%", height: "100%" }} />
      {/* Floating elements to enhance the visual effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-primary/5"
          initial={{ x: "10%", y: "20%" }}
          animate={{ x: "15%", y: "25%" }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-primary/10"
          initial={{ x: "70%", y: "30%" }}
          animate={{ x: "65%", y: "35%" }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-primary/5"
          initial={{ x: "40%", y: "60%" }}
          animate={{ x: "45%", y: "55%" }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}
