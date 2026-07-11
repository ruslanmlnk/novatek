'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type CategoryFilterValue = {
  category: string
  setCategory: (category: string) => void
}

const CategoryFilterContext = createContext<CategoryFilterValue>({
  category: 'All',
  setCategory: () => {},
})

export function CategoryFilterProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState('All')

  return (
    <CategoryFilterContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryFilterContext.Provider>
  )
}

export function useCategoryFilter() {
  return useContext(CategoryFilterContext)
}

export function CategoryFilters({
  allLabel = 'All',
  categories,
  label,
}: {
  allLabel?: string
  categories: string[]
  label: string
}) {
  const { category, setCategory } = useCategoryFilter()
  // 'All' is an internal sentinel value the grids filter by; only its label is localized
  const items = [
    { value: 'All', label: allLabel },
    ...categories.map((item) => ({ value: item, label: item })),
  ]

  return (
    <nav
      className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg font-medium leading-[1.45] text-white max-md:text-base"
      aria-label={label}
    >
      {items.map((item) => (
        <button
          className="inline-flex cursor-pointer items-center gap-4"
          onClick={() => setCategory(item.value)}
          type="button"
          key={item.value}
        >
          <span className="text-white/20">/</span>
          <span
            className={
              item.value === category
                ? 'border-b border-novatek-primary text-novatek-primary'
                : undefined
            }
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
