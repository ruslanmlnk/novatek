import { notFound } from 'next/navigation'

import { ArrowButton } from '../../components/ArrowButton'
import { GridLines } from '../../components/GridLines'
import { QuoteSection } from '../../components/sections/QuoteSection'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { serviceDetails } from '../../content'
import { siteData } from '../../data'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = serviceDetails.find((item) => item.slug === slug)

  return {
    description:
      service?.intro ?? 'Precision engineering and manufacturing services by Novatek Engineering.',
    title: service ? `${service.title} - Novatek Engineering` : 'Service - Novatek Engineering',
  }
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li
          className="relative pl-6 text-lg font-medium leading-[1.45] text-white before:absolute before:left-0 before:top-[11px] before:size-2 before:rotate-45 before:border-b-2 before:border-r-2 before:border-novatek-primaryLight"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function ServiceHero({ service }: { service: (typeof serviceDetails)[number] }) {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/services" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative mx-auto grid max-w-content gap-12 pb-[74px] pt-12">
        <div className="grid max-w-[742px] gap-4">
          <p className="text-lg font-medium leading-[1.45] text-white">// Service //</p>
          <h1 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.05] text-white">
            {service.title}
          </h1>
          <p className="max-w-[680px] text-xl font-medium leading-[1.45] text-novatek-muted max-md:text-lg">
            {service.intro}
          </p>
        </div>
        <img
          className="h-[clamp(280px,45vw,560px)] w-full object-cover"
          src={service.image}
          alt=""
        />
      </div>
    </section>
  )
}

function ServiceContent({ service }: { service: (typeof serviceDetails)[number] }) {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px]">
      <GridLines height={920} opacity={0.05} />
      <div className="relative mx-auto grid max-w-content gap-12">
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-12 max-lg:grid-cols-1">
          <div className="grid content-start gap-6">
            <p className="text-lg font-medium leading-[1.45] text-white">// {service.title} //</p>
            <h2 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.12] text-white">
              Built for <span className="text-novatek-primary">accurate production</span>
            </h2>
            <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
              {service.intro} Send drawings, CAD files or project notes and our team will confirm
              the most efficient manufacturing route.
            </p>
            <ArrowButton href="/#quote" label="Request A Quote" />
          </div>
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            <article className="bg-novatek-panel p-8">
              <h3 className="mb-6 text-[26px] font-semibold leading-[1.25] text-white">
                Capabilities
              </h3>
              <CheckList items={service.capabilities} />
            </article>
            <article className="bg-novatek-panel p-8">
              <h3 className="mb-6 text-[26px] font-semibold leading-[1.25] text-white">
                Applications
              </h3>
              <CheckList items={service.applications} />
            </article>
          </div>
        </div>
        <div className="grid gap-8 border-t border-white/15 pt-12">
          <h2 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.12] text-white">
            Process <span className="text-novatek-primary">overview</span>
          </h2>
          <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {service.process.map((step, index) => (
              <article className="grid gap-8 bg-novatek-soft p-6 text-novatek-bg" key={step}>
                <span className="text-xl font-semibold text-novatek-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl font-semibold leading-[1.3]">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = serviceDetails.find((item) => item.slug === slug)

  if (!service) notFound()

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <ServiceHero service={service} />
      <ServiceContent service={service} />
      <QuoteSection {...siteData.quote} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((item) => item.title)}
      />
    </div>
  )
}
