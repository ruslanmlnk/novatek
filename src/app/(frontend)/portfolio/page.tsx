import { t } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'
import { getProjectCategories } from '@/lib/queries/categories'
import { getProjects } from '@/lib/queries/projects'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { CategoryFilterProvider, CategoryFilters } from '../components/CategoryFilter'
import { PageHero } from '../components/PageHero'
import { PortfolioGrid, type PortfolioCardData } from '../components/PortfolioGrid'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const siteData = await getSiteData(locale)
  return buildMeta(siteData.seo.portfolio, {
    title: dict.pages.portfolio.metaTitle,
    description: dict.pages.portfolio.metaDescription,
  })
}

export const revalidate = 60

export default async function PortfolioPage() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const [siteData, projects, categories] = await Promise.all([
    getSiteData(locale),
    getProjects(locale),
    getProjectCategories(locale),
  ])

  const cards: PortfolioCardData[] = projects.map((project) => ({
    slug: project.slug,
    category: project.category,
    title: project.title,
    description: project.description,
    image: project.image,
  }))

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <CategoryFilterProvider>
        <PageHero
          activeHref="/portfolio"
          brand={siteData.brand}
          locale={locale}
          nav={siteData.nav}
          eyebrow={dict.pages.portfolio.eyebrow}
          title={
            <>
              {dict.pages.portfolio.titleBefore}
              <span className="text-novatek-primary">{dict.pages.portfolio.titleAccent}</span>
            </>
          }
          filtersSlot={
            <CategoryFilters
              allLabel={dict.common.all}
              categories={categories}
              label={dict.pages.portfolio.filters}
            />
          }
          contentClassName="pb-[74px] pt-[42px]"
          gridLines
        />
        <PortfolioGrid locale={locale} nextLabel={dict.common.next} projects={cards} />
      </CategoryFilterProvider>
      <SiteFooter
        activeHref="/portfolio"
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
