import type { Field } from 'payload'

/** Reusable SEO group: meta title + meta description. */
export function seoFields(name = 'seo', label: string | Record<string, string> = 'SEO'): Field {
  return {
    name,
    type: 'group',
    label,
    admin: {
      description: {
        en: 'Leave empty to use automatically generated values',
        bg: 'Оставете празно, за да се използват автоматично генерирани стойности',
      },
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: { en: 'Meta title', bg: 'Мета заглавие' },
        localized: true,
      },
      {
        name: 'description',
        type: 'textarea',
        label: { en: 'Meta description', bg: 'Мета описание' },
        localized: true,
      },
    ],
  }
}
