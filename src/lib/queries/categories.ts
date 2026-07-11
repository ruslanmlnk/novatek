import { cache } from 'react'

import type { Locale } from '../i18n'
import { db } from '../payload'

export const getPostCategories = cache(async (locale: Locale = 'en'): Promise<string[]> => {
  const payload = await db()
  const { docs } = await payload.find({
    collection: 'post-categories',
    limit: 100,
    locale,
    sort: '_order',
  })
  return docs.map((doc) => doc.title)
})

export const getProjectCategories = cache(async (locale: Locale = 'en'): Promise<string[]> => {
  const payload = await db()
  const { docs } = await payload.find({
    collection: 'project-categories',
    limit: 100,
    locale,
    sort: '_order',
  })
  return docs.map((doc) => doc.title)
})
