import type { CollectionConfig } from 'payload'

import { imageField } from '../fields'
import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Blog Posts' },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  defaultSort: '-date',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
    description: 'Articles listed on the blog page',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    ...slugField('title', { description: 'URL of the article: /blog/<slug>' }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'post-categories',
      required: true,
    },
    { name: 'date', type: 'date', required: true },
    { name: 'description', type: 'textarea', required: true, label: 'Card description' },
    imageField('image', 'Card image'),
    imageField('heroImage', 'Large article image'),
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Article content',
      admin: {
        description: 'Quote blocks are rendered as the green gradient banner on the site',
      },
    },
    seoFields(),
  ],
}
