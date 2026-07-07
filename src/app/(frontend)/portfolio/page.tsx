import { ArrowButton } from '../components/ArrowButton'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { portfolioProjects } from '../content'
import { siteData } from '../data'

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

function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/portfolio" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative -mx-[clamp(20px,5.1vw,74px)] h-[396px]">
        <GridLines height={396} />
      </div>
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-8 pb-[74px] pt-[42px] text-center">
        <div className="grid justify-items-center gap-4">
          <p className="text-lg font-medium leading-[1.45] text-white">// Portfolio //</p>
          <h1 className="max-w-[742px] text-[clamp(42px,5vw,48px)] font-semibold leading-[1.25] text-white">
            Our <span className="text-novatek-primary">Case</span>{' '}
            <span className="text-novatek-primary">studies</span>
          </h1>
        </div>
        <nav
          className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg font-medium leading-[1.45] text-white max-md:justify-start max-md:text-base"
          aria-label="Portfolio filters"
        >
          {filters.map((filter, index) => (
            <a className="inline-flex items-center gap-4" href="#portfolio-grid" key={filter}>
              <span className="text-white/20">/</span>
              <span
                className={
                  index === 0 ? 'border-b border-novatek-primary text-novatek-primary' : undefined
                }
              >
                {filter}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof portfolioProjects)[number] }) {
  return (
    <a
      className="grid min-h-[229px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
      href={`/portfolio/${project.slug}`}
    >
      <div className="flex flex-col justify-between gap-10 p-8 text-novatek-bg">
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
        className="h-full min-h-[229px] w-full object-cover max-md:min-h-[260px]"
        src={project.image}
        alt=""
      />
    </a>
  )
}

function PortfolioGrid() {
  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12"
      id="portfolio-grid"
    >
      <div className="mx-auto grid max-w-content gap-12">
        <div className="grid gap-8">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1" key={rowIndex}>
              {portfolioProjects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, index) => (
                <ProjectCard project={project} key={`${project.title}-${rowIndex}-${index}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
          <p className="text-xl font-semibold leading-[1.45] text-white">1 / 2</p>
          <ArrowButton href="#portfolio-grid" label="Next" variant="ghost" />
        </div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PortfolioHero />
      <PortfolioGrid />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
