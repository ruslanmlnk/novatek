import { dictionary, type Locale } from '@/lib/i18n'
import type { ServiceDetail } from '@/lib/queries/services'
import { GridLines } from '../GridLines'
import { revealDelay } from '../reveal'
import { FeatureGlyph } from './FeatureGlyph'

export function ServiceOverview({ locale = 'en', service }: { locale?: Locale; service: ServiceDetail }) {
  const dict = dictionary[locale]
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
      <div className="mx-auto grid max-w-content gap-[82px] max-md:gap-12">
        <div className="relative overflow-hidden">
          <GridLines height={300} />
          <div className="relative z-10 mx-auto grid w-full max-w-[630px] gap-6" data-reveal>
            <div className="grid gap-4">
              <p className="text-lg font-medium leading-[1.45] text-white">// {dict.pages.service.overviewEyebrow} //</p>
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">
                {service.overviewHeading}
              </h2>
            </div>
            <p className="whitespace-pre-line text-lg font-medium leading-[1.45] text-novatek-muted">
              {service.overview}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {service.cards.map((card, index) => (
            <article
              className="grid content-start gap-4 bg-novatek-soft p-8"
              data-reveal
              style={revealDelay(index)}
              key={card.title}
            >
              <span className="grid size-10 place-items-center bg-novatek-bg" aria-hidden="true">
                <FeatureGlyph index={index} />
              </span>
              <div className="grid gap-2">
                <h3 className="text-xl font-semibold leading-[1.45] text-novatek-bg">
                  {card.title}
                </h3>
                <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
