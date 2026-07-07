import { HighlightedTitle } from '../../components/SectionHeading'
import type { aboutData } from '../data'

type TechPartnersSectionProps = typeof aboutData.techPartners

export function TechPartnersSection({ partners, title, eyebrow }: TechPartnersSectionProps) {
  return (
    <section className="bg-novatek-bg py-[74px]">
      <div className="mx-auto mb-12 flex max-w-content flex-col items-center gap-4 px-[clamp(20px,5.1vw,74px)] text-center">
        <p className="text-lg font-semibold text-white">// {eyebrow} //</p>
        <h2 className="max-w-[681px] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.25] text-white [&_span]:text-novatek-primary">
          <HighlightedTitle {...title} />
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {partners.map((partner) => (
          <div className="grid h-[155px] w-[400px] max-w-full place-items-center bg-novatek-soft" key={partner.name}>
            <img className="max-h-[60px] max-w-[200px] object-contain" src={partner.image} alt={partner.name} />
          </div>
        ))}
      </div>
    </section>
  )
}
