'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      router.push('/account');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-zinc-900 lg:block">
        <Image
          src="/images/auth-shopping-banner.jpg"
          alt="Premium Modest Shopping Experience"
          fill
          className="object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent z-0" />
        
        <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-white hover:text-white/90 transition-colors w-fit">
            ShopEase
          </Link>
          
          <div className="mb-12">
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-white xl:text-5xl">
              Shop smarter, <br /> live better
            </h2>
            <p className="max-w-md text-lg text-zinc-300">
              Discover quality fashion, essentials, and everyday picks curated for modern lifestyles.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Authentication Form */}
      <div className="flex w-full items-center justify-center px-4 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-serif text-3xl font-bold tracking-tight lg:text-4xl">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to continue your shopping journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="muneeb@gmail.com" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                className="h-11 px-4"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="h-11 px-4 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            
            <Button className="h-11 w-full text-base font-semibold" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground lg:text-left">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
