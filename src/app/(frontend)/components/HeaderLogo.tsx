type HeaderLogoProps = {
  name: string
}

export function HeaderLogo({ name }: HeaderLogoProps) {
  return (
    <a className="inline-flex w-[181px] shrink-0 items-center max-md:w-[138px]" href="/" aria-label={name}>
      <img
        alt={name}
        className="h-[42px] w-auto max-md:h-8"
        height={42}
        src="/assets/novatek/logo-novatek.svg"
        width={181}
      />
    </a>
  )
}
