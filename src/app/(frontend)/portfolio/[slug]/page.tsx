import { notFound } from 'next/navigation'

import { ArrowButton } from '../../components/ArrowButton'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { portfolioProjects } from '../../content'
import { siteData } from '../../data'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = portfolioProjects.find((item) => item.slug === slug)

  return {
    description: project?.description ?? 'Novatek Engineering case study.',
    title: project ? `${project.title} - Novatek Engineering` : 'Case Study - Novatek Engineering',
  }
}

export default async function PortfolioCasePage({ params }: PageProps) {
  const { slug } = await params
  const project = portfolioProjects.find((item) => item.slug === slug)

  if (!project) notFound()

  const related = portfolioProjects.filter((item) => item.slug !== project.slug).slice(0, 2)

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
        <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
        <SiteHeader activeHref="/portfolio" brand={siteData.brand} nav={siteData.nav} />
        <div className="relative mx-auto grid max-w-content gap-10 pb-[74px] pt-12 text-center">
          <div className="mx-auto grid max-w-[742px] gap-4">
            <p className="text-lg font-medium leading-[1.45] text-white">
              // {project.category} //
            </p>
            <h1 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.05] text-white">
              {project.title}
            </h1>
            <p className="text-xl font-medium leading-[1.45] text-novatek-muted max-md:text-lg">
              {project.description}
            </p>
          </div>
          <img
            className="mx-auto h-[clamp(280px,42vw,506px)] w-full max-w-[1012px] object-cover"
            src={project.image}
            alt=""
          />
        </div>
      </section>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-[1012px] gap-12">
          <div className="grid gap-8 px-[clamp(0px,8vw,120px)]">
            <article className="grid gap-4">
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">
                Project Overview:
              </h2>
              <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                This project combined Novatek Engineering&apos;s manufacturing review, production
                planning and quality-focused delivery for a practical industrial application.
              </p>
            </article>
            <article className="grid gap-4">
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">Approach:</h2>
              <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                The team reviewed project files, confirmed technical requirements and selected the
                process path that best matched the target geometry, material and timeline.
              </p>
            </article>
          </div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
            {[project.image, ...related.map((item) => item.image)].map((image) => (
              <img className="h-[316px] w-full object-cover" src={image} alt="" key={image} />
            ))}
          </div>
          <div className="grid gap-4 px-[clamp(0px,8vw,120px)]">
            <h2 className="text-[26px] font-semibold leading-[1.45] text-white">Results:</h2>
            <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
              The completed work delivered reliable production quality, clear communication and a
              repeatable process that can be scaled or adapted for similar manufacturing needs.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-content gap-10">
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
            <h2 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.12] text-white">
              More <span className="text-novatek-primary">case studies</span>
            </h2>
            <ArrowButton href="/portfolio" label="View All Cases" />
          </div>
          <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1">
            {related.map((item) => (
              <a
                className="grid min-h-[229px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
                href={`/portfolio/${item.slug}`}
                key={item.slug}
              >
                <div className="flex flex-col justify-between gap-10 p-8 text-novatek-bg">
                  <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
                    // {item.category} //
                  </p>
                  <div className="grid gap-[11px]">
                    <h3 className="text-[26px] font-semibold leading-[1.45]">{item.title}</h3>
                    <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
                <img className="h-full min-h-[229px] w-full object-cover" src={item.image} alt="" />
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
