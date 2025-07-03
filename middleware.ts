import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  
  // Paths specifically for API authentication
  const authApiPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/session'];
  const isAuthApiPath = authApiPaths.some(path => request.nextUrl.pathname === path);
  
  // Check if path is an API route that needs protection
  const isApiPath = request.nextUrl.pathname.startsWith('/api/admin');
  
  // Get session cookie
  const sessionCookie = request.cookies.get('admin_session');

  // Allow public paths and auth API paths
  if (isPublicPath || isAuthApiPath) {
    return NextResponse.next();
  }
  
  // Protect API routes
  if (isApiPath && !sessionCookie) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  // Redirect to main page (/) instead of /login
  if (!sessionCookie && request.nextUrl.pathname.startsWith('/admin')) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  // Matcher for paths that this middleware applies to
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
