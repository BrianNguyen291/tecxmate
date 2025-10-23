'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-alt-black mb-4">Something went wrong!</h1>
        <p className="text-alt-gray-500 mb-8 max-w-md">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="border-alt-gray-200 hover:border-primary hover:text-primary"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
