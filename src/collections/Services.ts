import type { CollectionConfig } from 'payload'

import { highlightedTitle, imageField, textItems } from '../fields'
import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    description: 'Service cards on the home / services pages and the service detail pages',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    ...slugField('title', { description: 'URL of the detail page: /services/<slug>' }),
    imageField('image', 'Card image'),
    textItems('features', 'Card feature list'),
    {
      type: 'collapsible',
      label: 'Detail page — hero',
      fields: [
        highlightedTitle({}, 'heroTitle'),
        imageField('heroImage', 'Wide hero image'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Detail page — overview',
      fields: [
        { name: 'overviewHeading', type: 'text', required: true, label: 'Overview heading' },
        {
          name: 'overview',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'Overview paragraphs (blank line = new paragraph). The first paragraph is also used as the SEO description',
          },
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Feature cards',
          minRows: 4,
          maxRows: 4,
          labels: { singular: 'Card', plural: 'Cards' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Detail page — applications',
      fields: [
        {
          name: 'industries',
          type: 'array',
          label: 'Industries table',
          labels: { singular: 'Industry', plural: 'Industries' },
          fields: [
            { name: 'industry', type: 'text', required: true },
            textItems('applications', 'Applications'),
          ],
        },
      ],
    },
    seoFields(),
  ],
}
