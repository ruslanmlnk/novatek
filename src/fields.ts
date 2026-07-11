import type { Field } from 'payload'

export function highlightedTitle(
  defaults: { before?: string; accent?: string; after?: string } = {},
  name = 'title',
): Field {
  return {
    name,
    type: 'group',
    label: { en: 'Title', bg: 'Заглавие' },
    admin: {
      description: {
        en: 'The accent part is rendered in the green brand color',
        bg: 'Акцентната част се показва в зеления брандов цвят',
      },
    },
    fields: [
      {
        name: 'before',
        type: 'text',
        label: { en: 'Before accent', bg: 'Преди акцента' },
        localized: true,
        defaultValue: defaults.before,
      },
      {
        name: 'accent',
        type: 'text',
        label: { en: 'Accent', bg: 'Акцент' },
        localized: true,
        required: true,
        defaultValue: defaults.accent,
      },
      {
        name: 'after',
        type: 'text',
        label: { en: 'After accent', bg: 'След акцента' },
        localized: true,
        defaultValue: defaults.after,
      },
    ],
  }
}

export function sectionHeading(defaults: {
  eyebrow?: string
  before?: string
  accent?: string
  after?: string
}): Field {
  return {
    name: 'heading',
    type: 'group',
    label: { en: 'Section heading', bg: 'Заглавие на секцията' },
    fields: [
      {
        name: 'eyebrow',
        type: 'text',
        label: { en: 'Eyebrow', bg: 'Надзаглавие' },
        localized: true,
        required: true,
        defaultValue: defaults.eyebrow,
        admin: {
          description: {
            en: 'Small label rendered as // Eyebrow //',
            bg: 'Малък етикет, показван като // Надзаглавие //',
          },
        },
      },
      highlightedTitle(defaults),
    ],
  }
}

export function textItems(name: string, label: string | Record<string, string>, defaults?: string[]): Field {
  return {
    name,
    type: 'array',
    label,
    labels: {
      singular: { en: 'Item', bg: 'Елемент' },
      plural: { en: 'Items', bg: 'Елементи' },
    },
    defaultValue: defaults?.map((text) => ({ text })),
    fields: [{ name: 'text', type: 'text', required: true, localized: true }],
  }
}

export function imageField(name = 'image', label: string | Record<string, string> = 'Image'): Field {
  return { name, type: 'upload', relationTo: 'media', label }
}
