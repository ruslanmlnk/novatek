import { cache } from 'react'

import type { RichTextData } from '@/lexical'
import { formatLongDate, formatShortDate } from '../format'
import type { Locale } from '../i18n'
import type { SeoData } from '../seo'
import { mediaUrl, relationTitle } from '../media'
import { db } from '../payload'

export type BlogPost = {
  slug: string
  updatedAt: string
  seo: SeoData
  category: string
  date: string
  dateLong: string
  views: number
  title: string
  description: string
  image: string
  heroImage: string
  content: RichTextData
}

export const getPosts = cache(async (locale: Locale = 'en'): Promise<BlogPost[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'posts', limit: 100, locale, sort: 'date' })

  return docs.map((doc) => {
    const image = mediaUrl(doc.image)

    return {
      slug: doc.slug,
      updatedAt: doc.updatedAt,
      seo: doc.seo ?? null,
      category: relationTitle(doc.category),
      date: formatShortDate(doc.date, locale),
      dateLong: formatLongDate(doc.date, locale),
      views: doc.views ?? 0,
      title: doc.title,
      description: doc.description,
      image,
      heroImage: mediaUrl(doc.heroImage, image),
      content: doc.content as RichTextData,
    }
  })
})

export const getPost = async (
  slug: string,
  locale: Locale = 'en',
): Promise<BlogPost | undefined> => {
  const posts = await getPosts(locale)
  return posts.find((post) => post.slug === slug)
}
