'use client'

import { useState } from 'react'
import { dictionary, localizeHref, type Locale } from '@/lib/i18n'
import type { ServiceCard } from '@/lib/queries/services'
import type { siteData } from '../../data'
import { ArrowGlyph, CheckGlyph, ServiceGlyph } from '../IconSet'
import { ArrowButton } from '../ArrowButton'
import { HighlightedTitle } from '../SectionHeading'

type ServicesSectionProps = {
  heading?: typeof siteData.services.heading
  items: ServiceCard[]
  locale?: Locale
}

const MOBILE_PAGE_SIZE = 2

export function ServicesSection({ heading, items, locale = 'en' }: ServicesSectionProps) {
  const dict = dictionary[locale]
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(items.length / MOBILE_PAGE_SIZE)
  const pageStart = page * MOBILE_PAGE_SIZE
  const pageEnd = pageStart + MOBILE_PAGE_SIZE

  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] max-md:px-6"
      id="services"
    >
      {heading && (
        <div
          className="mx-auto mb-[69px] grid max-w-content gap-4 max-md:mb-8 max-md:justify-items-center max-md:text-center"
          data-reveal
        >
          <p className="text-lg font-medium leading-[26px] text-white">// {heading.eyebrow} //</p>
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-center">
            <h2 className="max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[32px] max-md:leading-[1.25] [&_span]:text-novatek-primary">
              <HighlightedTitle {...heading.title} />
            </h2>
            {heading.button && (
              <div className="max-md:hidden">
                <ArrowButton {...heading.button} />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mx-auto grid max-w-content gap-0">
        {items.map((service, index) => (
          <article
            className={`group sticky grid min-h-[312px] grid-cols-[494px_minmax(0,1fr)] items-start gap-[50px] border-t border-white/20 bg-novatek-bg py-10 max-lg:static max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-6 max-md:py-6 ${
              index < pageStart || index >= pageEnd ? 'max-md:hidden' : ''
            }`}
            key={service.title}
            style={{
              top: `${100 + index * 100}px`,
              zIndex: index + 1,
            }}
          >
            <div className="flex items-center justify-between gap-4 md:hidden">
              <div className="flex items-center gap-4">
                <ServiceGlyph index={index} />
                <h3 className="text-[26px] font-semibold leading-[38px] text-white">
                  {service.title}
                </h3>
              </div>
              <a
                className="grid size-10 shrink-0 place-items-center overflow-hidden bg-novatek-primary text-white transition-colors duration-300 hover:bg-novatek-primaryHover active:bg-novatek-primaryActive"
                href={localizeHref(`/services/${service.slug}`, locale)}
                aria-label={`${dict.common.view} ${service.title}`}
              >
                <ArrowGlyph className="col-start-1 row-start-1 h-3 w-4 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-[30px]" />
                <ArrowGlyph className="col-start-1 row-start-1 h-3 w-4 -translate-x-[30px] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0" />
              </a>
            </div>
            <div className="grid min-h-[231px] grid-cols-[58px_minmax(0,404px)] items-stretch gap-8 max-md:min-h-0 max-md:grid-cols-1">
              <ServiceGlyph className="max-md:hidden" index={index} />
              <a
                className="block h-full min-h-[231px] w-full overflow-hidden max-md:h-[200px] max-md:min-h-0"
                href={localizeHref(`/services/${service.slug}`, locale)}
                aria-label={`${dict.common.view} ${service.title}`}
              >
                <img
                  className="h-full min-h-[231px] w-full object-cover transition-transform duration-500 ease-linear group-hover:scale-110 max-md:min-h-0"
                  src={service.image}
                  alt=""
                />
              </a>
            </div>
            <div className="grid grid-cols-[minmax(220px,345px)_minmax(260px,345px)_40px] items-start justify-between gap-8 max-xl:grid-cols-[minmax(190px,249px)_minmax(260px,309px)_40px] max-md:grid-cols-1 max-md:gap-6">
              <h3 className="max-w-[345px] text-[26px] font-semibold leading-[38px] text-white max-md:hidden">
                {service.title}
              </h3>
              <div className="grid w-full max-w-[345px] gap-8 max-md:max-w-none max-md:gap-6">
                <p className="text-base font-medium leading-[23px] text-white">{dict.common.features}</p>
                <ul className="grid gap-2.5">
                  {service.features.map((feature) => (
                    <li
                      className="flex items-center gap-[7px] text-lg font-medium leading-[26px] text-white"
                      key={feature}
                    >
                      <CheckGlyph className="shrink-0 text-novatek-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="grid size-10 place-items-center overflow-hidden bg-novatek-primary text-white transition-colors duration-300 hover:bg-novatek-primaryHover active:bg-novatek-primaryActive max-md:hidden"
                href={localizeHref(`/services/${service.slug}`, locale)}
                aria-label={`${dict.common.view} ${service.title}`}
              >
                <ArrowGlyph className="col-start-1 row-start-1 h-3 w-4 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-[30px]" />
                <ArrowGlyph className="col-start-1 row-start-1 h-3 w-4 -translate-x-[30px] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-2 grid max-w-content gap-6 md:hidden">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold leading-[29px] text-white">
            {page + 1} / {pageCount}
          </p>
          <button
            className="inline-flex items-center gap-4 border border-white/20 bg-novatek-bg py-2 pl-4 pr-2 text-base font-medium text-white transition-colors duration-300 hover:bg-novatek-bgHover active:bg-novatek-bgActive"
            onClick={() => setPage((current) => (current + 1) % pageCount)}
            type="button"
          >
            <span>{dict.common.next}</span>
            <span className="grid size-10 place-items-center bg-white text-novatek-bg" aria-hidden="true">
              <ArrowGlyph className="h-3 w-4" />
            </span>
          </button>
        </div>
        {heading?.button && <ArrowButton {...heading.button} />}
      </div>
    </section>
  )
}
