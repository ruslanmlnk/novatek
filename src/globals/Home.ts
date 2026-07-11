import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { highlightedTitle, imageField, sectionHeading, textItems } from '../fields'
import { seoFields } from '../fields/seo'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
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
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                  defaultValue: 'Custom manufacturing solutions',
                },
                highlightedTitle({ before: 'Precision ', accent: 'engineering & manufacturing' }),
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Laser cutting, CNC machining, 3D scanning, reverse engineering and custom manufacturing solutions with fast turnaround and engineering precision.',
                },
                imageField('backgroundImage', 'Background image'),
              ],
            },
          ],
        },
        {
          label: 'Why Choose Us',
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
                  label: 'Card 1 — completed projects',
                  fields: [
                    { name: 'eyebrow', type: 'text', required: true, defaultValue: 'Custom solutions' },
                    { name: 'metric', type: 'text', required: true, defaultValue: '20+' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      defaultValue:
                        'Completed engineering and manufacturing projects across multiple industries',
                    },
                  ],
                },
                {
                  name: 'turnaroundCard',
                  type: 'group',
                  label: 'Card 2 — fast turnaround',
                  fields: [
                    { name: 'title', type: 'text', required: true, defaultValue: 'Fast turnaround' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      defaultValue:
                        'Efficient production workflows with reliable delivery timelines',
                    },
                  ],
                },
                {
                  name: 'trustedCard',
                  type: 'group',
                  label: 'Card 3 — trusted clients',
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      required: true,
                      defaultValue: 'Trusted engineering',
                    },
                    { name: 'metric', type: 'text', required: true, defaultValue: '100+' },
                    { name: 'rating', type: 'text', required: true, defaultValue: '4.9' },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
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
          label: 'Services',
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
          label: 'Process',
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
                  labels: { singular: 'Step', plural: 'Steps' },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    {
                      name: 'mobileTitle',
                      type: 'text',
                      label: 'Mobile title',
                      admin: { description: 'Optional shorter title used on small screens' },
                    },
                    { name: 'description', type: 'textarea', required: true },
                    imageField('image', 'Step image'),
                    textItems('features', 'Feature list'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Projects',
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
                  label: 'Featured project',
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
                  label: 'CTA card',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      defaultValue: 'Want to see more projects?',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
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
          label: 'Testimonials',
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
                  defaultValue: 'Happy clients worldwide',
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Their precision engineering and attention to detail exceeded our expectations. From prototyping to delivery, the entire process was seamless and professional.',
                },
                { name: 'author', type: 'text', required: true, defaultValue: 'John Matthews' },
                { name: 'role', type: 'text', required: true, defaultValue: 'Procurement Manager' },
              ],
            },
          ],
        },
        {
          label: 'CTA Banner',
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
                  defaultValue: 'Ready to start your next project?',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
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
                  labels: { singular: 'Question', plural: 'Questions' },
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
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
