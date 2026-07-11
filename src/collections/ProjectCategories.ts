import type { CollectionConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: { singular: 'Portfolio Category', plural: 'Portfolio Categories' },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    description: 'Categories of portfolio cases — also shown as filters on the portfolio page',
  },
  fields: [{ name: 'title', type: 'text', required: true, unique: true }],
}
