import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) *
          100
      )
    : null

  return (
    <div className="group flex flex-col gap-3">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted block">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge className="bg-foreground text-background">New</Badge>}
          {discount && <Badge variant="secondary">{`-${discount}%`}</Badge>}
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`} className="hover:underline w-fit">
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <Button size="sm" variant="outline">
          Add to cart
        </Button>
      </div>
    </div>
  )
}
