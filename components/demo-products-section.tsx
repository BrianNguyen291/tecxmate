"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Smartphone, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DemoProductsSection() {
  const websites = [
    {
      title: "Tecxmate Official Website",
      description: "Company homepage showcasing our services and portfolio",
      link: "https://www.tecxmate.com/en",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "WaterWise",
      description: "Water conservation and management platform",
      link: "https://waterwise-eta.vercel.app/",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "CCVN",
      description: "Vietnamese Education platform",
      link: "https://nikolasdoan.my.canva.site/ccvn",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const mobileApps = [
    {
      title: "WaterWise Android App",
      description: "Mobile application for water conservation and management",
      link: "https://qr-codes.io/EsjC4w",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const designs = [
    {
      title: "Graphics Design Portfolio 1",
      description: "Creative design work for various clients",
      link: "https://www.canva.com/design/DAFhgUPXfoc/ZJVtFbStYA2yB3o83Hiofg/view?utm_content=DAFhgUPXfoc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Graphics Design Portfolio 2",
      description: "Brand identity and marketing materials",
      link: "https://www.canva.com/design/DAFU0RyNH_Q/FPgbEVt6_QsmnA2g53q8HQ/view?utm_content=DAFU0RyNH_Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Graphics Design Portfolio 3",
      description: "UI/UX design concepts and implementations",
      link: "https://www.canva.com/design/DAFtEVNaL2Q/SFBqoBIWngdRQ3tx57YTmA/view?utm_content=DAFtEVNaL2Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const ProjectCard = ({ project, icon: Icon, actionText }: { project: any; icon: any; actionText: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="aspect-video bg-alt-gray-100 rounded-lg mb-4 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <h3 className="text-lg font-semibold text-alt-black mb-2">{project.title}</h3>
      <p className="text-alt-gray-500 mb-4 leading-relaxed">{project.description}</p>
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all duration-200"
      >
        {actionText}
        <Icon className="w-4 h-4 ml-1" />
      </Link>
    </div>
  )

  return (
    <section id="portfolio" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl mb-6">Our Projects</h2>
        </div>

        <Tabs defaultValue="websites" className="w-full">
          <TabsList className="mx-auto mb-12 flex flex-wrap justify-center gap-2 bg-alt-gray-100 p-1">
            <TabsTrigger value="websites" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Websites
            </TabsTrigger>
            <TabsTrigger value="mobileApps" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Mobile Apps
            </TabsTrigger>
            <TabsTrigger value="designs" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Graphics Design
            </TabsTrigger>
          </TabsList>

          <TabsContent value="websites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websites.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  icon={ExternalLink}
                  actionText="Visit"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mobileApps" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mobileApps.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  icon={Smartphone}
                  actionText="Download"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="designs" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  icon={Palette}
                  actionText="View Design"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
