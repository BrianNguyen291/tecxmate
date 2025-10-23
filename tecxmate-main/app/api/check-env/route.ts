import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    notionApiKey: !!process.env.NOTION_API_KEY,
    notionDatabaseId: !!process.env.NOTION_DATABASE_ID,
  })
}
