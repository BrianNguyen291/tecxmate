"use client"

import { InfiniteSlider } from "@/components/ui/infinite-slider"

export function LogoCarousel() {
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
  ]

  return (
    <div className="absolute left-0 right-0 bottom-8 md:bottom-4">
      <div className="text-center mb-2">
        <p className="text-sm text-gray-600 font-medium">with partners from</p>
      </div>
      <InfiniteSlider
        duration={30}
        className="py-4"
      >
        {logos.map((logo, index) => {
          const isNTUT = logo.name === "NTUT";
          return (
            <div
              key={index}
              className={`flex items-center justify-center ${isNTUT ? 'h-20 w-40' : 'h-28 w-56'}`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`object-contain transition-all duration-300 hover:scale-110 ${isNTUT ? 'max-h-16 max-w-32' : 'max-h-24 max-w-48'}`}
              />
            </div>
          );
        })}
      </InfiniteSlider>
    </div>
  )
}
