import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;
  
  // Allow access to login page and API routes without authentication
  if (pathname === '/' || pathname === '/register' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Check if user is logged in
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // For role-based access control, we would need to decode the session
  // or check a cached value - for now, we'll just allow access if logged in
  
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
