import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import { aboutData } from './app/(frontend)/about/data'
import { privacyFallback } from './app/(frontend)/cms'
import { blogPosts, portfolioProjects, serviceDetails } from './app/(frontend)/content'
import { siteData } from './app/(frontend)/data'
import { articleContent, caseContent } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dirname, '../public')

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

function postDate(short: string): string {
  const [day, month, year] = short.split(' ')
  return new Date(`${month} ${day}, 20${year} 12:00 UTC`).toISOString()
}

const { totalDocs } = await payload.count({ collection: 'services' })
if (totalDocs > 0) {
  payload.logger.info('Content already exists — skipping seed.')
  process.exit(0)
}

payload.logger.info('Seeding services…')
for (const service of serviceDetails) {
  await payload.create({
    collection: 'services',
    data: {
      title: service.title,
      slug: service.slug,
      image: await upload(service.image, service.title),
      features: rows(service.features),
      intro: service.intro,
      capabilities: rows(service.capabilities),
      applications: rows(service.applications),
    },
  })
}

payload.logger.info('Seeding portfolio…')
const caseExtras: Record<
  string,
  { approach: string; gallery: string[]; heroImage: string; overview: string; results: string; specs: string[] }
> = {
  'custom-metal-components': {
    heroImage: '/assets/novatek/figma-5107c2d1a7-2024.png',
    gallery: [
      '/assets/novatek/figma-62c65108ad-632.png',
      '/assets/novatek/figma-10f924eaeb-632.png',
      '/assets/novatek/figma-02ed1d64bc-632.png',
    ],
    overview:
      'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications. Using CNC-controlled equipment, we produce complex parts with clean edges, tight tolerances and consistent quality across every production run.',
    approach:
      'The project involved producing a range of custom steel components using CNC laser cutting technology. Special attention was given to dimensional accuracy, material utilization and edge quality to ensure every part met production requirements. By optimizing cutting parameters and workflow efficiency, we achieved consistent results across all manufactured components.',
    specs: ['Machine components', 'Equipment parts', 'Mounting brackets', 'Structural metal elements'],
    results:
      'The completed components were delivered with high dimensional accuracy, clean edge quality and consistent repeatability across the production run. The project demonstrated the efficiency of CNC laser cutting for manufacturing durable industrial parts while maintaining fast turnaround times and reliable production standards.',
  },
}

const projectIds = new Map<string, number>()
for (const project of portfolioProjects) {
  const extras = caseExtras[project.slug]
  const doc = await payload.create({
    collection: 'projects',
    data: {
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      image: await upload(project.image, project.title),
      ...(extras
        ? {
            heroImage: await upload(extras.heroImage, `${project.title} — hero`),
            content: caseContent({
              overview: extras.overview,
              approach: extras.approach,
              gallery: await Promise.all(
                extras.gallery.map((image, index) =>
                  upload(image, `${project.title} — photo ${index + 1}`),
                ),
              ),
              specs: extras.specs,
              results: extras.results,
            }),
          }
        : {}),
    },
  })
  projectIds.set(project.slug, doc.id)
}

payload.logger.info('Seeding blog posts…')
for (const post of blogPosts) {
  await payload.create({
    collection: 'posts',
    data: {
      title: post.title,
      slug: post.slug,
      category: post.category as 'Manufacturing Guides',
      date: postDate(post.date),
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
  data: privacyFallback,
})

payload.logger.info('Seed complete.')
process.exit(0)
