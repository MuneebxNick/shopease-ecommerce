'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@/lib/utils/currency'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 bg-background" />
        <SiteFooter />
      </div>
    )
  }

  const hasItems = items.length > 0
  const total = getTotal()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shopping Cart
          </h1>

          {!hasItems ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="size-10 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-8 text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link href="/products">
                <Button size="lg">
                  Continue Shopping
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-8">
                <div className="flex flex-col gap-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id}
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 rounded-lg border p-4 sm:p-6"
                      >
                        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md bg-muted sm:w-32">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-foreground sm:text-lg">
                              {item.name}
                            </h3>
                            <span className="font-semibold text-foreground sm:text-lg">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between sm:mt-auto">
                            <div className="flex items-center rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-none"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="size-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <div className="flex w-10 items-center justify-center text-sm font-medium">
                                {item.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="size-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="size-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-foreground">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button className="mt-6 w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
