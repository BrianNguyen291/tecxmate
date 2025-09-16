import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}


