'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { WishlistButton } from '@/components/products/wishlist-button'

export function ProductGallery({ images, name, productId }: { images: string[], name: string, productId: string }) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col-reverse gap-4 md:flex-row md:gap-6"
    >
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 md:flex-col md:pb-0 [&::-webkit-scrollbar]:hidden">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                activeImage === index ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image 
                src={img || '/placeholder.svg'} 
                alt={`${name} - View ${index + 1}`} 
                fill 
                className="object-cover" 
                crossOrigin="anonymous"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-muted group">
        <Image 
          src={images[activeImage] || '/placeholder.svg'} 
          alt={name} 
          fill 
          priority
          className="object-cover" 
          crossOrigin="anonymous"
        />
        <div className="absolute right-4 top-4 z-10">
          <WishlistButton productId={productId} className="h-10 w-10 sm:h-12 sm:w-12" iconClassName="size-5" />
        </div>
      </div>
    </motion.div>
  )
}
