import type { siteData } from '../../data'
import { serviceSlugs } from '../../content'
import { ArrowGlyph, CheckGlyph, ServiceGlyph } from '../IconSet'
import { ArrowButton } from '../ArrowButton'
import { HighlightedTitle } from '../SectionHeading'

type ServicesSectionProps = typeof siteData.services

export function ServicesSection({ heading, items }: ServicesSectionProps) {
  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] max-md:px-6"
      id="services"
    >
      <div className="mx-auto mb-[69px] grid max-w-content gap-4">
        <p className="text-lg font-medium leading-[26px] text-white">// {heading.eyebrow} //</p>
        <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
          <h2 className="max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[34px] max-md:leading-10 [&_span]:text-novatek-primary">
            <HighlightedTitle {...heading.title} />
          </h2>
          {heading.button && (
            <div className="max-md:hidden">
              <ArrowButton {...heading.button} />
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto grid max-w-content gap-0">
        {items.map((service, index) => (
          <article
            className={`group sticky grid min-h-[312px] grid-cols-[494px_minmax(0,1fr)] items-start gap-[50px] border-t border-white/20 bg-novatek-bg py-10 max-lg:static max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-6 max-md:py-0 max-md:pb-6 max-md:pt-6 ${index > 1 ? 'max-md:hidden' : ''}`}
            key={service.title}
            style={{
              top: `${100 + index * 100}px`,
              zIndex: index + 1,
            }}
          >
            <div className="grid min-h-[231px] grid-cols-[58px_minmax(0,404px)] items-stretch gap-8 max-md:min-h-0 max-md:grid-cols-1">
              <ServiceGlyph className="max-md:hidden" index={index} />
              <div className="h-full min-h-[231px] w-full overflow-hidden max-md:h-[200px] max-md:min-h-0">
                <img
                  className="h-full min-h-[231px] w-full object-cover transition-transform duration-500 ease-linear group-hover:scale-110 max-md:min-h-0"
                  src={service.image}
                  alt=""
                />
              </div>
            </div>
            <div className="grid grid-cols-[minmax(220px,345px)_minmax(260px,345px)_40px] items-start justify-between gap-8 max-xl:grid-cols-[minmax(190px,249px)_minmax(260px,309px)_40px] max-md:grid-cols-1 max-md:gap-6">
              <h3 className="max-w-[345px] text-[26px] font-semibold leading-[38px] text-white max-md:max-w-none">
                {service.title}
              </h3>
              <div className="grid w-full max-w-[345px] gap-8 max-md:max-w-none">
                <p className="text-base font-medium leading-[23px] text-white">Features</p>
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
                className="grid size-10 place-items-center bg-novatek-primary text-white transition-colors hover:bg-white hover:text-novatek-bg max-md:hidden max-md:justify-self-start"
                href={`/services/${serviceSlugs[service.title]}`}
                aria-label={`View ${service.title}`}
              >
                <ArrowGlyph className="h-3 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
