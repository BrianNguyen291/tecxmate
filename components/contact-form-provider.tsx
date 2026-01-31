"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { ContactForm } from "@/components/contact-form"

const ContactFormContext = createContext<{
  openContactForm: () => void
} | null>(null)

export function useContactForm() {
  const ctx = useContext(ContactFormContext)
  return ctx ?? { openContactForm: () => {} }
}

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openContactForm = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <ContactFormContext.Provider value={{ openContactForm }}>
      {children}
      <ContactForm open={open} onOpenChange={setOpen} />
    </ContactFormContext.Provider>
  )
}
