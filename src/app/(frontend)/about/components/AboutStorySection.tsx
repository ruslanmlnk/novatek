import { ArrowButton } from '../../components/ArrowButton'
import { HighlightedTitle } from '../../components/SectionHeading'
import type { aboutData } from '../data'

type AboutStorySectionProps = {
  story: typeof aboutData.story
  services: { title: string; slug: string }[]
}

function LinkArrowIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.53316 11.8358L14.7332 6.63579L9.53316 1.43579M14.7332 6.63579H1.36914"
        stroke="#7E8466"
        strokeWidth="1.56"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AboutStorySection({ services, story }: AboutStorySectionProps) {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px]">
      <div
        className="mx-auto mb-12 flex max-w-content items-start gap-8 max-lg:flex-col max-lg:gap-4 lg:gap-[208px]"
        data-reveal
      >
        <p className="shrink-0 text-lg font-semibold text-white">// {story.eyebrow} //</p>
        <h2 className="flex-1 text-[clamp(32px,4vw,48px)] font-semibold leading-[1.25] text-white [&_span]:text-novatek-primary">
          <HighlightedTitle {...story.title} />
        </h2>
      </div>
      <div className="mx-auto flex max-w-content items-stretch gap-8 max-lg:flex-col" data-reveal>
        <img className="w-[294px] shrink-0 self-stretch object-cover max-lg:h-[280px] max-lg:w-full" src={story.image} alt="" />
        <div className="grid flex-1 content-start gap-8">
          <h3 className="text-2xl font-semibold leading-tight text-white">{story.storyHeading}</h3>
          <p className="text-lg font-medium leading-[1.45] text-novatek-muted">{story.storyText}</p>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="grid gap-8">
            <h3 className="text-2xl font-semibold leading-tight text-white">{story.capabilitiesHeading}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 max-md:grid-cols-1">
              {services.map((service) => (
                <a
                  className="flex items-center justify-between gap-4 border-b border-white/20 pb-4 text-lg font-medium text-white"
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  {service.title}
                  <LinkArrowIcon />
                </a>
              ))}
            </div>
          </div>
          <ArrowButton {...story.button} />
        </div>
      </div>
    </section>
  )
}
