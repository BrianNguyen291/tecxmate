import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  coverImage: string
  content?: string
}

// Create a function to safely get a Notion client instance
function getNotionClient() {
  try {
    const apiKey = process.env.NOTION_API_KEY

    if (!apiKey) {
      console.error("NOTION_API_KEY environment variable is not defined")
      return null
    }

    return new Client({ auth: apiKey })
  } catch (error) {
    console.error("Failed to initialize Notion client:", error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Create a new Notion client for this request
    const notion = getNotionClient()

    if (!notion) {
      console.error("Notion client could not be initialized")
      return []
    }

    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
      console.error("NOTION_DATABASE_ID environment variable is not defined")
      return []
    }

    console.log("Fetching posts from Notion database:", databaseId)

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    })

    const posts = response.results.map((page: any) => {
      return pageToPostTransformer(page)
    })

    return posts
  } catch (error) {
    console.error("Error fetching posts from Notion:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Create a new Notion client for this request
    const notion = getNotionClient()

    if (!notion) {
      console.error("Notion client could not be initialized")
      return null
    }

    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
      console.error("NOTION_DATABASE_ID environment variable is not defined")
      return null
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })

    if (!response.results.length) {
      return null
    }

    const page = response.results[0]
    const post = pageToPostTransformer(page)

    // Get page content
    try {
      const n2m = new NotionToMarkdown({ notionClient: notion })
      const mdBlocks = await n2m.pageToMarkdown(page.id)
      const mdString = n2m.toMarkdownString(mdBlocks)

      return {
        ...post,
        content: mdString.parent,
      }
    } catch (contentError) {
      console.error("Error converting Notion page to markdown:", contentError)
      return {
        ...post,
        content: "Error loading content",
      }
    }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

function pageToPostTransformer(page: any): BlogPost {
  try {
    // Extract properties from the Notion page
    const properties = page.properties

    // Get title
    const titleProperty = properties.Title?.title || []
    const title = titleProperty.length > 0 ? titleProperty[0].plain_text : "Untitled"

    // Get slug
    const slugProperty = properties.Slug?.rich_text || []
    const slug = slugProperty.length > 0 ? slugProperty[0].plain_text : ""

    // Get excerpt
    const excerptProperty = properties.Excerpt?.rich_text || []
    const excerpt = excerptProperty.length > 0 ? excerptProperty[0].plain_text : ""

    // Get date
    const dateProperty = properties.Date?.date
    const date = dateProperty
      ? new Date(dateProperty.start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

    // Get read time
    const readTimeProperty = properties.ReadTime?.rich_text || []
    const readTime = readTimeProperty.length > 0 ? readTimeProperty[0].plain_text : "5 min read"

    // Get category
    const categoryProperty = properties.Category?.select
    const category = categoryProperty ? categoryProperty.name : "Uncategorized"

    // Get cover image
    let coverImage = "/placeholder.svg?height=200&width=400"
    if (properties.CoverImage?.files && properties.CoverImage.files.length > 0) {
      const file = properties.CoverImage.files[0]
      if (file.file?.url) {
        coverImage = file.file.url
      } else if (file.external?.url) {
        coverImage = file.external.url
      }
    }

    return {
      id: page.id,
      slug,
      title,
      excerpt,
      date,
      readTime,
      category,
      coverImage,
    }
  } catch (error) {
    console.error("Error transforming Notion page to blog post:", error)
    return {
      id: page.id || "unknown",
      slug: "",
      title: "Error loading post",
      excerpt: "There was an error loading this post",
      date: "",
      readTime: "",
      category: "Error",
      coverImage: "/placeholder.svg?height=200&width=400",
    }
  }
}
