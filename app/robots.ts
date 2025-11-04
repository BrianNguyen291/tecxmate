import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Use root domain (without www) for better compatibility with Bing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  const rootUrl = baseUrl.replace(/^https?:\/\/(www\.)?/, 'https://')
  
  return {
    rules: [
      {
      userAgent: "*",
      allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
    },
    ],
    sitemap: `${rootUrl}/sitemap.xml`, // Use root domain for sitemap
    host: rootUrl, // Use root domain for host (Bing requirement)
  }
}


