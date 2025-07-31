import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '../../../../utils/sessionUtils.edge';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = cookies().get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false, message: 'No active session' },
        { status: 401 }
      );
    }
    
    // Verify session using secure utility
    const sessionData = verifySession(sessionCookie.value);
    
    if (!sessionData) {
      console.error('Session verification failed in /api/auth/me');
      // Clear invalid cookie with proper options
      const response = NextResponse.json(
        { authenticated: false, message: 'Invalid or expired session' },
        { status: 401 }
      );
      
      const clearCookieOptions = {
        name: 'admin_session',
        value: '',
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: false, // Set to false for HTTP server
        sameSite: 'lax' as const,
      };
      
      // For HTTP server, don't set domain to avoid issues
      if (process.env.NODE_ENV === 'production') {
        // clearCookieOptions.domain = 'simokerto.my.id'; // Commented out for HTTP
      }
      
      response.cookies.set(clearCookieOptions);
      return response;
    }
    
    // Construct user object from verified session data
    const user = {
      id: sessionData.id,
      username: sessionData.username,
      name: sessionData.name,
      role: sessionData.role,
    };
    
    return NextResponse.json({
      authenticated: true,
      user
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { 
        authenticated: false,
        error: 'Authentication check failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
