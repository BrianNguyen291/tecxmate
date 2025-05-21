"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Clock, Lightbulb } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Cost Effective",
      description:
        "We provide affordable solutions without compromising on quality, making technology accessible for founders and small businesses.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Fast Delivery",
      description:
        "Our streamlined process ensures quick turnaround times, helping you get to market faster and stay ahead of the competition.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Innovative Solutions",
      description:
        "We leverage cutting-edge technologies and creative approaches to solve complex problems for founders and small businesses.",
    },
  ]

  return (
    <section className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Values</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Cost effective, fast delivery, innovative solutions for founders and small businesses.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
