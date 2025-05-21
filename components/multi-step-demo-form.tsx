"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Loader2, CheckCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Expert {
  name: string
  role: string
  expertise: string[]
}

const experts: Expert[] = [
  {
    name: "Nikolas Doan",
    role: "Co-founder & CEO",
    expertise: ["Business Strategy", "Education", "Market Research"],
  },
  {
    name: "Brian Nguyen",
    role: "Founder & CTO",
    expertise: ["Technical Architecture", "Software Development", "Digital Solutions"],
  },
  {
    name: "Jane Liu",
    role: "Head of Design",
    expertise: ["UI/UX Design", "Brand Identity", "User Experience"],
  },
  {
    name: "Edgar Edffedi",
    role: "Head of Media",
    expertise: ["Content Strategy", "Digital Marketing", "Media Production"],
  },
]

interface MultiStepDemoFormProps {
  onClose: () => void
}

export function MultiStepDemoForm({ onClose }: MultiStepDemoFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    businessStage: "",
    mainChallenge: "",
    projectType: "",
    timeline: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [matchedExpert, setMatchedExpert] = useState<Expert | null>(null)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, additionalInfo: e.target.value })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Match expert based on project type and main challenge
    let expertIndex = 0

    if (formData.projectType === "website-development" || formData.projectType === "mobile-app") {
      expertIndex = 1 // Brian for technical projects
    } else if (formData.projectType === "design-branding") {
      expertIndex = 2 // Jane for design projects
    } else if (formData.projectType === "digital-marketing") {
      expertIndex = 3 // Edgar for marketing projects
    } else if (formData.mainChallenge === "market-research" || formData.mainChallenge === "business-strategy") {
      expertIndex = 0 // Nikolas for business challenges
    }

    setMatchedExpert(experts[expertIndex])

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.businessStage
      case 1:
        return !!formData.mainChallenge
      case 2:
        return !!formData.projectType
      case 3:
        return !!formData.timeline
      case 4:
        return formData.additionalInfo.length >= 10
      default:
        return true
    }
  }

  const renderOption = (field: string, value: string, label: string) => (
    <button
      key={value}
      className={`mb-3 w-full rounded-md border-2 p-4 text-center text-base transition-all hover:border-primary/70 hover:bg-primary/5 ${
        formData[field as keyof typeof formData] === value
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-gray-200 bg-white text-gray-700"
      }`}
      onClick={() => handleOptionSelect(field, value)}
    >
      {label}
    </button>
  )

  const steps = [
    // Step 1: Business Stage
    <div key="business-stage" className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">What stage is your business in?</h2>
      <p className="text-gray-500">This helps us understand your current needs and challenges.</p>
      <div className="mt-6 space-y-0">
        {renderOption("businessStage", "idea", "I have an idea but haven't started yet")}
        {renderOption("businessStage", "early-stage", "Early stage startup (pre-revenue or early revenue)")}
        {renderOption("businessStage", "established", "Established business looking to grow")}
        {renderOption("businessStage", "scaling", "Scaling business with existing products/services")}
        {renderOption("businessStage", "enterprise", "Enterprise organization")}
      </div>
    </div>,

    // Step 2: Main Challenge
    <div key="main-challenge" className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">What's your main challenge right now?</h2>
      <p className="text-gray-500">We'll match you with the right expert based on your needs.</p>
      <div className="mt-6 space-y-0">
        {renderOption("mainChallenge", "product-development", "Building or improving a digital product")}
        {renderOption("mainChallenge", "market-research", "Understanding market opportunities")}
        {renderOption("mainChallenge", "technical-issues", "Technical challenges with existing solutions")}
        {renderOption("mainChallenge", "business-strategy", "Business strategy and growth planning")}
        {renderOption("mainChallenge", "design-ux", "Design and user experience improvements")}
      </div>
    </div>,

    // Step 3: Project Type
    <div key="project-type" className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">What type of project are you looking to start?</h2>
      <p className="text-gray-500">Select the option that best describes your needs.</p>
      <div className="mt-6 space-y-0">
        {renderOption("projectType", "website-development", "Website Development")}
        {renderOption("projectType", "mobile-app", "Mobile App Development")}
        {renderOption("projectType", "design-branding", "Design & Branding")}
        {renderOption("projectType", "digital-marketing", "Digital Marketing")}
        {renderOption("projectType", "consulting", "Business Consulting")}
      </div>
    </div>,

    // Step 4: Timeline
    <div key="timeline" className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">What's your project timeline?</h2>
      <p className="text-gray-500">When do you need your project completed?</p>
      <div className="mt-6 space-y-0">
        {renderOption("timeline", "urgent", "Urgent (within 1 month)")}
        {renderOption("timeline", "short-term", "Short-term (1-3 months)")}
        {renderOption("timeline", "medium-term", "Medium-term (3-6 months)")}
        {renderOption("timeline", "long-term", "Long-term (6+ months)")}
        {renderOption("timeline", "not-sure", "Not sure yet / Need consultation")}
      </div>
    </div>,

    // Step 5: Additional Information
    <div key="additional-info" className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Tell us more about your project</h2>
      <p className="text-gray-500">
        Please share any specific requirements, goals, or questions you have. This helps us prepare for our call.
      </p>
      <Textarea
        value={formData.additionalInfo}
        onChange={handleTextChange}
        placeholder="I'm looking to create a solution that..."
        className="min-h-[150px]"
      />
    </div>,
  ]

  // Success screen with matched expert
  const successScreen = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-3">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mb-2 text-xl font-bold">Perfect Match!</h3>
      <p className="mb-6 text-gray-500">
        Based on your needs, we've matched you with the perfect expert for your project.
      </p>

      <div className="mb-6 rounded-lg bg-primary/5 p-4 text-left">
        <h4 className="font-bold">{matchedExpert?.name}</h4>
        <p className="text-sm text-gray-500">{matchedExpert?.role}</p>
        <p className="mt-2 text-sm">Expert in: {matchedExpert?.expertise.join(", ")}</p>
      </div>

      <Button asChild className="w-full">
        <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
          Book a Call with {matchedExpert?.name.split(" ")[0]}
        </a>
      </Button>
    </div>
  )

  return (
    <div className="relative">
      {/* Close button - repositioned to top-right corner with better spacing */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Step indicator */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Step {step + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Form content */}
      <div className="min-h-[450px]">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {successScreen}
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons with progress bar above them */}
      {!isSuccess && (
        <>
          {/* Progress bar moved above the buttons */}
          <div className="px-4 pt-4">
            <div className="relative h-2 w-full rounded-full bg-gray-100">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between p-4">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!isStepValid() || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : step === steps.length - 1 ? (
                "Submit"
              ) : (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
