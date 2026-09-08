'use client'

import { useState } from 'react'
import { ShoppingBag, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/data/products'
import { useCartStore } from '@/store/cart-store'
import { motion, AnimatePresence } from 'framer-motion'

export function AddToCartButton({ product }: { product: Product }) {
  const [status, setStatus] = useState<'idle' | 'adding' | 'success'>('idle')
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    setStatus('adding')
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    }, 600)
  }

  return (
    <Button 
      size="lg" 
      className={`w-full gap-2 relative overflow-hidden transition-colors duration-300 ${status === 'success' ? 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
      onClick={handleAddToCart}
      disabled={status !== 'idle'}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="idle" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="flex items-center gap-2">
            <ShoppingBag className="size-4" /> Add to Cart
          </motion.div>
        )}
        {status === 'adding' && (
          <motion.div key="adding" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Adding...
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div key="success" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="flex items-center gap-2">
            <Check className="size-4" /> Added
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
