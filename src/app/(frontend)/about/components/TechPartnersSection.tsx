import { GridLines } from '../../components/GridLines'
import { HighlightedTitle } from '../../components/SectionHeading'
import type { aboutData } from '../data'

type TechPartnersSectionProps = typeof aboutData.techPartners

export function TechPartnersSection({ partners, title, eyebrow }: TechPartnersSectionProps) {
  return (
    <section className="relative overflow-hidden bg-novatek-bg py-[74px]">
      <GridLines height={400} />
      <div
        className="relative z-10 mx-auto mb-12 flex max-w-content flex-col items-center gap-4 px-[clamp(20px,5.1vw,74px)] text-center"
        data-reveal
      >
        <p className="text-lg font-semibold text-white">// {eyebrow} //</p>
        <h2 className="max-w-[681px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.25] text-white [&_span]:text-novatek-primary">
          <HighlightedTitle {...title} />
        </h2>
      </div>
      <div className="relative z-10 overflow-hidden">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              className="flex gap-8 pr-8 max-md:gap-6 max-md:pr-6"
              aria-hidden={copy === 1}
              key={copy}
            >
              {partners.map((partner) => (
                <div
                  className="grid h-[155px] w-[400px] shrink-0 place-items-center bg-novatek-soft max-md:h-[120px] max-md:w-[280px]"
                  key={partner.name}
                >
                  <img
                    className="max-h-[60px] max-w-[200px] object-contain"
                    src={partner.image}
                    alt={partner.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
