import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

import { imageField } from '../fields'
import { seoFields } from '../fields/seo'

export const Site: GlobalConfig = {
  slug: 'site',
  label: { en: 'Site Settings', bg: 'Настройки на сайта' },
  hooks: { afterChange: [revalidateSite] },
  access: { read: () => true },
  admin: {
    description: {
      en: 'Brand, contact details and footer — shared by every page',
      bg: 'Бранд, контакти и футър — общи за всички страници',
    },
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      label: { en: 'Brand', bg: 'Бранд' },
      fields: [
        { name: 'name', type: 'text', required: true, defaultValue: 'Novatek' },
        { name: 'tagline', type: 'text', required: true, localized: true, defaultValue: 'Engineering' },
      ],
    },
    {
      name: 'contacts',
      type: 'group',
      label: { en: 'Contacts', bg: 'Контакти' },
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
          localized: true,
          defaultValue: '42 Vasil Levski Blvd, Plovdiv 4003, Bulgaria',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: { en: 'Footer', bg: 'Футър' },
      fields: [
        {
          name: 'tagline',
          type: 'textarea',
          required: true,
          localized: true,
          defaultValue:
            'Engineering solutions built on precision. Manufacturing delivered with confidence.',
        },
        {
          name: 'copyright',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Novatek Engineering LTD © 2026',
        },
        imageField('mapImage', { en: 'Map image', bg: 'Карта (изображение)' }),
      ],
    },
    {
      name: 'pagesSeo',
      type: 'group',
      label: { en: 'Pages SEO', bg: 'SEO на страниците' },
      admin: {
        description: {
          en: 'Meta tags of the listing pages that have no own content page',
          bg: 'Мета тагове на списъчните страници без собствена страница със съдържание',
        },
      },
      fields: [
        seoFields('services', { en: 'Services page', bg: 'Страница „Услуги“' }),
        seoFields('portfolio', { en: 'Portfolio page', bg: 'Страница „Портфолио“' }),
        seoFields('blog', { en: 'Blog page', bg: 'Страница „Блог“' }),
        seoFields('contact', { en: 'Contact page', bg: 'Страница „Контакти“' }),
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: { en: 'Social links', bg: 'Социални мрежи' },
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
