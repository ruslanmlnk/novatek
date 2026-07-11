'use client'

import type { CSSProperties, FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import { ArrowGlyph } from './IconSet'

type ContactSubmissionFormProps = {
  className?: string
  source: string
  style?: CSSProperties
  variant: 'dark' | 'light'
}

type SubmitState = {
  message: string
  status: 'error' | 'idle' | 'success'
}

const supportedFormats = 'STEP, DWG, DXF, PDF, PNG, JPEG, SLDPRT, ZIP, RAR, STL, IGES, OBJ'

const acceptedFileTypes =
  '.step,.stp,.dwg,.dxf,.pdf,.png,.jpg,.jpeg,.sldprt,.zip,.rar,.stl,.iges,.igs,.obj'

function FieldLabel({
  label,
  required,
  variant,
}: {
  label: string
  required?: boolean
  variant: ContactSubmissionFormProps['variant']
}) {
  return (
    <span>
      {label}
      {required && <span className={variant === 'light' ? 'text-novatek-primary' : ''}> *</span>}
    </span>
  )
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = 'text',
  variant,
}: {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  type?: string
  variant: ContactSubmissionFormProps['variant']
}) {
  const light = variant === 'light'

  return (
    <label
      className={`grid gap-2 text-base font-medium leading-[1.45] ${
        light || !required ? 'text-novatek-muted' : 'text-white'
      }`}
    >
      <FieldLabel label={label} required={required} variant={variant} />
      <input
        className={
          light
            ? 'h-[55px] border border-white/10 bg-novatek-soft px-6 text-base font-medium text-novatek-bg outline-none transition-colors focus:border-novatek-primary'
            : 'h-[55px] border border-white/15 bg-transparent px-4 text-base font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary'
        }
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  )
}

function UploadArrowGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 21V7M16 7L10 13M16 7L22 13"
        stroke="#7E8466"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5 21v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3"
        stroke="#7E8466"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function UploadFileGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M20 2.00003H20.44C20.6878 2.00068 20.9266 2.09333 21.11 2.26003L26.67 7.26003C26.7736 7.35352 26.8565 7.46766 26.9133 7.59511C26.9701 7.72256 26.9997 7.86049 27 8.00003H21C20.7348 8.00003 20.4804 7.89467 20.2929 7.70714C20.1054 7.5196 20 7.26525 20 7.00003V2.00003ZM27 10V27C26.9661 27.8232 26.6091 28.5999 26.0063 29.1615C25.4035 29.7231 24.6035 30.0244 23.78 30H8.22C7.39647 30.0244 6.59654 29.7231 5.99373 29.1615C5.39092 28.5999 5.03386 27.8232 5 27V5.00003C5.03386 4.17684 5.39092 3.40019 5.99373 2.83856C6.59654 2.27694 7.39647 1.97564 8.22 2.00003H18V7.00003C18 7.79568 18.3161 8.55874 18.8787 9.12135C19.4413 9.68396 20.2044 10 21 10H27ZM19.71 15.29L16.71 12.29C16.617 12.1963 16.5064 12.1219 16.3846 12.0711C16.2627 12.0204 16.132 11.9942 16 11.9942C15.868 11.9942 15.7373 12.0204 15.6154 12.0711C15.4936 12.1219 15.383 12.1963 15.29 12.29L12.29 15.29C12.1017 15.4783 11.9959 15.7337 11.9959 16C11.9959 16.2663 12.1017 16.5217 12.29 16.71C12.4783 16.8983 12.7337 17.0041 13 17.0041C13.2663 17.0041 13.5217 16.8983 13.71 16.71L15 15.41V22C15 22.2652 15.1054 22.5196 15.2929 22.7071C15.4804 22.8947 15.7348 23 16 23C16.2652 23 16.5196 22.8947 16.7071 22.7071C16.8946 22.5196 17 22.2652 17 22V15.41L18.29 16.71C18.383 16.8038 18.4936 16.8782 18.6154 16.9289C18.7373 16.9797 18.868 17.0058 19 17.0058C19.132 17.0058 19.2627 16.9797 19.3846 16.9289C19.5064 16.8782 19.617 16.8038 19.71 16.71C19.8037 16.6171 19.8781 16.5065 19.9289 16.3846C19.9797 16.2627 20.0058 16.132 20.0058 16C20.0058 15.868 19.9797 15.7373 19.9289 15.6155C19.8781 15.4936 19.8037 15.383 19.71 15.29Z"
        fill="#7E8466"
      />
    </svg>
  )
}

export function ContactSubmissionForm({
  className,
  source,
  style,
  variant,
}: ContactSubmissionFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const pathname = usePathname()
  const [fileLabel, setFileLabel] = useState('No files selected')
  const [pending, setPending] = useState(false)
  const [state, setState] = useState<SubmitState>({ message: '', status: 'idle' })
  const light = variant === 'light'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setState({ message: '', status: 'idle' })

    try {
      const response = await fetch('/contact/submit', {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      })
      const result = (await response.json()) as { message?: string; ok?: boolean }

      if (!response.ok || !result.ok) {
        setState({
          message: result.message ?? 'Something went wrong. Please try again.',
          status: 'error',
        })
        return
      }

      formRef.current?.reset()
      setFileLabel('No files selected')
      setState({
        message: result.message ?? 'Your request has been sent.',
        status: 'success',
      })
    } catch {
      setState({
        message: 'Something went wrong. Please try again.',
        status: 'error',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      action="/contact/submit"
      className={
        className ??
        (light
          ? 'grid content-start gap-6 bg-white p-8 max-md:p-6'
          : 'flex flex-1 flex-col gap-6 bg-novatek-bg p-8 max-md:p-6')
      }
      data-reveal
      encType="multipart/form-data"
      method="post"
      onSubmit={submit}
      ref={formRef}
      style={style}
    >
      <input name="source" type="hidden" value={source} />
      <input name="page" type="hidden" value={pathname} />
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Field
            label="First name"
            name="firstName"
            placeholder={light ? undefined : 'Your first name'}
            required
            variant={variant}
          />
          <Field
            label="Last name"
            name="lastName"
            placeholder={light ? undefined : 'Your last name'}
            variant={variant}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Field
            label="Email address"
            name="email"
            placeholder={light ? undefined : 'you@example.com'}
            required
            type="email"
            variant={variant}
          />
          <Field
            label="Phone number"
            name="phone"
            placeholder={light ? undefined : '+359 ...'}
            type="tel"
            variant={variant}
          />
        </div>
        <label
          className={`grid gap-2 text-base font-medium leading-[1.45] ${
            light ? 'text-novatek-muted' : 'text-white'
          }`}
        >
          <FieldLabel label="Project description" required variant={variant} />
          <textarea
            className={
              light
                ? 'h-[78px] resize-y border border-white/10 bg-novatek-soft px-6 py-4 text-base font-medium text-novatek-bg outline-none transition-colors focus:border-novatek-primary'
                : 'min-h-[78px] resize-y border border-white/15 bg-transparent px-4 py-3 text-base font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-novatek-primary'
            }
            name="message"
            placeholder={light ? undefined : 'Tell us what you need manufactured or engineered'}
            required
          />
        </label>
        <label
          className={`grid cursor-pointer gap-2 text-base font-medium leading-[1.45] ${
            light ? 'text-novatek-muted' : 'text-novatek-muted'
          }`}
        >
          <span>Upload files</span>
          <span
            className={
              light
                ? 'grid cursor-pointer justify-items-center gap-4 border border-white/10 bg-novatek-primary/10 px-6 py-4 text-center'
                : 'flex min-h-[116px] flex-col items-center justify-center gap-4 border border-white/10 bg-novatek-primary/10 px-6 py-4'
            }
          >
            {light ? <UploadFileGlyph /> : <UploadArrowGlyph />}
            <span className="max-w-[518px] text-center text-sm font-semibold leading-[1.25] text-novatek-primary">
              Supported formats: {supportedFormats}
            </span>
            <span className="text-center text-sm font-medium leading-[1.25] text-novatek-muted">
              {fileLabel}
            </span>
            <input
              accept={acceptedFileTypes}
              className="hidden"
              multiple
              name="files"
              onChange={(event) => {
                const count = event.currentTarget.files?.length ?? 0
                setFileLabel(
                  count ? `${count} file${count === 1 ? '' : 's'} selected` : 'No files selected',
                )
              }}
              type="file"
            />
          </span>
        </label>
      </div>
      {state.message && (
        <p
          className={`text-sm font-medium leading-[1.45] ${
            state.status === 'success' ? 'text-novatek-primary' : 'text-red-300'
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}
      <p
        className={`text-sm font-medium leading-[1.45] ${
          light ? 'text-novatek-bg/60' : 'text-novatek-muted'
        }`}
      >
        We accept orders and project requests across Europe.
      </p>
      <button
        className="inline-flex min-h-14 w-fit items-center gap-4 whitespace-nowrap bg-novatek-primary py-2 pl-4 pr-2 text-base font-medium text-white transition-colors hover:bg-white hover:text-novatek-bg disabled:cursor-not-allowed disabled:opacity-60 max-md:w-full max-md:justify-between"
        disabled={pending}
        type="submit"
      >
        <span>{pending ? 'Sending...' : 'Send Request'}</span>
        <span
          className="grid size-10 place-items-center bg-novatek-bg text-white"
          aria-hidden="true"
        >
          <ArrowGlyph className="h-3 w-4" />
        </span>
      </button>
    </form>
  )
}
