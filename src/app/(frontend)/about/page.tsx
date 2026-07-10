import { getAboutData, getSiteData } from '../cms'
import { ContactFormSection } from '../components/sections/ContactFormSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import { AboutHeroSection } from './components/AboutHeroSection'
import { AboutStorySection } from './components/AboutStorySection'
import { TechPartnersSection } from './components/TechPartnersSection'

export const metadata = {
  title: 'About Us — Novatek Engineering',
  description:
    'Novatek Engineering delivers precision engineering and manufacturing solutions built on years of technical expertise.',
}

export const revalidate = 60

export default async function AboutPage() {
  const [siteData, aboutData] = await Promise.all([getSiteData(), getAboutData()])

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <AboutHeroSection brand={siteData.brand} hero={aboutData.hero} nav={siteData.nav} />
      <AboutStorySection services={siteData.services.items} story={aboutData.story} />
      <TechPartnersSection {...aboutData.techPartners} />
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
