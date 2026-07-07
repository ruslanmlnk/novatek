import { ContactFormSection } from '../components/sections/ContactFormSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { siteData } from '../data'

export const metadata = {
  title: 'Services - Novatek Engineering',
  description:
    'Explore Novatek Engineering services including laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/services" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative mx-auto flex max-w-content flex-col items-center pb-[74px] pt-[42px] text-center">
        <p className="mb-4 text-lg font-semibold leading-[1.45] text-white">// What We Do //</p>
        <h1 className="text-[clamp(32px,5vw,48px)] font-semibold leading-[1.25] text-white">
          Our <span className="text-novatek-primary">services</span>
        </h1>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <ServicesHero />
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
