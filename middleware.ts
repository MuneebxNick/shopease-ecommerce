import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const protectedRoutes = ['/account', '/orders', '/checkout'];
  const isProtectedRoute = protectedRoutes.some((route) => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account',
    '/account/:path*',
    '/orders',
    '/orders/:path*',
    '/checkout',
    '/checkout/:path*'
  ],
};
