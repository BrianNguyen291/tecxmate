"use client"

import { pomelliData } from "@/lib/pomelli-data"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function CampaignsSection() {
  const [activeCampaign, setActiveCampaign] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  let autoScrollAnimationId: number | null = null

  // Auto-scroll when cursor leaves
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isMouseDown = false
    let startX = 0
    let scrollLeft = 0
    let scrollDirection = 1
    const scrollSpeed = 0.5

    const startAutoScroll = () => {
      if (autoScrollAnimationId !== null) {
        cancelAnimationFrame(autoScrollAnimationId)
      }

      const animate = () => {
        const hasHorizontalScroll = container.scrollWidth > container.clientWidth
        if (!hasHorizontalScroll) {
          autoScrollAnimationId = null
          return
        }

        const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1
        const isAtStart = container.scrollLeft <= 1

        if (isAtEnd) {
          scrollDirection = -1
        } else if (isAtStart) {
          scrollDirection = 1
        }

        container.scrollLeft += scrollSpeed * scrollDirection
        autoScrollAnimationId = requestAnimationFrame(animate)
      }

      animate()
    }

    const stopAutoScroll = () => {
      if (autoScrollAnimationId !== null) {
        cancelAnimationFrame(autoScrollAnimationId)
        autoScrollAnimationId = null
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      stopAutoScroll()
      isMouseDown = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
      container.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      isMouseDown = false
      container.style.cursor = 'grab'
      if (!isHovered) {
        startAutoScroll()
      }
    }

    const handleMouseLeave = () => {
      isMouseDown = false
      setIsHovered(false)
      container.style.cursor = 'default'
      startAutoScroll()
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      container.style.cursor = 'grab'
      stopAutoScroll()
    }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseenter', handleMouseEnter)

    if (!isHovered) {
      startAutoScroll()
    }

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseenter', handleMouseEnter)
      stopAutoScroll()
    }
  }, [isHovered])

  const nextCampaign = () => {
    setActiveCampaign((prev) => (prev + 1) % pomelliData.campaigns.length)
  }

  const prevCampaign = () => {
    setActiveCampaign((prev) => (prev - 1 + pomelliData.campaigns.length) % pomelliData.campaigns.length)
  }

  const currentCampaign = pomelliData.campaigns[activeCampaign]

  return (
    <section id="campaigns" className="bg-gradient-to-b from-white to-gray-50/50 py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-accent font-normal md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Marketing Campaigns
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {pomelliData.overview}
          </p>
        </div>

        {/* Campaign Selector - Enhanced Design */}
        <div className="flex justify-center gap-3 mb-12">
          {pomelliData.campaigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCampaign(index)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCampaign === index
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              Campaign {index + 1}
            </button>
          ))}
        </div>

        {/* Campaign Creatives - Horizontal Scroll with Better Design */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 carousel-scroll"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            transform: 'translateZ(0)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isHovered ? 'grab' : 'default',
            userSelect: 'none',
            scrollSnapType: 'x mandatory'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-4 md:gap-6 min-w-max pl-4 md:pl-8 pr-4 md:pr-8">
            {currentCampaign.creatives.map((creative, index) => {
              const uniqueKey = `${activeCampaign}-${index}`
              if (imageErrors.has(index)) return null
              
              return (
                <div 
                  key={uniqueKey} 
                  className="flex-shrink-0 w-[160px] md:w-[280px] group snap-center"
                >
                  <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-900 transition-all duration-500 group-hover:shadow-lg group-hover:scale-[1.02] aspect-[9/16]">
                    <Image
                      src={`/campaigns/${creative.versions[0].fileName}`}
                      alt=""
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 160px, 280px"
                      priority={index === 0}
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(index))
                      }}
                    />
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-lg border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Arrows - Enhanced */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prevCampaign}
            className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous campaign"
            disabled={activeCampaign === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {pomelliData.campaigns.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeCampaign === index
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCampaign}
            className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next campaign"
            disabled={activeCampaign === pomelliData.campaigns.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        .carousel-scroll {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scroll-padding-left: 1rem;
          scroll-padding-right: 1rem;
        }
        @media (min-width: 768px) {
          .carousel-scroll {
            scroll-padding-left: 2rem;
            scroll-padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
