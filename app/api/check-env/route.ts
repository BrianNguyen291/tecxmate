import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    wordpressConfigured: !!process.env.WORDPRESS_SITE_URL,
    siteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
  })
}
