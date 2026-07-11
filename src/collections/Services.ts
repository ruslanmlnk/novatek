import type { CollectionConfig } from 'payload'

import { highlightedTitle, imageField, textItems } from '../fields'
import { seoFields } from '../fields/seo'
import { revalidateSite } from '../hooks/revalidate'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: { en: 'Service', bg: 'Услуга' }, plural: { en: 'Services', bg: 'Услуги' } },
  orderable: true,
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    description: { en: 'Service cards on the home / services pages and the service detail pages', bg: 'Карти на услугите на началната страница / страницата с услуги и детайлните страници' },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField('title', { description: 'URL of the detail page: /services/<slug>' }),
    imageField('image', { en: 'Card image', bg: 'Изображение на картата' }),
    textItems('features', { en: 'Card feature list', bg: 'Списък с характеристики' }),
    {
      type: 'collapsible',
      label: { en: 'Detail page — hero', bg: 'Детайлна страница — херо' },
      fields: [
        highlightedTitle({}, 'heroTitle'),
        imageField('heroImage', { en: 'Wide hero image', bg: 'Широко херо изображение' }),
      ],
    },
    {
      type: 'collapsible',
      label: { en: 'Detail page — overview', bg: 'Детайлна страница — общ преглед' },
      fields: [
        { name: 'overviewHeading', type: 'text', required: true, localized: true, label: { en: 'Overview heading', bg: 'Заглавие на прегледа' } },
        {
          name: 'overview',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description:
              'Overview paragraphs (blank line = new paragraph). The first paragraph is also used as the SEO description',
          },
        },
        {
          name: 'cards',
          type: 'array',
          label: { en: 'Feature cards', bg: 'Карти с характеристики' },
          minRows: 4,
          maxRows: 4,
          labels: { singular: { en: 'Card', bg: 'Карта' }, plural: { en: 'Cards', bg: 'Карти' } },
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: { en: 'Detail page — applications', bg: 'Детайлна страница — приложения' },
      fields: [
        {
          name: 'industries',
          type: 'array',
          label: { en: 'Industries table', bg: 'Таблица с индустрии' },
          labels: { singular: { en: 'Industry', bg: 'Индустрия' }, plural: { en: 'Industries', bg: 'Индустрии' } },
          fields: [
            { name: 'industry', type: 'text', required: true, localized: true },
            textItems('applications', { en: 'Applications', bg: 'Приложения' }),
          ],
        },
      ],
    },
    seoFields(),
  ],
}
