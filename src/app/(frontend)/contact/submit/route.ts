import { NextRequest, NextResponse } from 'next/server'

import { isLocale } from '@/lib/i18n'
import type { ContactSubmissionResult } from '@/lib/contactSubmissions'
import { createContactSubmission } from '@/lib/contactSubmissions'

export const runtime = 'nodejs'

function wantsJson(request: NextRequest): boolean {
  return request.headers.get('accept')?.includes('application/json') ?? false
}

export async function POST(request: NextRequest) {
  let result: ContactSubmissionResult

  try {
    const formData = await request.formData()
    const locale = formData.get('locale')
    result = await createContactSubmission(formData, {
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
      locale: typeof locale === 'string' && isLocale(locale) ? locale : undefined,
      userAgent: request.headers.get('user-agent') ?? undefined,
    })
  } catch (error) {
    console.error('Contact submission failed', error)
    result = {
      ok: false,
      message: 'Something went wrong. Please try again.',
    } as const
  }

  if (wantsJson(request)) {
    return NextResponse.json(result, { status: result.ok ? 200 : 400 })
  }

  const redirectUrl = new URL(request.headers.get('referer') || '/contact', request.url)
  redirectUrl.searchParams.set(result.ok ? 'submitted' : 'error', result.message)

  return NextResponse.redirect(redirectUrl, { status: 303 })
}
