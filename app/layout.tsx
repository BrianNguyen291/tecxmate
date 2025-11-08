import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackToTop } from "@/components/back-to-top"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "tecxmate - build the future",
  description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
  generator: 'Next.js',
  keywords: "technology consultancy, SME solutions, startup consulting, web development, software solutions, business technology, digital transformation",
  authors: [{ name: 'Tecxmate' }],
  creator: 'Tecxmate',
  publisher: 'Tecxmate',
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "tecxmate - build the future",
    description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
    url: baseUrl,
    siteName: "Tecxmate",
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "Tecxmate - Technology Consultancy",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tecxmate - build the future",
    description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'theme-color': '#8c52ff', // Purple
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
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
        <link rel="alternate" type="application/rss+xml" title="Tecxmate Blog RSS Feed" href={`${baseUrl}/feed.xml`} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
