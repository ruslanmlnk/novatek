import type { FieldHook } from 'payload'

export const formatSlugValue = (value: string): string =>
  value
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value) {
      return formatSlugValue(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlugValue(fallbackData)
      }
    }

    return value
  }
