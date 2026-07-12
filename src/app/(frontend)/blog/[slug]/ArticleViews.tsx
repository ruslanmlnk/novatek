'use client'

import { useEffect, useRef, useState } from 'react'

export function ArticleViews({ initialViews, slug }: { initialViews: number; slug: string }) {
  const [views, setViews] = useState(initialViews)
  const didTrack = useRef(false)

  useEffect(() => {
    if (didTrack.current) return
    didTrack.current = true

    const storageKey = `novatek:article-viewed:${slug}`
    if (window.sessionStorage.getItem(storageKey)) return

    window.sessionStorage.setItem(storageKey, '1')

    fetch(`/blog/${encodeURIComponent(slug)}/views`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      keepalive: true,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { views?: number } | null) => {
        if (typeof data?.views === 'number') setViews(data.views)
      })
      .catch(() => {
        window.sessionStorage.removeItem(storageKey)
      })
  }, [slug])

  return (
    <span
      className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 text-lg font-medium leading-[1.45] text-white"
      aria-label={`${views} article views`}
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
      <span>{new Intl.NumberFormat('en').format(views)}</span>
    </span>
  )
}
