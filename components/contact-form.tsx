"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || undefined,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSuccess(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get in touch</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="py-8 text-center">
            <p className="text-lg font-medium text-primary">Thank you!</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll get back to you soon.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">Company</Label>
              <Input
                id="contact-company"
                name="company"
                type="text"
                placeholder="Your company (optional)"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                placeholder="Tell us about your project..."
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
