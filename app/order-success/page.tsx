import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import dbConnect from '@/lib/db/mongodb'
import Order from '@/models/Order'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { orderId } = await searchParams;

  if (!orderId || typeof orderId !== 'string') {
    return notFound()
  }

  await dbConnect()
  const order = await Order.findById(orderId).lean()

  if (!order) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background pb-16 pt-8 md:pb-24 md:pt-12 flex items-center justify-center">
        <div className="w-full max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-12 text-center shadow-lg max-w-lg mx-auto">
            <div className="relative mb-6">
              <CheckCircle2 className="size-24 text-green-500 relative z-10" />
            </div>
            <h2 className="mb-3 text-4xl font-bold font-serif tracking-tight">Order Confirmed!</h2>
            <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
              Thank you for shopping with ShopEase.
            </p>
            
            <div className="mb-10 w-full rounded-lg bg-muted/50 p-6 text-left">
              <div className="flex justify-between border-b pb-4 mb-4">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-medium text-foreground">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-4 mb-4">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize text-foreground">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium text-foreground">Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link href={`/orders/${order._id}`}>
                <Button variant="outline" size="lg">
                  View My Order
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg">
                  <ShoppingBag className="mr-2 size-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
