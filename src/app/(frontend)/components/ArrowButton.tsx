import type { ButtonData } from '../data'
import { ArrowGlyph } from './IconSet'

type ArrowButtonProps = ButtonData & {
  variant?: 'primary' | 'ghost' | 'onPrimary'
}

export function ArrowButton({ href, label, variant = 'primary' }: ArrowButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'border-transparent bg-novatek-primary'
      : variant === 'onPrimary'
        ? 'border-white/20 bg-novatek-bg'
        : 'border-white/20 bg-white/[0.06]'
  const iconBgClass = variant === 'onPrimary' ? 'bg-white' : 'bg-novatek-bg'

  return (
    <a
      className={`inline-flex min-h-14 w-fit items-center gap-4 whitespace-nowrap border py-2 pl-4 pr-2 text-base font-semibold text-white max-md:min-h-[83px] max-md:w-full max-md:justify-between max-md:text-lg ${variantClass}`}
      href={href}
    >
      <span>{label}</span>
      <span className={`grid size-10 place-items-center ${iconBgClass}`} aria-hidden="true">
        <ArrowGlyph className={variant === 'onPrimary' ? 'text-novatek-bg' : 'text-white'} />
      </span>
    </a>
  )
}
