import type { GlobalConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'

export const Privacy: GlobalConfig = {
  slug: 'privacy',
  label: { en: 'Privacy Policy', bg: 'Политика за поверителност' },
  hooks: { afterChange: [revalidateSite] },
  access: { read: () => true },
  fields: [
    {
      name: 'lastUpdated',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Oct 30, 2025',
      admin: {
        description: {
          en: 'Shown under the title as "Last updated: …"',
          bg: 'Показва се под заглавието като „Последна актуализация: …“',
        },
      },
    },
    {
      name: 'sections',
      type: 'array',
      labels: {
        singular: { en: 'Section', bg: 'Секция' },
        plural: { en: 'Sections', bg: 'Секции' },
      },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    seoFields(),
  ],
}
