'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart-store'

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const clearCart = useCartStore((state) => state.clearCart)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      clearCart()
      
      // Redirect after a brief moment
      setTimeout(() => {
        router.push('/products')
      }, 3000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center shadow-sm">
        <CheckCircle2 className="mb-4 size-16 text-green-500" />
        <h2 className="mb-2 text-2xl font-bold">Order Placed Successfully!</h2>
        <p className="text-muted-foreground">
          Thank you for your purchase. You will be redirected shortly...
        </p>
      </div>
    )
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
            <Input id="fullName" required placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input id="email" type="email" required placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</label>
            <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-foreground">Address</label>
            <Input id="address" required placeholder="123 Main St" />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-foreground">City</label>
            <Input id="city" required placeholder="New York" />
          </div>
          <div className="space-y-2">
            <label htmlFor="postalCode" className="text-sm font-medium text-foreground">Postal Code</label>
            <Input id="postalCode" required placeholder="10001" />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  )
}
