import { ArrowButton } from '../../components/ArrowButton'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { siteData } from '../../data'

export const metadata = {
  title: 'Custom Metal Components - Novatek Engineering',
  description:
    'A Novatek Engineering case study for precision-cut steel components manufactured for industrial applications.',
}

const caseStudy = {
  category: 'Laser cutting',
  title: 'Custom metal components',
  description: 'Precision-cut steel components manufactured for industrial applications',
  heroImage:
    '/assets/novatek/figma-5107c2d1a7-2024.png',
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
}

const relatedProjects = [
  {
    category: 'Laser cutting',
    title: 'Custom metal components',
    description: 'Precision-cut steel components manufactured for industrial applications',
    image:
      '/assets/novatek/figma-bd8c47baa0-560.png',
  },
  {
    category: 'Engineering & Design',
    title: 'Product development solutions',
    description: 'Custom engineering design and CAD development for manufacturing projects',
    image:
      '/assets/novatek/figma-3c3206f498-560.png',
  },
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

function CaseHero() {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
      <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
      <SiteHeader activeHref="/portfolio" brand={siteData.brand} nav={siteData.nav} />
      <div className="relative mx-auto flex max-w-content flex-col items-center pb-12 pt-12 text-center">
        <p className="mb-4 text-lg font-medium leading-[1.45] text-white">
          // {caseStudy.category} //
        </p>
        <h1 className="max-w-[742px] text-[clamp(40px,5vw,48px)] font-semibold leading-[1.25] text-white">
          {caseStudy.title}
        </h1>
        <p className="mt-4 max-w-[742px] text-lg font-medium leading-[1.45] text-novatek-muted">
          {caseStudy.description}
        </p>
      </div>
      <div className="relative -mx-[clamp(20px,5.1vw,74px)] h-[396px] translate-y-9">
        <GridLines height={396} />
      </div>
    </section>
  )
}

function TextBlock({ body, title }: { body: string; title: string }) {
  return (
    <section className="grid gap-4">
      <h2 className="text-[26px] font-semibold leading-[1.45] text-white">{title}</h2>
      <p className="text-lg font-medium leading-[1.45] text-novatek-muted">{body}</p>
    </section>
  )
}

function CaseContent() {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-[42px]">
      <div className="mx-auto grid max-w-content justify-items-center gap-12">
        <img
          className="h-auto max-h-[506px] w-full max-w-[1012px] object-cover"
          src={caseStudy.heroImage}
          alt=""
        />
        <div className="grid w-full max-w-[1012px] gap-8 px-[clamp(0px,9.7vw,140px)]">
          <div className="grid gap-6">
            <TextBlock body={caseStudy.overview} title="Project Overview:" />
            <TextBlock body={caseStudy.approach} title="Approach:" />
          </div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
            {caseStudy.gallery.map((image) => (
              <img className="h-[316px] w-full object-cover" src={image} alt="" key={image} />
            ))}
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                Technical Specifications:
              </p>
              <ul className="grid gap-4 text-lg font-medium leading-[1.45] text-novatek-muted">
                {caseStudy.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>
            <TextBlock body={caseStudy.results} title="Results:" />
          </div>
        </div>
      </div>
    </section>
  )
}

function RelatedCard({ project }: { project: (typeof relatedProjects)[number] }) {
  return (
    <a
      className="grid min-h-[229px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
      href="/portfolio/custom-metal-components"
    >
      <div className="flex flex-col justify-between gap-10 p-8 text-novatek-bg">
        <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
          // {project.category} //
        </p>
        <div className="grid gap-[11px]">
          <h3 className="text-[26px] font-semibold leading-[1.45] text-novatek-bg">
            {project.title}
          </h3>
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

function RelatedProjects() {
  return (
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
          {relatedProjects.map((project) => (
            <RelatedCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CasePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <CaseHero />
      <CaseContent />
      <RelatedProjects />
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
