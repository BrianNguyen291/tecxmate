"use client"

import { motion } from "framer-motion"

export function PartnersSection() {
  const partners = [
    {
      name: "TechCorp",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "InnovateLabs",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "FutureWorks",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "GlobalTech",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "DigitalSolutions",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "NextGen",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "SmartSystems",
      logo: "/placeholder.svg?height=80&width=160",
    },
    {
      name: "TechInnovate",
      logo: "/placeholder.svg?height=80&width=160",
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Partners</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Industry Leaders</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            We collaborate with leading companies across various industries
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group relative flex h-24 w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary/20 hover:shadow-md">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="max-h-12 w-auto max-w-full grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-medium text-primary">{partner.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
