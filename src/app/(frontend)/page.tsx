import { getRequestLocale } from '@/lib/locale'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
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

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const siteData = await getSiteData(locale)
  return buildMeta(siteData.seo.home, {
    title: 'Novatek Engineering',
    description: 'Precision engineering and manufacturing services by Novatek Engineering.',
  })
}

export default async function HomePage() {
  const locale = await getRequestLocale()
  const siteData = await getSiteData(locale)

  return (
    <div className="min-h-screen bg-novatek-bg" id="top">
      <HeroSection brand={siteData.brand} hero={siteData.hero} locale={locale} nav={siteData.nav} />
      <WhyChooseSection {...siteData.whyChoose} />
      <ServicesSection {...siteData.services} locale={locale} />
      <ProcessSection {...siteData.process} locale={locale} />
      <ProjectsSection {...siteData.projects} />
      <TestimonialsSection {...siteData.testimonials} />
      <QuoteSection {...siteData.quote} />
      <FaqSection {...siteData.faq} />
      <ContactFormSection
        address={siteData.footer.contact[2]}
        backgroundImage={siteData.footer.contactFormBackgroundImage}
        email={siteData.footer.contact[1]}
        locale={locale}
        phone={siteData.footer.contact[0]}
      />
      <SiteFooter
        activeHref="/"
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
