import { notFound } from 'next/navigation'

import { ArrowButton } from '../../components/ArrowButton'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { blogPosts } from '../../content'
import { siteData } from '../../data'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  return {
    description: post?.description ?? 'Engineering insights from Novatek Engineering.',
    title: post ? `${post.title} - Novatek Engineering` : 'Article - Novatek Engineering',
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) notFound()

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
        <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
        <SiteHeader activeHref="/blog" brand={siteData.brand} nav={siteData.nav} />
        <div className="relative mx-auto grid max-w-content gap-10 pb-[74px] pt-12">
          <div className="mx-auto grid max-w-[820px] justify-items-center gap-4 text-center">
            <p className="text-lg font-medium leading-[1.45] text-white">// {post.category} //</p>
            <h1 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.05] text-white">
              {post.title}
            </h1>
            <p className="text-xl font-medium leading-[1.45] text-novatek-muted max-md:text-lg">
              {post.description}
            </p>
            <time className="text-base font-medium text-novatek-primary">{post.date}</time>
          </div>
          <img
            className="mx-auto h-[clamp(280px,42vw,506px)] w-full max-w-[1012px] object-cover"
            src={post.image}
            alt=""
          />
        </div>
      </section>
      <article className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-[812px] gap-6 text-lg font-medium leading-[1.65] text-novatek-muted">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-content gap-10">
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
            <h2 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.12] text-white">
              More <span className="text-novatek-primary">insights</span>
            </h2>
            <ArrowButton href="/blog" label="View Blog" />
          </div>
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {related.map((item) => (
              <a
                className="grid gap-8 bg-novatek-soft p-6 text-novatek-bg transition-opacity hover:opacity-90"
                href={`/blog/${item.slug}`}
                key={item.slug}
              >
                <img className="h-60 w-full object-cover" src={item.image} alt="" />
                <div className="grid gap-3">
                  <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
                    // {item.category} //
                  </p>
                  <h3 className="text-[26px] font-semibold leading-[1.35]">{item.title}</h3>
                  <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
