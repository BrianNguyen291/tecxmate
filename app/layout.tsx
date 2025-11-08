import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackToTop } from "@/components/back-to-top"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: {
    default: "Tecxmate - Premier Technology Consultancy for SMEs & Startups | AI Development & Web Solutions",
    template: "%s | Tecxmate"
  },
  description: "Transform your business with Tecxmate's cutting-edge technology solutions. Expert AI integration, web development, business automation, and digital transformation services. Fast delivery, innovative solutions for SMEs and founders. Book your free consultation today.",
  generator: 'Next.js',
  keywords: [
    "technology consultancy",
    "AI development",
    "business automation",
    "web development",
    "startup consulting",
    "SME solutions",
    "digital transformation",
    "software development",
    "AI integration",
    "tech consulting",
    "business technology",
    "Taiwan tech consultancy",
    "blockchain development",
    "mobile app development",
    "enterprise solutions"
  ].join(", "),
  authors: [{ name: 'Tecxmate', url: baseUrl }],
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
    title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
    description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting for SMEs and founders. Book your free discovery call.",
    url: baseUrl,
    siteName: "Tecxmate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/tecxmate-logo-cropped.png`,
        width: 1200,
        height: 630,
        alt: "Tecxmate - Premier Technology Consultancy for SMEs and Startups",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecxmate - Premier Technology Consultancy for SMEs & Startups",
    description: "Transform your business with AI-powered solutions, web development, and business automation. Fast delivery, innovative technology consulting.",
    images: [`${baseUrl}/tecxmate-logo-cropped.png`],
    creator: "@tecxmate",
  },
  verification: {
    // Add when you have verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
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
        <meta name="language" content="English" />
        <meta name="geo.region" content="TW" />
        <meta name="geo.placename" content="Taipei" />
        <meta name="rating" content="General" />
        <meta name="referrer" content="origin-when-cross-origin" />
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
