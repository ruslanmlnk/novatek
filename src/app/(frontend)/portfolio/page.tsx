import { getProjectCategories } from '@/lib/queries/categories'
import { getProjects } from '@/lib/queries/projects'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { CategoryFilterProvider, CategoryFilters } from '../components/CategoryFilter'
import { PageHero } from '../components/PageHero'
import { PortfolioGrid, type PortfolioCardData } from '../components/PortfolioGrid'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const siteData = await getSiteData()
  return buildMeta(siteData.seo.portfolio, {
    title: 'Portfolio - Novatek Engineering',
    description:
      'Explore Novatek Engineering case studies across laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
  })
}

export const revalidate = 60

export default async function PortfolioPage() {
  const [siteData, projects, categories] = await Promise.all([
    getSiteData(),
    getProjects(),
    getProjectCategories(),
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
          nav={siteData.nav}
          eyebrow="Portfolio"
          title={
            <>
              Our <span className="text-novatek-primary">Case studies</span>
            </>
          }
          filtersSlot={
            <CategoryFilters categories={['All', ...categories]} label="Portfolio filters" />
          }
          contentClassName="pb-[74px] pt-[42px]"
        />
        <PortfolioGrid projects={cards} />
      </CategoryFilterProvider>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
