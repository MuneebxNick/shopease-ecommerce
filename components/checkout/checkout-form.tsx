'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart-store'
import { useRouter } from 'next/navigation'

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { items, clearCart } = useCartStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const customer = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      clearCart()
      router.push(`/order-success?orderId=${data.orderId}`)
    } catch (err: any) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Shipping Information
        </h2>
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
            <Input id="fullName" name="fullName" required placeholder="Ali Hassan" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input id="email" name="email" type="email" required placeholder="ali@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
            <Input id="phone" name="phone" type="tel" required placeholder="03XX-XXXXXXX" />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-foreground">Complete Address</label>
            <Input id="address" name="address" required placeholder="House 123, Street 4, Phase 5" />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-foreground">City</label>
            <Input id="city" name="city" required placeholder="Lahore" />
          </div>
          <div className="space-y-2">
            <label htmlFor="postalCode" className="text-sm font-medium text-foreground">Postal Code</label>
            <Input id="postalCode" name="postalCode" required placeholder="54000" />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  )
}
