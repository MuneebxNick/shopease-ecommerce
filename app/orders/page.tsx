import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';
import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'My Orders | ShopEase',
};

export default async function OrdersPage() {
  const tokenUser = await getCurrentUser();

  if (!tokenUser) {
    redirect('/login');
  }

  await dbConnect();

  const orders = await Order.find({ userId: tokenUser.userId })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              View and track your recent purchases.
            </p>
          </div>
          <Link href="/account">
            <Button variant="outline">Back to Account</Button>
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-16 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-card-foreground">No orders found</h2>
            <p className="mb-6 max-w-sm text-muted-foreground">
              You haven't placed any orders yet. Start exploring our collection to find something you love.
            </p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div 
                key={order._id.toString()} 
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="space-y-3 sm:space-y-1 mb-4 sm:mb-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-foreground">
                      {order.orderNumber}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary-foreground">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <p>
                      Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <p>•</p>
                    <p>
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                    <p>•</p>
                    <p className="font-medium text-foreground">
                      Total: Rs. {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex shrink-0">
                  <Link href={`/orders/${order._id.toString()}`} className="w-full sm:w-auto">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
