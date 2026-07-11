import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { imageField } from '../fields'
import { seoFields } from '../fields/seo'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Settings',
  hooks: { afterChange: [revalidateSite] },
  access: { read: () => true },
  admin: { description: 'Brand, contact details and footer — shared by every page' },
  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true, defaultValue: 'Novatek' },
        { name: 'tagline', type: 'text', required: true, defaultValue: 'Engineering' },
      ],
    },
    {
      name: 'contacts',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', required: true, defaultValue: '+359 878 668 410' },
        {
          name: 'email',
          type: 'text',
          required: true,
          defaultValue: 'office@novatek-engineering.com',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          defaultValue: '42 Vasil Levski Blvd, Plovdiv 4003, Bulgaria',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'tagline',
          type: 'textarea',
          required: true,
          defaultValue:
            'Engineering solutions built on precision. Manufacturing delivered with confidence.',
        },
        {
          name: 'copyright',
          type: 'text',
          required: true,
          defaultValue: 'Novatek Engineering LTD © 2026',
        },
        imageField('mapImage', 'Map image'),
      ],
    },
    {
      name: 'pagesSeo',
      type: 'group',
      label: 'Pages SEO',
      admin: { description: 'Meta tags of the listing pages that have no own content page' },
      fields: [
        seoFields('services', 'Services page'),
        seoFields('portfolio', 'Portfolio page'),
        seoFields('blog', 'Blog page'),
        seoFields('contact', 'Contact page'),
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social links',
      defaultValue: [
        { label: 'Instagram', url: '#' },
        { label: 'TikTok', url: '#' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
