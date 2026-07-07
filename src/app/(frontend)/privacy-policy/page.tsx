import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { siteData } from '../data'

export const metadata = {
  description: 'Privacy policy for Novatek Engineering website visitors and quote requests.',
  title: 'Privacy Policy - Novatek Engineering',
}

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect contact details, uploaded project files and request information that you choose to send when asking for engineering or manufacturing support.',
  },
  {
    title: 'How we use information',
    body: 'We use submitted information to review technical requirements, prepare quotes, communicate about projects and improve our manufacturing services.',
  },
  {
    title: 'Project files',
    body: 'Drawings, CAD files and technical references are handled as project materials and are used only for evaluation, production planning and agreed delivery.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions or data requests, contact Novatek Engineering at office@novatek-engineering.com.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <section className="relative overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)]">
        <div className="absolute inset-x-0 top-0 h-[801px] bg-[linear-gradient(180deg,rgba(67,70,49,0.5)_0%,rgba(25,25,25,0)_27.81%)]" />
        <SiteHeader brand={siteData.brand} nav={siteData.nav} />
        <div className="relative mx-auto grid max-w-content justify-items-center gap-4 pb-[74px] pt-12 text-center">
          <p className="text-lg font-medium leading-[1.45] text-white">// Legal //</p>
          <h1 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.05] text-white">
            Privacy <span className="text-novatek-primary">Policy</span>
          </h1>
        </div>
      </section>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px]">
        <div className="mx-auto grid max-w-[900px] gap-8">
          {sections.map((section) => (
            <article className="border-t border-white/15 pt-8" key={section.title}>
              <h2 className="mb-4 text-[26px] font-semibold leading-[1.35] text-white">
                {section.title}
              </h2>
              <p className="text-lg font-medium leading-[1.65] text-novatek-muted">
                {section.body}
              </p>
            </article>
          ))}
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
