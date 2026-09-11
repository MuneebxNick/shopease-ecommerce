'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils/currency';
import type { Product } from '@/lib/data/products';

export default function WishlistPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login?callbackUrl=/wishlist');
          return;
        }
        setIsAuthed(true);
        return fetch('/api/wishlist');
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data) {
          setWishlistIds(data.wishlist || []);
          setWishlistProducts(data.products || []);
        }
      })
      .catch(() => {
        router.push('/login?callbackUrl=/wishlist');
      });
  }, [router]);

  const handleRemove = async (productId: string) => {
    try {
      await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      setWishlistProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (isAuthed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later.
            </p>
          </div>
          <Link href="/account">
            <Button variant="outline">Back to Account</Button>
          </Link>
        </div>

        {/* Wishlist Items */}
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-16 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-card-foreground">No wishlist items yet</h2>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Browse our products and tap the heart icon to save items you love.
            </p>
            <Link href="/products">
              <Button>Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                {/* Product Image */}
                <Link href={`/products/${product.slug}`} className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {product.category}
                    </p>
                    <Link href={`/products/${product.slug}`} className="hover:underline">
                      <h3 className="text-base font-medium text-foreground">{product.name}</h3>
                    </Link>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center gap-2 sm:justify-center">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 sm:flex-none"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(product.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
