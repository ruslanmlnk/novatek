type BrandLogoProps = {
  name: string
  tagline: string
  compactOnMobile?: boolean
}

export function BrandLogo({ compactOnMobile = true, name, tagline }: BrandLogoProps) {
  const iconClassName = compactOnMobile
    ? 'size-[42px] shrink-0 max-md:size-8'
    : 'size-[42px] shrink-0'
  const textClassName = compactOnMobile
    ? 'grid gap-[6px] leading-none max-md:gap-[5px]'
    : 'grid gap-[6px] leading-none'
  const nameClassName = compactOnMobile
    ? 'text-[24px] font-medium leading-none tracking-normal text-white max-md:text-lg'
    : 'text-[24px] font-medium leading-none tracking-normal text-white'
  const taglineClassName = compactOnMobile
    ? 'text-[9px] font-medium uppercase leading-none tracking-[0.28em] text-white max-md:text-[7px]'
    : 'text-[9px] font-medium uppercase leading-none tracking-[0.28em] text-white'

  return (
    <a className="inline-flex w-[180px] items-center gap-[13px]" href="/" aria-label={name}>
      <svg
        className={iconClassName}
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 4.97534V36.9043L36.9018 41.9948L30.7934 42L6.54811 16.6033V27.6285L10.097 31.4253V42H4.97782L0 37.0247V5.09043L5.09821 0H11.2066L35.4519 25.3915V13.843L31.903 10.225V0H37.0222L42 4.97534Z"
          fill="white"
        />
      </svg>
      <span className={textClassName}>
        <strong className={nameClassName}>{name}</strong>
        <small className={taglineClassName}>{tagline}</small>
      </span>
    </a>
  )
}
