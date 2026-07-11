'use client'

import { useEffect, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import { BlogCard } from './BlogCard'
import { useCategoryFilter } from './CategoryFilter'
import { ArrowGlyph } from './IconSet'

export type BlogCardData = {
  slug: string
  category: string
  date: string
  title: string
  description: string
  image: string
}

const PAGE_SIZE = 9

export function BlogGrid({
  locale = 'en',
  nextLabel = 'Next',
  posts,
}: {
  locale?: Locale
  nextLabel?: string
  posts: BlogCardData[]
}) {
  const { category } = useCategoryFilter()
  const [page, setPage] = useState(0)

  useEffect(() => setPage(0), [category])

  const filteredPosts =
    category === 'All' ? posts : posts.filter((post) => post.category === category)
  const pageCount = Math.max(Math.ceil(filteredPosts.length / PAGE_SIZE), 1)
  const visiblePosts = filteredPosts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const goToNextPage = () => {
    setPage((current) => (current + 1) % pageCount)
    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12" id="blog-grid">
      <div className="mx-auto grid max-w-content gap-12">
        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1" data-reveal>
          {visiblePosts.map((post) => (
            <BlogCard locale={locale} post={post} key={post.slug} />
          ))}
        </div>
        {pageCount > 1 && (
          <div className="flex items-center justify-between gap-8 pl-[calc(50%-24px)] max-md:pl-0">
            <p className="text-xl font-semibold leading-[1.45] text-white">
              {page + 1} / {pageCount}
            </p>
            <button
              className="inline-flex items-center gap-4 border border-white/20 bg-novatek-bg py-2 pl-4 pr-2 text-base font-medium text-white"
              onClick={goToNextPage}
              type="button"
            >
              <span>{nextLabel}</span>
              <span
                className="grid size-10 place-items-center bg-white text-novatek-bg"
                aria-hidden="true"
              >
                <ArrowGlyph className="h-3 w-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
