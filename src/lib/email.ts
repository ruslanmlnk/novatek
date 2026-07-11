import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import { siteUrl } from './seo'

type SubmissionEmailAttachment = {
  filename: string
  content: Buffer
  contentType: string
}

type ContactSubmissionEmail = {
  submissionId: number | string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  source: string
  page: string
  ipAddress?: string
  userAgent?: string
  attachments: SubmissionEmailAttachment[]
}

function env(name: string): string {
  return process.env[name]?.trim() ?? ''
}

function parseBoolean(value: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function parseRecipients(value: string): string[] {
  return value
    .split(/[;,]/)
    .map((recipient) => recipient.trim())
    .filter(Boolean)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function smtpConfig(): SMTPTransport.Options | null {
  const host = env('SMTP_HOST')
  const from = env('SMTP_FROM')
  const recipients = parseRecipients(env('CONTACT_SUBMISSIONS_TO'))

  if (!host || !from || recipients.length === 0) {
    return null
  }

  const port = Number(env('SMTP_PORT') || 587)
  const user = env('SMTP_USER')
  const pass = env('SMTP_PASSWORD')
  const config: SMTPTransport.Options = {
    host,
    port: Number.isFinite(port) ? port : 587,
    secure: parseBoolean(env('SMTP_SECURE')),
  }

  if (user && pass) {
    config.auth = { user, pass }
  }

  return config
}

function plainText(data: ContactSubmissionEmail): string {
  const name = `${data.firstName} ${data.lastName}`.trim()
  const files = data.attachments.length
    ? data.attachments.map((attachment) => `- ${attachment.filename}`).join('\n')
    : 'No files attached'

  return [
    'New contact request',
    '',
    `Name: ${name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    `Source: ${data.source}`,
    `Page: ${data.page || '-'}`,
    `Admin: ${siteUrl}/admin/collections/contact-submissions/${data.submissionId}`,
    '',
    'Message:',
    data.message,
    '',
    'Files:',
    files,
    '',
    `IP: ${data.ipAddress || '-'}`,
    `User agent: ${data.userAgent || '-'}`,
  ].join('\n')
}

function html(data: ContactSubmissionEmail): string {
  const name = `${data.firstName} ${data.lastName}`.trim()
  const files = data.attachments.length
    ? `<ul>${data.attachments
        .map((attachment) => `<li>${escapeHtml(attachment.filename)}</li>`)
        .join('')}</ul>`
    : '<p>No files attached</p>'

  return `
    <h2>New contact request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || '-')}</p>
    <p><strong>Source:</strong> ${escapeHtml(data.source)}</p>
    <p><strong>Page:</strong> ${escapeHtml(data.page || '-')}</p>
    <p><strong>Admin:</strong> <a href="${siteUrl}/admin/collections/contact-submissions/${data.submissionId}">${siteUrl}/admin/collections/contact-submissions/${data.submissionId}</a></p>
    <h3>Message</h3>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    <h3>Files</h3>
    ${files}
    <hr>
    <p><strong>IP:</strong> ${escapeHtml(data.ipAddress || '-')}</p>
    <p><strong>User agent:</strong> ${escapeHtml(data.userAgent || '-')}</p>
  `
}

export async function sendContactSubmissionEmail(data: ContactSubmissionEmail): Promise<boolean> {
  const config = smtpConfig()
  const from = env('SMTP_FROM')
  const recipients = parseRecipients(env('CONTACT_SUBMISSIONS_TO'))

  if (!config) {
    return false
  }

  const transporter = nodemailer.createTransport(config)
  const name = `${data.firstName} ${data.lastName}`.trim()
  const mail: Mail.Options = {
    from,
    to: recipients,
    replyTo: data.email,
    subject: `New request from ${name || data.email}`,
    text: plainText(data),
    html: html(data),
    attachments: data.attachments.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  }

  await transporter.sendMail(mail)

  return true
}
