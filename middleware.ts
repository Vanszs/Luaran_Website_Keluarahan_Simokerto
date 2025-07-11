import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Debug info - helpful for troubleshooting
  console.log(`Middleware processing: ${request.nextUrl.pathname}`);

  // Paths that don't require authentication
  const publicPaths = ['/login', '/', '/register', '/api/public', '/assets', '/favicon.ico']; // Added more public paths
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + '/'));
  
  // Paths specifically for API authentication
  const authApiPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/me', '/api/auth/logout', '/api/auth/session']; // Added session endpoint
  const isAuthApiPath = authApiPaths.some(path => request.nextUrl.pathname === path);
  
  // Check if path is an API route that needs protection
  const isApiPath = request.nextUrl.pathname.startsWith('/api/admin');
  
  // Check for session in cookie or Authorization header (for mobile clients)
  const sessionCookie = request.cookies.get('admin_session');
  const authHeader = request.headers.get('Authorization');
  let sessionValue = sessionCookie?.value;
  
  // Extract token from Authorization header if present (Bearer token format)
  if (!sessionValue && authHeader?.startsWith('Bearer ')) {
    sessionValue = authHeader.substring(7);
  }

  // Allow public paths and auth API paths
  if (isPublicPath || isAuthApiPath) {
    return NextResponse.next();
  }
  
  // If no session found in either cookie or header, redirect to login
  if (!sessionValue) {
    // For API requests, return 401 instead of redirecting
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Decode the session value to get user role
  let userRole: string | null = null;
  try {
    const decoded = Buffer.from(sessionValue, 'base64').toString('utf8');
    const sessionData = JSON.parse(decoded);
    userRole = sessionData.role;
    console.log(`Decoded user role: ${userRole} for path: ${request.nextUrl.pathname}`);
    
    // Check for session expiration (optional - 7 days)
    // Only apply this check if timestamp exists in the session
    if (sessionData.timestamp) {
      const timestamp = sessionData.timestamp;
      const now = new Date().getTime();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      
      // More lenient check - add an extra day to account for clock differences
      if (now - timestamp > (sevenDaysMs + 86400000)) {
        console.warn('Session expired');
        // For API requests, return 401 instead of redirecting
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json({ message: 'Session expired' }, { status: 401 });
        }
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('admin_session'); // Clear the expired cookie
        return response;
      }
    }
  } catch (error) {
    console.error('Error decoding session in root middleware:', error);
    // If decoding fails, treat as unauthenticated and clear the invalid cookie
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('admin_session'); // Clear the invalid cookie
    return response;
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
    if (userRole === 'admin1' || userRole === 'admin2') {
      // Regular admin trying to access superadmin area, redirect to their dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'superadmin') {
      // Superadmin can access /admin
      return NextResponse.next();
    } else if (userRole === 'petugas') {
      // Petugas role redirect to petugas dashboard
      return NextResponse.redirect(new URL('/petugas', request.url));
    } else {
      // Unknown role trying to access admin, redirect to main page
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log(`Dashboard access: user role = ${userRole}`);
    if (userRole === 'superadmin') {
      // Superadmin trying to access regular admin dashboard, redirect to their admin page
      console.log('Redirecting superadmin from dashboard to admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (userRole === 'admin1') {
      // Regular admin1 can access /dashboard
      console.log('Admin1 accessing dashboard - allowing');
      return NextResponse.next();
    } else if (userRole === 'admin2') {
      // Admin2 redirect to admin2 dashboard
      console.log('Redirecting admin2 from dashboard to admin2');
      return NextResponse.redirect(new URL('/admin2', request.url));
    } else if (userRole === 'petugas') {
      // Petugas role redirect to petugas dashboard
      console.log('Redirecting petugas from dashboard to petugas');
      return NextResponse.redirect(new URL('/petugas', request.url));
    } else {
      // Unknown role trying to access dashboard, redirect to main page
      console.log('Unknown role trying to access dashboard, redirecting to main');
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/admin2')) {
    console.log(`Admin2 access: user role = ${userRole}`);
    if (userRole === 'admin2') {
      // Admin2 can access /admin2
      console.log('Admin2 accessing admin2 - allowing');
      return NextResponse.next();
    } else if (userRole === 'superadmin') {
      // Superadmin trying to access admin2, redirect to admin
      console.log('Redirecting superadmin from admin2 to admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (userRole === 'admin1') {
      // Admin1 trying to access admin2, redirect to dashboard
      console.log('Redirecting admin1 from admin2 to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'petugas') {
      // Petugas trying to access admin2, redirect to petugas
      return NextResponse.redirect(new URL('/petugas', request.url));
    } else {
      // Unknown role trying to access admin2, redirect to main page
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/petugas')) {
    if (userRole === 'petugas') {
      // Petugas can access /petugas
      return NextResponse.next();
    } else if (userRole === 'superadmin') {
      // Superadmin trying to access petugas, redirect to admin
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (userRole === 'admin1') {
      // Admin1 trying to access petugas, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'admin2') {
      // Admin2 trying to access petugas, redirect to admin2
      return NextResponse.redirect(new URL('/admin2', request.url));
    } else {
      // Unknown role trying to access petugas, redirect to main page
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/register') {
    // If already authenticated, redirect from login/register pages to appropriate dashboard
    if (sessionCookie) {
      if (userRole === 'superadmin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      } else if (userRole === 'admin1') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else if (userRole === 'admin2') {
        return NextResponse.redirect(new URL('/admin2', request.url));
      } else if (userRole === 'petugas') {
        return NextResponse.redirect(new URL('/petugas', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Matcher for paths that this middleware applies to
  matcher: [
    '/',
    '/admin/:path*',
    '/admin2/:path*',
    '/petugas/:path*',
    '/api/admin/:path*',
    '/dashboard/:path*',
    '/api/auth/:path*',
    '/api/reports/:path*',
    '/api/users/:path*',
  ],
};
