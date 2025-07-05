import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ['/login', '/', '/register']; // Added '/' to public paths
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + '/'));
  
  // Paths specifically for API authentication
  const authApiPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/me', '/api/auth/logout']; // Added /api/auth/me and /api/auth/logout
  const isAuthApiPath = authApiPaths.some(path => request.nextUrl.pathname === path);
  
  // Check if path is an API route that needs protection
  const isApiPath = request.nextUrl.pathname.startsWith('/api/admin');
  
  // Get session cookie
  const sessionCookie = request.cookies.get('admin_session');

  // Allow public paths and auth API paths
  if (isPublicPath || isAuthApiPath) {
    return NextResponse.next();
  }
  
  // If no session cookie, redirect to login (main page)
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Decode the session cookie to get user role
  let userRole: string | null = null;
  try {
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf8');
    const sessionData = JSON.parse(decoded);
    userRole = sessionData.role;
  } catch (error) {
    console.error('Error decoding session cookie in root middleware:', error);
    // If decoding fails, treat as unauthenticated
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect API routes based on role
  if (isApiPath) {
    if (!userRole) {
      return NextResponse.json({ message: 'Unauthorized: No role found in session' }, { status: 401 });
    }
    // Further granular API protection can be added here if needed
  }
  
  // Role-based redirection for UI routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (userRole === 'admin') {
      // Regular admin trying to access superadmin area, redirect to their dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'superadmin') {
      // Superadmin can access /admin
      return NextResponse.next();
    } else {
      // Unknown role trying to access admin, redirect to main page
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (userRole === 'superadmin') {
      // Superadmin trying to access regular admin dashboard, redirect to their admin page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Matcher for paths that this middleware applies to
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard/:path*',
    '/api/auth/me',
    '/api/auth/logout',
  ],
};
