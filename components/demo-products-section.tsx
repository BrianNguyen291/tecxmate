"use client"

import { ExternalLink, Smartphone, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

export function DemoProductsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  // Combine all projects into a single array
  const allProjects = [
    {
      title: "Rising Star Startup Competition",
      description: "Startup competition platform and showcase",
      link: "#",
      image: "/products/risingstar.jpg",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "Crypted - Harvard Innovation Labs",
      description: "Pioneering Blockchain Education Platform",
      link: "https://www.crypted.vc",
      image: "/products/crypted.png",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "HealthMaxers",
      description: "Performance health insights at scale",
      link: "https://healthmaxers.com",
      image: "/products/healthmaxer.png",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "Chi Chi Vietnamese",
      description: "Premier Vietnamese Language Education for Mandarin speakers",
      link: "https://chichivietnamese.com",
      image: "/products/chichi.jpg",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "TailU",
      description: "Taiwan's Premier AI Pet Care Platform",
      link: "#",
      image: "/products/tailu1.png",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "ClassZ",
      description: "Hong Kong's Premier Afterschool Center Management System",
      link: "#",
      image: "/products/classz.jpg",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "WaterWise",
      description: "National Water Tax management system concept",
      link: "http://waterwise-eta.vercel.app",
      image: "/products/waterwise.jpg",
      icon: ExternalLink,
      actionText: "Visit",
    },
  ]

  // Enhanced mobile scrolling - prevent link clicks during horizontal scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let touchStartX = 0
    let touchStartY = 0
    let touchMoved = false
    let horizontalScroll = false

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchMoved = false
      horizontalScroll = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const diffX = Math.abs(touchX - touchStartX)
      const diffY = Math.abs(touchY - touchStartY)

      // Detect if user is trying to scroll horizontally
      if (diffX > 10 || diffY > 10) {
        touchMoved = true
        if (diffX > diffY && diffX > 10) {
          horizontalScroll = true
          setIsScrolling(true)
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // If we detected horizontal scrolling, prevent link navigation
      const links = container.querySelectorAll('a')
      if (horizontalScroll && touchMoved) {
        links.forEach(link => {
          link.style.pointerEvents = 'none'
        })
        setTimeout(() => {
          links.forEach(link => {
            link.style.pointerEvents = 'auto'
          })
          setIsScrolling(false)
        }, 300)
      } else {
        setIsScrolling(false)
      }

      touchStartX = 0
      touchStartY = 0
      touchMoved = false
      horizontalScroll = false
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const ProjectCard = ({ project }: { project: typeof allProjects[0] }) => {
    const Icon = project.icon
    
    const handleClick = (e: React.MouseEvent) => {
      if (isScrolling) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    
    return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-lg shadow-sm md:hover:shadow-lg transition-all duration-300 group overflow-hidden aspect-[3/4] md:aspect-[4/3]"
      aria-label={project.title}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full relative">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover md:group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 280px, 500px"
          quality={90}
        />
      </div>
      
      {/* Gradient Overlay at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 md:group-hover:opacity-0"></div>
      
      {/* Content at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 md:group-hover:opacity-0">
        <div>
          <div className="h-[3.5rem] flex items-start mt-4">
            <h3 className="text-xl font-semibold text-white line-clamp-2 drop-shadow-lg">{project.title}</h3>
          </div>
          <div className="h-[3rem] flex items-start">
            <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow-md">{project.description}</p>
          </div>
          <div className="inline-flex items-center text-white font-medium mt-3">
            <span className="drop-shadow-lg">{project.actionText}</span>
            <Icon className="w-4 h-4 ml-1 transition-transform drop-shadow-lg" />
          </div>
        </div>
      </div>
    </Link>
    )
  }

  return (
    <section id="portfolio" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-accent font-normal md:text-4xl lg:text-5xl mb-6">Our Projects</h2>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 carousel-scroll" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
            WebkitTapHighlightColor: 'transparent',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="flex gap-8 min-w-max">
            {allProjects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] md:w-[500px]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .carousel-scroll {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
        }
      `}</style>
    </section>
  )
}
