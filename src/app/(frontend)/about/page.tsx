import { t } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'
import { getAboutData } from '@/lib/queries/about'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { ContactFormSection } from '../components/sections/ContactFormSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import { AboutHeroSection } from './components/AboutHeroSection'
import { AboutStorySection } from './components/AboutStorySection'
import { TechPartnersSection } from './components/TechPartnersSection'

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const aboutData = await getAboutData(locale)

  return buildMeta(aboutData.seo, {
    title: dict.pages.about.metaTitle,
    description: dict.pages.about.metaDescription,
  })
}

export const revalidate = 60

export default async function AboutPage() {
  const locale = await getRequestLocale()
  const [siteData, aboutData] = await Promise.all([getSiteData(locale), getAboutData(locale)])

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <AboutHeroSection
        brand={siteData.brand}
        hero={aboutData.hero}
        locale={locale}
        nav={siteData.nav}
      />
      <AboutStorySection services={siteData.services.items} story={aboutData.story} />
      <TechPartnersSection {...aboutData.techPartners} />
      <ContactFormSection
        address={siteData.footer.contact[2]}
        backgroundImage={siteData.hero.backgroundImage}
        email={siteData.footer.contact[1]}
        locale={locale}
        phone={siteData.footer.contact[0]}
      />
      <SiteFooter
        activeHref="/about"
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
