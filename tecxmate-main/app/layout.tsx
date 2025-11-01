import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

export const metadata: Metadata = {
  title: "tecxmate - build the future",
  description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
  generator: 'v0.dev',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "tecxmate - build the future",
    description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
    url: baseUrl,
    siteName: "tecxmate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tecxmate - build the future",
    description: "Empowering SMEs and Founders with premier technology consultancy and solutions",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
