'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { dictionary, type Locale } from '@/lib/i18n'
import type { siteData } from '../../data'
import { CheckGlyph, ProcessRequestGlyph } from '../IconSet'
import { HighlightedTitle } from '../SectionHeading'

type ProcessSectionProps = typeof siteData.process & { locale?: Locale }

export function ProcessSection({ eyebrow, features, image, locale = 'en', steps, title }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current
      const desktop = window.innerWidth >= 1024

      setIsDesktop(desktop)

      if (!section || !desktop) {
        setProgress(0)
        return
      }

      const rect = section.getBoundingClientRect()
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1)
      const nextProgress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)

      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const activeStepIndex = useMemo(() => {
    if (steps.length <= 1) return 0
    return Math.min(Math.round(progress * (steps.length - 1)), steps.length - 1)
  }, [progress, steps.length])

  const getStepOpacity = (index: number) => {
    if (steps.length <= 1) return 1

    const scaledProgress = progress * (steps.length - 1)
    const fade = 0.06
    const gap = 0.04
    let opacity = 1

    if (index > 0) {
      const fadeInStart = index - 0.5 + gap
      const fadeInEnd = fadeInStart + fade

      if (scaledProgress <= fadeInStart) return 0
      if (scaledProgress < fadeInEnd) {
        opacity = Math.min(opacity, (scaledProgress - fadeInStart) / fade)
      }
    }

    if (index < steps.length - 1) {
      const fadeOutStart = index + 0.5 - gap - fade
      const fadeOutEnd = index + 0.5 - gap

      if (scaledProgress >= fadeOutEnd) return 0
      if (scaledProgress > fadeOutStart) {
        opacity = Math.min(opacity, 1 - (scaledProgress - fadeOutStart) / fade)
      }
    }

    return Math.min(Math.max(opacity, 0), 1)
  }

  const activeStep = steps[activeStepIndex] ?? steps[0]
  const activeFeatures = activeStep?.features ?? features

  return (
    <section
      className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] text-white max-md:px-6 max-md:pb-12 max-md:pt-0 lg:min-h-[3850px]"
      id="process"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-content lg:sticky lg:top-[50px]">
        <div className="mx-auto mb-[50px] max-w-content text-center max-md:mb-8">
          <p className="mb-4 text-lg font-medium leading-[26px] text-white">// {eyebrow} //</p>
          <h2 className="mx-auto max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:text-[32px] max-md:leading-10 [&_span]:text-novatek-primary">
            <HighlightedTitle {...title} />
          </h2>
        </div>
        <div className="mx-auto hidden max-w-content grid-cols-[minmax(0,309px)_minmax(320px,440px)_minmax(0,309px)] items-center justify-between gap-x-8 gap-y-10 lg:grid">
          <div className="relative min-h-[246px] w-full max-w-[309px] max-lg:min-h-0 max-lg:max-w-none max-lg:text-center">
            {steps.map((step, index) => {
              const opacity = isDesktop ? getStepOpacity(index) : 1

              return (
                <article
                  className="transition-all duration-200 ease-linear max-lg:static lg:absolute lg:inset-0"
                  key={step.number}
                  style={{
                    opacity,
                    pointerEvents: activeStepIndex === index || !isDesktop ? 'auto' : 'none',
                    transform: isDesktop ? `translateY(${(1 - opacity) * 18}px)` : 'none',
                  }}
                >
                  <ProcessRequestGlyph className="mb-8 size-9 max-lg:mx-auto" />
                  <h3 className="text-[26px] font-semibold leading-[38px] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg font-medium leading-[26px] text-novatek-muted">
                    {step.description}
                  </p>
                </article>
              )
            })}
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div
              className="absolute inset-[4.24%] rounded-full border border-white/15"
              aria-hidden="true"
            />
            <div className="absolute left-[10.57%] top-[10.57%] size-[78.86%] overflow-hidden rounded-full">
              {steps.map((step, index) => {
                const opacity = isDesktop ? getStepOpacity(index) : index === 0 ? 1 : 0

                return (
                  <img
                    className="absolute inset-0 size-full object-cover grayscale transition-opacity duration-200 ease-linear"
                    src={step.image ?? image}
                    alt=""
                    key={step.number}
                    style={{ opacity }}
                  />
                )
              })}
            </div>
            {steps.map((step, index) => {
              const position = [
                'right-0 top-1/2 -translate-y-1/2',
                'bottom-0 left-1/2 -translate-x-1/2',
                'left-0 top-1/2 -translate-y-1/2',
                'left-1/2 top-0 -translate-x-1/2',
              ][index]
              return (
                <span
                  className={`absolute grid size-[37px] shrink-0 place-items-center rounded-full text-base font-medium leading-[23px] text-white transition-colors duration-300 ${index === activeStepIndex ? 'bg-novatek-primary' : 'bg-novatek-bg'} ${position}`}
                  data-process-marker
                  key={step.number}
                >
                  {step.number}
                </span>
              )
            })}
          </div>
          <div className="w-[309px] justify-self-end transition-opacity duration-500 max-lg:w-full max-lg:max-w-[309px] max-lg:justify-self-center">
            <p className="mb-8 text-lg font-medium leading-[26px] text-white">{dictionary[locale].common.features}</p>
            <div className="relative min-h-[134px] max-lg:min-h-0">
              {isDesktop ? (
                steps.map((step, index) => {
                  const opacity = getStepOpacity(index)

                  return (
                    <ul
                      className="absolute inset-0 grid gap-2.5 transition-all duration-200 ease-linear"
                      key={step.number}
                      style={{
                        opacity,
                        transform: `translateY(${(1 - opacity) * 18}px)`,
                      }}
                    >
                      {(step.features ?? features).map((feature) => (
                        <li
                          className="flex items-center gap-[7px] text-lg font-medium leading-[26px] text-white"
                          key={feature}
                        >
                          <CheckGlyph className="shrink-0 text-novatek-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )
                })
              ) : (
                <ul className="grid gap-2.5">
                  {activeFeatures.map((feature) => (
                    <li
                      className="flex items-center gap-[7px] text-lg font-medium leading-[26px] text-white"
                      key={feature}
                    >
                      <CheckGlyph className="shrink-0 text-novatek-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-content flex-col items-start lg:hidden">
          {steps.map((step, index) => (
            <div className="flex w-full items-start gap-5" key={step.number}>
              <div className="flex self-stretch flex-col items-center">
                <span
                  className={`grid min-h-[37px] min-w-[37px] place-items-center rounded-full px-2 text-base font-medium leading-[23px] text-white ${index === 0 ? 'bg-novatek-primary' : 'bg-novatek-bg'}`}
                >
                  {step.number}
                </span>
                {index < steps.length - 1 && <span className="w-px flex-1 bg-white/20" />}
              </div>
              <article
                className={`flex flex-1 flex-col items-start gap-2 ${index < steps.length - 1 ? 'pb-6' : ''} pt-2 text-left`}
              >
                <h3 className="text-xl font-semibold leading-[29px] text-white">
                  {step.mobileTitle ?? step.title}
                </h3>
                <p className="text-lg font-medium leading-[26px] text-novatek-muted">
                  {step.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
