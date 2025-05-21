"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, ChevronLeft, Loader2, CheckCircle, X, Upload, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Expert {
  name: string
  role: string
  expertise: string[]
  image: string
}

const experts: Expert[] = [
  {
    name: "Nikolas Doan",
    role: "Co-founder & CEO",
    expertise: ["Business Strategy", "Education", "Market Research"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Brian Nguyen",
    role: "Founder & CTO",
    expertise: ["Technical Architecture", "Software Development", "Digital Solutions"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Liu",
    role: "Head of Design",
    expertise: ["UI/UX Design", "Brand Identity", "User Experience"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Edgar Edffedi",
    role: "Head of Media",
    expertise: ["Content Strategy", "Digital Marketing", "Media Production"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Add email validation function at the top of the component, after the experts array
const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

interface ComprehensiveOnboardingFormProps {
  onClose: () => void
}

export function ComprehensiveOnboardingForm({ onClose }: ComprehensiveOnboardingFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1: Contact Information
    fullName: "",
    email: "",
    company: "",
    role: "",

    // Step 2: Project Overview
    projectType: "",
    projectGoal: "",

    // Step 3: Industry/Sector
    industry: [] as string[],
    otherIndustry: "",

    // Step 4: Branding & Visual Style
    existingBrand: "",
    brandAssets: null as File | null,
    colorPalette: "",
    layoutStyle: "",
    customLayoutDescription: "",

    // Step 5: Features & Functionality
    features: [] as string[],

    // Step 6: References & Inspiration
    references: "",
    inspirationFiles: [] as File[],

    // Step 7: Timeline & Budget
    timeline: "",
    budget: "",

    // Step 8: Team & Users
    targetUsers: [] as string[],
    otherTargetUsers: "",
    userCount: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [matchedExpert, setMatchedExpert] = useState<Expert | null>(null)
  const [savedProgress, setSavedProgress] = useState(false)

  // Save progress to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("onboardingFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("onboardingFormData", JSON.stringify(formData))
  }, [formData])

  const handleNext = () => {
    if (step < totalSteps - 1) {
      // Skip industry step if project type is Personal Portfolio
      if (step === 1 && formData.projectType === "personal-portfolio") {
        setStep(step + 2)
      } else {
        setStep(step + 1)
      }
      setSavedProgress(true)
      setTimeout(() => setSavedProgress(false), 2000)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      // Skip industry step if project type is Personal Portfolio
      if (step === 3 && formData.projectType === "personal-portfolio") {
        setStep(step - 2)
      } else {
        setStep(step - 1)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, [field]: [...(formData[field as keyof typeof formData] as string[]), value] })
    } else {
      setFormData({
        ...formData,
        [field]: (formData[field as keyof typeof formData] as string[]).filter((item) => item !== value),
      })
    }
  }

  const handleRadioChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === "brandAssets") {
        setFormData({ ...formData, [field]: e.target.files[0] })
      } else if (field === "inspirationFiles") {
        setFormData({ ...formData, [field]: Array.from(e.target.files) })
      }
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Match expert based on project type and industry
    let expertIndex = 0

    if (formData.projectType === "mobile-app" || formData.projectType === "workflow-automation") {
      expertIndex = 1 // Brian for technical projects
    } else if (
      formData.existingBrand === "no" ||
      formData.layoutStyle === "bold-modern" ||
      formData.layoutStyle === "playful"
    ) {
      expertIndex = 2 // Jane for design-heavy projects
    } else if (formData.projectType === "e-commerce" || formData.features.includes("analytics")) {
      expertIndex = 3 // Edgar for marketing/analytics projects
    }

    setMatchedExpert(experts[expertIndex])

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      // Clear saved form data on successful submission
      localStorage.removeItem("onboardingFormData")
    }, 1500)
  }

  const isStepValid = () => {
    switch (step) {
      case 0: // Contact Information
        return !!formData.fullName && !!formData.email && validateEmail(formData.email)
      case 1: // Project Overview
        return !!formData.projectType
      case 2: // Industry/Sector
        return formData.industry.length > 0 || !!formData.otherIndustry
      case 3: // Branding & Visual Style
        return (
          !!formData.existingBrand &&
          !!formData.layoutStyle &&
          (formData.layoutStyle !== "custom" || !!formData.customLayoutDescription)
        )
      case 4: // Features & Functionality
        return formData.features.length > 0
      case 5: // References & Inspiration
        return true // Optional step
      case 6: // Timeline & Budget
        return !!formData.timeline
      case 7: // Team & Users
        return formData.targetUsers.length > 0 && !!formData.userCount
      default:
        return true
    }
  }

  const totalSteps = 8

  // Role options for dropdown
  const roleOptions = [
    { value: "ceo", label: "CEO / Founder" },
    { value: "cto", label: "CTO / Technical Director" },
    { value: "cfo", label: "CFO / Finance Director" },
    { value: "cmo", label: "CMO / Marketing Director" },
    { value: "coo", label: "COO / Operations Director" },
    { value: "product-manager", label: "Product Manager" },
    { value: "project-manager", label: "Project Manager" },
    { value: "marketing-manager", label: "Marketing Manager" },
    { value: "it-manager", label: "IT Manager" },
    { value: "developer", label: "Developer / Engineer" },
    { value: "designer", label: "Designer" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "consultant", label: "Consultant" },
    { value: "freelancer", label: "Freelancer" },
    { value: "student", label: "Student" },
    { value: "hobbyist", label: "Hobbyist" },
    { value: "other", label: "Other" },
  ]

  // Color palette options with trendy palettes from coolors.co
  const colorPalettes = [
    {
      id: "sunset-vibes",
      name: "Sunset Vibes",
      colors: ["#F9C80E", "#F86624", "#EA3546", "#662E9B", "#43BCCD"],
    },
    {
      id: "forest-retreat",
      name: "Forest Retreat",
      colors: ["#2D3047", "#419D78", "#E0A458", "#FFDBB5", "#C04ABC"],
    },
    {
      id: "ocean-breeze",
      name: "Ocean Breeze",
      colors: ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD"],
    },
    {
      id: "urban-jungle",
      name: "Urban Jungle",
      colors: ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"],
    },
    {
      id: "pastel-dreams",
      name: "Pastel Dreams",
      colors: ["#FEC5BB", "#FCD5CE", "#FAE1DD", "#E8E8E4", "#D8E2DC"],
    },
    {
      id: "neon-nights",
      name: "Neon Nights",
      colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"],
    },
    {
      id: "vintage-charm",
      name: "Vintage Charm",
      colors: ["#CB997E", "#DDBEA9", "#FFE8D6", "#B7B7A4", "#A5A58D"],
    },
    {
      id: "minimal-mono",
      name: "Minimal Mono",
      colors: ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#6C757D", "#212529"],
    },
    {
      id: "berry-blast",
      name: "Berry Blast",
      colors: ["#590D22", "#800F2F", "#A4133C", "#C9184A", "#FF4D6D"],
    },
    {
      id: "earthy-tones",
      name: "Earthy Tones",
      colors: ["#582F0E", "#7F4F24", "#936639", "#A68A64", "#B6AD90"],
    },
    {
      id: "tech-slate",
      name: "Tech Slate",
      colors: ["#003F5C", "#2F4B7C", "#665191", "#A05195", "#D45087"],
    },
    {
      id: "candy-shop",
      name: "Candy Shop",
      colors: ["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"],
    },
  ]

  // Project type options with images
  const projectTypes = [
    {
      id: "business-homepage",
      name: "Business Homepage",
      image: "/placeholder.svg?height=120&width=200&text=Business+Homepage",
    },
    {
      id: "personal-portfolio",
      name: "Personal Portfolio",
      image: "/placeholder.svg?height=120&width=200&text=Personal+Portfolio",
    },
    {
      id: "mobile-app",
      name: "Mobile Apps",
      image: "/placeholder.svg?height=120&width=200&text=Mobile+Apps",
    },
    {
      id: "e-commerce",
      name: "E-commerce Store",
      image: "/placeholder.svg?height=120&width=200&text=E-commerce",
    },
    {
      id: "online-platform",
      name: "Online Service Platform",
      image: "/placeholder.svg?height=120&width=200&text=Online+Platform",
    },
    {
      id: "workflow-automation",
      name: "Workflow Automation Tools",
      image: "/placeholder.svg?height=120&width=200&text=Workflow+Automation",
    },
    {
      id: "other",
      name: "Other",
      image: "/placeholder.svg?height=120&width=200&text=Custom+Project",
    },
  ]

  const steps = [
    // Step 1: Contact Information
    <div key="contact-info" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Let's get to know you</h2>
      <p className="text-gray-500">Please provide your contact information so we can personalize your experience.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            className={formData.email && !validateEmail(formData.email) ? "border-red-500" : ""}
          />
          {formData.email && !validateEmail(formData.email) && (
            <p className="text-xs text-red-500">Please enter a valid email address</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your Company (Optional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role/Position</Label>
          <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>,

    // Step 2: Project Overview
    <div key="project-overview" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Tell us about your project</h2>
      <p className="text-gray-500">What would you like to build? Select the option that best describes your project.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projectTypes.map((type) => (
          <div
            key={type.id}
            className={`cursor-pointer rounded-lg border-2 p-2 transition-all hover:border-primary/70 hover:bg-primary/5 ${
              formData.projectType === type.id ? "border-primary bg-primary/10" : "border-gray-200"
            }`}
            onClick={() => handleRadioChange("projectType", type.id)}
          >
            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
              <img src={type.image || "/placeholder.svg"} alt={type.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className={formData.projectType === type.id ? "font-medium text-primary" : ""}>{type.name}</span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300">
                {formData.projectType === type.id && <div className="h-2 w-2 rounded-full bg-primary"></div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 3: Industry/Sector
    <div key="industry-sector" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Select your industry</h2>
      <p className="text-gray-500">This helps us understand your specific needs and tailor our solution accordingly.</p>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {[
          "Retails",
          "Education",
          "Academic Research",
          "Healthcare",
          "Beauty",
          "Restaurants",
          "Hotels",
          "Real Estate",
          "Manufacturing",
          "Blockchain & Web3",
          "Creative & Entertainments",
          "Sports",
        ].map((industry) => (
          <div key={industry} className="flex items-center space-x-2">
            <Checkbox
              id={`industry-${industry.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.industry.includes(industry)}
              onCheckedChange={(checked) => handleCheckboxChange("industry", industry, checked as boolean)}
            />
            <Label htmlFor={`industry-${industry.toLowerCase().replace(/\s+/g, "-")}`} className="cursor-pointer">
              {industry}
            </Label>
          </div>
        ))}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="industry-other"
            checked={formData.industry.includes("Other")}
            onCheckedChange={(checked) => handleCheckboxChange("industry", "Other", checked as boolean)}
          />
          <Label htmlFor="industry-other" className="cursor-pointer">
            Other
          </Label>
        </div>
      </div>

      {formData.industry.includes("Other") && (
        <div className="mt-4 space-y-2">
          <Label htmlFor="otherIndustry">Please specify your industry</Label>
          <Input
            id="otherIndustry"
            name="otherIndustry"
            value={formData.otherIndustry}
            onChange={handleInputChange}
            placeholder="Your industry"
          />
        </div>
      )}
    </div>,

    // Step 4: Branding & Visual Style
    <div key="branding-style" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Branding & Visual Style</h2>
      <p className="text-gray-500">Let's define the look and feel of your project.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Do you have an existing brand? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.existingBrand}
            onValueChange={(value) => handleRadioChange("existingBrand", value)}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="brand-yes" />
                <Label htmlFor="brand-yes">Yes, I have a logo and brand guidelines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="brand-partial" />
                <Label htmlFor="brand-partial">Yes, but only have a logo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="brand-no" />
                <Label htmlFor="brand-no">No, I need help with branding</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {(formData.existingBrand === "yes" || formData.existingBrand === "partial") && (
          <div className="space-y-2">
            <Label htmlFor="brandAssets">Upload your logo or brand guide (optional)</Label>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="brandAssets"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <Upload className="mb-2 h-6 w-6 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (max. 10MB)</p>
                </div>
                <Input
                  id="brandAssets"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "brandAssets")}
                  accept=".svg,.png,.jpg,.jpeg,.pdf"
                />
              </Label>
              {formData.brandAssets && (
                <div className="text-sm text-gray-500">File selected: {formData.brandAssets.name}</div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Choose a color palette</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorPalettes.map((palette) => (
              <div
                key={palette.id}
                className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:border-primary/70 ${
                  formData.colorPalette === palette.id ? "border-primary" : "border-transparent"
                }`}
                onClick={() => handleRadioChange("colorPalette", palette.id)}
              >
                <div className="mb-2 text-sm font-medium">{palette.name}</div>
                <div className="flex h-8 w-full overflow-hidden rounded">
                  {palette.colors.map((color, i) => (
                    <div key={i} className="h-full flex-1" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Layout style <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={formData.layoutStyle} onValueChange={(value) => handleRadioChange("layoutStyle", value)}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minimalist" id="layout-minimalist" />
                <Label htmlFor="layout-minimalist">Minimalist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bold-modern" id="layout-bold" />
                <Label htmlFor="layout-bold">Bold and modern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corporate" id="layout-corporate" />
                <Label htmlFor="layout-corporate">Corporate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="playful" id="layout-playful" />
                <Label htmlFor="layout-playful">Playful</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="layout-custom" />
                <Label htmlFor="layout-custom">Custom</Label>
              </div>
            </div>
          </RadioGroup>

          {formData.layoutStyle === "custom" && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="customLayoutDescription">Describe your preferred style</Label>
              <Textarea
                id="customLayoutDescription"
                name="customLayoutDescription"
                value={formData.customLayoutDescription}
                onChange={handleInputChange}
                placeholder="Describe the look and feel you're going for..."
                className="min-h-[80px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>,

    // Step 5: Features & Functionality
    <div key="features" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Features & Functionality</h2>
      <p className="text-gray-500">Select the features you need for your project.</p>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {[
          "User registration/login",
          "Booking system",
          "Payment gateway",
          "Contact form",
          "Blog",
          "Admin dashboard",
          "Analytics",
          "Chatbot",
          "AI integration",
          "Social media integration",
          "Email marketing",
          "Search functionality",
          "File uploads/downloads",
          "User profiles",
          "Notifications",
          "Mobile responsiveness",
        ].map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox
              id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.features.includes(feature)}
              onCheckedChange={(checked) => handleCheckboxChange("features", feature, checked as boolean)}
            />
            <Label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} className="cursor-pointer">
              {feature}
            </Label>
          </div>
        ))}
      </div>
    </div>,

    // Step 6: References & Inspiration
    <div key="references" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">References & Inspiration</h2>
      <p className="text-gray-500">
        Share examples of websites or apps that inspire you (this step is optional but helpful).
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="references">Paste URLs of websites/apps you like</Label>
          <Textarea
            id="references"
            name="references"
            value={formData.references}
            onChange={handleInputChange}
            placeholder="https://example.com, https://another-site.com"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inspirationFiles">Upload screenshots or mockups (optional)</Label>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="inspirationFiles"
              className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Upload className="mb-2 h-6 w-6 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or PDF (max. 10MB)</p>
              </div>
              <Input
                id="inspirationFiles"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "inspirationFiles")}
                accept=".png,.jpg,.jpeg,.pdf"
                multiple
              />
            </Label>
            {formData.inspirationFiles.length > 0 && (
              <div className="text-sm text-gray-500">{formData.inspirationFiles.length} file(s) selected</div>
            )}
          </div>
        </div>
      </div>
    </div>,

    // Step 7: Timeline & Budget
    <div key="timeline-budget" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Timeline & Budget</h2>
      <p className="text-gray-500">Help us understand your project constraints.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Ideal launch timeframe <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={formData.timeline} onValueChange={(value) => handleRadioChange("timeline", value)}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asap" id="timeline-asap" />
                <Label htmlFor="timeline-asap">ASAP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-2-months" id="timeline-1-2" />
                <Label htmlFor="timeline-1-2">1–2 months</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-6-months" id="timeline-3-6" />
                <Label htmlFor="timeline-3-6">3–6 months</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="timeline-flexible" />
                <Label htmlFor="timeline-flexible">Flexible</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Budget range</Label>
          <RadioGroup value={formData.budget} onValueChange={(value) => handleRadioChange("budget", value)}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under-1000" id="budget-under-1000" />
                <Label htmlFor="budget-under-1000">&lt;$1,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1000-5000" id="budget-1000-5000" />
                <Label htmlFor="budget-1000-5000">$1,000–$5,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5000-10000" id="budget-5000-10000" />
                <Label htmlFor="budget-5000-10000">$5,000–$10,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="over-10000" id="budget-over-10000" />
                <Label htmlFor="budget-over-10000">&gt;$10,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-sure" id="budget-not-sure" />
                <Label htmlFor="budget-not-sure">Not sure yet</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>,

    // Step 8: Team & Users
    <div key="team-users" className="space-y-4 p-6 px-8">
      <h2 className="text-2xl font-bold">Team & Users</h2>
      <p className="text-gray-500">Tell us about who will be using your product.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Who is your target user of this product? <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {["My Customers", "Internal staffs", "Partners"].map((userType) => (
              <div key={userType} className="flex items-center space-x-2">
                <Checkbox
                  id={`user-${userType.toLowerCase().replace(/\s+/g, "-")}`}
                  checked={formData.targetUsers.includes(userType)}
                  onCheckedChange={(checked) => handleCheckboxChange("targetUsers", userType, checked as boolean)}
                />
                <Label htmlFor={`user-${userType.toLowerCase().replace(/\s+/g, "-")}`} className="cursor-pointer">
                  {userType}
                </Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="user-other"
                checked={formData.targetUsers.includes("Other")}
                onCheckedChange={(checked) => handleCheckboxChange("targetUsers", "Other", checked as boolean)}
              />
              <Label htmlFor="user-other" className="cursor-pointer">
                Other
              </Label>
            </div>
          </div>

          {formData.targetUsers.includes("Other") && (
            <div className="mt-2">
              <Input
                id="otherTargetUsers"
                name="otherTargetUsers"
                value={formData.otherTargetUsers}
                onChange={handleInputChange}
                placeholder="Please specify"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            How many users will use this platform? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup value={formData.userCount} onValueChange={(value) => handleRadioChange("userCount", value)}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="just-me" id="users-just-me" />
                <Label htmlFor="users-just-me">Just me</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10-100" id="users-10-100" />
                <Label htmlFor="users-10-100">10–100 users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100-5000" id="users-100-5000" />
                <Label htmlFor="users-100-5000">100–5000 users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5000-plus" id="users-5000-plus" />
                <Label htmlFor="users-5000-plus">5000+ users</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>,
  ]

  // Success screen with matched expert
  const successScreen = (
    <div className="flex flex-col items-center justify-center p-6 px-8 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-3">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mb-2 text-2xl font-bold">Thank you for your submission!</h3>
      <p className="mb-6 text-gray-500">
        We've received your project details and matched you with the perfect expert for your needs.
      </p>

      <div className="mb-6 rounded-lg bg-primary/5 p-6 text-left">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <img
              src={matchedExpert?.image || "/placeholder.svg"}
              alt={matchedExpert?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl font-bold">{matchedExpert?.name}</h4>
            <p className="text-sm text-gray-500">{matchedExpert?.role}</p>
            <p className="mt-1 text-sm">Expert in: {matchedExpert?.expertise.join(", ")}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700">
            {matchedExpert?.name.split(" ")[0]} has been notified about your project and will review your requirements.
            The next step is to schedule a discovery call to discuss your project in detail.
          </p>
        </div>
      </div>

      <Button asChild size="lg" className="w-full sm:w-auto">
        <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
          <Calendar className="mr-2 h-5 w-5" />
          Schedule Your Discovery Call
        </a>
      </Button>

      <p className="mt-4 text-sm text-gray-500">
        We'll also send you an email with a summary of your project details and next steps.
      </p>
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
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Step {step + 1} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Form content */}
      <div className="max-h-[60vh] overflow-y-auto">
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
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
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
