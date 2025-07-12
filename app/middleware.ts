import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;
  
  console.log(`[Middleware] Processing: ${pathname}, Session: ${sessionCookie ? 'Exists' : 'None'}`);

  // Allow access to login page and API routes without authentication
  if (pathname === '/' || pathname === '/register' || pathname.startsWith('/api/')) {
    console.log(`[Middleware] Allowing public access to: ${pathname}`);
    return NextResponse.next();
  }
  
  // Check if user is logged in
  if (!sessionCookie) {
    console.log(`[Middleware] No session cookie, redirecting to / for: ${pathname}`);
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Decode the session cookie to get user role
  let userRole: string | null = null;
  try {
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf8');
    const sessionData = JSON.parse(decoded);
    userRole = sessionData.role;
    console.log(`[Middleware] Decoded user role: ${userRole} for path: ${pathname}`);
  } catch (error) {
    console.error('[Middleware] Error decoding session cookie:', error);
    // If decoding fails, treat as unauthenticated
    console.log(`[Middleware] Decoding error, redirecting to / for: ${pathname}`);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Role-based redirection
  if (userRole === 'superadmin') {
    // Superadmin can access /admin and /dashboard
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
      console.log(`[Middleware] Superadmin access granted to: ${pathname}`);
      return NextResponse.next();
    }
  } else if (userRole === 'admin1') { // This is admin1
    // Admin1 can only access /dashboard
    if (pathname.startsWith('/dashboard')) {
      console.log(`[Middleware] Admin1 access granted to: ${pathname}`);
      return NextResponse.next();
    } else if (pathname.startsWith('/admin')) { // Admin1 trying to access superadmin area
      console.log(`[Middleware] Admin1 tried to access ${pathname}, redirecting to /dashboard`);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (userRole === 'admin2') {
    // Admin2 can only access /admin2
    if (pathname.startsWith('/admin2')) {
      console.log(`[Middleware] Admin2 access granted to: ${pathname}`);
      return NextResponse.next();
    } else if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) { // Admin2 trying to access dashboard or superadmin area
      console.log(`[Middleware] Admin2 tried to access ${pathname}, redirecting to /admin2`);
      return NextResponse.redirect(new URL('/admin2', request.url));
    }
  } else if (userRole === 'petugas') {
    // Petugas can only access /petugas
    if (pathname.startsWith('/petugas')) {
      console.log(`[Middleware] Petugas access granted to: ${pathname}`);
      return NextResponse.next();
    } else if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/admin2')) {
      console.log(`[Middleware] Petugas tried to access ${pathname}, redirecting to /petugas`);
      return NextResponse.redirect(new URL('/petugas', request.url));
    }
  }

  // If none of the above role-based rules apply, and it's not a public path, redirect to unauthorized
  if (!(pathname === '/' || pathname === '/register' || pathname.startsWith('/api/'))) {
    console.log(`[Middleware] Unauthorized access for role ${userRole} to: ${pathname}, redirecting to /unauthorized`);
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  console.log(`[Middleware] No specific rule, allowing access to: ${pathname}`);
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
