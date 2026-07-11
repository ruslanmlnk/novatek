import { dictionary, type Locale } from '@/lib/i18n'
import type { ServiceDetail } from '@/lib/queries/services'
import { GridLines } from '../GridLines'

export function ServiceIndustries({ locale = 'en', service }: { locale?: Locale; service: ServiceDetail }) {
  const dict = dictionary[locale]
  if (!service.industries.length) return null

  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px]">
      <GridLines height={600} />
      <div className="relative z-10 mx-auto grid max-w-content gap-[82px] max-md:gap-12">
        <div
          className="flex items-start justify-between gap-8 max-lg:flex-col max-lg:gap-4"
          data-reveal
        >
          <p className="shrink-0 text-lg font-medium leading-[1.45] text-white">
            // {dict.pages.service.applicationsEyebrow} //
          </p>
          <h2 className="max-w-[640px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.25] text-white">
            <span className="text-novatek-primary">{service.title}</span>
            {dict.pages.service.industriesTitleAfter}
          </h2>
        </div>
        <div className="grid gap-6" data-reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,644px)] gap-8 border-b border-white/20 pb-6 text-lg font-medium leading-[1.45] text-white max-md:grid-cols-1">
            <p>{dict.pages.service.industryColumn}</p>
            <p className="max-md:hidden">{dict.pages.service.applicationsColumn}</p>
          </div>
          {service.industries.map((row) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,644px)] gap-8 border-b border-white/20 pb-6 text-lg font-medium leading-[1.45] text-novatek-muted max-md:grid-cols-1 max-md:gap-4"
              key={row.industry}
            >
              <p className="text-white md:text-novatek-muted">{row.industry}</p>
              <ul className="grid gap-4">
                {row.applications.map((application) => (
                  <li
                    className="relative pl-[15px] before:absolute before:left-0 before:top-[0.72em] before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-novatek-muted"
                    key={application}
                  >
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
