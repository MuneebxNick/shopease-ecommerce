'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    // TODO: Integrate Zustand cart store in future
    console.log('Adding to cart:', productId)
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
