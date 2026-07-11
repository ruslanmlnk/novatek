import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { highlightedTitle, imageField, sectionHeading, textItems } from '../fields'
import { seoFields } from '../fields/seo'

export const Home: GlobalConfig = {
  slug: 'home',
  label: { en: 'Home Page', bg: 'Начална страница' },
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
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                  localized: true,
                  defaultValue: 'Custom manufacturing solutions',
                },
                highlightedTitle({ before: 'Precision ', accent: 'engineering & manufacturing' }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  defaultValue:
                    'Laser cutting, CNC machining, 3D scanning, reverse engineering and custom manufacturing solutions with fast turnaround and engineering precision.',
                },
                imageField('backgroundImage', 'Background image'),
              ],
            },
          ],
        },
        {
          label: { en: 'Why Choose Us', bg: 'Защо да изберете нас' },
          fields: [
            {
              name: 'whyChoose',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'Why Choose Us',
                  before: 'Driven by precision, built for ',
                  accent: 'modern manufacturing',
                }),
                {
                  name: 'projectsCard',
                  type: 'group',
                  label: { en: 'Card 1 — completed projects', bg: 'Карта 1 — завършени проекти' },
                  fields: [
                    { name: 'eyebrow', type: 'text', required: true, localized: true, defaultValue: 'Custom solutions' },
                    { name: 'metric', type: 'text', required: true, defaultValue: '20+' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      localized: true,
                      defaultValue:
                        'Completed engineering and manufacturing projects across multiple industries',
                    },
                  ],
                },
                {
                  name: 'turnaroundCard',
                  type: 'group',
                  label: { en: 'Card 2 — fast turnaround', bg: 'Карта 2 — бърза изработка' },
                  fields: [
                    { name: 'title', type: 'text', required: true, localized: true, defaultValue: 'Fast turnaround' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      localized: true,
                      defaultValue:
                        'Efficient production workflows with reliable delivery timelines',
                    },
                  ],
                },
                {
                  name: 'trustedCard',
                  type: 'group',
                  label: { en: 'Card 3 — trusted clients', bg: 'Карта 3 — доверени клиенти' },
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      required: true,
                      localized: true,
                      defaultValue: 'Trusted engineering',
                    },
                    { name: 'metric', type: 'text', required: true, defaultValue: '100+' },
                    { name: 'rating', type: 'text', required: true, defaultValue: '4.9' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      localized: true,
                      defaultValue:
                        'Trusted by businesses across multiple industrial sectors and manufacturing industries',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Services', bg: 'Услуги' },
          fields: [
            {
              name: 'services',
              type: 'group',
              label: false,
              admin: { description: 'Service cards are managed in the Services collection' },
              fields: [
                sectionHeading({
                  eyebrow: 'What We Do',
                  before: 'Advanced ',
                  accent: 'engineering services',
                  after: ' for industrial production',
                }),
              ],
            },
          ],
        },
        {
          label: { en: 'Process', bg: 'Процес' },
          fields: [
            {
              name: 'process',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'How It Works',
                  before: 'A streamlined process ',
                  accent: 'from idea to delivery',
                }),
                {
                  name: 'steps',
                  type: 'array',
                  labels: { singular: { en: 'Step', bg: 'Стъпка' }, plural: { en: 'Steps', bg: 'Стъпки' } },
                  fields: [
                    { name: 'title', type: 'text', required: true, localized: true },
                    {
                      name: 'mobileTitle',
                      type: 'text',
                      localized: true,
                      label: { en: 'Mobile title', bg: 'Мобилно заглавие' },
                      admin: { description: 'Optional shorter title used on small screens' },
                    },
                    { name: 'description', type: 'textarea', required: true, localized: true },
                    imageField('image', 'Step image'),
                    textItems('features', 'Feature list'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Projects', bg: 'Проекти' },
          fields: [
            {
              name: 'projects',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'Selected Projects',
                  before: 'Engineering solutions ',
                  accent: 'delivered in practice',
                }),
                {
                  name: 'featured',
                  type: 'group',
                  label: { en: 'Featured project', bg: 'Избран проект' },
                  fields: [
                    {
                      name: 'project',
                      type: 'relationship',
                      relationTo: 'projects',
                      admin: { description: 'Portfolio case shown as the large featured card' },
                    },
                    imageField('image', 'Wide featured image'),
                  ],
                },
                {
                  name: 'cta',
                  type: 'group',
                  label: { en: 'CTA card', bg: 'CTA карта' },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      localized: true,
                      defaultValue: 'Want to see more projects?',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      localized: true,
                      defaultValue:
                        'Explore our portfolio of engineering, manufacturing and reverse engineering projects',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Testimonials', bg: 'Отзиви' },
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'Client Testimonials',
                  before: 'What our clients ',
                  accent: 'say about us',
                }),
                {
                  name: 'badge',
                  type: 'text',
                  required: true,
                  localized: true,
                  defaultValue: 'Happy clients worldwide',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: { en: 'Testimonials', bg: 'Отзиви' },
                  minRows: 1,
                  admin: { description: 'Reviews shown in the slider on the right side' },
                  defaultValue: [
                    {
                      quote:
                        'Their precision engineering and attention to detail exceeded our expectations. From prototyping to delivery, the entire process was seamless and professional.',
                      author: 'John Matthews',
                      role: 'Procurement Manager',
                    },
                  ],
                  fields: [
                    { name: 'quote', type: 'textarea', required: true, localized: true },
                    { name: 'author', type: 'text', required: true, localized: true },
                    { name: 'role', type: 'text', required: true, localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { en: 'CTA Banner', bg: 'CTA банер' },
          fields: [
            {
              name: 'quoteBanner',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                  defaultValue: 'Ready to start your next project?',
                },
              ],
            },
          ],
        },
        {
          label: { en: 'FAQ', bg: 'Въпроси и отговори' },
          fields: [
            {
              name: 'faq',
              type: 'group',
              label: false,
              fields: [
                sectionHeading({
                  eyebrow: 'FAQ',
                  before: 'Frequently Asked ',
                  accent: 'Questions',
                }),
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: { en: 'Question', bg: 'Въпрос' }, plural: { en: 'Questions', bg: 'Въпроси' } },
                  fields: [
                    { name: 'question', type: 'text', required: true, localized: true },
                    { name: 'answer', type: 'textarea', required: true, localized: true },
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
