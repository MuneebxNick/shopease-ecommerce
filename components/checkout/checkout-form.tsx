'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart-store'

export function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const clearCart = useCartStore((state) => state.clearCart)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      onSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
            <Input id="fullName" required placeholder="Ali Hassan" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input id="email" type="email" required placeholder="ali@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
            <Input id="phone" type="tel" required placeholder="03XX-XXXXXXX" />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-foreground">Complete Address</label>
            <Input id="address" required placeholder="House 123, Street 4, Phase 5" />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-foreground">City</label>
            <Input id="city" required placeholder="Lahore" />
          </div>
          <div className="space-y-2">
            <label htmlFor="postalCode" className="text-sm font-medium text-foreground">Postal Code</label>
            <Input id="postalCode" required placeholder="54000" />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  )
}
