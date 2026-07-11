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

export function CategoryFilters({ categories, label }: { categories: string[]; label: string }) {
  const { category, setCategory } = useCategoryFilter()

  return (
    <nav
      className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-lg font-medium leading-[1.45] text-white max-md:text-base"
      aria-label={label}
    >
      {categories.map((item) => (
        <button
          className="inline-flex cursor-pointer items-center gap-4"
          onClick={() => setCategory(item)}
          type="button"
          key={item}
        >
          <span className="text-white/20">/</span>
          <span
            className={
              item === category ? 'border-b border-novatek-primary text-novatek-primary' : undefined
            }
          >
            {item}
          </span>
        </button>
      ))}
    </nav>
  )
}
