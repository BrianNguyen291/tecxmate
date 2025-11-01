"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "tecxmate delivered an exceptional solution for our business needs. Their team was professional, responsive, and delivered on time.",
      author: "Shawn",
      position: "Founder",
      company: "SparkLift Inc., NYC, USA",
      avatar: "/placeholder-user.svg",
    },
    {
      quote:
        "Working with tecxmate was a great experience. They understood our requirements perfectly and provided innovative solutions.",
      author: "Paolo",
      position: "",
      company: "Harvard Kennedy School, Boston, USA",
      avatar: "/placeholder-user.svg",
    },
    {
      quote:
        "tecxmate helped us transform our business with their technology solutions. Highly recommended for any startup or SME.",
      author: "Jesse",
      position: "",
      company: "ClassZ Ltd., Hong Kong",
      avatar: "/placeholder-user.svg",
    },
    {
      quote:
        "The team at tecxmate provided excellent support for our educational platform. Their expertise in EdTech was invaluable.",
      author: "ChiChi",
      position: "",
      company: "Vietnamese Education, Vietnam",
      avatar: "/placeholder-user.svg",
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-[#F6F3F1] py-16 md:py-20 snap-start">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl">Success Stories</h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative overflow-hidden px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Card className="border-none bg-white shadow-lg">
                  <CardContent className="p-6 sm:p-10">
                    <Quote className="mb-6 h-12 w-12 text-primary/20" />
                    <p className="mb-6 text-lg italic text-gray-700 md:text-xl">{testimonials[current].quote}</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarImage
                          src={testimonials[current].avatar || "/placeholder-user.svg"}
                          alt={testimonials[current].author}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonials[current].author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonials[current].author}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonials[current].position && `${testimonials[current].position}, `}
                          {testimonials[current].company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
                onClick={previous}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`h-2.5 w-2.5 rounded-full p-0 ${index === current ? "bg-primary" : "bg-primary/20"}`}
                  onClick={() => setCurrent(index)}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
