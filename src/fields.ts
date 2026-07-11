import type { Field } from 'payload'

export function highlightedTitle(
  defaults: { before?: string; accent?: string; after?: string } = {},
  name = 'title',
): Field {
  return {
    name,
    type: 'group',
    label: 'Title',
    admin: {
      description: 'The accent part is rendered in the green brand color',
    },
    fields: [
      { name: 'before', type: 'text', label: 'Before accent', defaultValue: defaults.before },
      {
        name: 'accent',
        type: 'text',
        label: 'Accent',
        required: true,
        defaultValue: defaults.accent,
      },
      { name: 'after', type: 'text', label: 'After accent', defaultValue: defaults.after },
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
    label: 'Section heading',
    fields: [
      {
        name: 'eyebrow',
        type: 'text',
        label: 'Eyebrow',
        required: true,
        defaultValue: defaults.eyebrow,
        admin: { description: 'Small label rendered as // Eyebrow //' },
      },
      highlightedTitle(defaults),
    ],
  }
}

export function textItems(name: string, label: string, defaults?: string[]): Field {
  return {
    name,
    type: 'array',
    label,
    labels: { singular: 'Item', plural: 'Items' },
    defaultValue: defaults?.map((text) => ({ text })),
    fields: [{ name: 'text', type: 'text', required: true }],
  }
}

export function imageField(name = 'image', label = 'Image'): Field {
  return { name, type: 'upload', relationTo: 'media', label }
}
