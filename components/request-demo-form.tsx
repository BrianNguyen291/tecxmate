"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle } from "lucide-react"

interface RequestDemoFormProps {
  onSubmit?: () => void
}

export function RequestDemoForm({ onSubmit }: RequestDemoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      })

      // Call onSubmit callback after a delay to show success message
      setTimeout(() => {
        if (onSubmit) onSubmit()
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 rounded-full bg-green-100 p-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-xl font-bold">Request Submitted!</h3>
        <p className="text-gray-500">
          Thank you for your interest. Our team will get back to you shortly with demo details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          name="company"
          placeholder="Your Company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service Interested In</Label>
        <Select value={formData.service} onValueChange={handleServiceChange} disabled={isSubmitting}>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mvp">MVP Development</SelectItem>
            <SelectItem value="software">Software Development</SelectItem>
            <SelectItem value="research">Research & Consultant</SelectItem>
            <SelectItem value="design">UI/UX & Graphics Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your project</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe what you're looking for..."
          className="min-h-[100px]"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  )
}
