import type { CollectionConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  labels: { singular: { en: 'Blog Category', bg: 'Блог категория' }, plural: { en: 'Blog Categories', bg: 'Блог категории' } },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    description: { en: 'Categories of blog posts — also shown as filters on the blog page', bg: 'Категории на блог статиите — показват се и като филтри на блог страницата' },
  },
  fields: [{ name: 'title', type: 'text', required: true, unique: true, localized: true }],
}
