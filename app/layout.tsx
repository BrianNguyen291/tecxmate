import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "tecxmate - build the future",
  description: "Build AI applications and automate your business processes. Empowering SMEs and Founders with intelligent automation and AI solutions.",
  generator: 'v0.dev',
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/tecxmate-logo-cropped.png',
    shortcut: '/tecxmate-logo-cropped.png',
    apple: '/tecxmate-logo-cropped.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "tecxmate - build the future",
    description: "Build AI applications and automate your business processes. Empowering SMEs and Founders with intelligent automation and AI solutions.",
    url: baseUrl,
    siteName: "tecxmate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tecxmate - build the future",
    description: "Build AI applications and automate your business processes. Empowering SMEs and Founders with intelligent automation and AI solutions.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
