"use client"

import Image from "next/image"
import { InfiniteSlider } from "@/components/ui/infinite-slider"

export function LogoCarousel() {
  // Removed mobile detection to reduce TBT - use CSS media queries instead
  const logos = [
    {
      name: "Harvard",
      src: "/logos/harvard.png",
    },
    {
      name: "HKU",
      src: "/logos/hku.png",
    },
    {
      name: "NTUST",
      src: "/logos/ntust-logo-transparent.png",
    },
    {
      name: "NTUT",
      src: "/logos/ntut.png",
    },
    {
      name: "Crypted",
      src: "/logos/crypted.png",
    },
    {
      name: "HealthMaxers",
      src: "/logos/healthmaxers.png",
    },
    {
      name: "IPRP Shield",
      src: "/logos/IPRPSHIELD.png",
    },
    {
      name: "CHI CHI Vietnamese",
      src: "/logos/chichi.png",
    },
  ]

  return (
    <div className="absolute left-0 right-0 bottom-36 md:bottom-16">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="ml-2 md:ml-8 flex-shrink-0">
          <div className="flex flex-col text-left">
            <span className="text-xs md:text-sm text-gray-600 font-medium">with</span>
            <span className="text-xs md:text-sm text-gray-600 font-medium">partners</span>
            <span className="text-xs md:text-sm text-gray-600 font-medium">from</span>
          </div>
        </div>
        <div className="h-12 md:h-16 w-0.5 bg-gray-400"></div>
        <InfiniteSlider
          duration={30}
          gap={32}
          className="py-2 md:py-4 flex-1"
        >
        {logos.map((logo, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center h-8 md:h-12 w-auto relative"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={48}
                className="max-h-8 md:max-h-12 w-auto object-contain transition-all duration-300 hover:scale-110"
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 80px, 120px"
              />
            </div>
          );
        })}
        </InfiniteSlider>
      </div>
    </div>
  )
}
