import type { CSSProperties } from 'react'
import { ContactSubmissionForm } from '../ContactSubmissionForm'
import { revealDelay } from '../reveal'

function Eyebrow({ children }: { children: string }) {
  return <p className="text-lg font-medium leading-[1.45] text-white">// {children} //</p>
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
        <div className="flex flex-1 flex-col justify-between gap-12" data-reveal>
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
        <ContactSubmissionForm
          className="flex flex-1 flex-col gap-6 bg-novatek-bg p-8 max-md:p-6"
          source="Footer contact form"
          style={revealDelay(1, 150)}
          variant="dark"
        />
      </div>
    </section>
  )
}
