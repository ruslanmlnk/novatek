import type { ButtonData } from '../data'
import { ArrowGlyph } from './IconSet'

type ArrowButtonProps = ButtonData & {
  variant?: 'primary' | 'ghost' | 'onPrimary'
}

export function ArrowButton({ href, label, variant = 'primary' }: ArrowButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'border-transparent bg-novatek-primary hover:bg-novatek-primaryHover active:bg-novatek-primaryActive'
      : variant === 'onPrimary'
        ? 'border-white/20 bg-novatek-bg hover:bg-novatek-bgHover active:bg-novatek-bgActive'
        : 'border-white/20 bg-white/[0.06]'
  const iconBgClass = variant === 'onPrimary' ? 'bg-white' : 'bg-novatek-bg'
  const iconColorClass = variant === 'onPrimary' ? 'text-novatek-bg' : 'text-white'

  return (
    <a
      className={`group inline-flex min-h-14 w-fit items-center gap-4 whitespace-nowrap border py-2 pl-4 pr-2 text-base font-semibold text-white transition-colors duration-300 max-md:w-full max-md:justify-between max-md:font-medium ${variantClass}`}
      href={href}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span
          className="absolute inset-0 block translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
      <span
        className={`grid size-10 place-items-center overflow-hidden ${iconBgClass}`}
        aria-hidden="true"
      >
        <ArrowGlyph
          className={`col-start-1 row-start-1 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-[30px] ${iconColorClass}`}
        />
        <ArrowGlyph
          className={`col-start-1 row-start-1 -translate-x-[30px] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 ${iconColorClass}`}
        />
      </span>
    </a>
  )
}
