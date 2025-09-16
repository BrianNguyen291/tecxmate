import type { MetadataRoute } from "next"
import { wpGetAllPosts } from "@/lib/wordpress"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  let postUrls: MetadataRoute.Sitemap = []
  try {
    const posts = await wpGetAllPosts()
    postUrls = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }))
  } catch (e) {
    // ignore and return static urls
  }

  return [...staticUrls, ...postUrls]
}


