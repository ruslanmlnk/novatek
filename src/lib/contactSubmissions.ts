import { Buffer } from 'node:buffer'

import type { File as PayloadFile } from 'payload'

import { dictionary, isLocale, type Locale } from './i18n'
import { sendContactSubmissionEmail } from './email'
import { db } from './payload'

const allowedExtensions = new Set([
  'step',
  'stp',
  'dwg',
  'dxf',
  'pdf',
  'png',
  'jpg',
  'jpeg',
  'sldprt',
  'zip',
  'rar',
  'stl',
  'iges',
  'igs',
  'obj',
])

const maxFiles = 8
const maxFileSize = 25 * 1024 * 1024
const maxTotalFileSize = 60 * 1024 * 1024

export type ContactSubmissionResult = { ok: true; message: string } | { ok: false; message: string }

type Metadata = {
  ipAddress?: string
  locale?: Locale
  userAgent?: string
}

type EmailAttachment = {
  filename: string
  content: Buffer
  contentType: string
}

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isFile(value: FormDataEntryValue): value is File {
  return typeof value === 'object' && 'arrayBuffer' in value && 'name' in value && 'size' in value
}

function fileExtension(name: string): string {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? (parts.at(-1) ?? '') : ''
}

function sanitizeFileName(name: string): string {
  return (
    name
      .replace(/[\\/:*?"<>|]+/g, '-')
      .replace(/\s+/g, ' ')
      .trim() || 'attachment'
  )
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function createContactSubmission(
  formData: FormData,
  metadata: Metadata = {},
): Promise<ContactSubmissionResult> {
  const firstName = text(formData.get('firstName'))
  const lastName = text(formData.get('lastName'))
  const email = text(formData.get('email'))
  const phone = text(formData.get('phone'))
  const message = text(formData.get('message'))
  const source = text(formData.get('source')) || 'Website contact form'
  const page = text(formData.get('page'))
  const formLocale = text(formData.get('locale'))
  const locale = metadata.locale ?? (isLocale(formLocale) ? formLocale : 'en')
  const messages = dictionary[locale].submissions

  if (!firstName || !email || !phone || !message) {
    return { ok: false, message: messages.required }
  }

  if (!validEmail(email)) {
    return { ok: false, message: messages.invalidEmail }
  }

  const files = formData
    .getAll('files')
    .filter(isFile)
    .filter((file) => file.size > 0)

  if (files.length > maxFiles) {
    return { ok: false, message: messages.maxFiles }
  }

  const totalFileSize = files.reduce((total, file) => total + file.size, 0)
  if (totalFileSize > maxTotalFileSize) {
    return { ok: false, message: messages.totalTooLarge }
  }

  for (const file of files) {
    if (file.size > maxFileSize) {
      return { ok: false, message: `${file.name} ${messages.fileTooLarge}` }
    }

    const extension = fileExtension(file.name)
    if (!allowedExtensions.has(extension)) {
      return { ok: false, message: `${file.name} ${messages.unsupportedFormat}` }
    }
  }

  const payload = await db()
  const attachmentIds: number[] = []
  const emailAttachments: EmailAttachment[] = []

  for (const file of files) {
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = sanitizeFileName(file.name)
    const payloadFile: PayloadFile = {
      data: fileBuffer,
      mimetype: file.type || 'application/octet-stream',
      name: fileName,
      size: file.size,
    }

    try {
      const upload = await payload.create({
        collection: 'media',
        data: {
          alt: `Contact request attachment from ${firstName} ${lastName}`.trim(),
        },
        file: payloadFile,
        overrideAccess: true,
      })

      attachmentIds.push(upload.id)
      emailAttachments.push({
        filename: fileName,
        content: fileBuffer,
        contentType: payloadFile.mimetype,
      })
    } catch (error) {
      await Promise.allSettled(
        attachmentIds.map((id) =>
          payload.delete({ collection: 'media', id, overrideAccess: true }),
        ),
      )
      throw error
    }
  }

  try {
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        status: 'new',
        firstName,
        lastName,
        email,
        phone,
        message,
        attachments: attachmentIds,
        source,
        page,
        userAgent: metadata.userAgent,
        ipAddress: metadata.ipAddress,
      },
      overrideAccess: true,
    })

    try {
      await sendContactSubmissionEmail({
        submissionId: submission.id,
        firstName,
        lastName,
        email,
        phone,
        message,
        attachments: emailAttachments,
        source,
        page,
        userAgent: metadata.userAgent,
        ipAddress: metadata.ipAddress,
      })
    } catch (error) {
      console.error('Contact submission email failed', error)
    }
  } catch (error) {
    await Promise.allSettled(
      attachmentIds.map((id) => payload.delete({ collection: 'media', id, overrideAccess: true })),
    )
    throw error
  }

  return { ok: true, message: messages.success }
}
