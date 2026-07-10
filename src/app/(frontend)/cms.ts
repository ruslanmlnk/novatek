import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { articleContent, type RichTextData } from '@/lexical'
import type { Media, Post, Project, Service } from '@/payload-types'
import { aboutData } from './about/data'
import { blogPosts, portfolioProjects, serviceDetails, serviceProcess } from './content'
import { siteData } from './data'

type Upload = number | Media | null | undefined

function img(media: Upload, fallback: string): string {
  return (typeof media === 'object' && media?.url) || fallback
}

function list(
  rows: ({ text?: string | null } | null)[] | null | undefined,
  fallback: string[],
): string[] {
  const texts = rows?.map((row) => row?.text).filter((text): text is string => Boolean(text))
  return texts?.length ? texts : fallback
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

const db = () => getPayload({ config })

export const getSiteData = cache(async (): Promise<typeof siteData> => {
  try {
    const payload = await db()
    const [site, home, services] = await Promise.all([
      payload.findGlobal({ slug: 'site' }),
      payload.findGlobal({ slug: 'home' }),
      payload.find({ collection: 'services', limit: 100, sort: '_order' }),
    ])

    const s = siteData
    const staticService = (doc: Service) => serviceDetails.find((item) => item.slug === doc.slug)

    return {
      brand: {
        name: pick(site.brand?.name, s.brand.name),
        tagline: pick(site.brand?.tagline, s.brand.tagline),
      },
      nav: s.nav,
      hero: {
        backgroundImage: img(home.hero?.backgroundImage, s.hero.backgroundImage),
        eyebrow: pick(home.hero?.eyebrow, s.hero.eyebrow),
        title: title(home.hero?.title, s.hero.title),
        description: pick(home.hero?.description, s.hero.description),
        buttons: s.hero.buttons,
      },
      whyChoose: {
        heading: {
          eyebrow: pick(home.whyChoose?.heading?.eyebrow, s.whyChoose.heading.eyebrow),
          title: title(home.whyChoose?.heading?.title, s.whyChoose.heading.title),
          button: s.whyChoose.heading.button,
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
          button: s.services.heading.button,
        },
        items: services.docs.length
          ? services.docs.map((doc) => ({
              title: doc.title,
              image: img(doc.image, staticService(doc)?.image ?? s.services.items[0].image),
              features: list(doc.features, staticService(doc)?.features ?? []),
            }))
          : s.services.items,
      },
      process: {
        eyebrow: pick(home.process?.heading?.eyebrow, s.process.eyebrow),
        title: title(home.process?.heading?.title, s.process.title),
        image: img(home.process?.steps?.[0]?.image, s.process.image),
        features: home.process?.steps?.length
          ? list(home.process.steps[0].features, s.process.features)
          : s.process.features,
        steps: home.process?.steps?.length
          ? home.process.steps.map((step, index) => ({
              number: String(index + 1).padStart(2, '0'),
              title: step.title,
              mobileTitle: step.mobileTitle || undefined,
              image: img(step.image, s.process.steps[index]?.image ?? s.process.image),
              description: step.description,
              features: list(step.features, s.process.steps[index]?.features ?? []),
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
            category: featured?.category ?? s.projects.featured.category,
            title: featured?.title ?? s.projects.featured.title,
            description: featured?.description ?? s.projects.featured.description,
            image: img(home.projects?.featured?.image, s.projects.featured.image),
            button: {
              label: s.projects.featured.button.label,
              href: featured ? `/portfolio/${featured.slug}` : s.projects.featured.button.href,
            },
          },
          cta: {
            title: pick(home.projects?.cta?.title, s.projects.cta.title),
            description: pick(home.projects?.cta?.description, s.projects.cta.description),
            button: s.projects.cta.button,
          },
        }
      })(),
      testimonials: {
        eyebrow: pick(home.testimonials?.heading?.eyebrow, s.testimonials.eyebrow),
        title: title(home.testimonials?.heading?.title, s.testimonials.title),
        badge: pick(home.testimonials?.badge, s.testimonials.badge),
        quote: pick(home.testimonials?.quote, s.testimonials.quote),
        author: pick(home.testimonials?.author, s.testimonials.author),
        role: pick(home.testimonials?.role, s.testimonials.role),
        avatars: s.testimonials.avatars,
      },
      quote: {
        title: pick(home.quoteBanner?.title, s.quote.title),
        button: s.quote.button,
      },
      faq: {
        eyebrow: pick(home.faq?.heading?.eyebrow, s.faq.eyebrow),
        title: title(home.faq?.heading?.title, s.faq.title),
        items: home.faq?.items?.length
          ? home.faq.items.map((item) => ({ question: item.question, answer: item.answer }))
          : s.faq.items,
      },
      footer: {
        tagline: pick(site.footer?.tagline, s.footer.tagline),
        mapImage: img(site.footer?.mapImage, s.footer.mapImage),
        contact: [
          pick(site.contacts?.phone, s.footer.contact[0]),
          pick(site.contacts?.email, s.footer.contact[1]),
          pick(site.contacts?.address, s.footer.contact[2]),
        ],
        copyright: pick(site.footer?.copyright, s.footer.copyright),
        socials: site.socials?.length
          ? site.socials.map((social) => ({ label: social.label, url: social.url }))
          : s.footer.socials,
      },
    } as typeof siteData
  } catch (error) {
    console.error('CMS unavailable — falling back to static site data.', error)
    return siteData
  }
})

export const getServiceDetails = cache(async (): Promise<typeof serviceDetails> => {
  try {
    const payload = await db()
    const { docs } = await payload.find({ collection: 'services', limit: 100, sort: '_order' })
    if (!docs.length) return serviceDetails

    return docs.map((doc) => {
      const fallback = serviceDetails.find((item) => item.slug === doc.slug)
      return {
        title: doc.title,
        slug: doc.slug,
        image: img(doc.image, fallback?.image ?? serviceDetails[0].image),
        features: list(doc.features, fallback?.features ?? []),
        intro: pick(doc.intro, fallback?.intro ?? ''),
        capabilities: list(doc.capabilities, fallback?.capabilities ?? []),
        applications: list(doc.applications, fallback?.applications ?? []),
        process: serviceProcess,
      }
    })
  } catch (error) {
    console.error('CMS unavailable — falling back to static services.', error)
    return serviceDetails
  }
})

export type CaseStudy = {
  content?: RichTextData
  heroImage?: string
}

export type PortfolioItem = (typeof portfolioProjects)[number] & { caseStudy?: CaseStudy }

export const getPortfolioProjects = cache(async (): Promise<PortfolioItem[]> => {
  try {
    const payload = await db()
    const { docs } = await payload.find({ collection: 'projects', limit: 100, sort: '_order' })
    if (!docs.length) return portfolioProjects

    return docs.map((doc) => {
      const fallback = portfolioProjects.find((item) => item.slug === doc.slug)

      const caseStudy: CaseStudy = {
        heroImage: typeof doc.heroImage === 'object' ? doc.heroImage?.url || undefined : undefined,
        content: doc.content ?? undefined,
      }

      return {
        slug: doc.slug,
        category: doc.category,
        title: doc.title,
        description: doc.description,
        image: img(doc.image, fallback?.image ?? portfolioProjects[0].image),
        caseStudy,
      }
    })
  } catch (error) {
    console.error('CMS unavailable — falling back to static portfolio.', error)
    return portfolioProjects
  }
})

function formatShortDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
    .replace(/,/g, '')
}

export type BlogPost = {
  slug: string
  category: string
  date: string
  title: string
  description: string
  image: string
  heroImage: string
  content: RichTextData
}

function staticBlogPosts(): BlogPost[] {
  return blogPosts.map(({ article, ...post }) => ({
    ...post,
    content: articleContent(article),
  }))
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const payload = await db()
    const { docs } = await payload.find({ collection: 'posts', limit: 100, sort: 'date' })
    if (!docs.length) return staticBlogPosts()

    return docs.map((doc: Post) => {
      const fallback = blogPosts.find((item) => item.slug === doc.slug)
      const image = img(doc.image, fallback?.image ?? blogPosts[0].image)
      return {
        slug: doc.slug,
        category: doc.category,
        date: formatShortDate(doc.date),
        title: doc.title,
        description: doc.description,
        image,
        heroImage: img(doc.heroImage, fallback?.heroImage ?? image),
        content: doc.content,
      }
    })
  } catch (error) {
    console.error('CMS unavailable — falling back to static blog posts.', error)
    return staticBlogPosts()
  }
})

export const getAboutData = cache(async (): Promise<typeof aboutData> => {
  try {
    const payload = await db()
    const about = await payload.findGlobal({ slug: 'about' })
    const a = aboutData

    return {
      hero: {
        eyebrow: pick(about.hero?.eyebrow, a.hero.eyebrow),
        title: title(about.hero?.title, a.hero.title),
        image: img(about.hero?.image, a.hero.image),
        description: pick(about.hero?.description, a.hero.description),
        button: a.hero.button,
      },
      story: {
        eyebrow: pick(about.story?.heading?.eyebrow, a.story.eyebrow),
        title: title(about.story?.heading?.title, a.story.title),
        image: img(about.story?.image, a.story.image),
        storyHeading: a.story.storyHeading,
        storyText: pick(about.story?.storyText, a.story.storyText),
        capabilitiesHeading: a.story.capabilitiesHeading,
        button: a.story.button,
      },
      techPartners: {
        eyebrow: pick(about.techPartners?.heading?.eyebrow, a.techPartners.eyebrow),
        title: title(about.techPartners?.heading?.title, a.techPartners.title),
        partners: about.techPartners?.partners?.length
          ? about.techPartners.partners.map((partner, index) => ({
              name: partner.name,
              image: img(partner.image, a.techPartners.partners[index]?.image ?? ''),
            }))
          : a.techPartners.partners,
      },
    } as typeof aboutData
  } catch (error) {
    console.error('CMS unavailable — falling back to static about data.', error)
    return aboutData
  }
})

export const privacyFallback = {
  lastUpdated: 'Oct 30, 2025',
  sections: [
    {
      title: 'Collecting Personal Information',
      body: 'Novatek Engineering collects information provided through contact forms, quote requests and direct communication channels. This may include your name, company details, email address, phone number and any files or technical documentation submitted as part of a project inquiry.\nWe collect this information solely for the purpose of evaluating requests, preparing quotations and providing engineering and manufacturing services.',
    },
    {
      title: 'Use of Information',
      body: 'Information submitted through our website is used to respond to inquiries, process project requests, provide technical consultations and improve our services.\nWe do not sell, rent or distribute personal information to third parties for marketing purposes.',
    },
    {
      title: 'Technical Files & Project Data',
      body: 'Drawings, CAD models, technical specifications and other project-related files submitted to Novatek Engineering are treated as confidential information.\nAll project data is used exclusively for quotation, engineering review, manufacturing planning and project execution purposes.',
    },
    {
      title: 'Sharing Personal Information',
      body: 'We may share information with trusted suppliers, manufacturing partners or service providers only when necessary to fulfill a project request or provide requested services.\nAny such sharing is limited to information required for project execution and is subject to appropriate confidentiality practices.',
    },
    {
      title: 'Cookies & Analytics',
      body: 'Our website may use cookies and analytics tools to improve user experience, monitor website performance and understand visitor behavior.\nThis information is collected in an aggregated form and does not personally identify individual users.',
    },
    {
      title: 'Data Security',
      body: 'Novatek Engineering implements reasonable technical and organizational measures to protect personal information, project documentation and submitted files against unauthorized access, disclosure or misuse.\nWhile we strive to maintain secure systems, no method of electronic transmission or storage can guarantee absolute security.',
    },
    {
      title: 'Third-Party Links',
      body: 'Our website may contain links to external websites or third-party resources. Novatek Engineering is not responsible for the privacy practices, content or security policies of external websites.',
    },
    {
      title: 'Contact Information',
      body: 'If you have any questions regarding this Privacy Policy or the handling of your information, please contact Novatek Engineering through the contact details provided on our website.',
    },
  ],
}

export const getPrivacyData = cache(async (): Promise<typeof privacyFallback> => {
  try {
    const payload = await db()
    const privacy = await payload.findGlobal({ slug: 'privacy' })

    return {
      lastUpdated: pick(privacy.lastUpdated, privacyFallback.lastUpdated),
      sections: privacy.sections?.length
        ? privacy.sections.map((section) => ({ title: section.title, body: section.body }))
        : privacyFallback.sections,
    }
  } catch (error) {
    console.error('CMS unavailable — falling back to static privacy data.', error)
    return privacyFallback
  }
})
