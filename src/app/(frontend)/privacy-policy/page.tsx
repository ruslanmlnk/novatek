import { getPrivacyData } from '@/lib/queries/privacy'
import { buildMeta } from '@/lib/seo'
import { getSiteData } from '@/lib/queries/site'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const privacy = await getPrivacyData()
  return buildMeta(privacy.seo, {
    title: 'Privacy Policy - Novatek Engineering',
    description: 'Privacy policy for Novatek Engineering website visitors and quote requests.',
  })
}

export const revalidate = 60

export default async function PrivacyPolicyPage() {
  const [siteData, privacy] = await Promise.all([getSiteData(), getPrivacyData()])
  const { lastUpdated, sections } = privacy

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/privacy-policy"
        brand={siteData.brand}
        nav={siteData.nav}
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        gridLines
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
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
