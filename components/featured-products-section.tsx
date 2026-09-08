import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

export function FeaturedProductsSection() {
  return (
    <section id="new-arrivals" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl italic text-foreground">
              New arrivals
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fresh in, ready to ship.
            </p>
          </div>
          <Link href="/products" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" className="w-full">
              View all
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
