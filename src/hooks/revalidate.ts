import { revalidatePath } from 'next/cache'

/**
 * Invalidates the whole site cache after any content change in the admin,
 * so pages stay statically cached (ISR) but refresh instantly on publish.
 */
export function revalidateSite(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Scripts (e.g. seed) run outside of a Next.js request scope — nothing to revalidate.
  }
}
