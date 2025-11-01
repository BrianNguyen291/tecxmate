"use client"

import { ExternalLink, Smartphone, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DemoProductsSection() {
  // Combine all projects into a single array
  const allProjects = [
    {
      title: "tecxmate Official Website",
      description: "Company homepage showcasing our services and portfolio",
      link: "https://www.tecxmate.com/en",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "WaterWise",
      description: "Water conservation and management platform",
      link: "https://waterwise-eta.vercel.app/",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "CCVN",
      description: "Vietnamese Education platform",
      link: "https://nikolasdoan.my.canva.site/ccvn",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "WaterWise Android App",
      description: "Mobile application for water conservation and management",
      link: "https://qr-codes.io/EsjC4w",
      image: "/placeholder.svg?height=300&width=400",
      icon: Smartphone,
      actionText: "Download",
    },
    {
      title: "Graphics Design Portfolio 1",
      description: "Creative design work for various clients",
      link: "https://www.canva.com/design/DAFhgUPXfoc/ZJVtFbStYA2yB3o83Hiofg/view?utm_content=DAFhgUPXfoc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h",
      image: "/placeholder.svg?height=300&width=400",
      icon: Palette,
      actionText: "View Design",
    },
    {
      title: "Graphics Design Portfolio 2",
      description: "Brand identity and marketing materials",
      link: "https://www.canva.com/design/DAFU0RyNH_Q/FPgbEVt6_QsmnA2g53q8HQ/view?utm_content=DAFU0RyNH_Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=",
      image: "/placeholder.svg?height=300&width=400",
      icon: Palette,
      actionText: "View Design",
    },
    {
      title: "Graphics Design Portfolio 3",
      description: "UI/UX design concepts and implementations",
      link: "https://www.canva.com/design/DAFtEVNaL2Q/SFBqoBIWngdRQ3tx57YTmA/view?utm_content=DAFtEVNaL2Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h",
      image: "/placeholder.svg?height=300&width=400",
      icon: Palette,
      actionText: "View Design",
    },
  ]

  const ProjectCard = ({ project }: { project: typeof allProjects[0] }) => {
    const Icon = project.icon
    return (
    <div className="relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group h-full overflow-hidden aspect-[4/5]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Gradient Overlay at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      
      {/* Content at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white line-clamp-2 drop-shadow-lg">{project.title}</h3>
          <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow-md">{project.description}</p>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white font-medium hover:gap-2 transition-all duration-200 mt-3 group/link"
          >
            <span className="drop-shadow-lg">{project.actionText}</span>
            <Icon className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform drop-shadow-lg" />
          </Link>
        </div>
      </div>
    </div>
    )
  }

  return (
    <section id="portfolio" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-accent font-normal md:text-4xl lg:text-5xl mb-6">Our Projects</h2>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-8 min-w-max items-stretch">
            {allProjects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
