'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { CheckoutSummary } from '@/components/checkout/checkout-summary'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Checkout
          </h1>

          {!hasItems ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="size-10 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-8 text-muted-foreground">
                You need to add items to your cart before you can checkout.
              </p>
              <Link href="/products">
                <Button size="lg">
                  Browse Products
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Checkout Form */}
              <div className="order-2 lg:order-1 lg:col-span-7">
                <CheckoutForm />
              </div>

              {/* Order Summary */}
              <div className="order-1 lg:order-2 lg:col-span-5">
                <CheckoutSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
