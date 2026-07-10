import type { GlobalConfig } from 'payload'

export const Privacy: GlobalConfig = {
  slug: 'privacy',
  label: 'Privacy Policy',
  access: { read: () => true },
  fields: [
    {
      name: 'lastUpdated',
      type: 'text',
      required: true,
      defaultValue: 'Oct 30, 2025',
      admin: { description: 'Shown under the title as "Last updated: …"' },
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
