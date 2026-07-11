import { t } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'
import { getPostCategories } from '@/lib/queries/categories'
import { getPosts } from '@/lib/queries/posts'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { BlogGrid, type BlogCardData } from '../components/BlogGrid'
import { CategoryFilterProvider, CategoryFilters } from '../components/CategoryFilter'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export async function generateMetadata() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const siteData = await getSiteData(locale)
  return buildMeta(siteData.seo.blog, {
    title: dict.pages.blog.metaTitle,
    description: dict.pages.blog.metaDescription,
  })
}

export const revalidate = 60

export default async function BlogPage() {
  const locale = await getRequestLocale()
  const dict = t(locale)
  const [siteData, posts, categories] = await Promise.all([
    getSiteData(locale),
    getPosts(locale),
    getPostCategories(locale),
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
          locale={locale}
          nav={siteData.nav}
          eyebrow={dict.pages.blog.eyebrow}
          title={
            <>
              {dict.pages.blog.titleBefore}
              <span className="text-novatek-primary">{dict.pages.blog.titleAccent}</span>
            </>
          }
          filtersSlot={
            <CategoryFilters
              allLabel={dict.common.all}
              categories={categories}
              label={dict.pages.blog.filters}
            />
          }
          gridLines
        />
        <BlogGrid locale={locale} nextLabel={dict.common.next} posts={cards} />
      </CategoryFilterProvider>
      <SiteFooter
        activeHref="/blog"
        brand={siteData.brand}
        footer={siteData.footer}
        locale={locale}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
