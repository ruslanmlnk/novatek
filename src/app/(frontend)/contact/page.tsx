import { ArrowButton } from '../components/ArrowButton'
import { GridLines } from '../components/GridLines'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { siteData } from '../data'

export const metadata = {
  description: 'Contact Novatek Engineering for manufacturing, engineering and quote requests.',
  title: 'Contact - Novatek Engineering',
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/70">
      <span>{label}</span>
      <input
        className="min-h-14 border border-white/15 bg-white/[0.04] px-4 text-base font-medium normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary"
        placeholder={placeholder}
      />
    </label>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
        <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
        <SiteHeader activeHref="/contact" brand={siteData.brand} nav={siteData.nav} />
        <div className="relative mx-auto grid max-w-content grid-cols-[0.8fr_1.2fr] gap-12 pb-[74px] pt-12 max-lg:grid-cols-1">
          <div className="grid content-start gap-6">
            <p className="text-lg font-medium leading-[1.45] text-white">// Contact //</p>
            <h1 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.05] text-white">
              Let&apos;s discuss your <span className="text-novatek-primary">next project</span>
            </h1>
            <p className="text-xl font-medium leading-[1.45] text-novatek-muted max-md:text-lg">
              Send drawings, CAD files or a short description. Our team will review the request and
              recommend the best manufacturing route.
            </p>
            <div className="grid gap-3 pt-4">
              {siteData.footer.contact.map((line) => (
                <span className="text-lg font-medium text-white" key={line}>
                  {line}
                </span>
              ))}
            </div>
          </div>
          <form className="relative grid gap-5 bg-novatek-panel p-8 max-md:p-6">
            <GridLines height={640} opacity={0.04} />
            <div className="relative grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <Field label="Name" placeholder="Your name" />
              <Field label="Email" placeholder="you@example.com" />
              <Field label="Phone" placeholder="+359 ..." />
              <Field label="Service" placeholder="Laser cutting, CNC..." />
            </div>
            <label className="relative grid gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/70">
              <span>Project details</span>
              <textarea
                className="min-h-40 resize-y border border-white/15 bg-white/[0.04] px-4 py-4 text-base font-medium normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary"
                placeholder="Tell us what you need manufactured or engineered"
              />
            </label>
            <div className="relative">
              <ArrowButton href="mailto:office@novatek-engineering.com" label="Send Request" />
            </div>
          </form>
        </div>
      </section>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
