import type { CollectionConfig } from 'payload'

import { imageField, textItems } from '../fields'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  orderable: true,
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
      label: 'Detail page',
      fields: [
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          label: 'Intro',
          admin: { description: 'Short paragraph under the title on the detail page' },
        },
        textItems('capabilities', 'Capabilities'),
        textItems('applications', 'Typical applications'),
      ],
    },
  ],
}
