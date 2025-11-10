import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Use root domain (without www) for better compatibility with Bing and consistency
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tecxmate.com"
  // Remove www if present to ensure consistent canonical URL
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
    sitemap: `${rootUrl}/sitemap.xml`,
    host: rootUrl, // Bing requirement - helps with indexing
  }
}


