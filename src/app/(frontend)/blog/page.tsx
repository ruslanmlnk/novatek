import { ArrowButton } from '../components/ArrowButton'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { blogPosts } from '../content'
import { siteData } from '../data'

export const metadata = {
  title: 'Blog - Novatek Engineering',
  description:
    'Engineering insights, manufacturing guides and industry news from Novatek Engineering.',
}

const categories = ['All', 'Manufacturing Guides', 'Engineering Insights', 'Industry News']

function GridLines({ height }: { height: number }) {
  return (
    <svg
      className="h-full w-full"
      viewBox={`0 0 1440 ${height}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {[74, 397, 720, 1043, 1366].map((x) => (
        <path d={`M${x} 0V${height}`} stroke="white" strokeOpacity="0.1" key={x} />
      ))}
    </svg>
  )
}

function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/blog" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-8 pb-12 pt-12 text-center">
        <div className="grid justify-items-center gap-4">
          <p className="text-lg font-medium leading-[1.45] text-white">// Blog //</p>
          <h1 className="max-w-[742px] text-[clamp(42px,5vw,48px)] font-semibold leading-[1.25] text-white">
            Engineering <span className="text-novatek-primary">insights</span>
          </h1>
        </div>
        <nav
          className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg font-medium leading-[1.45] text-white max-md:justify-start max-md:text-base"
          aria-label="Blog categories"
        >
          {categories.map((category, index) => (
            <a className="inline-flex items-center gap-4" href="#blog-grid" key={category}>
              <span className="text-white/20">/</span>
              <span
                className={
                  index === 0 ? 'border-b border-novatek-primary text-novatek-primary' : undefined
                }
              >
                {category}
              </span>
            </a>
          ))}
        </nav>
      </div>
      <div className="relative -mx-[clamp(20px,5.1vw,74px)] h-[396px] translate-y-5">
        <GridLines height={396} />
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <a className="grid gap-8 bg-novatek-soft p-6 text-novatek-bg transition-opacity hover:opacity-90" href={`/blog/${post.slug}`}>
      <img className="h-60 w-full object-cover" src={post.image} alt="" />
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
            // {post.category} //
          </p>
          <time className="shrink-0 text-sm font-medium leading-[1.25] text-novatek-muted">
            {post.date}
          </time>
        </div>
        <div className="grid gap-2">
          <h2 className="text-[26px] font-semibold leading-[1.45] text-novatek-bg">{post.title}</h2>
          <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
            {post.description}
          </p>
        </div>
      </div>
    </a>
  )
}

function BlogGrid() {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12" id="blog-grid">
      <div className="mx-auto grid max-w-content gap-12">
        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {blogPosts.map((post, index) => (
            <BlogCard post={post} key={`${post.title}-${post.image}-${index}`} />
          ))}
        </div>
        <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
          <p className="text-xl font-semibold leading-[1.45] text-white">1 / 2</p>
          <ArrowButton href="#blog-grid" label="Next" variant="ghost" />
        </div>
      </div>
    </section>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <BlogHero />
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
