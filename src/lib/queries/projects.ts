import { cache } from 'react'

import type { RichTextData } from '@/lexical'
import type { SeoData } from '../seo'
import { mediaUrl, relationTitle } from '../media'
import { db } from '../payload'

export type PortfolioProject = {
  slug: string
  updatedAt: string
  seo: SeoData
  category: string
  title: string
  description: string
  image: string
  caseStudy: {
    heroImage: string
    content?: RichTextData
  }
}

export const getProjects = cache(async (): Promise<PortfolioProject[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'projects', limit: 100, sort: '_order' })

  return docs.map((doc) => {
    const image = mediaUrl(doc.image)

    return {
      slug: doc.slug,
      updatedAt: doc.updatedAt,
      seo: doc.seo ?? null,
      category: relationTitle(doc.category),
      title: doc.title,
      description: doc.description,
      image,
      caseStudy: {
        heroImage: mediaUrl(doc.heroImage, image),
        content: (doc.content as RichTextData | null) ?? undefined,
      },
    }
  })
})

export const getProject = async (slug: string): Promise<PortfolioProject | undefined> => {
  const projects = await getProjects()
  return projects.find((project) => project.slug === slug)
}
