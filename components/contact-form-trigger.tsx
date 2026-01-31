"use client"

import { useContactForm } from "@/components/contact-form-provider"
import { Button } from "@/components/ui/button"

interface ContactFormTriggerProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ContactFormTrigger({
  children,
  className,
  variant = "default",
  size = "default",
}: ContactFormTriggerProps) {
  const { openContactForm } = useContactForm()
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openContactForm}
    >
      {children}
    </Button>
  )
}
