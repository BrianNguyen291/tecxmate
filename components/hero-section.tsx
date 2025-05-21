"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { ComprehensiveOnboardingForm } from "@/components/comprehensive-onboarding-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Spotlight } from "@/components/spotlight"
import { TextRotate, type TextRotateRef } from "@/components/text-rotate"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [showDemoForm, setShowDemoForm] = useState(false)
  const textRotateRef = useRef<TextRotateRef>(null)

  const rotatingTexts = ["digital brands", "stunning websites", "mobile apps", "business solutions", "the future"]

  return (
    <>
      <section className="relative overflow-hidden bg-[#F6F3F1] py-20 md:py-32">
        {/* Spotlight effect */}
        <Spotlight className="opacity-100" size={800} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(133, 82, 255, 0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="mb-6 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Think, Solve & Build
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We help you craft{" "}
              <span className="relative inline-flex text-primary">
                <TextRotate
                  ref={textRotateRef}
                  texts={rotatingTexts}
                  rotationInterval={3000}
                  staggerDuration={0.02}
                  splitBy="characters"
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  elementLevelClassName="inline-block"
                />
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Empowering you with premier technology consultancy and solutions. Let us be your tecxmate!
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="font-medium px-8 py-6 text-base" onClick={() => setShowDemoForm(true)}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="font-medium px-8 py-6 text-base group" asChild>
                <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">10+</span>
                <span className="text-sm text-gray-500">Projects Delivered</span>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">5+</span>
                <span className="text-sm text-gray-500">Countries Served</span>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">90%</span>
                <span className="text-sm text-gray-500">Client Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <ComprehensiveOnboardingForm onClose={() => setShowDemoForm(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
