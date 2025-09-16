import { NextResponse } from "next/server"
import { wpGetAllPosts } from "@/lib/wordpress"

export async function GET() {
  try {
    const posts = await wpGetAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json([])
  }
}
