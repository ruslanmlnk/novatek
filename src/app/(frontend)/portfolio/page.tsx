import { getPortfolioProjects, getSiteData, type PortfolioItem } from '../cms'
import { ArrowGlyph } from '../components/IconSet'
import { PageHero } from '../components/PageHero'
import { SiteFooter } from '../components/sections/SiteFooter'

export const metadata = {
  title: 'Portfolio - Novatek Engineering',
  description:
    'Explore Novatek Engineering case studies across laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
}

const filters = [
  'All',
  'Laser Cutting',
  'CNC Machining',
  '3D Scanning',
  '3D Printing',
  'Engineering & Design',
  'Custom Solutions',
]

function ProjectCard({ project }: { project: PortfolioItem }) {
  return (
    <a
      className="grid min-h-[229px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
      href={`/portfolio/${project.slug}`}
    >
      <div className="flex flex-col justify-between gap-10 p-8 text-novatek-bg max-md:order-2 max-md:gap-8 max-md:p-6">
        <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
          // {project.category} //
        </p>
        <div className="grid gap-[11px]">
          <h2 className="text-[26px] font-semibold leading-[1.45] text-novatek-bg">
            {project.title}
          </h2>
          <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
            {project.description}
          </p>
        </div>
      </div>
      <img
        className="h-full min-h-[229px] w-full object-cover max-md:order-1 max-md:min-h-0 max-md:h-[245px]"
        src={project.image}
        alt=""
      />
    </a>
  )
}

function PortfolioGrid({ projects }: { projects: PortfolioItem[] }) {
  const rowCount = Math.ceil(projects.length / 2)

  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12"
      id="portfolio-grid"
    >
      <div className="mx-auto grid max-w-content gap-12 max-md:gap-8">
        <div className="grid gap-8 max-md:gap-6">
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-md:gap-6" key={rowIndex}>
              {projects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, index) => (
                <ProjectCard project={project} key={`${project.title}-${rowIndex}-${index}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
          <p className="text-xl font-semibold leading-[1.45] text-white">1 / 2</p>
          <a
            className="inline-flex items-center gap-4 border border-white/20 bg-novatek-bg py-2 pl-4 pr-2 text-base font-medium text-white"
            href="#portfolio-grid"
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

export default async function PortfolioPage() {
  const [siteData, projects] = await Promise.all([getSiteData(), getPortfolioProjects()])

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
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
        filters={filters}
        filtersHref="#portfolio-grid"
        filtersLabel="Portfolio filters"
        contentClassName="pb-[74px] pt-[42px]"
      />
      <PortfolioGrid projects={projects} />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
