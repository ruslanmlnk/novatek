'use client'

import { useEffect, useState } from 'react'

import { localizeHref, type Locale } from '@/lib/i18n'
import { useCategoryFilter } from './CategoryFilter'
import { ArrowGlyph } from './IconSet'

export type PortfolioCardData = {
  slug: string
  category: string
  title: string
  description: string
  image: string
}

const PAGE_SIZE = 6

function ProjectCard({ locale, project }: { locale: Locale; project: PortfolioCardData }) {
  return (
    <a
      className="grid h-full min-h-[229px] grid-cols-[minmax(0,1fr)_280px] bg-novatek-soft transition-opacity hover:opacity-90 max-md:grid-cols-1"
      href={localizeHref(`/portfolio/${project.slug}`, locale)}
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

export function PortfolioGrid({
  locale = 'en',
  nextLabel = 'Next',
  projects,
}: {
  locale?: Locale
  nextLabel?: string
  projects: PortfolioCardData[]
}) {
  const { category } = useCategoryFilter()
  const [page, setPage] = useState(0)

  useEffect(() => setPage(0), [category])

  const filteredProjects =
    category === 'All' ? projects : projects.filter((project) => project.category === category)
  const pageCount = Math.max(Math.ceil(filteredProjects.length / PAGE_SIZE), 1)
  const visibleProjects = filteredProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const rowCount = Math.ceil(visibleProjects.length / 2)

  const goToNextPage = () => {
    setPage((current) => (current + 1) % pageCount)
    document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12"
      id="portfolio-grid"
    >
      <div className="mx-auto grid max-w-content gap-12 max-md:gap-8">
        <div className="grid gap-8 max-md:gap-6" data-reveal>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-md:gap-6" key={rowIndex}>
              {visibleProjects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project) => (
                <ProjectCard locale={locale} project={project} key={project.slug} />
              ))}
            </div>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
            <p className="text-xl font-semibold leading-[1.45] text-white">
              {page + 1} / {pageCount}
            </p>
            <button
              className="inline-flex items-center gap-4 border border-white/20 bg-novatek-bg py-2 pl-4 pr-2 text-base font-medium text-white"
              onClick={goToNextPage}
              type="button"
            >
              <span>{nextLabel}</span>
              <span
                className="grid size-10 place-items-center bg-white text-novatek-bg"
                aria-hidden="true"
              >
                <ArrowGlyph className="h-3 w-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
