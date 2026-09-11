import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  User as UserIcon, 
  Heart, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoutButton } from './logout-button';

export const metadata = {
  title: 'My Account | ShopEase',
};

export default async function AccountPage() {
  const tokenUser = await getCurrentUser();

  if (!tokenUser) {
    redirect('/login');
  }

  await dbConnect();
  const user = await User.findById(tokenUser.userId).lean();

  if (!user) {
    redirect('/login');
  }

  const recentOrders = await Order.find({ userId: tokenUser.userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold tracking-tight lg:text-4xl">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Your ShopEase dashboard. Track orders, manage your account, and continue shopping.
            </p>
          </div>
        </div>


        <div className="grid gap-8 md:grid-cols-12 lg:gap-10 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            
            {/* Modern Profile Card */}
            <div className="rounded-xl border bg-card shadow-sm p-8 text-center flex flex-col items-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-bold text-card-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-semibold capitalize text-foreground">
                {user.role} Account
              </div>
              </div>

            {/* Quick Actions Menu */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-muted/40">
                <h3 className="font-semibold text-card-foreground">Quick Actions</h3>
              </div>
              <div className="p-2">
                <Link href="/orders" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center">
                    <Package className="mr-3 h-5 w-5 text-muted-foreground" />
                    My Orders
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="/products" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center">
                    <ShoppingBag className="mr-3 h-5 w-5 text-muted-foreground" />
                    Continue Shopping
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="/wishlist" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center">
                    <Heart className="mr-3 h-5 w-5 text-muted-foreground" />
                    Wishlist
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>

                <div className="p-1 pt-3 mt-2 border-t">
                  <LogoutButton />
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 lg:col-span-8">
            
            {/* Recent Orders Section */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-4">
                <h3 className="font-semibold text-card-foreground">Recent Orders</h3>
                {recentOrders.length > 0 && (
                  <Link href="/orders">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      View All Orders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
              
              {recentOrders.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <Package className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h4 className="mb-2 text-base font-medium text-card-foreground">No orders yet</h4>
                  <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                    Start shopping and your purchases will appear here.
                  </p>
                  <Link href="/products">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {recentOrders.map((order: any) => (
                    <div key={order._id.toString()} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/20 transition-colors">
                      <div className="space-y-2 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-bold text-foreground">
                            {order.orderNumber}
                          </h4>
                          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary-foreground">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <p>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          <p>•</p>
                          <p className="font-medium text-foreground">Rs. {order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <Link href={`/orders/${order._id.toString()}`}>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
