import { notFound } from 'next/navigation'

import { getService, getServices } from '@/lib/queries/services'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { ArrowButton } from '../../components/ArrowButton'
import { PageHero } from '../../components/PageHero'
import { revealDelay } from '../../components/reveal'
import { ContactFormSection } from '../../components/sections/ContactFormSection'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { ServiceFaq } from '../../components/services/ServiceFaq'
import { ServiceIndustries } from '../../components/services/ServiceIndustries'
import { ServiceOverview } from '../../components/services/ServiceOverview'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = await getService(slug)

  return buildMeta(service?.seo, {
    title: service ? `${service.title} - Novatek Engineering` : 'Service - Novatek Engineering',
    description:
      service?.overview.split('\n')[0] ??
      'Precision engineering and manufacturing services by Novatek Engineering.',
  })
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const [service, siteData] = await Promise.all([getService(slug), getSiteData()])

  if (!service) notFound()

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/services"
        brand={siteData.brand}
        nav={siteData.nav}
        eyebrow={service.title}
        title={
          <>
            {service.heroTitle.before}
            <span className="text-novatek-primary">{service.heroTitle.accent}</span>
            {service.heroTitle.after}
          </>
        }
        contentClassName="pb-[30px] pt-12"
      />
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-content justify-items-center gap-12">
          <div data-reveal>
            <ArrowButton href="/contact" label="Request A Quote" />
          </div>
          <img
            className="aspect-[2/1] w-full object-cover max-md:aspect-[3/2]"
            src={service.heroImage}
            alt=""
            data-reveal
            style={revealDelay(1, 150)}
          />
        </div>
      </section>
      <ServiceOverview service={service} />
      <ServiceIndustries service={service} />
      <ServiceFaq faq={siteData.faq} />
      <ContactFormSection
        address={siteData.footer.contact[2]}
        backgroundImage={siteData.hero.backgroundImage}
        email={siteData.footer.contact[1]}
        phone={siteData.footer.contact[0]}
      />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
