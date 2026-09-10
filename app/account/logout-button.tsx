'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start h-14 text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors" 
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="mr-2 h-5 w-5" />
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
