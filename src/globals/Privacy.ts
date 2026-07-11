import type { GlobalConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'

export const Privacy: GlobalConfig = {
  slug: 'privacy',
  label: 'Privacy Policy',
  hooks: { afterChange: [revalidateSite] },
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
    seoFields(),
  ],
}
