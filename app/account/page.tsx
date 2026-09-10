import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  User as UserIcon, 
  Settings, 
  Heart, 
  ShoppingCart, 
  Calendar,
  ChevronRight
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

  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '2024';

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

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          <div className="flex flex-col justify-center rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-card-foreground">0</h4>
              <p className="text-xs text-muted-foreground mt-1">Track your purchases</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Cart Items</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-card-foreground">0</h4>
              <p className="text-xs text-muted-foreground mt-1">Items waiting</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Wishlist</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-card-foreground">0</h4>
              <p className="text-xs text-muted-foreground mt-1">Saved for later</p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-card-foreground">{memberSince}</h4>
              <p className="text-xs text-muted-foreground mt-1">Premium shopper</p>
            </div>
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
              <div className="w-full pt-6 border-t">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
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
                <Link href="/#wishlist" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center">
                    <Heart className="mr-3 h-5 w-5 text-muted-foreground" />
                    Wishlist
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="/#settings" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center">
                    <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
                    Account Settings
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
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="font-semibold text-card-foreground">Recent Orders</h3>
              </div>
              
              {/* Empty State */}
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
