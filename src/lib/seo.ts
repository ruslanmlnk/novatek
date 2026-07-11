import type { Metadata } from 'next'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export type SeoData = {
  title?: string | null
  description?: string | null
} | null

/** Build page metadata: CMS SEO fields win, generated values are the fallback. */
export function buildMeta(seo: SeoData | undefined, fallback: { title: string; description: string }): Metadata {
  return {
    title: seo?.title || fallback.title,
    description: seo?.description || fallback.description,
  }
}
