import { BlogCard } from '../components/BlogCard'
import { ArrowGlyph } from '../components/IconSet'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'
import { blogPosts } from '../content'
import { siteData } from '../data'

export const metadata = {
  title: 'Blog - Novatek Engineering',
  description:
    'Engineering insights, manufacturing guides and industry news from Novatek Engineering.',
}

const categories = ['All', 'Manufacturing Guides', 'Engineering Insights', 'Industry News']

const gridCards = [
  { post: blogPosts[0] },
  { post: blogPosts[1] },
  { post: blogPosts[2] },
  { post: blogPosts[2], image: '/assets/novatek/figma-d874ddc716-723.png' },
  { post: blogPosts[0], image: '/assets/novatek/figma-203fb8614a-723.png' },
  { post: blogPosts[1] },
  { post: blogPosts[1], image: '/assets/novatek/figma-0b3a9a9f59-723.png' },
  { post: blogPosts[2], image: '/assets/novatek/figma-0a202eb44c-723.png' },
  { post: blogPosts[0], image: '/assets/novatek/figma-203fb8614a-723.png' },
]

function BlogGrid() {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12" id="blog-grid">
      <div className="mx-auto grid max-w-content gap-12">
        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {gridCards.map(({ post, image }, index) => (
            <BlogCard post={post} image={image} key={`${post.slug}-${index}`} />
          ))}
        </div>
        <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
          <p className="text-xl font-semibold leading-[1.45] text-white">1 / 2</p>
          <a
            className="inline-flex items-center gap-4 border border-white/20 bg-novatek-bg py-2 pl-4 pr-2 text-base font-medium text-white"
            href="#blog-grid"
          >
            <span>Next</span>
            <span className="grid size-10 place-items-center bg-white text-novatek-bg" aria-hidden="true">
              <ArrowGlyph className="h-3 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
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
        filters={categories}
        filtersHref="#blog-grid"
        filtersLabel="Blog categories"
        gridLines
      />
      <BlogGrid />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
