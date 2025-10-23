import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-alt-black mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-alt-black mb-4">Page Not Found</h2>
        <p className="text-alt-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="border-alt-gray-200 hover:border-primary hover:text-primary">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
