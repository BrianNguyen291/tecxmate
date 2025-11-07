"use client"

import { ExternalLink, Smartphone, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function DemoProductsSection() {
  // Combine all projects into a single array
  const allProjects = [
    {
      title: "Crypted - Harvard Innovation Labs",
      description: "Pioneering Blockchain Education Platform",
      link: "https://innovationlabs.harvard.edu/venture/crypted",
      image: "/products/crypted.png",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "Rising Star Startup Competition",
      description: "Representing Vietnamese students in Taiwanese startup competitions",
      link: "https://www.youtube.com/watch?v=uRUHCy9IGps",
      image: "/products/risingstar.png",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "HealthMaxers",
      description: "Performance health insights at scale",
      link: "https://healthmaxers.com",
      image: "/products/healthmaxer.png",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "Chi Chi Vietnamese",
      description: "Premier Vietnamese Language Education for Mandarin speakers",
      link: "https://chichivietnamese.com",
      image: "/products/chichi.jpg",
      icon: ExternalLink,
      actionText: "Learn More",
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
      actionText: "Learn More",
    },
    {
      title: "IPRPSHIELD Copyright Protection Service",
      description: "Protect your brand against counterfeits, piracy, and online threats",
      link: "https://iprpshield.com/",
      image: "/products/iprpshield.png",
      icon: ExternalLink,
      actionText: "Learn More",
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Prevent link clicks during horizontal scrolling only
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let lastScrollLeft = container.scrollLeft
    let lastScrollTime = 0

    const handleScroll = () => {
      const currentScrollLeft = container.scrollLeft
      const now = Date.now()
      
      // Detect if horizontal scrolling occurred (use smaller threshold when zoomed)
      const threshold = 2 // Smaller threshold to work better when zoomed
      if (Math.abs(currentScrollLeft - lastScrollLeft) > threshold) {
        isScrollingRef.current = true
        lastScrollTime = now
        
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => {
          // Only clear if enough time has passed since last scroll
          if (Date.now() - lastScrollTime >= 250) {
            isScrollingRef.current = false
          }
        }, 300)
      }
      lastScrollLeft = currentScrollLeft
    }

    // Use event delegation to prevent clicks on links only after scroll
    const handleClick = (e: MouseEvent) => {
      // Only prevent if we were scrolling recently and it's a mouse click (not touch)
      if (isScrollingRef.current && e.type === 'click') {
        const target = e.target as HTMLElement
        const link = target.closest('a')
        if (link) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    // Use bubble phase, not capture, to avoid interfering with scroll
    container.addEventListener('click', handleClick, false)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('click', handleClick, false)
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const ProjectCard = ({ project }: { project: typeof allProjects[0] }) => {
    const Icon = project.icon
    
    return (
    <div className="rounded-lg border border-alt-gray-200 bg-white shadow-sm overflow-hidden hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col h-full w-full">
      {/* Image */}
      <div className="w-full bg-[#e3e3e3] flex-shrink-0 relative" style={{ paddingBottom: '75%', height: 0 }}>
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            quality={75}
            loading="lazy"
            priority={false}
          />
        </div>
      </div>
      
      {/* Content - Fixed height area */}
      <div className="p-4 flex flex-col flex-1 min-h-[200px]">
        <div className="flex-1 flex flex-col mb-3">
          <h3 className="text-lg font-semibold text-alt-black mb-2 text-left line-clamp-2 h-14 flex items-start">{project.title}</h3>
          <p className="text-sm text-gray-600 text-left line-clamp-2 h-10 flex items-start">{project.description}</p>
        </div>
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
          aria-label={`${project.actionText} - ${project.title}`}
        >
          <span>{project.actionText}</span>
          <Icon className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
          )
    }
  
  return (
    <section id="portfolio" className="bg-alt-gray-100 py-20 md:py-24 lg:py-28 border-t border-b border-[rgba(55,50,47,0.12)]">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-accent font-normal md:text-4xl lg:text-5xl mb-6">Our Projects</h2>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 carousel-scroll" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y pan-x pinch-zoom',
            transform: 'translateZ(0)',
            WebkitTapHighlightColor: 'transparent',
            overscrollBehaviorY: 'auto',
            overscrollBehaviorX: 'contain',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex gap-6 pb-4 min-w-max pl-4 md:pl-8 pr-4 md:pr-8 items-stretch">
            {allProjects.map((project, index) => (
              <div key={index} className="project-card-wrapper first:ml-0 last:mr-0 flex items-stretch">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
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
          overscroll-behavior-y: auto;
          scroll-padding-left: 1rem;
          scroll-padding-right: 1rem;
        }
        @media (min-width: 768px) {
          .carousel-scroll {
            scroll-padding-left: 2rem;
            scroll-padding-right: 2rem;
          }
        }
        /* Mobile: Enable native touch scrolling */
        @media (max-width: 768px) {
          .carousel-scroll {
            touch-action: pan-y pan-x pinch-zoom;
            -webkit-overflow-scrolling: touch;
            overflow-x: auto;
            cursor: default;
            user-select: auto;
          }
        }
        /* Ensure all project cards have consistent width */
        .project-card-wrapper {
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
          width: 288px !important;
          min-width: 288px !important;
          max-width: 288px !important;
        }
        @media (min-width: 768px) {
          .project-card-wrapper {
            width: 320px !important;
            min-width: 320px !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </section>
  )
}
