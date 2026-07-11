'use client'

import { useEffect, useMemo, useState } from 'react'

type ShareLink = {
  label: string
  type: 'native' | 'viber' | 'telegram' | 'whatsapp'
  evenOdd?: boolean
  d: string
}

type ArticleShareLinksProps = {
  links: readonly ShareLink[]
  title: string
  url: string
}

function encodedShareText(title: string, url: string): string {
  return encodeURIComponent(`${title}\n${url}`)
}

export function ArticleShareLinks({ links, title, url }: ArticleShareLinksProps) {
  const [shareUrl, setShareUrl] = useState(url)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const hrefs = useMemo(() => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(title)
    const text = encodedShareText(title, shareUrl)

    return {
      viber: `viber://forward?text=${text}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${text}`,
    }
  }, [shareUrl, title])

  async function shareNative() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl })
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, type, d, evenOdd }) => {
        const icon = (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={d}
              fill="white"
              fillRule={evenOdd ? 'evenodd' : undefined}
              clipRule={evenOdd ? 'evenodd' : undefined}
            />
          </svg>
        )
        const className =
          'grid size-10 place-items-center bg-novatek-primary transition-opacity hover:opacity-90'

        if (type === 'native') {
          return (
            <button
              className={className}
              type="button"
              aria-label={copied ? 'Article link copied' : label}
              title={copied ? 'Article link copied' : label}
              onClick={shareNative}
              key={label}
            >
              {icon}
            </button>
          )
        }

        return (
          <a
            className={className}
            href={hrefs[type]}
            aria-label={label}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            key={label}
          >
            {icon}
          </a>
        )
      })}
    </div>
  )
}
