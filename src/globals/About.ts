import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { highlightedTitle, imageField, sectionHeading } from '../fields'
import { seoFields } from '../fields/seo'

export const About: GlobalConfig = {
  slug: 'about',
  label: { en: 'About Page', bg: 'Страница „За нас“' },
  hooks: { afterChange: [revalidateSite] },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Hero', bg: 'Херо' },
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: false,
              fields: [
                { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Who We Are' },
                highlightedTitle({ before: 'About ', accent: 'us' }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  defaultValue:
                    'We help businesses transform ideas into manufacturable solutions through precision engineering, advanced production technologies and a commitment to quality at every stage of the process.',
                },
                imageField('image', { en: 'Hero image', bg: 'Херо изображение' }),
              ],
            },
          ],
        },
        {
          label: { en: 'Story', bg: 'История' },
          fields: [
            {
              name: 'story',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'Our Story',
                  before: 'Engineering excellence built through years of ',
                  accent: 'precision manufacturing',
                  after: ' and technical expertise',
                }),
                imageField('image', { en: 'Story image', bg: 'Изображение към историята' }),
                {
                  name: 'storyText',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  defaultValue:
                    'Novatek Engineering was founded to provide reliable engineering and manufacturing solutions for businesses requiring precision, speed and technical expertise. By combining modern technologies with a practical approach, we help transform concepts, drawings and existing components into production-ready solutions. Our focus is not only on manufacturing parts, but on solving engineering challenges through quality, efficiency and dependable execution.',
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Technology Partners', bg: 'Технологични партньори' },
          fields: [
            {
              name: 'techPartners',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'Technology Partners',
                  before: 'Powered by industry-leading ',
                  accent: 'engineering technologies',
                }),
                {
                  name: 'partners',
                  type: 'array',
                  labels: { singular: { en: 'Partner', bg: 'Партньор' }, plural: { en: 'Partners', bg: 'Партньори' } },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    imageField('image', { en: 'Logo', bg: 'Лого' }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields()],
        },
      ],
    },
  ],
}
