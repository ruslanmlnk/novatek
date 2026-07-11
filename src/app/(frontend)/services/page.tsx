import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { PageHero } from '../components/PageHero'
import { ContactFormSection } from '../components/sections/ContactFormSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const siteData = await getSiteData()
  return buildMeta(siteData.seo.services, {
    title: 'Services - Novatek Engineering',
    description:
      'Explore Novatek Engineering services including laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
  })
}

export const revalidate = 60

export default async function ServicesPage() {
  const siteData = await getSiteData()

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/services"
        brand={siteData.brand}
        nav={siteData.nav}
        eyebrow="What We Do"
        title={
          <>
            Our <span className="text-novatek-primary">services</span>
          </>
        }
        contentClassName="pb-[74px] pt-[42px]"
      />
      <ServicesSection items={siteData.services.items} />
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
