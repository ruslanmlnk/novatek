import type { SiteData } from '@/lib/queries/site'
import { FaqItem } from '../FaqItem'
import { GridLines } from '../GridLines'
import { revealDelay } from '../reveal'
import { HighlightedTitle } from '../SectionHeading'

export function ServiceFaq({ faq }: { faq: SiteData['faq'] }) {
  const middle = Math.ceil(faq.items.length / 2)
  const columns = [faq.items.slice(0, middle), faq.items.slice(middle)]

  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px]">
      <GridLines height={700} />
      <div className="relative z-10 mx-auto grid max-w-content gap-12">
        <div className="grid justify-items-center gap-4 text-center" data-reveal>
          <p className="text-lg font-medium leading-[1.45] text-white">// {faq.eyebrow} //</p>
          <h2 className="max-w-[681px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.25] text-white [&_span]:text-novatek-primary">
            <HighlightedTitle {...faq.title} />
          </h2>
        </div>
        <div className="grid grid-cols-2 items-start gap-8 max-lg:grid-cols-1">
          {columns.map((items, columnIndex) => (
            <div className="grid gap-8" key={columnIndex}>
              {items.map((item, index) => (
                <FaqItem
                  question={item.question}
                  answer={item.answer}
                  defaultOpen={columnIndex === 0 && index === 0}
                  variant="box"
                  style={revealDelay(index, 80)}
                  key={item.question}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
