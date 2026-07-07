import type { NavItem, siteData } from '../../data'
import { ArrowButton } from '../../components/ArrowButton'
import { GridLines } from '../../components/GridLines'
import { NovatekWordmark } from '../../components/NovatekWordmark'
import { HighlightedTitle } from '../../components/SectionHeading'
import { SiteHeader } from '../../components/SiteHeader'
import type { aboutData } from '../data'

type AboutHeroSectionProps = {
  brand: typeof siteData.brand
  nav: NavItem[]
  hero: typeof aboutData.hero
}

export function AboutHeroSection({ brand, hero, nav }: AboutHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
      <GridLines height={1100} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[223px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_100%)]"
        aria-hidden="true"
      />
      <SiteHeader activeHref="/about" brand={brand} nav={nav} />
      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-white">// {hero.eyebrow} //</p>
          <h1 className="max-w-[681px] text-[clamp(34px,4vw,48px)] font-semibold leading-[1.25] text-white [&_span]:text-novatek-primary">
            <HighlightedTitle {...hero.title} />
          </h1>
        </div>
        <div className="flex h-[560px] w-full items-stretch max-lg:h-auto max-lg:flex-col">
          <img className="h-full min-w-0 flex-1 object-cover max-lg:h-[320px]" src={hero.image} alt="" />
          <div className="relative flex h-full w-[593px] max-w-full shrink-0 flex-col justify-between gap-8 overflow-hidden bg-novatek-primary p-8 max-lg:h-auto max-lg:w-full">
            <p className="relative z-10 text-lg font-medium leading-[1.45] text-white">{hero.description}</p>
            <ArrowButton {...hero.button} variant="onPrimary" />
            <NovatekWordmark className="pointer-events-none absolute -left-[350px] bottom-0 h-auto w-[1292px] opacity-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
