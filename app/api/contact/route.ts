import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const TO_EMAIL = process.env.CONTACT_EMAIL || "niko.tecx@gmail.com"
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    if (!resend) {
      console.error("[Contact] RESEND_API_KEY not configured")
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Please add RESEND_API_KEY to your environment.",
        },
        { status: 503 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: `Tecxmate Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Contact form: ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error("[Contact] Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("[Contact] Error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
