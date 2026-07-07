import type { siteData } from '../../data'
import { ArrowGlyph } from '../IconSet'
import { HighlightedTitle } from '../SectionHeading'

type ProjectsSectionProps = typeof siteData.projects

function ProjectButton({
  gap = 'gap-4',
  href,
  label,
  textClass = 'text-base',
}: {
  gap?: string
  href: string
  label: string
  textClass?: string
}) {
  return (
    <a
      className={`inline-flex min-h-14 w-fit items-center ${gap} whitespace-nowrap bg-novatek-primary py-2 pl-4 pr-2 font-medium leading-[23px] text-white transition-colors hover:bg-white hover:text-novatek-bg max-md:min-h-[83px] max-md:w-full max-md:justify-between max-md:text-lg`}
      href={href}
    >
      <span className={textClass}>{label}</span>
      <span
        className="grid size-10 shrink-0 place-items-center bg-novatek-bg text-white"
        aria-hidden="true"
      >
        <ArrowGlyph />
      </span>
    </a>
  )
}

export function ProjectsSection({ cta, eyebrow, featured, title }: ProjectsSectionProps) {
  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] max-md:px-6"
      id="portfolio"
    >
      <div className="mx-auto mb-12 flex max-w-content items-center justify-between gap-8 max-md:flex-col max-md:items-start">
        <div>
          <p className="mb-4 text-lg font-medium leading-[26px] text-white">// {eyebrow} //</p>
          <h2 className="max-w-[900px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:max-w-[681px] max-md:text-[34px] max-md:leading-10 [&_span]:text-novatek-primary">
            <HighlightedTitle {...title} />
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-3 max-md:hidden">
          <button
            aria-label="Previous project"
            className="grid size-10 place-items-center bg-novatek-primary text-white transition-colors hover:bg-white hover:text-novatek-bg"
            type="button"
          >
            <ArrowGlyph className="rotate-180" />
          </button>
          <button
            aria-label="Next project"
            className="grid size-10 place-items-center bg-novatek-primary text-white transition-colors hover:bg-white hover:text-novatek-bg"
            type="button"
          >
            <ArrowGlyph />
          </button>
        </div>
      </div>
      <article className="mx-auto mb-8 grid max-w-content grid-cols-2 items-stretch max-lg:grid-cols-1">
        <div className="flex min-h-[305px] flex-col justify-between bg-novatek-soft p-8 text-novatek-bg max-md:min-h-[383px] max-md:gap-16 max-md:p-7">
          <p className="text-lg font-medium leading-[26px] text-novatek-primary">
            // {featured.category} //
          </p>
          <div className="flex items-end gap-8 max-md:w-full max-md:flex-col max-md:items-start">
            <div className="grid flex-1 gap-2 max-md:w-full">
              <h3 className="text-[26px] font-semibold leading-[38px] text-novatek-bg">
                {featured.title}
              </h3>
              <p className="text-lg font-medium leading-[26px] text-novatek-muted">
                {featured.description}
              </p>
            </div>
            <div className="w-full md:w-auto">
              <ProjectButton
                gap="gap-6"
                href={featured.button.href}
                label={featured.button.label}
                textClass="text-lg"
              />
            </div>
          </div>
        </div>
        <img
          className="h-[305px] w-full object-cover max-lg:h-auto max-lg:min-h-[320px] max-md:h-[242px] max-md:min-h-0"
          src={featured.image}
          alt=""
        />
      </article>
      <aside className="mx-auto flex max-w-content items-center justify-between gap-8 border-t border-white/20 pt-8 max-md:flex-col max-md:items-start">
        <div>
          <h3 className="text-[26px] font-semibold leading-[38px] text-white">{cta.title}</h3>
          <p className="mt-2 text-lg font-medium leading-[26px] text-novatek-muted">
            {cta.description}
          </p>
        </div>
        <ProjectButton href={cta.button.href} label={cta.button.label} />
      </aside>
    </section>
  )
}
