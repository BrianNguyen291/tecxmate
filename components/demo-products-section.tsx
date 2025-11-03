"use client"

import { ExternalLink, Smartphone, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DemoProductsSection() {
  // Combine all projects into a single array
  const allProjects = [
    {
      title: "TailU",
      description: "Taiwan's Premier AI Pet Care Platform",
      link: "#",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "ClassZ",
      description: "Hong Kong’s Premier Afterschool Center Management System",
      link: "#",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "Crypted",
      description: "Pioneering Blockchain Education Platform",
      link: "https://www.crypted.vc",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "Mindmaxer",
      description: "Motivational AI for High Performance Athletes",
      link: "https://maxers.tech",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "HealthMaxers",
      description: "Performance health insights at scale",
      link: "https://healthmaxers.com",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "Chi Chi Vietnamese",
      description: "Premier Vietnamese Language Education for Mandarin speakers",
      link: "https://chichivietnamese.com",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "Mandarin",
      description: "AI Chinese Learning Platform",
      link: "#",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Learn More",
    },
    {
      title: "WaterWise",
      description: "National Water Tax management system concept",
      link: "http://waterwise-eta.vercel.app",
      image: "/placeholder.svg?height=300&width=400",
      icon: ExternalLink,
      actionText: "Visit",
    },
    {
      title: "Trash to Treasure",
      description: "Trash Credits recycling system concept",
      link: "https://www.canva.com/design/DAFhgUPXfoc/ZJVtFbStYA2yB3o83Hiofg/view?utm_content=DAFhgUPXfoc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h",
      image: "/placeholder.svg?height=300&width=400",
      icon: Palette,
      actionText: "View Design",
    },
  ]

  const ProjectCard = ({ project }: { project: typeof allProjects[0] }) => {
    const Icon = project.icon
    return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group h-full overflow-hidden aspect-[4/5] cursor-pointer"
      aria-label={project.title}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Gradient Overlay at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
      
      {/* Content at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-0">
        <div>
          <div className="h-[3.5rem] flex items-start mt-6">
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
