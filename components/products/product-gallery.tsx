'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-6">
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
      
      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-muted">
        <Image 
          src={images[activeImage] || '/placeholder.svg'} 
          alt={name} 
          fill 
          priority
          className="object-cover" 
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
}
