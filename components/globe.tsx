"use client"

import createGlobe from "cobe"
import { useEffect, useRef } from "react"

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0

    const locations = [
      // North America
      { location: [37.7749, -122.4194], size: 0.1 }, // San Francisco
      { location: [40.7128, -74.006], size: 0.1 }, // New York

      // Asia
      { location: [13.7563, 100.5018], size: 0.08 }, // Bangkok
      { location: [25.033, 121.5654], size: 0.09 }, // Taipei
      { location: [35.6762, 139.6503], size: 0.09 }, // Tokyo
      { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
      { location: [22.3193, 114.1694], size: 0.09 }, // Hong Kong
      { location: [21.0278, 105.8342], size: 0.08 }, // Hanoi
      { location: [10.8231, 106.6297], size: 0.08 }, // Ho Chi Minh City

      // Oceania
      { location: [-37.8136, 144.9631], size: 0.08 }, // Melbourne
      { location: [-40.9006, 174.886], size: 0.08 }, // New Zealand

      // Africa
      { location: [-30.5595, 22.9375], size: 0.08 }, // South Africa

      // Europe
      { location: [48.8566, 2.3522], size: 0.09 }, // Paris

      // Middle East
      { location: [23.8859, 45.0792], size: 0.08 }, // Saudi Arabia

      // Southeast Asia
      { location: [-0.7893, 113.9213], size: 0.08 }, // Indonesia
      { location: [4.2105, 101.9758], size: 0.08 }, // Malaysia
      { location: [12.8797, 121.774], size: 0.08 }, // Philippines
    ]

    // Get the size of the container
    const size = Math.min(window.innerWidth / 2, 500)
    const pixelRatio = window.devicePixelRatio || 1

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: pixelRatio,
      width: size * pixelRatio,
      height: size * pixelRatio,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [140 / 255, 82 / 255, 255 / 255], // Primary purple color
      glowColor: [1, 1, 1],
      markers: locations,
      scale: 0.9, // Scale down slightly to prevent cutoff
      onRender: (state) => {
        // Slowly rotate the globe
        phi += 0.003
        state.phi = phi

        // Draw connections between locations
        const ctx = state.context
        if (ctx) {
          const now = Date.now() / 1000

          // Draw a few random connections that change over time
          for (let i = 0; i < 10; i++) {
            const fromIndex = Math.floor((now / 5 + i * 0.7) % locations.length)
            const toIndex = Math.floor((now / 5 + i * 0.7 + locations.length / 2) % locations.length)

            const fromLoc = locations[fromIndex].location
            const toLoc = locations[toIndex].location

            // Convert lat/long to 3D coordinates
            const fromPoint = state.fromLatLngToVector3(fromLoc[0], fromLoc[1])
            const toPoint = state.fromLatLngToVector3(toLoc[0], toLoc[1])

            // Calculate animation progress (0 to 1)
            const progress = (Math.sin((now + i) * 0.5) + 1) / 2

            // Calculate the point along the line based on progress
            const x = fromPoint.x + (toPoint.x - fromPoint.x) * progress
            const y = fromPoint.y + (toPoint.y - fromPoint.y) * progress

            // Draw the line
            ctx.beginPath()
            ctx.moveTo(fromPoint.x, fromPoint.y)
            ctx.lineTo(x, y)
            ctx.strokeStyle = `rgba(140, 82, 255, ${0.6 * (1 - progress)})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Draw a small dot at the end of the line
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, 2 * Math.PI)
            ctx.fillStyle = "rgba(140, 82, 255, 0.8)"
            ctx.fill()
          }
        }
      },
    })

    // Handle window resize
    const handleResize = () => {
      const size = Math.min(window.innerWidth / 2, 500)
      const pixelRatio = window.devicePixelRatio || 1
      globe.resize(size * pixelRatio, size * pixelRatio)
    }

    window.addEventListener("resize", handleResize)

    // Make sure the canvas is visible
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      window.removeEventListener("resize", handleResize)
      globe.destroy()
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: "90%",
          height: "90%",
          maxWidth: "500px",
          maxHeight: "500px",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  )
}
