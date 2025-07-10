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
  
  // Decode the session cookie to get user role
  let userRole: string | null = null;
  try {
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf8');
    const sessionData = JSON.parse(decoded);
    userRole = sessionData.role;
  } catch (error) {
    console.error('Error decoding session cookie:', error);
    // If decoding fails, treat as unauthenticated
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Role-based redirection
  if (pathname.startsWith('/admin')) {
    if (userRole === 'admin') {
      // Regular admin trying to access superadmin area, redirect to their dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'superadmin') {
      // Superadmin can access /admin
      return NextResponse.next();
    }
  }
  
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
