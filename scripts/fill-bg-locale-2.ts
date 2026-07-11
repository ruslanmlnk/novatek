/** One-off patch for the 3 application strings the first pass missed. */
import { getPayload } from 'payload'

Object.assign(process.env, { NODE_ENV: 'production' })
const { default: config } = await import('../src/payload.config')

const TR: Record<string, string> = {
  'Automation fixtures': 'Приспособления за автоматизация',
  'Precision mounting systems': 'Прецизни монтажни системи',
  'Motion control parts': 'Части за управление на движението',
}

const payload = await getPayload({ config })
// read the already-translated bg locale so we only patch the 3 missed strings,
// not clobber the industry names that were already translated
const services = await payload.find({ collection: 'services', locale: 'bg', limit: 100 })

for (const doc of services.docs) {
  let changed = false
  const industries = (doc.industries ?? []).map((row) => ({
    id: row.id,
    industry: row.industry,
    applications: (row.applications ?? []).map((app) => {
      if (TR[app.text]) changed = true
      return { id: app.id, text: TR[app.text] ?? app.text }
    }),
  }))
  if (changed) {
    await payload.update({
      collection: 'services',
      id: doc.id,
      locale: 'bg',
      data: { industries },
    })
    console.log(`patched "${doc.title}"`)
  }
}
process.exit(0)
