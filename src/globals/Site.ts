import type { GlobalConfig } from 'payload'

import { imageField } from '../fields'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Settings',
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
