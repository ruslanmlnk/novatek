'use client'

import { useEffect, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import { ArrowGlyph } from './IconSet'

type ScrollToTopButtonProps = {
  locale: Locale
}

export function ScrollToTopButton({ locale }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480)

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <button
      className={`fixed bottom-6 right-6 z-[70] grid size-11 place-items-center overflow-hidden bg-novatek-primary text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition duration-300 hover:bg-novatek-primaryHover active:bg-novatek-primaryActive max-md:bottom-5 max-md:right-5 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      type="button"
      aria-label={locale === 'bg' ? 'Към началото на страницата' : 'Scroll to top'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowGlyph className="h-3 w-4 -rotate-90" />
    </button>
  )
}
