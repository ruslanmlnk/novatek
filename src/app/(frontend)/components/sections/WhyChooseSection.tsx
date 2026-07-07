import type { CSSProperties } from 'react'
import type { siteData } from '../../data'
import { StarRating } from '../IconSet'
import { SectionHeading } from '../SectionHeading'

type WhyChooseSectionProps = typeof siteData.whyChoose

export function WhyChooseSection({ cards, heading }: WhyChooseSectionProps) {
  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] max-md:px-6" id="about">
      <SectionHeading {...heading} />
      <div className="mx-auto grid max-w-content grid-cols-3 gap-8 max-lg:grid-cols-1">
        {cards.map((card) => {
          const isImageCard =
            'title' in card && Boolean(card.title) && 'image' in card && Boolean(card.image)
          const key =
            'title' in card && card.title
              ? card.title
              : 'metric' in card
                ? card.metric
                : card.description

          return (
            <article
              className={`flex min-h-[466px] flex-col items-center justify-between p-8 text-center max-lg:min-h-[360px] ${
                isImageCard
                  ? 'justify-end bg-cover bg-center text-white'
                  : 'bg-novatek-soft text-novatek-bg'
              }`}
              key={key}
              style={
                isImageCard
                  ? ({
                      backgroundImage: `linear-gradient(180deg, rgba(21, 21, 21, 0), #151515), url(${card.image})`,
                    } as CSSProperties)
                  : undefined
              }
            >
              {'eyebrow' in card && card.eyebrow && (
                <p className="text-lg font-semibold text-novatek-primary">// {card.eyebrow} //</p>
              )}
              {'title' in card && card.title && <h3>{card.title}</h3>}
              {'metric' in card && card.metric && (
                <strong className="block text-5xl font-semibold leading-none text-novatek-bg">
                  {card.metric}
                </strong>
              )}
              <p
                className={`max-w-[280px] text-lg font-medium ${isImageCard ? 'text-novatek-muted' : 'text-novatek-bg'}`}
              >
                {card.description}
              </p>
              {'rating' in card && card.rating && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <b className="text-[32px] text-novatek-bg">{card.rating}</b>
                  <span className="font-bold text-novatek-muted">/5.0</span>
                  <StarRating className="text-novatek-primary" />
                </div>
              )}
              {'image' in card && card.image && !isImageCard && (
                <img className="-mb-8 w-14" src={card.image} alt="" />
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
