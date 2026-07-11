import { headers } from 'next/headers'

import { defaultLocale, isLocale, type Locale } from './i18n'

/** Reads the locale set by the middleware for the current request. Server-only. */
export async function getRequestLocale(): Promise<Locale> {
  const headerLocale = (await headers()).get('x-novatek-locale') ?? undefined
  return isLocale(headerLocale) ? headerLocale : defaultLocale
}
