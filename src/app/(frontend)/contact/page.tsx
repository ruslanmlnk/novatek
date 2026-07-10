import { getSiteData } from '../cms'
import { ArrowButton } from '../components/ArrowButton'
import { GridLines } from '../components/GridLines'
import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export const metadata = {
  description: 'Contact Novatek Engineering for manufacturing, engineering and quote requests.',
  title: 'Contact - Novatek Engineering',
}

type FieldProps = {
  label: string
  required?: boolean
  type?: string
}

function FieldLabel({ label, required }: Pick<FieldProps, 'label' | 'required'>) {
  return (
    <span>
      {label}
      {required && <span className="text-novatek-primary"> *</span>}
    </span>
  )
}

function Field({ label, required, type = 'text' }: FieldProps) {
  return (
    <label className="grid gap-2 text-base font-medium leading-[1.45] text-novatek-muted">
      <FieldLabel label={label} required={required} />
      <input
        className="h-[55px] border border-white/10 bg-novatek-soft px-6 text-base font-medium text-novatek-bg outline-none transition-colors focus:border-novatek-primary"
        type={type}
      />
    </label>
  )
}

function UploadGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M20 2.00003H20.44C20.6878 2.00068 20.9266 2.09333 21.11 2.26003L26.67 7.26003C26.7736 7.35352 26.8565 7.46766 26.9133 7.59511C26.9701 7.72256 26.9997 7.86049 27 8.00003H21C20.7348 8.00003 20.4804 7.89467 20.2929 7.70714C20.1054 7.5196 20 7.26525 20 7.00003V2.00003ZM27 10V27C26.9661 27.8232 26.6091 28.5999 26.0063 29.1615C25.4035 29.7231 24.6035 30.0244 23.78 30H8.22C7.39647 30.0244 6.59654 29.7231 5.99373 29.1615C5.39092 28.5999 5.03386 27.8232 5 27V5.00003C5.03386 4.17684 5.39092 3.40019 5.99373 2.83856C6.59654 2.27694 7.39647 1.97564 8.22 2.00003H18V7.00003C18 7.79568 18.3161 8.55874 18.8787 9.12135C19.4413 9.68396 20.2044 10 21 10H27ZM19.71 15.29L16.71 12.29C16.617 12.1963 16.5064 12.1219 16.3846 12.0711C16.2627 12.0204 16.132 11.9942 16 11.9942C15.868 11.9942 15.7373 12.0204 15.6154 12.0711C15.4936 12.1219 15.383 12.1963 15.29 12.29L12.29 15.29C12.1017 15.4783 11.9959 15.7337 11.9959 16C11.9959 16.2663 12.1017 16.5217 12.29 16.71C12.4783 16.8983 12.7337 17.0041 13 17.0041C13.2663 17.0041 13.5217 16.8983 13.71 16.71L15 15.41V22C15 22.2652 15.1054 22.5196 15.2929 22.7071C15.4804 22.8947 15.7348 23 16 23C16.2652 23 16.5196 22.8947 16.7071 22.7071C16.8946 22.5196 17 22.2652 17 22V15.41L18.29 16.71C18.383 16.8038 18.4936 16.8782 18.6154 16.9289C18.7373 16.9797 18.868 17.0058 19 17.0058C19.132 17.0058 19.2627 16.9797 19.3846 16.9289C19.5064 16.8782 19.617 16.8038 19.71 16.71C19.8037 16.6171 19.8781 16.5065 19.9289 16.3846C19.9797 16.2627 20.0058 16.132 20.0058 16C20.0058 15.868 19.9797 15.7373 19.9289 15.6155C19.8781 15.4936 19.8037 15.383 19.71 15.29Z"
        fill="#7E8466"
      />
    </svg>
  )
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
          <div className="flex flex-col justify-between gap-12">
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
                  <a className="transition-colors hover:text-white" href={`tel:${phone.replace(/\s/g, '')}`}>
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
          <form className="grid content-start gap-6 bg-white p-8 max-md:p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <Field label="First name" required />
                <Field label="Last name" />
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <Field label="Email address" type="email" required />
                <Field label="Phone number" type="tel" />
              </div>
              <label className="grid gap-2 text-base font-medium leading-[1.45] text-novatek-muted">
                <FieldLabel label="Project description" required />
                <textarea className="h-[78px] resize-y border border-white/10 bg-novatek-soft px-6 py-4 text-base font-medium text-novatek-bg outline-none transition-colors focus:border-novatek-primary" />
              </label>
              <label className="grid gap-2 text-base font-medium leading-[1.45] text-novatek-muted">
                <span>Upload files</span>
                <span className="grid cursor-pointer justify-items-center gap-4 border border-white/10 bg-novatek-primary/10 px-6 py-4 text-center">
                  <UploadGlyph />
                  <span className="text-sm font-medium leading-[1.25] text-novatek-primary">
                    Supported formats: STEP, DWG, DXF, PDF, PNG, JPEG, SLDPRT, ZIP, RAR, STL, IGES,
                    OBJ
                  </span>
                  <input className="hidden" type="file" multiple />
                </span>
              </label>
            </div>
            <ArrowButton href={`mailto:${email}`} label="Send Request" />
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
