/** Read-only smoke check that localized data survived the migration. */
import { getPayload } from 'payload'

Object.assign(process.env, { NODE_ENV: 'production' })
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })

const home = await payload.findGlobal({ slug: 'home', locale: 'en' })
const site = await payload.findGlobal({ slug: 'site', locale: 'en' })
const about = await payload.findGlobal({ slug: 'about', locale: 'en' })
const services = await payload.find({ collection: 'services', locale: 'en', limit: 100 })
const projects = await payload.find({ collection: 'projects', locale: 'en', limit: 100 })
const posts = await payload.find({ collection: 'posts', locale: 'en', limit: 100 })

console.log('home.hero.eyebrow:', home.hero?.eyebrow)
console.log(
  'home.testimonials.items:',
  home.testimonials?.items?.length,
  '-',
  home.testimonials?.items?.[0]?.author,
)
console.log('home.faq.items[0].question:', home.faq?.items?.[0]?.question?.slice(0, 50))
console.log('site.footer.tagline:', site.footer?.tagline?.slice(0, 50))
console.log('about.story.storyText:', about.story?.storyText?.slice(0, 50))
console.log('services:', services.docs.map((d) => d.title).join(' | '))
console.log('service[0].overview:', services.docs[0]?.overview?.slice(0, 60))
console.log('service[0].features:', services.docs[0]?.features?.map((f) => f.text).join(', '))
console.log('projects:', projects.docs.map((d) => d.title).join(' | '))
console.log('posts:', posts.docs.map((d) => d.title).join(' | '))
console.log('post[0].content exists:', Boolean(posts.docs[0]?.content))

// bg checks
const homeBg = await payload.findGlobal({ slug: 'home', locale: 'bg' })
const siteBg = await payload.findGlobal({ slug: 'site', locale: 'bg' })
const aboutBg = await payload.findGlobal({ slug: 'about', locale: 'bg' })
const privacyBg = await payload.findGlobal({ slug: 'privacy', locale: 'bg' })
const servicesBg = await payload.find({ collection: 'services', locale: 'bg', limit: 100 })
const projectsBg = await payload.find({ collection: 'projects', locale: 'bg', limit: 100 })
const postsBg = await payload.find({ collection: 'posts', locale: 'bg', limit: 100 })
const postCatsBg = await payload.find({ collection: 'post-categories', locale: 'bg', limit: 100 })
const projCatsBg = await payload.find({ collection: 'project-categories', locale: 'bg', limit: 100 })

console.log('\n--- BG ---')
console.log('home.hero.eyebrow:', homeBg.hero?.eyebrow)
console.log('home.testimonials.items[0].author:', homeBg.testimonials?.items?.[0]?.author)
console.log('home.faq.items[0].question:', homeBg.faq?.items?.[0]?.question)
console.log('site.footer.tagline:', siteBg.footer?.tagline)
console.log('about.story.storyText:', aboutBg.story?.storyText?.slice(0, 50))
console.log('privacy.sections[0].title:', privacyBg.sections?.[0]?.title)
console.log('services:', servicesBg.docs.map((d) => d.title).join(' | '))
console.log('service[0].overview:', servicesBg.docs[0]?.overview?.slice(0, 50))
console.log(
  'service[0].industries[0]:',
  servicesBg.docs[0]?.industries?.[0]?.industry,
  '-',
  servicesBg.docs[0]?.industries?.[0]?.applications?.map((a) => a.text).join(', '),
)
console.log('projects:', projectsBg.docs.map((d) => d.title).join(' | '))
console.log('posts:', postsBg.docs.map((d) => d.title).join(' | '))
console.log('post-categories:', postCatsBg.docs.map((d) => d.title).join(' | '))
console.log('project-categories:', projCatsBg.docs.map((d) => d.title).join(' | '))
process.exit(0)
