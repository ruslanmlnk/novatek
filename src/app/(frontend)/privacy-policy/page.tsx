import { t } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'
import { getPrivacyData } from '@/lib/queries/privacy'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const privacy = await getPrivacyData(locale)

  return buildMeta(privacy.seo, {
    title: dict.pages.privacy.metaTitle,
    description: dict.pages.privacy.metaDescription,
  })
}

export const revalidate = 60

export default async function PrivacyPolicyPage() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const [siteData, privacy] = await Promise.all([getSiteData(locale), getPrivacyData(locale)])
  const { lastUpdated, sections } = privacy

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/privacy-policy"
        brand={siteData.brand}
        description={`${dict.pages.privacy.lastUpdated}: ${lastUpdated}`}
        gridLines
        locale={locale}
        nav={siteData.nav}
        title={dict.pages.privacy.title}
      />
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-[42px]">
        <div className="mx-auto grid w-full max-w-[1012px] gap-6">
          {sections.map((section) => (
            <article className="grid gap-4" data-reveal key={section.title}>
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-lg font-medium leading-[1.45] text-novatek-muted">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
