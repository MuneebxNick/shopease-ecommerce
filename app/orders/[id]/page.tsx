import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import dbConnect from '@/lib/db/mongodb'
import Order from '@/models/Order'
import { notFound, redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/get-current-user'
import mongoose from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const tokenUser = await getCurrentUser();
  if (!tokenUser) {
    redirect('/login');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await dbConnect()
  const order = await Order.findOne({ _id: id, userId: tokenUser.userId }).lean()

  if (!order) {
    return notFound()
  }

  const orderDate = new Date(order.createdAt as Date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 size-4" />
              Back to Shop
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
                Order {order.orderNumber}
              </h1>
              <p className="text-muted-foreground">Placed on {orderDate}</p>
            </div>
            <div>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground capitalize">
                {order.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-foreground">Items Ordered</h2>
                </div>
                <div className="divide-y divide-border">
                  {order.items.map((item: any) => (
                    <div key={item.productId} className="flex gap-4 p-6">
                      <div className="relative size-20 rounded-md bg-muted overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-foreground line-clamp-2">{item.name}</h3>
                          <p className="font-medium text-foreground ml-4">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-muted/20 border-t flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">Rs. {order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-lg border bg-card shadow-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h2>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{order.customer.fullName}</p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city}, {order.customer.postalCode}</p>
                  <p className="pt-2">{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
              </div>

              <div className="rounded-lg border bg-card shadow-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
                <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
