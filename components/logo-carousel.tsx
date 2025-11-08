"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export function LogoCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const logos = [
    {
      name: "Harvard",
      src: "/logos/harvard.png",
    },
    {
      name: "HKU",
      src: "/logos/hku.png",
    },
    {
      name: "NTUST",
      src: "/logos/ntust-logo-transparent.png",
    },
    {
      name: "NTUT",
      src: "/logos/ntut.png",
    },
    {
      name: "Crypted",
      src: "/logos/crypted.png",
    },
    {
      name: "HealthMaxers",
      src: "/logos/healthmaxers.png",
    },
    {
      name: "IPRP Shield",
      src: "/logos/IPRPSHIELD.png",
    },
    {
      name: "CHI CHI Vietnamese",
      src: "/logos/chichi.png",
    },
  ]

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScroll()
    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  return (
    <div className="absolute left-0 right-0 bottom-36 md:bottom-16">
      <div className="flex items-center gap-2 md:gap-4 relative">
        <div className="ml-2 md:ml-8 flex-shrink-0">
          <div className="flex flex-col text-left">
            <span className="text-xs md:text-sm text-gray-600 font-medium">with</span>
            <span className="text-xs md:text-sm text-gray-600 font-medium">partners</span>
            <span className="text-xs md:text-sm text-gray-600 font-medium">from</span>
          </div>
        </div>
        <div className="h-12 md:h-16 w-0.5 bg-gray-400"></div>
        
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10 bg-white/80 backdrop-blur-sm shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
        </button>

        <div 
          ref={scrollContainerRef} 
          className="flex-1 overflow-x-auto scrollbar-hide py-2 md:py-4" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex items-center gap-4 md:gap-8 min-w-max">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-8 md:h-12 w-auto relative flex-shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={48}
                  className="max-h-8 md:max-h-12 w-auto object-contain transition-all duration-300 hover:scale-110"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 80px, 120px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10 mr-2 md:mr-8 bg-white/80 backdrop-blur-sm shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
        </button>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
