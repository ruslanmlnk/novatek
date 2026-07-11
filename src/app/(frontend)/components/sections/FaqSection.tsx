import type { siteData } from '../../data'
import { FaqItem } from '../FaqItem'
import { revealDelay } from '../reveal'
import { HighlightedTitle } from '../SectionHeading'

type FaqSectionProps = typeof siteData.faq

export function FaqSection({ eyebrow, items, title }: FaqSectionProps) {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[clamp(72px,10vw,140px)] max-md:px-6">
      <div className="mx-auto mb-12 max-w-content text-center" data-reveal>
        <p className="mb-4 text-lg font-medium leading-[26px] text-white">// {eyebrow} //</p>
        <h2 className="mx-auto max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[32px] max-md:leading-[1.25] [&_span]:text-novatek-primary">
          <HighlightedTitle {...title} />
        </h2>
      </div>
      <div className="mx-auto grid max-w-content grid-cols-2 grid-rows-3 grid-flow-col gap-x-8 max-md:grid-cols-1 max-md:grid-rows-none max-md:grid-flow-row">
        {items.map((item, index) => (
          <FaqItem
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
            style={revealDelay(index, 80)}
            key={item.question}
          />
        ))}
      </div>
    </section>
  )
}
