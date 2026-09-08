import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/products'

export function CategorySection() {
  return (
    <section id="categories" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl italic text-foreground">
              Shop by category
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Five departments. Zero clutter.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={`${category.name} category`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
