"use client"

import { motion } from "framer-motion"
import { Search, FileCode, Zap, CheckCircle, FileText, Handshake } from "lucide-react"

export function ProcessSection() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Discovery",
      description: "We analyze your business needs and goals to create a tailored strategy.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Specify Requirements",
      description: "We define detailed requirements and assess project feasibility.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-primary" />,
      title: "Partnership Agreement",
      description: "We establish clear terms and expectations for our collaboration.",
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary" />,
      title: "Demo Stage",
      description: "We develop a prototype to demonstrate core functionality and gather feedback.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Delivery Stage",
      description: "We complete development and deploy your solution with thorough testing.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Warranty Stage",
      description: "We provide ongoing support and maintenance to ensure your solution's success.",
    },
  ]

  return (
    <section id="process" className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How We Work</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Our streamlined process ensures efficient delivery of high-quality results
          </p>
        </div>

        <div className="mt-16">
          {/* First row */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <motion.div
                    className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-primary/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.slice(3).map((step, index) => (
                <div key={index + 3} className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <motion.div
                      className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-primary/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
