"use client"

import { Gallery4, Gallery4Item } from "@/components/ui/gallery4"

export function DemoProductsSection() {
  const products: Gallery4Item[] = [
    {
      id: "tecxmate-website",
      title: "Tecxmate Official Website",
      description: "Company homepage showcasing our services and portfolio with modern design and seamless user experience",
      href: "https://www.tecxmate.com/en",
      image: "/placeholder.svg",
    },
    {
      id: "waterwise",
      title: "WaterWise Platform",
      description: "Water conservation and management platform built with cutting-edge technology for sustainable resource management",
      href: "https://waterwise-eta.vercel.app/",
      image: "/placeholder.svg",
    },
    {
      id: "ccvn",
      title: "CCVN Education Platform",
      description: "Vietnamese Education platform designed to provide accessible learning opportunities for students across Vietnam",
      href: "https://nikolasdoan.my.canva.site/ccvn",
      image: "/placeholder.svg",
    },
    {
      id: "mobile-app-demo",
      title: "Mobile App Development",
      description: "Custom mobile applications built with React Native and Flutter for iOS and Android platforms",
      href: "#services",
      image: "/placeholder.svg",
    },
    {
      id: "web-app-demo",
      title: "Web Application Suite",
      description: "Full-stack web applications with modern frameworks like Next.js, React, and Node.js for scalable solutions",
      href: "#services",
      image: "/placeholder.svg",
    },
  ]

  return (
    <Gallery4
      title="Products"
      // Remove subtitle per request
      description={undefined}
      items={products}
    />
  )
}
