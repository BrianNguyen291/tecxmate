"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<{
    notionApiKey: boolean
    notionDatabaseId: boolean
  } | null>(null)

  useEffect(() => {
    async function checkEnv() {
      try {
        const response = await fetch("/api/check-env")
        const data = await response.json()
        setEnvStatus(data)
      } catch (error) {
        console.error("Error checking environment variables:", error)
      }
    }

    checkEnv()
  }, [])

  if (!envStatus) return null

  if (envStatus.notionApiKey && envStatus.notionDatabaseId) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Environment Variable Issue</AlertTitle>
      <AlertDescription>
        <p>The following environment variables are missing:</p>
        <ul className="mt-2 list-inside list-disc">
          {!envStatus.notionApiKey && <li>NOTION_API_KEY</li>}
          {!envStatus.notionDatabaseId && <li>NOTION_DATABASE_ID</li>}
        </ul>
        <p className="mt-2">
          Please make sure these environment variables are properly set to enable Notion integration.
        </p>
      </AlertDescription>
    </Alert>
  )
}
