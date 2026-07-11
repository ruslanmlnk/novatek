'use client'

import { usePathname } from 'next/navigation'

import { defaultLocale, isLocale, locales, t, type Locale } from '@/lib/i18n'

type LocaleSwitcherProps = {
  locale: Locale
  className?: string
}

/** Returns the current path with the locale prefix replaced by `target`. */
function switchPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/')
  const basePath = isLocale(segments[1]) ? `/${segments.slice(2).join('/')}` : pathname
  const normalized = basePath === '' ? '/' : basePath
  if (target === defaultLocale) return normalized
  return normalized === '/' ? `/${target}` : `/${target}${normalized}`
}

export function LocaleSwitcher({ className, locale }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? '/'
  const dict = t(locale)

  return (
    <nav
      className={`flex items-center gap-2 text-base font-medium text-white ${className ?? ''}`}
      aria-label={dict.common.switchLanguage}
    >
      {locales.map((item, index) => (
        <span className="flex items-center gap-2" key={item}>
          {index > 0 && <span className="text-white/20">/</span>}
          <a
            className={
              item === locale
                ? 'uppercase text-novatek-primary'
                : 'uppercase text-white/60 transition-colors hover:text-white'
            }
            href={switchPath(pathname, item)}
            aria-current={item === locale ? 'true' : undefined}
          >
            {item}
          </a>
        </span>
      ))}
    </nav>
  )
}
