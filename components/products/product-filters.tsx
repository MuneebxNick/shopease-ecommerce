'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports']

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get('category')
  const currentQuery = searchParams.get('q') || ''
  
  const [searchValue, setSearchValue] = useState(currentQuery)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`${pathname}?${createQueryString('q', searchValue)}`)
  }

  const handleCategoryChange = (category: string) => {
    const newCategory = currentCategory === category ? '' : category
    router.push(`${pathname}?${createQueryString('category', newCategory)}`)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-foreground">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input 
            type="search" 
            placeholder="Search products..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button type="submit" variant="secondary">Go</Button>
        </form>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
