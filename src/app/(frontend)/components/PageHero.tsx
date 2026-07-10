import type { ReactNode } from 'react'
import type { NavItem, siteData } from '../data'
import { GridLines } from './GridLines'
import { SiteHeader } from './SiteHeader'

type PageHeroProps = {
  activeHref: string
  brand: typeof siteData.brand
  nav: NavItem[]
  eyebrow?: string
  meta?: ReactNode
  title: ReactNode
  description?: string
  filters?: string[]
  filtersHref?: string
  filtersLabel?: string
  gridLines?: boolean
  contentClassName?: string
}

export function PageHero({
  activeHref,
  brand,
  nav,
  eyebrow,
  meta,
  title,
  description,
  filters,
  filtersHref = '#',
  filtersLabel = 'Filters',
  gridLines = false,
  contentClassName = 'pb-12 pt-12',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      {gridLines && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[396px]">
          <GridLines height={396} />
        </div>
      )}
      <SiteHeader activeHref={activeHref} brand={brand} nav={nav} />
      <div
        className={`relative mx-auto flex max-w-content flex-col items-center gap-8 text-center ${contentClassName}`}
        data-reveal
      >
        <div className="grid justify-items-center gap-4">
          {meta}
          {eyebrow && (
            <p className="text-lg font-medium leading-[1.45] text-white">// {eyebrow} //</p>
          )}
          <h1 className="max-w-[742px] text-[clamp(32px,5vw,48px)] font-semibold leading-[1.25] text-white">
            {title}
          </h1>
          {description && (
            <p className="max-w-[742px] text-lg font-medium leading-[1.45] text-novatek-muted">
              {description}
            </p>
          )}
        </div>
        {filters && (
          <nav
            className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg font-medium leading-[1.45] text-white max-md:justify-start max-md:text-base"
            aria-label={filtersLabel}
          >
            {filters.map((filter, index) => (
              <a className="inline-flex items-center gap-4" href={filtersHref} key={filter}>
                <span className="text-white/20">/</span>
                <span
                  className={
                    index === 0 ? 'border-b border-novatek-primary text-novatek-primary' : undefined
                  }
                >
                  {filter}
                </span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
