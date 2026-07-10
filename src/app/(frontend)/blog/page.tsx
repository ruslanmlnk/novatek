import { getBlogPosts, getSiteData, type BlogPost } from '../cms'
import { BlogCard } from '../components/BlogCard'
import { ArrowGlyph } from '../components/IconSet'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export const metadata = {
  title: 'Blog - Novatek Engineering',
  description:
    'Engineering insights, manufacturing guides and industry news from Novatek Engineering.',
}

const categories = ['All', 'Manufacturing Guides', 'Engineering Insights', 'Industry News']

type Posts = BlogPost[]

const altImages: Record<string, string[]> = {
  'laser-cutting-tips': ['/assets/novatek/figma-203fb8614a-723.png'],
  'reverse-engineering': ['/assets/novatek/figma-0b3a9a9f59-723.png'],
  'manufacturing-trends': [
    '/assets/novatek/figma-d874ddc716-723.png',
    '/assets/novatek/figma-0a202eb44c-723.png',
  ],
}

function cardImage(post: Posts[number], variant: number): string | undefined {
  if (variant === 0) return undefined
  const variants = altImages[post.slug] ?? []
  return variants[Math.min(variant, variants.length) - 1]
}

function buildGridCards(posts: Posts) {
  if (posts.length !== 3) return posts.map((post) => ({ post, image: undefined }))

  const pattern: [number, number][] = [
    [0, 0], [1, 0], [2, 0],
    [2, 1], [0, 1], [1, 0],
    [1, 1], [2, 2], [0, 1],
  ]

  return pattern.map(([postIndex, variant]) => ({
    post: posts[postIndex],
    image: cardImage(posts[postIndex], variant),
  }))
}

function BlogGrid({ posts }: { posts: Posts }) {
  const gridCards = buildGridCards(posts)
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

export const revalidate = 60

export default async function BlogPage() {
  const [siteData, posts] = await Promise.all([getSiteData(), getBlogPosts()])

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
      <BlogGrid posts={posts} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
