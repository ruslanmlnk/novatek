/** ISO date → "17 Oct 25" (blog cards). */
export function formatShortDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
    .replace(/,/g, '')
}

/** ISO date → "October 17, 2025" (article hero badge). */
export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
