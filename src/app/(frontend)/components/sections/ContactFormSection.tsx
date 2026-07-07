import type { CSSProperties } from 'react'
import { ArrowGlyph } from '../IconSet'

function Eyebrow({ children }: { children: string }) {
  return <p className="text-lg font-medium leading-[1.45] text-white">// {children} //</p>
}

function Field({
  label,
  optional = false,
  placeholder,
}: {
  label: string
  optional?: boolean
  placeholder?: string
}) {
  return (
    <label className="grid gap-2">
      <span
        className={`text-base font-medium leading-[1.45] ${optional ? 'text-novatek-muted' : 'text-white'}`}
      >
        {label}
      </span>
      <input
        className="h-[55px] border border-white/15 bg-transparent px-4 text-base font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary"
        placeholder={placeholder}
      />
    </label>
  )
}

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 21V7M16 7L10 13M16 7L22 13"
        stroke="#7E8466"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 21v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3"
        stroke="#7E8466"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ContactFormSection({
  address,
  backgroundImage,
  email,
  phone,
}: {
  address: string
  backgroundImage: string
  email: string
  phone: string
}) {
  return (
    <section
      className="bg-cover bg-center px-[74px] py-[140px] max-lg:px-6 max-lg:py-12"
      id="contact-form"
      style={
        {
          backgroundImage: `linear-gradient(0deg, rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.8)), url(${backgroundImage})`,
        } as CSSProperties
      }
    >
      <div className="mx-auto flex max-w-content items-stretch gap-8 max-lg:flex-col">
        <div className="flex flex-1 flex-col justify-between gap-12">
          <div className="grid gap-2">
            <Eyebrow>Contact Us</Eyebrow>
            <h2 className="max-w-[456px] text-[56px] font-semibold leading-[1.25] text-white max-md:text-[32px]">
              Let&apos;s discuss your project
            </h2>
          </div>
          <div className="flex gap-12 max-sm:flex-col max-sm:gap-8">
            <div className="grid w-[265px] content-start gap-4 max-sm:w-full">
              <Eyebrow>Get in touch</Eyebrow>
              <div className="grid gap-2">
                <a
                  className="text-lg font-medium leading-[1.45] text-novatek-muted transition-colors hover:text-white"
                  href={`tel:${phone.replace(/\s/g, '')}`}
                >
                  {phone}
                </a>
                <a
                  className="text-lg font-medium leading-[1.45] text-novatek-muted transition-colors hover:text-white"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            </div>
            <div className="grid w-[317px] content-start gap-4 max-sm:w-full">
              <Eyebrow>Find us</Eyebrow>
              <p className="text-lg font-medium leading-[1.45] text-novatek-muted">{address}</p>
            </div>
          </div>
        </div>
        <form className="flex flex-1 flex-col gap-6 bg-novatek-bg p-8 max-md:p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Field label="First name *" placeholder="Your first name" />
              <Field label="Last name" optional placeholder="Your last name" />
            </div>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Field label="Email address *" placeholder="you@example.com" />
              <Field label="Phone number" optional placeholder="+359 ..." />
            </div>
            <label className="grid gap-2">
              <span className="text-base font-medium leading-[1.45] text-white">
                Project description *
              </span>
              <textarea
                className="min-h-[78px] resize-y border border-white/15 bg-transparent px-4 py-3 text-base font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary"
                placeholder="Tell us what you need manufactured or engineered"
              />
            </label>
            <label className="grid cursor-pointer gap-2">
              <span className="text-base font-medium leading-[1.45] text-novatek-muted">
                Upload files
              </span>
              <span className="flex min-h-[116px] flex-col items-center justify-center gap-4 border border-white/10 bg-novatek-primary/10 px-6 py-4">
                <UploadIcon />
                <span className="max-w-[518px] text-center text-sm font-semibold leading-[1.25] text-novatek-primary">
                  Supported formats: STEP, DWG, DXF, PDF, PNG, JPEG, SLDPRT, ZIP, RAR, STL, IGES,
                  OBJ
                </span>
                <input className="hidden" type="file" multiple />
              </span>
            </label>
          </div>
          <button
            className="inline-flex min-h-14 w-fit items-center gap-4 whitespace-nowrap bg-novatek-primary py-2 pl-4 pr-2 text-base font-medium text-white transition-colors hover:bg-white hover:text-novatek-bg max-md:w-full max-md:justify-between"
            type="submit"
          >
            <span>Send Request</span>
            <span className="grid size-10 place-items-center bg-novatek-bg text-white" aria-hidden="true">
              <ArrowGlyph className="h-3 w-4" />
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}
