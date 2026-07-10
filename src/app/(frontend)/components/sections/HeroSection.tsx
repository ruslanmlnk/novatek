import type { CSSProperties } from 'react'
import type { ButtonData, HighlightedText, NavItem } from '../../data'
import { ArrowButton } from '../ArrowButton'
import { GridLines } from '../GridLines'
import { NovatekWordmark } from '../NovatekWordmark'
import { HighlightedTitle } from '../SectionHeading'
import { SiteHeader } from '../SiteHeader'

type HeroSectionProps = {
  brand: {
    name: string
    tagline: string
  }
  nav: NavItem[]
  hero: {
    backgroundImage: string
    eyebrow: string
    title: HighlightedText
    description: string
    buttons: ButtonData[]
  }
}

export function HeroSection({ brand, hero, nav }: HeroSectionProps) {
  return (
    <section
      className="relative flex min-h-[801px] flex-col items-center gap-8 overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] max-md:min-h-[659px] max-md:px-6 max-md:pb-0"
      style={
        {
          backgroundImage: `linear-gradient(0deg, rgba(21, 21, 21, 0.72), rgba(21, 21, 21, 0.72)), url(${hero.backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        } as CSSProperties
      }
    >
      <GridLines height={801} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[223px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_100%)]"
        aria-hidden="true"
      />
      <SiteHeader brand={brand} nav={nav} />
      <div className="relative z-10 mx-auto flex min-h-[575px] w-full max-w-[1295px] shrink-0 flex-col items-end gap-[140px] max-md:min-h-[531px] max-md:items-start max-md:justify-end max-md:gap-[82px]">
        <NovatekWordmark className="h-auto w-full shrink-0" />
        <div
          className="grid w-full grid-cols-[488px_428px] items-start justify-between gap-8 max-lg:grid-cols-1"
          data-reveal
        >
          <h1 className="w-full max-w-[488px] text-[56px] font-semibold uppercase leading-[70px] tracking-normal text-white max-md:max-w-none max-md:text-[36px] max-md:leading-10 max-md:[&_span]:block [&_span]:text-novatek-primary">
            <HighlightedTitle {...hero.title} />
          </h1>
          <div className="grid h-48 w-full max-w-[428px] content-start gap-8 max-md:h-auto max-md:max-w-none max-md:gap-6">
            <div className="grid gap-4">
              <p className="text-lg font-medium leading-[26px] text-white">// {hero.eyebrow} //</p>
              <p className="text-lg font-medium leading-[26px] text-novatek-muted">
                {hero.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 max-md:flex-col max-md:items-start">
              {hero.buttons.map((button, index) => (
                <div
                  className={index > 0 ? 'max-md:hidden' : 'w-full md:w-auto'}
                  key={button.label}
                >
                  <ArrowButton {...button} variant={index === 0 ? 'primary' : 'ghost'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
