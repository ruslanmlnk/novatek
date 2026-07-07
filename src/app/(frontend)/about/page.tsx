import { SiteFooter } from '../components/sections/SiteFooter'
import { siteData } from '../data'
import { AboutHeroSection } from './components/AboutHeroSection'
import { AboutStorySection } from './components/AboutStorySection'
import { TechPartnersSection } from './components/TechPartnersSection'
import { aboutData } from './data'

export const metadata = {
  title: 'About Us — Novatek Engineering',
  description:
    'Novatek Engineering delivers precision engineering and manufacturing solutions built on years of technical expertise.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <AboutHeroSection brand={siteData.brand} hero={aboutData.hero} nav={siteData.nav} />
      <AboutStorySection services={siteData.services.items} story={aboutData.story} />
      <TechPartnersSection {...aboutData.techPartners} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
