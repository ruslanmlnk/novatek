import { notFound } from 'next/navigation'

import { caseContent } from '@/lexical'
import { getPortfolioProjects, getSiteData, type PortfolioItem } from '../../cms'
import { ArrowButton } from '../../components/ArrowButton'
import { CmsRichText } from '../../components/CmsRichText'
import { PageHero } from '../../components/PageHero'
import { SiteFooter } from '../../components/sections/SiteFooter'

type PageProps = {
  params: Promise<{ slug: string }>
}

type CaseDetails = {
  approach: string
  gallery: string[]
  heroImage: string
  overview: string
  results: string
  specs: string[]
}

const caseDetailsMap: Record<string, Partial<CaseDetails>> = {
  'custom-metal-components': {
    heroImage: '/assets/novatek/figma-5107c2d1a7-2024.png',
    gallery: [
      '/assets/novatek/figma-62c65108ad-632.png',
      '/assets/novatek/figma-10f924eaeb-632.png',
      '/assets/novatek/figma-02ed1d64bc-632.png',
    ],
    overview:
      'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications. Using CNC-controlled equipment, we produce complex parts with clean edges, tight tolerances and consistent quality across every production run.',
    approach:
      'The project involved producing a range of custom steel components using CNC laser cutting technology. Special attention was given to dimensional accuracy, material utilization and edge quality to ensure every part met production requirements. By optimizing cutting parameters and workflow efficiency, we achieved consistent results across all manufactured components.',
    specs: [
      'Machine components',
      'Equipment parts',
      'Mounting brackets',
      'Structural metal elements',
    ],
    results:
      'The completed components were delivered with high dimensional accuracy, clean edge quality and consistent repeatability across the production run. The project demonstrated the efficiency of CNC laser cutting for manufacturing durable industrial parts while maintaining fast turnaround times and reliable production standards.',
  },
}

function getCaseDetails(project: PortfolioItem, related: PortfolioItem[]) {
  const structured: CaseDetails = {
    heroImage: project.image,
    gallery: [project.image, ...related.map((item) => item.image)].slice(0, 3),
    overview:
      "This project combined Novatek Engineering's manufacturing review, production planning and quality-focused delivery for a practical industrial application.",
    approach:
      'The team reviewed project files, confirmed technical requirements and selected the process path that best matched the target geometry, material and timeline.',
    specs: ['Machine components', 'Equipment parts', 'Mounting brackets', 'Structural metal elements'],
    results:
      'The completed work delivered reliable production quality, clear communication and a repeatable process that can be scaled or adapted for similar manufacturing needs.',
    ...caseDetailsMap[project.slug],
  }

  return {
    heroImage: project.caseStudy?.heroImage ?? structured.heroImage,
    content: project.caseStudy?.content ?? caseContent(structured),
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getPortfolioProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const projects = await getPortfolioProjects()
  const project = projects.find((item) => item.slug === slug)

  return {
    description: project?.description ?? 'Novatek Engineering case study.',
    title: project ? `${project.title} - Novatek Engineering` : 'Case Study - Novatek Engineering',
  }
}

export default async function PortfolioCasePage({ params }: PageProps) {
  const { slug } = await params
  const [projects, siteData] = await Promise.all([getPortfolioProjects(), getSiteData()])
  const project = projects.find((item) => item.slug === slug)

  if (!project) notFound()

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)
  const details = getCaseDetails(project, related)

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
            src={details.heroImage}
            alt=""
          />
          <div className="grid w-full max-w-[1012px] gap-8">
            <CmsRichText data={details.content} />
          </div>
        </div>
      </section>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12">
        <div className="mx-auto grid max-w-content gap-12">
          <div className="grid gap-4">
            <p className="text-lg font-medium leading-[1.45] text-white">// Related Projects //</p>
            <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
              <h2 className="text-[clamp(40px,5vw,48px)] font-semibold leading-[1.25] text-white">
                More<span className="text-novatek-primary"> case studies</span>
              </h2>
              <ArrowButton href="/portfolio" label="View All Cases" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1">
            {related.map((item) => (
              <a
                className="grid min-h-[372px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
                href={`/portfolio/${item.slug}`}
                key={item.slug}
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
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
