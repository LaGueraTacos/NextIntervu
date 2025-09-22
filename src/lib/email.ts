import { Resend } from 'resend'
import type React from 'react'

const apiKey = process.env.RESEND_API_KEY
const FROM = process.env.EMAIL_FROM || 'no-reply@example.com'

const resend = apiKey ? new Resend(apiKey) : null

type EmailTag = { name: string; value: string }

type SendParams = {
  to: string
  subject: string
  from?: string
  react?: React.ReactElement
  html?: string
  text?: string
  tags?: EmailTag[]
}

export async function sendEmail(params: SendParams) {
  if (!resend) throw new Error('RESEND_API_KEY not set')
  return await resend.emails.send({
    from: params.from || FROM,
    to: params.to,
    subject: params.subject,
    react: params.react,
    html: params.html,
    text: params.text,
    tags: params.tags,
  })
}


