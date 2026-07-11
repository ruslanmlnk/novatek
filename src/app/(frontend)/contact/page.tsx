import { getSiteData } from '@/lib/queries/site'
import { buildMeta } from '@/lib/seo'
import { ContactSubmissionForm } from '../components/ContactSubmissionForm'
import { GridLines } from '../components/GridLines'
import { revealDelay } from '../components/reveal'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export async function generateMetadata() {
  const siteData = await getSiteData()
  return buildMeta(siteData.seo.contact, {
    title: 'Contact - Novatek Engineering',
    description: 'Contact Novatek Engineering for manufacturing, engineering and quote requests.',
  })
}

export const revalidate = 60

export default async function ContactPage() {
  const siteData = await getSiteData()
  const [phone, email, address] = siteData.footer.contact

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
        <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1078px]">
          <GridLines height={1078} />
        </div>
        <SiteHeader activeHref="/contact" brand={siteData.brand} nav={siteData.nav} />
        <div className="relative mx-auto grid max-w-content grid-cols-2 gap-8 pb-[74px] pt-12 max-lg:grid-cols-1">
          <div className="flex flex-col justify-between gap-12" data-reveal>
            <div className="grid gap-2">
              <p className="text-lg font-medium leading-[1.45] text-white">// Contact Us //</p>
              <h1 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.25] text-white">
                Let&apos;s discuss your <span className="text-novatek-primary">project</span>
              </h1>
            </div>
            <div className="flex gap-12 max-sm:flex-col">
              <div className="grid content-start gap-4">
                <p className="text-lg font-medium leading-[1.45] text-white">// Get in touch //</p>
                <div className="grid justify-items-start gap-2 text-lg font-medium leading-[1.45] text-novatek-muted">
                  <a
                    className="transition-colors hover:text-white"
                    href={`tel:${phone.replace(/\s/g, '')}`}
                  >
                    {phone}
                  </a>
                  <a className="transition-colors hover:text-white" href={`mailto:${email}`}>
                    {email}
                  </a>
                </div>
              </div>
              <div className="grid flex-1 content-start gap-4">
                <p className="text-lg font-medium leading-[1.45] text-white">// Find us //</p>
                <p className="text-lg font-medium leading-[1.45] text-novatek-muted">{address}</p>
              </div>
            </div>
          </div>
          <ContactSubmissionForm
            className="grid content-start gap-6 bg-white p-8 max-md:p-6"
            source="Contact page"
            style={revealDelay(1, 150)}
            variant="light"
          />
        </div>
      </section>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items}
      />
    </div>
  )
}
