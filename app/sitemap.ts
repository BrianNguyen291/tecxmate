import type { MetadataRoute } from "next"
import { wpGetAllPosts } from "@/lib/wordpress"
import { WORDPRESS_API_URL } from "@/lib/wp-config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com"

  const staticUrls: MetadataRoute.Sitemap = [
    { 
      url: `${baseUrl}/`, 
      lastModified: new Date(), 
      changeFrequency: "daily", 
      priority: 1 
    },
    { 
      url: `${baseUrl}/services`, 
      lastModified: new Date(), 
      changeFrequency: "weekly", 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/services/ai-application-development`, 
      lastModified: new Date(), 
      changeFrequency: "monthly", 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/services/business-automation`, 
      lastModified: new Date(), 
      changeFrequency: "monthly", 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/services/ai-integration-consulting`, 
      lastModified: new Date(), 
      changeFrequency: "monthly", 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/projects`, 
      lastModified: new Date(), 
      changeFrequency: "weekly", 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date(), 
      changeFrequency: "monthly", 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/blog`, 
      lastModified: new Date(), 
      changeFrequency: "daily", 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/privacy-policy`, 
      lastModified: new Date(), 
      changeFrequency: "yearly", 
      priority: 0.5 
    },
    { 
      url: `${baseUrl}/terms-of-service`, 
      lastModified: new Date(), 
      changeFrequency: "yearly", 
      priority: 0.5 
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  let postUrls: MetadataRoute.Sitemap = []
  try {
    const posts = await wpGetAllPosts()
    // Fetch raw posts to get actual modified dates
    const rawPostsRes = await fetch(`${WORDPRESS_API_URL}/posts?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 300 }
    })
    
    if (rawPostsRes.ok) {
      const rawPosts = await rawPostsRes.json()
      const postDatesMap = new Map<string, string>(rawPosts.map((p: any) => [p.slug, p.modified]))
      
      postUrls = posts.map((p) => {
        const modifiedDate = postDatesMap.get(p.slug)
        return {
          url: `${baseUrl}/blog/${encodeURIComponent(p.slug)}`,
          lastModified: modifiedDate ? new Date(modifiedDate) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }
      })
    } else {
      // Fallback: use current date if we can't fetch dates
      postUrls = posts.map((p) => ({
        url: `${baseUrl}/blog/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    }
  } catch (e) {
    console.error("Error generating sitemap:", e)
    // ignore and return static urls
  }

  return [...staticUrls, ...postUrls]
}


