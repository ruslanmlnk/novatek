import { cache } from 'react'

import { db } from '../payload'

export const getPostCategories = cache(async (): Promise<string[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'post-categories', limit: 100, sort: '_order' })
  return docs.map((doc) => doc.title)
})

export const getProjectCategories = cache(async (): Promise<string[]> => {
  const payload = await db()
  const { docs } = await payload.find({
    collection: 'project-categories',
    limit: 100,
    sort: '_order',
  })
  return docs.map((doc) => doc.title)
})
