import { cache } from 'react'

import { aboutData } from '@/app/(frontend)/about/data'
import { mediaUrl } from '../media'
import type { SeoData } from '../seo'
import { db } from '../payload'

function pick(value: string | null | undefined, fallback: string): string {
  return value || fallback
}

export const getAboutData = cache(async (): Promise<typeof aboutData & { seo: SeoData }> => {
  const payload = await db()
  const about = await payload.findGlobal({ slug: 'about' })
  const a = aboutData

  return {
    seo: about.seo ?? null,
    hero: {
      eyebrow: pick(about.hero?.eyebrow, a.hero.eyebrow),
      title: {
        before: about.hero?.title?.before || a.hero.title.before,
        accent: pick(about.hero?.title?.accent, a.hero.title.accent),
      },
      image: mediaUrl(about.hero?.image, a.hero.image),
      description: pick(about.hero?.description, a.hero.description),
      button: a.hero.button,
    },
    story: {
      eyebrow: pick(about.story?.heading?.eyebrow, a.story.eyebrow),
      title: {
        before: about.story?.heading?.title?.before || a.story.title.before,
        accent: pick(about.story?.heading?.title?.accent, a.story.title.accent),
        after: about.story?.heading?.title?.after || a.story.title.after,
      },
      image: mediaUrl(about.story?.image, a.story.image),
      storyHeading: a.story.storyHeading,
      storyText: pick(about.story?.storyText, a.story.storyText),
      capabilitiesHeading: a.story.capabilitiesHeading,
      button: a.story.button,
    },
    techPartners: {
      eyebrow: pick(about.techPartners?.heading?.eyebrow, a.techPartners.eyebrow),
      title: {
        before: about.techPartners?.heading?.title?.before || a.techPartners.title.before,
        accent: pick(about.techPartners?.heading?.title?.accent, a.techPartners.title.accent),
      },
      partners: about.techPartners?.partners?.length
        ? about.techPartners.partners.map((partner, index) => ({
            name: partner.name,
            image: mediaUrl(partner.image, a.techPartners.partners[index]?.image ?? ''),
          }))
        : a.techPartners.partners,
    },
  } as typeof aboutData & { seo: SeoData }
})
