import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set.')
  }
  return new Resend(apiKey)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeSubject = escapeHtml((subject || '').trim())
    const safeMessage = escapeHtml(message.trim())

    const resend = getResendClient()

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'mukulburoli@gmail.com',
      replyTo: email.trim(),
      subject: safeSubject || `New message from ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #111;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">Email</td>
              <td style="padding: 8px 0; color: #111;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">Subject</td>
              <td style="padding: 8px 0; color: #111;">${safeSubject || 'No subject'}</td>
            </tr>
          </table>
          <div style="background: #f9f9f9; border-left: 3px solid #111; padding: 15px; margin: 20px 0;">
            <p style="color: #111; margin: 0; line-height: 1.6;">${safeMessage}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact form error:', err)
    const message =
      err instanceof Error && err.message.includes('RESEND_API_KEY')
        ? 'Email service is not configured. Please contact directly via email.'
        : 'Internal server error.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
