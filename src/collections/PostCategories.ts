import type { CollectionConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  labels: { singular: 'Blog Category', plural: 'Blog Categories' },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    description: 'Categories of blog posts — also shown as filters on the blog page',
  },
  fields: [{ name: 'title', type: 'text', required: true, unique: true }],
}
