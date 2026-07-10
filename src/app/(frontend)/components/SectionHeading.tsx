import type { HighlightedText, SectionHeadingData } from '../data'
import { ArrowButton } from './ArrowButton'

type SectionHeadingProps = SectionHeadingData & {
  align?: 'left' | 'split'
}

export function HighlightedTitle({ before, accent, after }: HighlightedText) {
  return (
    <>
      {before}
      <span>{accent}</span>
      {after}
    </>
  )
}

export function SectionHeading({ align = 'split', button, eyebrow, title }: SectionHeadingProps) {
  const wrapperClass =
    align === 'split'
      ? 'mx-auto mb-12 flex max-w-content items-center justify-between gap-8 max-md:mb-8 max-md:flex-col max-md:items-center'
      : 'mx-auto mb-12 block max-w-content max-md:mb-8'

  return (
    <div className={wrapperClass} data-reveal>
      <div className="max-md:text-center">
        <p className="mb-4 text-lg font-medium leading-[1.45] text-white">// {eyebrow} //</p>
        <h2 className="max-w-[760px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[32px] max-md:leading-[1.25] [&_span]:text-novatek-primary">
          <HighlightedTitle {...title} />
        </h2>
      </div>
      {button && (
        <div className="max-md:hidden">
          <ArrowButton {...button} />
        </div>
      )}
    </div>
  )
}
