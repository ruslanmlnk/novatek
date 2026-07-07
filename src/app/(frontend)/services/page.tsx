import { FaqSection } from '../components/sections/FaqSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { QuoteSection } from '../components/sections/QuoteSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { ArrowGlyph, CheckGlyph, ServiceGlyph } from '../components/IconSet'
import { serviceSlugs } from '../content'
import { siteData } from '../data'

export const metadata = {
  title: 'Services - Novatek Engineering',
  description:
    'Explore Novatek Engineering services including laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
}

function RowArrow({ href }: { href: string }) {
  return (
    <a
      className="grid size-10 shrink-0 place-items-center bg-novatek-primary transition-colors hover:bg-white hover:text-novatek-bg max-md:hidden"
      href={href}
      aria-label="Request this service"
    >
      <ArrowGlyph />
    </a>
  )
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/services" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative mx-auto flex max-w-content flex-col items-center pb-[74px] pt-[42px] text-center">
        <p className="mb-4 text-lg font-semibold leading-[1.45] text-white">// What We Do //</p>
        <h1 className="text-[clamp(42px,5vw,48px)] font-semibold leading-[1.25] text-white">
          Our <span className="text-novatek-primary">services</span>
        </h1>
      </div>
      <div className="relative -mx-[clamp(20px,5.1vw,74px)] h-[338px]">
        <GridLinesForHero />
      </div>
    </section>
  )
}

function GridLinesForHero() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 338"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {[74, 397, 720, 1043, 1366].map((x) => (
        <path d={`M${x} 0V338`} stroke="white" strokeOpacity="0.1" key={x} />
      ))}
    </svg>
  )
}

function ServiceRows() {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px]" id="services">
      <div className="mx-auto grid max-w-content gap-8">
        {siteData.services.items.map((service, index) => (
          <article
            className="grid grid-cols-[438px_minmax(0,1fr)] gap-8 border-t border-white/20 pt-8 max-lg:grid-cols-1"
            key={service.title}
          >
            <div className="grid min-h-[184px] grid-cols-[36px_minmax(0,370px)] items-stretch gap-8 max-sm:grid-cols-1">
              <ServiceGlyph index={index} />
              <img
                className="h-full min-h-[184px] w-full object-cover"
                src={service.image}
                alt=""
              />
            </div>
            <div className="grid grid-cols-[249px_minmax(260px,1fr)_40px] items-start justify-between gap-8 max-md:grid-cols-1">
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">
                {service.title}
              </h2>
              <div className="max-w-[520px]">
                <p className="mb-8 text-base font-medium leading-[1.45] text-white">Features</p>
                <ul className="grid gap-2.5">
                  {service.features.map((feature) => (
                    <li
                      className="flex items-start gap-[7px] text-lg font-medium leading-[1.45] text-white"
                      key={feature}
                    >
                      <CheckGlyph className="mt-[9px] shrink-0 text-novatek-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="mt-8 hidden w-fit bg-novatek-primary px-4 py-3 text-base font-semibold text-white max-md:inline-flex"
                  href={`/services/${serviceSlugs[service.title]}`}
                >
                  View Service
                </a>
              </div>
              <RowArrow href={`/services/${serviceSlugs[service.title]}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <ServicesHero />
      <ServiceRows />
      <ProcessSection {...siteData.process} />
      <QuoteSection {...siteData.quote} />
      <FaqSection {...siteData.faq} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
