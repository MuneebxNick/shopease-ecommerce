'use client'

import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/currency'
import { Separator } from '@/components/ui/separator'

export function CheckoutSummary() {
  const { items, getTotal } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Order Summary
      </h2>
      <div className="mb-6 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative aspect-square size-16 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-medium text-foreground line-clamp-1">{item.name}</span>
              <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
            </div>
            <span className="font-medium text-foreground">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
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
    </div>
  )
}
