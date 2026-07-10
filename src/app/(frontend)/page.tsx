import { getSiteData } from './cms'
import { ContactFormSection } from './components/sections/ContactFormSection'
import { FaqSection } from './components/sections/FaqSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { QuoteSection } from './components/sections/QuoteSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { SiteFooter } from './components/sections/SiteFooter'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { WhyChooseSection } from './components/sections/WhyChooseSection'

export const revalidate = 60

export default async function HomePage() {
  const siteData = await getSiteData()

  return (
    <div className="min-h-screen bg-novatek-bg" id="top">
      <HeroSection brand={siteData.brand} hero={siteData.hero} nav={siteData.nav} />
      <WhyChooseSection {...siteData.whyChoose} />
      <ServicesSection {...siteData.services} />
      <ProcessSection {...siteData.process} />
      <ProjectsSection {...siteData.projects} />
      <TestimonialsSection {...siteData.testimonials} />
      <QuoteSection {...siteData.quote} />
      <FaqSection {...siteData.faq} />
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
