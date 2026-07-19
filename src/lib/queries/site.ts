import { cache } from 'react'

import type { Project } from '@/payload-types'
import { siteData } from '@/app/(frontend)/data'
import { siteDataBg } from '@/app/(frontend)/data.bg'
import { localizeHref, t, type Locale } from '../i18n'
import { mediaUrl, relationTitle } from '../media'
import type { SeoData } from '../seo'
import { db } from '../payload'
import { getServices, type ServiceCard } from './services'

export type SiteData = Omit<typeof siteData, 'footer' | 'services'> & {
  footer: (typeof siteData)['footer'] & { contactFormBackgroundImage: string }
  services: (typeof siteData)['services'] & { items: ServiceCard[] }
  locale: Locale
  seo: {
    home: SeoData
    services: SeoData
    portfolio: SeoData
    blog: SeoData
    contact: SeoData
  }
}

function pick(value: string | null | undefined, fallback: string): string {
  return value || fallback
}

function title(
  value: { before?: string | null; accent?: string | null; after?: string | null } | undefined,
  fallback: { before?: string; accent: string; after?: string },
) {
  return {
    before: value?.before || fallback.before,
    accent: pick(value?.accent, fallback.accent),
    after: value?.after || fallback.after,
  }
}

function localizeButton<T extends { href: string; label: string }>(button: T, locale: Locale): T {
  return { ...button, href: localizeHref(button.href, locale) }
}

export const getSiteData = cache(async (locale: Locale = 'en'): Promise<SiteData> => {
  const payload = await db()
  const dict = t(locale)
  const [site, home, services] = await Promise.all([
    payload.findGlobal({ slug: 'site', locale }),
    payload.findGlobal({ slug: 'home', locale }),
    getServices(locale),
  ])

  const s = locale === 'bg' ? siteDataBg : siteData

  return {
    locale,
    brand: {
      name: pick(site.brand?.name, s.brand.name),
      tagline: pick(site.brand?.tagline, s.brand.tagline),
    },
    nav: [
      { label: dict.common.services, href: '/services' },
      { label: locale === 'bg' ? 'Портфолио' : 'Portfolio', href: '/portfolio' },
      { label: locale === 'bg' ? 'За нас' : 'About', href: '/about' },
      { label: locale === 'bg' ? 'Блог' : 'Blog', href: '/blog' },
      { label: locale === 'bg' ? 'Контакти' : 'Contacts', href: '/contact' },
    ].map((item) => ({ ...item, href: localizeHref(item.href, locale) })),
    hero: {
      backgroundImage: mediaUrl(home.hero?.backgroundImage, s.hero.backgroundImage),
      eyebrow: pick(home.hero?.eyebrow, s.hero.eyebrow),
      title: title(home.hero?.title, s.hero.title),
      description: pick(home.hero?.description, s.hero.description),
      buttons: [
        { label: dict.common.requestAQuote, href: localizeHref('/contact', locale) },
        { label: locale === 'bg' ? 'Вижте услугите' : 'View Services', href: '#services' },
      ],
    },
    whyChoose: {
      heading: {
        eyebrow: pick(home.whyChoose?.heading?.eyebrow, s.whyChoose.heading.eyebrow),
        title: title(home.whyChoose?.heading?.title, s.whyChoose.heading.title),
        button: {
          label: locale === 'bg' ? 'Научете повече за нас' : s.whyChoose.heading.button.label,
          href: localizeHref(s.whyChoose.heading.button.href, locale),
        },
      },
      cards: [
        {
          eyebrow: pick(home.whyChoose?.projectsCard?.eyebrow, s.whyChoose.cards[0].eyebrow!),
          metric: pick(home.whyChoose?.projectsCard?.metric, s.whyChoose.cards[0].metric!),
          description: pick(
            home.whyChoose?.projectsCard?.description,
            s.whyChoose.cards[0].description,
          ),
          image: s.whyChoose.cards[0].image,
        },
        {
          title: pick(home.whyChoose?.turnaroundCard?.title, s.whyChoose.cards[1].title!),
          description: pick(
            home.whyChoose?.turnaroundCard?.description,
            s.whyChoose.cards[1].description,
          ),
          image: s.whyChoose.cards[1].image,
        },
        {
          eyebrow: pick(home.whyChoose?.trustedCard?.eyebrow, s.whyChoose.cards[2].eyebrow!),
          metric: pick(home.whyChoose?.trustedCard?.metric, s.whyChoose.cards[2].metric!),
          description: pick(
            home.whyChoose?.trustedCard?.description,
            s.whyChoose.cards[2].description,
          ),
          rating: pick(home.whyChoose?.trustedCard?.rating, s.whyChoose.cards[2].rating!),
        },
      ],
    },
    services: {
      heading: {
        eyebrow: pick(home.services?.heading?.eyebrow, s.services.heading.eyebrow),
        title: title(home.services?.heading?.title, s.services.heading.title),
        button: { label: dict.common.getAQuote, href: localizeHref('/contact', locale) },
      },
      items: services,
    },
    process: {
      eyebrow: pick(home.process?.heading?.eyebrow, s.process.eyebrow),
      title: title(home.process?.heading?.title, s.process.title),
      image: mediaUrl(home.process?.steps?.[0]?.image, s.process.image),
      features: home.process?.steps?.length
        ? (home.process.steps[0].features?.map((row) => row.text ?? '') ?? s.process.features)
        : s.process.features,
      steps: home.process?.steps?.length
        ? home.process.steps.map((step, index) => ({
            number: String(index + 1).padStart(2, '0'),
            title: step.title,
            mobileTitle: step.mobileTitle || undefined,
            image: mediaUrl(step.image, s.process.steps[index]?.image ?? s.process.image),
            description: step.description,
            features:
              step.features?.map((row) => row.text ?? '') ?? s.process.steps[index]?.features ?? [],
          }))
        : s.process.steps,
    },
    projects: (() => {
      const rel = home.projects?.featured?.project
      const featured = typeof rel === 'object' && rel ? (rel as Project) : undefined
      return {
        eyebrow: pick(home.projects?.heading?.eyebrow, s.projects.eyebrow),
        title: title(home.projects?.heading?.title, s.projects.title),
        featured: {
          category: featured ? relationTitle(featured.category) : s.projects.featured.category,
          title: featured?.title ?? s.projects.featured.title,
          description: featured?.description ?? s.projects.featured.description,
          image: mediaUrl(home.projects?.featured?.image, s.projects.featured.image),
          button: {
            label: s.projects.featured.button.label,
            href: localizeHref(
              featured ? `/portfolio/${featured.slug}` : s.projects.featured.button.href,
              locale,
            ),
          },
        },
        cta: {
          title: pick(home.projects?.cta?.title, s.projects.cta.title),
          description: pick(home.projects?.cta?.description, s.projects.cta.description),
          button: localizeButton(
            {
              ...s.projects.cta.button,
              label: locale === 'bg' ? 'Вижте всички проекти' : s.projects.cta.button.label,
            },
            locale,
          ),
        },
      }
    })(),
    testimonials: {
      eyebrow: pick(home.testimonials?.heading?.eyebrow, s.testimonials.eyebrow),
      title: title(home.testimonials?.heading?.title, s.testimonials.title),
      badge: pick(home.testimonials?.badge, s.testimonials.badge),
      items: home.testimonials?.items?.length
        ? home.testimonials.items.map((item) => ({
            quote: item.quote,
            author: item.author,
            role: item.role,
          }))
        : s.testimonials.items,
      avatars: s.testimonials.avatars,
    },
    quote: {
      title: pick(home.quoteBanner?.title, s.quote.title),
      button: { label: dict.common.requestAQuote, href: localizeHref('/contact', locale) },
    },
    faq: {
      eyebrow: pick(home.faq?.heading?.eyebrow, s.faq.eyebrow),
      title: title(home.faq?.heading?.title, s.faq.title),
      items: home.faq?.items?.length
        ? home.faq.items.map((item) => ({ question: item.question, answer: item.answer }))
        : s.faq.items,
    },
    seo: {
      home: home.seo ?? null,
      services: site.pagesSeo?.services ?? null,
      portfolio: site.pagesSeo?.portfolio ?? null,
      blog: site.pagesSeo?.blog ?? null,
      contact: site.pagesSeo?.contact ?? null,
    },
    footer: {
      tagline: pick(site.footer?.tagline, s.footer.tagline),
      mapImage: mediaUrl(site.footer?.mapImage, s.footer.mapImage),
      contactFormBackgroundImage: mediaUrl(
        site.footer?.contactFormBackgroundImage,
        mediaUrl(home.hero?.backgroundImage, s.hero.backgroundImage),
      ),
      contact: [
        pick(site.contacts?.phone, s.footer.contact[0]),
        pick(site.contacts?.email, s.footer.contact[1]),
        pick(site.contacts?.address, s.footer.contact[2]),
      ],
      copyright: pick(site.footer?.copyright, s.footer.copyright),
      socials: site.socials?.length
        ? site.socials.map((social) => ({
            label: social.label,
            url: social.url,
            icon: mediaUrl(social.icon),
          }))
        : s.footer.socials,
    },
  } as SiteData
})
