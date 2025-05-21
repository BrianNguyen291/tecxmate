"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Smartphone, Palette } from "lucide-react"
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

  return (
    <section id="portfolio" className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Demo Products</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Explore our latest projects and see how we've helped businesses achieve their goals
          </p>
        </div>
        <div className="mt-10">
          <Tabs defaultValue="websites" className="w-full">
            <TabsList className="mx-auto mb-8 flex flex-wrap justify-center gap-2">
              <TabsTrigger value="websites" className="rounded-full">
                Websites
              </TabsTrigger>
              <TabsTrigger value="mobileApps" className="rounded-full">
                Mobile Apps
              </TabsTrigger>
              <TabsTrigger value="designs" className="rounded-full">
                Graphics Design
              </TabsTrigger>
            </TabsList>

            <TabsContent value="websites" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {websites.map((project, index) => (
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
                              <p className="text-sm">{project.description}</p>
                              <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-white"
                              >
                                Visit <ExternalLink className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mobileApps" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mobileApps.map((project, index) => (
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
                              <p className="text-sm">{project.description}</p>
                              <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-white"
                              >
                                Download <Smartphone className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="designs" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {designs.map((project, index) => (
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
                              <p className="text-sm">{project.description}</p>
                              <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-white"
                              >
                                View Design <Palette className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
