"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function EnvChecker() {
  const [status, setStatus] = useState<{
    ok: boolean
    message?: string
  } | null>(null)

  useEffect(() => {
    async function checkWordPress() {
      try {
        const res = await fetch("/api/blog/posts")
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setStatus({ ok: true })
        } else {
          setStatus({ ok: false, message: "No posts found from WordPress yet." })
        }
      } catch (e) {
        setStatus({ ok: false, message: "Cannot fetch posts from WordPress API." })
      }
    }

    checkWordPress()
  }, [])

  if (!status || status.ok) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Blog data not loaded</AlertTitle>
      <AlertDescription>
        {status.message || "Unable to load blog posts."}
      </AlertDescription>
    </Alert>
  )
}
