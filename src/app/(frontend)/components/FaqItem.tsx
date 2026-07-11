'use client'

import { useState, type CSSProperties } from 'react'

import { PlusGlyph } from './IconSet'

type FaqItemProps = {
  question: string
  answer: string
  defaultOpen?: boolean
  /** row — compact rows on the home page; box — padded boxes on service pages */
  variant?: 'row' | 'box'
  style?: CSSProperties
}

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
  variant = 'row',
  style,
}: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={
        variant === 'box'
          ? 'border-b border-white/10 p-8 max-md:p-6'
          : 'border-b border-white/10 py-7'
      }
      data-reveal
      style={style}
    >
      <button
        className={`flex w-full cursor-pointer items-center justify-between gap-5 text-left font-semibold text-white ${
          variant === 'box' ? 'text-xl leading-[1.45]' : 'text-xl max-md:text-lg max-md:font-medium'
        }`}
        onClick={() => setOpen((current) => !current)}
        type="button"
        aria-expanded={open}
      >
        {question}
        <span
          className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-novatek-primaryLight to-novatek-primary text-white transition-transform duration-300 ${
            variant === 'box' ? 'size-9' : 'size-[30px] max-md:size-9'
          } ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <PlusGlyph />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`text-lg font-medium text-novatek-muted ${
              variant === 'box' ? 'pt-6 leading-[1.45]' : 'pr-[52px] pt-4'
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}
