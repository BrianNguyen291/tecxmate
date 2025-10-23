"use client"

import React from "react"

export function BentoServicesSection() {

  const services = [
    {
      id: "mvp",
      title: "Idea Launchpad",
      subtitle: "Quickly turn early-stage ideas into validated business concepts.",
      color: "orange",
    },
    {
      id: "product",
      title: "Product Development",
      subtitle: "Build scalable websites and mobile apps with modern frameworks and AI-driven workflows.",
      color: "blue",
    },
    {
      id: "design",
      title: "UI/UX & Brand Design",
      subtitle: "Stand out with bold UI/UX design built to engage users and boost conversions.",
      color: "pink",
    },
    {
      id: "premium",
      title: "Premium Package",
      subtitle: "Get instant service — book a personalized strategy call with our team.",
      color: "gold",
      isSpecial: true,
    },
  ]

  // No interactions needed for simplified UI

  const getGradientBackground = () => '#fff'

  return (
    <section id="services" className="relative overflow-hidden bg-[#F6F3F1] py-16 md:py-20 snap-start border-t border-b border-[rgba(55,50,47,0.12)]">
      
      <div className="container relative z-10 px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl">Services</h2>
        </div>

        {/* Simple Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-[rgba(55,50,47,0.12)]">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`p-6 md:p-8 lg:p-12 border-b ${index % 2 === 0 ? 'md:border-r' : ''} bg-white`}
              style={{ background: getGradientBackground() }}
            >
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                  {service.title}
                </h3>
                <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                  {service.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Simplified: no dialog/forms */}
    </section>
  )
}