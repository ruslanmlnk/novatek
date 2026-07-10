import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

export const slugField = (
  fieldToUse = 'title',
  options: { description?: string } = {},
): [TextField, CheckboxField] => {
  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: { hidden: true, position: 'sidebar' },
  }

  const slug: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    required: true,
    unique: true,
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      description: options.description,
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  return [slug, checkBoxField]
}
