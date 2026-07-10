import type { CSSProperties } from 'react'

export function revealDelay(index: number, step = 100): CSSProperties {
  return { '--reveal-delay': `${index * step}ms` } as CSSProperties
}
