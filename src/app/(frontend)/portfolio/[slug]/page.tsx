import { notFound } from 'next/navigation'

import { getProject, getProjects, type PortfolioProject } from '@/lib/queries/projects'
import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { ArrowButton } from '../../components/ArrowButton'
import { CmsRichText } from '../../components/CmsRichText'
import { PageHero } from '../../components/PageHero'
import { revealDelay } from '../../components/reveal'
import { SiteFooter } from '../../components/sections/SiteFooter'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  return buildMeta(project?.seo, {
    title: project ? `${project.title} - Novatek Engineering` : 'Case Study - Novatek Engineering',
    description: project?.description ?? 'Novatek Engineering case study.',
  })
}

function RelatedProjects({ projects }: { projects: PortfolioProject[] }) {
  if (!projects.length) return null

  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12">
      <div className="mx-auto grid max-w-content gap-12">
        <div className="grid gap-4" data-reveal>
          <p className="text-lg font-medium leading-[1.45] text-white">// Related Projects //</p>
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
            <h2 className="text-[clamp(40px,5vw,48px)] font-semibold leading-[1.25] text-white">
              More<span className="text-novatek-primary"> case studies</span>
            </h2>
            <ArrowButton href="/portfolio" label="View All Cases" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1">
          {projects.map((item, index) => (
            <a
              className="grid min-h-[372px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
              href={`/portfolio/${item.slug}`}
              key={item.slug}
              data-reveal
              style={revealDelay(index)}
            >
              <div className="flex flex-col justify-between gap-10 p-8 text-novatek-bg max-md:order-2 max-md:gap-8 max-md:p-6">
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
              <img
                className="h-full min-h-[372px] w-full object-cover max-md:order-1 max-md:h-[245px] max-md:min-h-0"
                src={item.image}
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function PortfolioCasePage({ params }: PageProps) {
  const { slug } = await params
  const [projects, siteData] = await Promise.all([getProjects(), getSiteData()])
  const project = projects.find((item) => item.slug === slug)

  if (!project) notFound()

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/portfolio"
        brand={siteData.brand}
        nav={siteData.nav}
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        gridLines
      />
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-[42px]">
        <div className="mx-auto grid max-w-content justify-items-center gap-12">
          <img
            className="aspect-[2/1] w-full max-w-[1012px] object-cover max-md:aspect-[3/2]"
            src={project.caseStudy.heroImage}
            alt=""
            data-reveal
          />
          {project.caseStudy.content && (
            <div className="grid w-full max-w-[1012px] gap-8" data-reveal>
              <CmsRichText data={project.caseStudy.content} />
            </div>
          )}
        </div>
      </section>
      <RelatedProjects projects={related} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
