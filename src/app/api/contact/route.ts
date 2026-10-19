import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit } from '@/lib/rateLimit'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(100, 'Name is too long.').trim(),
  email: z.string().email('Invalid email address.').max(255, 'Email is too long.').trim(),
  subject: z.string().max(150, 'Subject is too long.').trim().optional(),
  message: z.string().min(1, 'Message is required.').max(5000, 'Message is too long.').trim(),
})

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 're_...' || apiKey.startsWith('re_...')) {
    throw new Error('Email service is not yet configured with a valid RESEND_API_KEY.')
  }
  return new Resend(apiKey)
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting: Max 5 contact form submissions per 5 minutes per IP
    const { success } = rateLimit(req, 5, 300000)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a few minutes before trying again.' },
        { status: 429 }
      )
    }

    // 2. Input Validation via Zod
    const body = await req.json()
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const errorMsg = result.error.issues.map((issue) => issue.message).join(' ')
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject || '')
      .replace(/[\r\n]+/g, ' ')
      .trim()
    const safeMessage = escapeHtml(message)

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
            <p style="color: #111; margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
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
        { error: 'Email delivery failed. Please send your message directly to mukulburoli@gmail.com.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact form error:', err)
    const message =
      err instanceof Error && (err.message.includes('RESEND_API_KEY') || err.message.includes('not yet configured'))
        ? 'Email service is not yet configured. Please contact directly via mukulburoli@gmail.com.'
        : 'Internal server error. Please contact directly via mukulburoli@gmail.com.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
