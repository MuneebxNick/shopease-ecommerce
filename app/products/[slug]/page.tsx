import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductGallery } from '@/components/products/product-gallery'
import { AddToCartButton } from '@/components/products/add-to-cart-button'
import { getProductBySlug } from '@/lib/api/products'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  if (!product) return {}
  return {
    title: `${product.name} — ShopEase`,
    description: product.description,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  // Ensure images array exists and has content for gallery
  const images = (product.images && product.images.length > 0) ? product.images : [product.image]

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <div className="flex-1 bg-background pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Left: Gallery */}
            <div>
              <ProductGallery images={images} name={product.name} />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {product.category}
                </span>
                {product.isNew && <Badge className="bg-foreground text-background">New</Badge>}
                {discount && <Badge variant="secondary">-{discount}%</Badge>}
              </div>

              <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              
              <div className="mb-6 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200 dark:fill-gray-800 dark:text-gray-800'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-8 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <Separator className="mb-8" />

              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Availability</span>
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <SiteFooter />
    </main>
  )
}
