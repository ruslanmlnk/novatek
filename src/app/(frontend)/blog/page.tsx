import { getPostCategories } from '@/lib/queries/categories'
import { getPosts } from '@/lib/queries/posts'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { BlogGrid, type BlogCardData } from '../components/BlogGrid'
import { CategoryFilterProvider, CategoryFilters } from '../components/CategoryFilter'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const siteData = await getSiteData()
  return buildMeta(siteData.seo.blog, {
    title: 'Blog - Novatek Engineering',
    description:
      'Engineering insights, manufacturing guides and industry news from Novatek Engineering.',
  })
}

export const revalidate = 60

export default async function BlogPage() {
  const [siteData, posts, categories] = await Promise.all([
    getSiteData(),
    getPosts(),
    getPostCategories(),
  ])

  const cards: BlogCardData[] = posts.map((post) => ({
    slug: post.slug,
    category: post.category,
    date: post.date,
    title: post.title,
    description: post.description,
    image: post.image,
  }))

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <CategoryFilterProvider>
        <PageHero
          activeHref="/blog"
          brand={siteData.brand}
          nav={siteData.nav}
          eyebrow="Blog"
          title={
            <>
              Engineering <span className="text-novatek-primary">insights</span>
            </>
          }
          filtersSlot={
            <CategoryFilters categories={['All', ...categories]} label="Blog categories" />
          }
          gridLines
        />
        <BlogGrid posts={cards} />
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
