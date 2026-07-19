import { t } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { PageHero } from '../components/PageHero'
import { ContactFormSection } from '../components/sections/ContactFormSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const siteData = await getSiteData(locale)
  return buildMeta(siteData.seo.services, {
    title: dict.pages.services.metaTitle,
    description: dict.pages.services.metaDescription,
  })
}

export const revalidate = 60

export default async function ServicesPage() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const siteData = await getSiteData(locale)

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/services"
        brand={siteData.brand}
        locale={locale}
        nav={siteData.nav}
        eyebrow={dict.pages.services.eyebrow}
        title={
          <>
            {dict.pages.services.titleBefore}
            <span className="text-novatek-primary">{dict.pages.services.titleAccent}</span>
          </>
        }
        contentClassName="pb-[74px] pt-[42px]"
        gridLines
      />
      <ServicesSection items={siteData.services.items} locale={locale} />
      <ContactFormSection
        address={siteData.footer.contact[2]}
        backgroundImage={siteData.footer.contactFormBackgroundImage}
        email={siteData.footer.contact[1]}
        locale={locale}
        phone={siteData.footer.contact[0]}
      />
      <SiteFooter
        activeHref="/services"
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
