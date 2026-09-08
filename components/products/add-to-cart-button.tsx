'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/data/products'
import { useCartStore } from '@/store/cart-store'

export function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Button 
      size="lg" 
      className="w-full gap-2" 
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingBag className="size-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}
