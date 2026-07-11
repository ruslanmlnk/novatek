import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import { aboutData } from '../app/(frontend)/about/data'
import { siteData } from '../app/(frontend)/data'
import { articleContent, caseContent } from '../lexical'
import { privacyDefaults } from '../lib/queries/privacy'
import { postCategories, posts, projectCategories, projects, services } from './data'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dirname, '../../public')

const payload = await getPayload({ config })

const mediaIds = new Map<string, number>()

async function upload(imagePath: string, alt: string): Promise<number> {
  const cached = mediaIds.get(imagePath)
  if (cached !== undefined) return cached

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(publicDir, imagePath),
  })
  mediaIds.set(imagePath, doc.id)
  return doc.id
}

const rows = (texts: string[]) => texts.map((text) => ({ text }))

const { totalDocs } = await payload.count({ collection: 'services' })
if (totalDocs > 0) {
  payload.logger.info('Content already exists — skipping seed.')
  process.exit(0)
}

payload.logger.info('Seeding categories…')
const postCategoryIds = new Map<string, number>()
for (const title of postCategories) {
  const doc = await payload.create({ collection: 'post-categories', data: { title } })
  postCategoryIds.set(title, doc.id)
}

const projectCategoryIds = new Map<string, number>()
for (const title of projectCategories) {
  const doc = await payload.create({ collection: 'project-categories', data: { title } })
  projectCategoryIds.set(title, doc.id)
}

payload.logger.info('Seeding services…')
for (const service of services) {
  await payload.create({
    collection: 'services',
    data: {
      title: service.title,
      slug: service.slug,
      image: await upload(service.image, service.title),
      features: rows(service.features),
      heroTitle: service.heroTitle,
      heroImage: service.heroImage
        ? await upload(service.heroImage, `${service.title} — hero`)
        : undefined,
      overviewHeading: service.overviewHeading,
      overview: service.overview,
      cards: service.cards,
      industries: service.industries.map((row) => ({
        industry: row.industry,
        applications: rows(row.applications),
      })),
    },
  })
}

payload.logger.info('Seeding portfolio…')
const projectIds = new Map<string, number>()
for (const [index, project] of projects.entries()) {
  const galleryPaths = project.caseStudy.gallery ?? [
    project.image,
    projects[(index + 1) % projects.length].image,
    projects[(index + 2) % projects.length].image,
  ]

  const doc = await payload.create({
    collection: 'projects',
    data: {
      title: project.title,
      slug: project.slug,
      category: projectCategoryIds.get(project.category)!,
      description: project.description,
      image: await upload(project.image, project.title),
      heroImage: await upload(project.caseStudy.heroImage ?? project.image, `${project.title} — hero`),
      content: caseContent({
        overview: project.caseStudy.overview,
        approach: project.caseStudy.approach,
        gallery: await Promise.all(
          galleryPaths.map((image, photoIndex) =>
            upload(image, `${project.title} — photo ${photoIndex + 1}`),
          ),
        ),
        specs: project.caseStudy.specs,
        results: project.caseStudy.results,
      }),
    },
  })
  projectIds.set(project.slug, doc.id)
}

payload.logger.info('Seeding blog posts…')
for (const post of posts) {
  await payload.create({
    collection: 'posts',
    data: {
      title: post.title,
      slug: post.slug,
      category: postCategoryIds.get(post.category)!,
      date: new Date(`${post.date}T12:00:00Z`).toISOString(),
      description: post.description,
      image: await upload(post.image, post.title),
      heroImage: await upload(post.heroImage, `${post.title} — hero`),
      content: articleContent(post.article),
    },
  })
}

payload.logger.info('Seeding globals…')
await payload.updateGlobal({
  slug: 'site',
  data: {
    brand: siteData.brand,
    contacts: {
      phone: siteData.footer.contact[0],
      email: siteData.footer.contact[1],
      address: siteData.footer.contact[2],
    },
    footer: {
      tagline: siteData.footer.tagline,
      copyright: siteData.footer.copyright,
      mapImage: await upload(siteData.footer.mapImage, 'Location map'),
    },
    socials: siteData.footer.socials,
  },
})

await payload.updateGlobal({
  slug: 'home',
  data: {
    hero: {
      eyebrow: siteData.hero.eyebrow,
      title: siteData.hero.title,
      description: siteData.hero.description,
      backgroundImage: await upload(siteData.hero.backgroundImage, 'Hero background'),
    },
    whyChoose: {
      heading: {
        eyebrow: siteData.whyChoose.heading.eyebrow,
        title: siteData.whyChoose.heading.title,
      },
      projectsCard: {
        eyebrow: siteData.whyChoose.cards[0].eyebrow!,
        metric: siteData.whyChoose.cards[0].metric!,
        description: siteData.whyChoose.cards[0].description,
      },
      turnaroundCard: {
        title: siteData.whyChoose.cards[1].title!,
        description: siteData.whyChoose.cards[1].description,
      },
      trustedCard: {
        eyebrow: siteData.whyChoose.cards[2].eyebrow!,
        metric: siteData.whyChoose.cards[2].metric!,
        rating: siteData.whyChoose.cards[2].rating!,
        description: siteData.whyChoose.cards[2].description,
      },
    },
    services: {
      heading: {
        eyebrow: siteData.services.heading.eyebrow,
        title: siteData.services.heading.title,
      },
    },
    process: {
      heading: { eyebrow: siteData.process.eyebrow, title: siteData.process.title },
      steps: await Promise.all(
        siteData.process.steps.map(async (step) => ({
          title: step.title,
          mobileTitle: 'mobileTitle' in step ? step.mobileTitle : undefined,
          description: step.description,
          image: await upload(step.image, step.title),
          features: rows(step.features),
        })),
      ),
    },
    projects: {
      heading: { eyebrow: siteData.projects.eyebrow, title: siteData.projects.title },
      featured: {
        project: projectIds.get('custom-metal-components'),
        image: await upload(siteData.projects.featured.image, 'Featured project'),
      },
      cta: {
        title: siteData.projects.cta.title,
        description: siteData.projects.cta.description,
      },
    },
    testimonials: {
      heading: {
        eyebrow: siteData.testimonials.eyebrow,
        title: siteData.testimonials.title,
      },
      badge: siteData.testimonials.badge,
      quote: siteData.testimonials.quote,
      author: siteData.testimonials.author,
      role: siteData.testimonials.role,
    },
    quoteBanner: { title: siteData.quote.title },
    faq: {
      heading: { eyebrow: siteData.faq.eyebrow, title: siteData.faq.title },
      items: siteData.faq.items,
    },
  },
})

await payload.updateGlobal({
  slug: 'about',
  data: {
    hero: {
      eyebrow: aboutData.hero.eyebrow,
      title: aboutData.hero.title,
      description: aboutData.hero.description,
      image: await upload(aboutData.hero.image, 'About hero'),
    },
    story: {
      heading: { eyebrow: aboutData.story.eyebrow, title: aboutData.story.title },
      image: await upload(aboutData.story.image, 'Our story'),
      storyText: aboutData.story.storyText,
    },
    techPartners: {
      heading: {
        eyebrow: aboutData.techPartners.eyebrow,
        title: aboutData.techPartners.title,
      },
      partners: await Promise.all(
        aboutData.techPartners.partners.map(async (partner) => ({
          name: partner.name,
          image: await upload(partner.image, partner.name),
        })),
      ),
    },
  },
})

await payload.updateGlobal({
  slug: 'privacy',
  data: privacyDefaults,
})

payload.logger.info('Seed complete.')
process.exit(0)
