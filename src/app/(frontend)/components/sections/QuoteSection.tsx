import type { siteData } from '../../data'
import { ArrowButton } from '../ArrowButton'

type QuoteSectionProps = typeof siteData.quote

export function QuoteSection({ button, title }: QuoteSectionProps) {
  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-0 pt-[74px] max-md:px-6"
      id="quote"
    >
      <div
        className="relative mx-auto flex max-w-[990px] items-center justify-between gap-8 overflow-hidden border border-white/10 bg-novatek-bg px-[45px] py-9 max-md:flex-col max-md:items-stretch max-md:gap-6 max-md:p-6"
        data-reveal
      >
        <div
          className="pointer-events-none absolute -left-[180px] -top-[185px] size-[384px] rounded-full bg-novatek-primary opacity-70 blur-[150px] max-md:opacity-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-[180px] -right-[96px] size-[384px] rounded-full bg-novatek-primary opacity-70 blur-[150px] max-md:opacity-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-100 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-position:51px_-150px] [background-size:128px_452px]"
          aria-hidden="true"
        />
        <h2 className="relative max-w-[273px] shrink-0 text-[32px] font-semibold leading-10 text-white max-md:max-w-none max-md:text-center max-md:text-[26px] max-md:leading-[38px]">
          {title}
        </h2>
        <div className="relative w-full md:w-auto">
          <ArrowButton {...button} />
        </div>
      </div>
    </section>
  )
}
