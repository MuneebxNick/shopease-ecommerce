import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductList } from '@/components/products/product-list'
import { ProductFilters } from '@/components/products/product-filters'
import { getProducts } from '@/lib/api/products'

export const metadata = {
  title: 'All Products — ShopEase',
  description: 'Browse our complete collection of premium products.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.category === 'string' ? params.category : undefined
  const q = typeof params.q === 'string' ? params.q.toLowerCase() : undefined

  let products = await getProducts(category)

  if (q) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <div className="flex-1 bg-muted/20 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 md:mb-12">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              All Products
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover our curated collection of premium essentials designed for everyday living.
            </p>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <aside className="w-full shrink-0 md:w-56 lg:w-64">
              <div className="sticky top-28">
                <ProductFilters />
              </div>
            </aside>

            <div className="flex-1">
              <ProductList products={products} />
            </div>
          </div>
          
        </div>
      </div>
      
      <SiteFooter />
    </main>
  )
}
