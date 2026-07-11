import type { Field } from 'payload'

/** Reusable SEO group: meta title + meta description. */
export function seoFields(name = 'seo', label = 'SEO'): Field {
  return {
    name,
    type: 'group',
    label,
    admin: { description: 'Leave empty to use automatically generated values' },
    fields: [
      { name: 'title', type: 'text', label: 'Meta title' },
      { name: 'description', type: 'textarea', label: 'Meta description' },
    ],
  }
}
