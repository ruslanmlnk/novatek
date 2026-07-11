import { cache } from 'react'

import type { SeoData } from '../seo'
import type { Locale } from '../i18n'
import { mediaUrl, textList } from '../media'
import { db } from '../payload'

export type ServiceCard = {
  title: string
  slug: string
  image: string
  features: string[]
}

export type ServiceDetail = ServiceCard & {
  updatedAt: string
  seo: SeoData
  heroTitle: { before?: string; accent: string; after?: string }
  heroImage: string
  overviewHeading: string
  overview: string
  cards: { title: string; description: string }[]
  industries: { industry: string; applications: string[] }[]
}

export const getServices = cache(async (locale: Locale = 'en'): Promise<ServiceDetail[]> => {
  const payload = await db()
  const { docs } = await payload.find({
    collection: 'services',
    limit: 100,
    locale,
    sort: '_order',
  })

  return docs.map((doc) => {
    const image = mediaUrl(doc.image)

    return {
      title: doc.title,
      slug: doc.slug,
      image,
      updatedAt: doc.updatedAt,
      seo: doc.seo ?? null,
      features: textList(doc.features),
      heroTitle: {
        before: doc.heroTitle?.before || undefined,
        accent: doc.heroTitle?.accent || doc.title,
        after: doc.heroTitle?.after || undefined,
      },
      heroImage: mediaUrl(doc.heroImage, image),
      overviewHeading: doc.overviewHeading,
      overview: doc.overview,
      cards: doc.cards?.map((card) => ({ title: card.title, description: card.description })) ?? [],
      industries:
        doc.industries?.map((row) => ({
          industry: row.industry,
          applications: textList(row.applications),
        })) ?? [],
    }
  })
})

export const getService = async (
  slug: string,
  locale: Locale = 'en',
): Promise<ServiceDetail | undefined> => {
  const services = await getServices(locale)
  return services.find((service) => service.slug === slug)
}
