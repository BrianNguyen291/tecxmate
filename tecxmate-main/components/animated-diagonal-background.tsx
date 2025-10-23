"use client"

import { useEffect, useState } from "react"

interface AnimatedDiagonalBackgroundProps {
  className?: string
  lineCount?: number
  color?: string
  opacity?: number
}

export function AnimatedDiagonalBackground({ 
  className = "", 
  lineCount = 300, 
  color = "rgba(3,7,18,0.08)",
  opacity = 1
}: AnimatedDiagonalBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div className="w-full h-full relative">
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-offset-[-0.25px]"
            style={{
              top: `${i * 16 - 120}px`,
              left: "-100%",
              width: "300%",
              outlineColor: color,
              opacity: opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}