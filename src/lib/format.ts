import type { Locale } from './i18n'

function shortDateLocale(locale: Locale): string {
  return locale === 'bg' ? 'bg-BG' : 'en-GB'
}

function longDateLocale(locale: Locale): string {
  return locale === 'bg' ? 'bg-BG' : 'en-US'
}

/** ISO date -> "17 Oct 25" (blog cards). */
export function formatShortDate(iso: string, locale: Locale = 'en'): string {
  return new Date(iso)
    .toLocaleDateString(shortDateLocale(locale), {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    })
    .replace(/,/g, '')
}

/** ISO date -> "October 17, 2025" (article hero badge). */
export function formatLongDate(iso: string, locale: Locale = 'en'): string {
  return new Date(iso).toLocaleDateString(longDateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
