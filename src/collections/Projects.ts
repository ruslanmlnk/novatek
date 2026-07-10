import type { Block, CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { imageField } from '../fields'
import { slugField } from '../fields/slug'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    {
      name: 'images',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Photo', plural: 'Photos' },
      fields: [imageField('image', 'Photo')],
    },
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Portfolio' },
  orderable: true,
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug'],
    description: 'Case studies listed on the portfolio page',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    ...slugField('title', { description: 'URL of the case page: /portfolio/<slug>' }),
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: { description: 'E.g. Laser Cutting, CNC Machining…' },
    },
    { name: 'description', type: 'textarea', required: true, label: 'Card description' },
    imageField('image', 'Card image'),
    {
      type: 'collapsible',
      label: 'Case study page',
      admin: {
        description: 'Optional — empty fields fall back to sensible defaults on the case page',
      },
      fields: [
        imageField('heroImage', 'Large hero image'),
        {
          name: 'content',
          type: 'richText',
          label: 'Case content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              BlocksFeature({ blocks: [GalleryBlock] }),
            ],
          }),
        },
      ],
    },
  ],
}
