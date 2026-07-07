import { ArrowGlyph } from './IconSet'

type NavArrowsProps = {
  prevLabel: string
  nextLabel: string
}

export function NavArrows({ nextLabel, prevLabel }: NavArrowsProps) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        aria-label={prevLabel}
        className="grid size-10 place-items-center border border-white/20 bg-white/[0.06] text-white"
        type="button"
      >
        <ArrowGlyph className="rotate-180" />
      </button>
      <button
        aria-label={nextLabel}
        className="grid size-10 place-items-center border border-white/20 bg-white/[0.06] text-white"
        type="button"
      >
        <ArrowGlyph />
      </button>
    </div>
  )
}
