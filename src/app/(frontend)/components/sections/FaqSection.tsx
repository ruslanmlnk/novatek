import type { siteData } from '../../data'
import { PlusGlyph } from '../IconSet'
import { HighlightedTitle } from '../SectionHeading'

type FaqSectionProps = typeof siteData.faq

export function FaqSection({ eyebrow, items, title }: FaqSectionProps) {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[clamp(72px,10vw,140px)] max-md:px-6">
      <div className="mx-auto mb-12 max-w-content text-center">
        <p className="mb-4 text-lg font-medium leading-[26px] text-white">// {eyebrow} //</p>
        <h2 className="mx-auto max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[34px] max-md:leading-10 [&_span]:text-novatek-primary">
          <HighlightedTitle {...title} />
        </h2>
      </div>
      <div className="mx-auto grid max-w-content grid-cols-2 grid-rows-3 grid-flow-col gap-x-8 max-md:grid-cols-1 max-md:grid-rows-none max-md:grid-flow-row">
        {items.map((item, index) => (
          <details
            className="group border-b border-white/10 py-7"
            key={item.question}
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                className="grid size-[30px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-novatek-primaryLight to-novatek-primary text-novatek-bg transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <PlusGlyph />
              </span>
            </summary>
            <p className="mt-4 pr-[52px] text-lg font-medium text-novatek-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
