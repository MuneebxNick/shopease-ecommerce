'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function WishlistButton({ 
  productId, 
  className,
  iconClassName 
}: { 
  productId: string; 
  className?: string;
  iconClassName?: string;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check auth and wishlist state
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true)
          // Fetch wishlist
          fetch('/api/wishlist')
            .then((res) => res.json())
            .then((wl) => {
              if (wl.wishlist?.includes(productId)) {
                setIsWishlisted(true)
              }
            })
        }
      })
      .catch(() => setIsLoggedIn(false))
  }, [productId])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${pathname}`)
      return
    }

    setIsLoading(true)
    try {
      if (isWishlisted) {
        await fetch('/api/wishlist', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        setIsWishlisted(false)
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        setIsWishlisted(true)
      }
    } catch (error) {
      console.error('Wishlist toggle failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm transition-all hover:bg-background hover:scale-110", className)}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground",
          iconClassName
        )}
      />
    </button>
  )
}
