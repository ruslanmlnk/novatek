import { getServices } from '@/lib/queries/services'
import { localizeHref, t, type Locale } from '@/lib/i18n'
import type { NavItem } from '../data'
import { ArrowButton } from './ArrowButton'
import { BrandLogo } from './BrandLogo'
import { LocaleSwitcher } from './LocaleSwitcher'

type SiteHeaderProps = {
  brand: {
    name: string
    tagline: string
  }
  nav: NavItem[]
  activeHref?: string
  locale?: Locale
}

export async function SiteHeader({ activeHref, brand, locale = 'en', nav }: SiteHeaderProps) {
  const dict = t(locale)
  const services = await getServices(locale)
  const mobileServiceLinks = services.map((service) => ({
    label: service.title,
    href: localizeHref(`/services/${service.slug}`, locale),
  }))

  return (
    <header className="group/header relative z-50 mx-auto flex h-[120px] w-full max-w-[1292px] items-center justify-between gap-8 py-8 max-lg:-mx-6 max-lg:h-20 max-lg:w-[calc(100%+48px)] max-lg:gap-4 max-lg:px-6 max-lg:py-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-novatek-bg bg-[linear-gradient(180deg,#434631_0%,rgba(25,25,25,0)_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-has-[details[open]]/header:opacity-100 max-lg:block"
        aria-hidden="true"
      />
      <BrandLogo name={brand.name} tagline={brand.tagline} />
      <nav
        className="flex items-center gap-6 text-lg font-medium leading-[1.45] text-white max-lg:hidden"
        aria-label="Main navigation"
      >
        {nav.map((item) => {
          const isActive = item.href === activeHref || item.href.endsWith(activeHref ?? '#')
          return (
            <a
              className="inline-flex items-center gap-4 max-md:gap-2"
              href={item.href}
              key={item.label}
            >
              <span className="text-white/20">/</span>
              <span
                className={
                  isActive ? 'border-b border-novatek-primary text-novatek-primary' : undefined
                }
              >
                {item.label}
              </span>
            </a>
          )
        })}
      </nav>
      <LocaleSwitcher className="ml-auto shrink-0 lg:ml-0" locale={locale} />
      <details className="group relative z-50 hidden max-lg:block">
        <summary className="grid size-10 cursor-pointer list-none place-items-center text-white [&::-webkit-details-marker]:hidden">
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span className="absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform group-open:top-1.5 group-open:rotate-45" />
            <span className="absolute right-0 top-1.5 block h-0.5 w-[18px] bg-current transition-opacity group-open:opacity-0" />
            <span className="absolute left-0 top-3 block h-0.5 w-6 bg-current transition-transform group-open:top-1.5 group-open:-rotate-45" />
          </span>
          <span className="sr-only">
            {locale === 'bg' ? 'Отворете навигацията' : 'Open navigation'}
          </span>
        </summary>
        <nav
          className="fixed left-0 top-20 z-50 w-screen animate-[menu-panel-in_0.5s_cubic-bezier(0.65,0,0.35,1)] bg-novatek-bg px-6 pb-6 pt-6 text-lg font-medium leading-[26px] text-white shadow-2xl"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-[13px]">
            <a className="block py-0 text-white" href={localizeHref('/', locale)}>
              {dict.common.home}
            </a>
            <details className="group/services">
              <summary className="flex cursor-pointer list-none items-center justify-between py-0 text-white [&::-webkit-details-marker]:hidden">
                <span>{dict.common.services}</span>
                <svg
                  className="mr-0.5 size-4 transition-transform duration-200 group-open/services:rotate-180"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="mt-4 hidden gap-4 border border-white/10 bg-novatek-bg p-4 group-open/services:grid">
                {mobileServiceLinks.map((item) => (
                  <a className="block py-0 text-white" href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
            {nav
              .filter((item) => !item.href.endsWith('/services'))
              .map((item) => {
                const isActive = item.href === activeHref || item.href.endsWith(activeHref ?? '#')
                return (
                  <a
                    className={`block py-0 ${isActive ? 'text-novatek-primary' : 'text-white'}`}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                )
              })}
          </div>
        </nav>
      </details>
      <div className="max-lg:hidden">
        <ArrowButton href={localizeHref('/contact', locale)} label={dict.common.getAQuote} />
      </div>
    </header>
  )
}
