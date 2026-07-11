import type { Media } from '@/payload-types'

type Upload = number | Media | null | undefined

/** Resolve an upload relation to its public URL. */
export function mediaUrl(media: Upload, fallback = ''): string {
  return (typeof media === 'object' && media?.url) || fallback
}

/** Flatten a Payload text-items array ({ text }[]) into string[]. */
export function textList(rows: ({ text?: string | null } | null)[] | null | undefined): string[] {
  return rows?.map((row) => row?.text).filter((text): text is string => Boolean(text)) ?? []
}

/** Resolve a relationship to a titled document into its title. */
export function relationTitle(value: number | { title: string } | null | undefined): string {
  return typeof value === 'object' && value ? value.title : ''
}
