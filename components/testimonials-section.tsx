"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Script from "next/script"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "tecxmate delivered an exceptional solution for our business needs. Their team was professional, responsive, and delivered on time.",
      author: "Shawn",
      position: "Founder",
      company: "SparkLift Inc., NYC, USA",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "Working with tecxmate was a great experience. They understood our requirements perfectly and provided innovative solutions.",
      author: "Paolo",
      position: "",
      company: "Harvard Kennedy School, Boston, USA",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "tecxmate helped us transform our business with their technology solutions. Highly recommended for any startup or SME.",
      author: "Jesse",
      position: "",
      company: "ClassZ Ltd., Hong Kong",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
    {
      quote:
        "The team at tecxmate provided excellent support for our educational platform. Their expertise in EdTech was invaluable.",
      author: "ChiChi",
      position: "",
      company: "Vietnamese Education, Vietnam",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
    },
  ]

  const [current, setCurrent] = useState(0)

  // Aggregate Rating Schema for SEO
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tecxmate",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map((testimonial) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.author
      },
      "reviewBody": testimonial.quote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  }

  return (
    <>
      <Script
        id="testimonials-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="mb-6">Our Clients</h2>
            <p className="text-alt-gray-500 max-w-2xl mx-auto">
              Hear from businesses we've helped with our technology solutions
            </p>
          </div>

          <div className="text-center">
            <blockquote className="text-xl md:text-2xl italic text-alt-black mb-8 leading-relaxed">
              "{testimonials[current].quote}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={testimonials[current].avatar || "/placeholder.svg"}
                  alt={testimonials[current].author}
                />
                <AvatarFallback className="bg-alt-gray-100 text-alt-black">
                  {testimonials[current].author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h4 className="font-semibold text-alt-black">{testimonials[current].author}</h4>
                <p className="text-sm text-alt-gray-500">
                  {testimonials[current].position && `${testimonials[current].position}, `}
                  {testimonials[current].company}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === current ? "bg-primary" : "bg-alt-gray-300"
                  }`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
