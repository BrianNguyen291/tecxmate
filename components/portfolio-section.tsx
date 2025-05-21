"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioSection() {
  const categories = ["All", "E-commerce", "Corporate", "SaaS", "Portfolio"]

  const projects = [
    {
      title: "E-commerce Platform",
      category: "E-commerce",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Corporate Website",
      category: "Corporate",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "SaaS Dashboard",
      category: "SaaS",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Portfolio Website",
      category: "Portfolio",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Online Store",
      category: "E-commerce",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Business Landing Page",
      category: "Corporate",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section id="portfolio" className="bg-white py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Work</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Portfolio</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Explore our latest projects and see how we've helped businesses achieve their goals
          </p>
        </div>
        <div className="mt-10">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mx-auto mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="rounded-full">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((project) => category === "All" || project.category === category)
                    .map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="aspect-video w-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                                <div className="text-center text-white">
                                  <h3 className="text-lg font-bold">{project.title}</h3>
                                  <p className="text-sm">{project.category}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
