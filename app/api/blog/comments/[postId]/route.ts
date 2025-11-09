import { NextResponse } from "next/server"
import { wpGetCommentsByPostId } from "@/lib/wordpress"

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params
    const postIdNum = parseInt(postId, 10)
    
    if (isNaN(postIdNum)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 })
    }

    const comments = await wpGetCommentsByPostId(postIdNum)
    return NextResponse.json(comments)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

