import type { Block, CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { imageField } from '../fields'
import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'
import { slugField } from '../fields/slug'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: { en: 'Gallery', bg: 'Галерия' }, plural: { en: 'Galleries', bg: 'Галерии' } },
  fields: [
    {
      name: 'images',
      type: 'array',
      maxRows: 3,
      labels: { singular: { en: 'Photo', bg: 'Снимка' }, plural: { en: 'Photos', bg: 'Снимки' } },
      fields: [imageField('image', 'Photo')],
    },
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: { en: 'Project', bg: 'Проект' }, plural: { en: 'Portfolio', bg: 'Портфолио' } },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug'],
    description: { en: 'Case studies listed on the portfolio page', bg: 'Кейсове, показани на страницата с портфолио' },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField('title', { description: 'URL of the case page: /portfolio/<slug>' }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'project-categories',
      required: true,
    },
    { name: 'description', type: 'textarea', required: true, localized: true, label: { en: 'Card description', bg: 'Описание на картата' } },
    imageField('image', { en: 'Card image', bg: 'Изображение на картата' }),
    {
      type: 'collapsible',
      label: { en: 'Case study page', bg: 'Страница на кейса' },
      admin: {
        description: 'Optional — empty fields fall back to sensible defaults on the case page',
      },
      fields: [
        imageField('heroImage', { en: 'Large hero image', bg: 'Голямо херо изображение' }),
        {
          name: 'content',
          type: 'richText',
          localized: true,
          label: { en: 'Case content', bg: 'Съдържание на кейса' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              BlocksFeature({ blocks: [GalleryBlock] }),
            ],
          }),
        },
      ],
    },
    seoFields(),
  ],
}
