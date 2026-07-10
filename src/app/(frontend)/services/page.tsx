import { PageHero } from '../components/PageHero'
import { ContactFormSection } from '../components/sections/ContactFormSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import { siteData } from '../data'

export const metadata = {
  title: 'Services - Novatek Engineering',
  description:
    'Explore Novatek Engineering services including laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
}

export default function ServicesPage() {
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
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
