import type { CollectionConfig } from 'payload'

import { imageField } from '../fields'
import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: { en: 'Post', bg: 'Статия' }, plural: { en: 'Blog Posts', bg: 'Блог статии' } },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  defaultSort: '-date',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
    description: { en: 'Articles listed on the blog page', bg: 'Статии, показани на блог страницата' },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField('title', { description: 'URL of the article: /blog/<slug>' }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'post-categories',
      required: true,
    },
    { name: 'date', type: 'date', required: true },
    { name: 'description', type: 'textarea', required: true, localized: true, label: { en: 'Card description', bg: 'Описание на картата' } },
    imageField('image', { en: 'Card image', bg: 'Изображение на картата' }),
    imageField('heroImage', { en: 'Large article image', bg: 'Голямо изображение на статията' }),
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: { en: 'Article content', bg: 'Съдържание на статията' },
      admin: {
        description: 'Quote blocks are rendered as the green gradient banner on the site',
      },
    },
    seoFields(),
  ],
}
