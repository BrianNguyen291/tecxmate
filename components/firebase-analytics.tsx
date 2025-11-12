"use client"

import { useEffect } from "react"
import { getFirebaseAnalytics } from "@/lib/firebase"

/**
 * Firebase Analytics component
 * Initializes Firebase Analytics on the client side only
 */
export function FirebaseAnalytics() {
  useEffect(() => {
    // Only initialize on client side
    if (typeof window === "undefined") {
      return
    }

    // Check if Firebase config is available
    const hasConfig = 
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

    if (!hasConfig) {
      console.warn("Firebase Analytics: Configuration missing. Please add Firebase environment variables.")
      return
    }

    // Initialize Firebase Analytics
    const analytics = getFirebaseAnalytics()
    
    if (analytics) {
      console.log("Firebase Analytics initialized successfully")
    } else {
      console.warn("Firebase Analytics: Failed to initialize")
    }
  }, [])

  return null // This component doesn't render anything
}
