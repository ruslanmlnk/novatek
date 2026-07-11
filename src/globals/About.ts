import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { highlightedTitle, imageField, sectionHeading } from '../fields'
import { seoFields } from '../fields/seo'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  hooks: { afterChange: [revalidateSite] },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: false,
              fields: [
                { name: 'eyebrow', type: 'text', required: true, defaultValue: 'Who We Are' },
                highlightedTitle({ before: 'About ', accent: 'us' }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'We help businesses transform ideas into manufacturable solutions through precision engineering, advanced production technologies and a commitment to quality at every stage of the process.',
                },
                imageField('image', 'Hero image'),
              ],
            },
          ],
        },
        {
          label: 'Story',
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
                imageField('image', 'Story image'),
                {
                  name: 'storyText',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Novatek Engineering was founded to provide reliable engineering and manufacturing solutions for businesses requiring precision, speed and technical expertise. By combining modern technologies with a practical approach, we help transform concepts, drawings and existing components into production-ready solutions. Our focus is not only on manufacturing parts, but on solving engineering challenges through quality, efficiency and dependable execution.',
                },
              ],
            },
          ],
        },
        {
          label: 'Technology Partners',
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
                  labels: { singular: 'Partner', plural: 'Partners' },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    imageField('image', 'Logo'),
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
