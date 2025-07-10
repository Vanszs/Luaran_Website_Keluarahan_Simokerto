import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
    
    let sessionData;
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf8');
      sessionData = JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding session cookie in /api/auth/me:', error);
      // If decoding fails, clear the cookie and return unauthenticated
      cookies().set({
        name: 'admin_session',
        value: '',
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: false, // Setting to false to work in all environments including HTTP
        sameSite: 'lax',
      });
      return NextResponse.json({ authenticated: false, message: 'Invalid session data' }, { status: 401 });
    }

    // In a real application, you would want to verify the sessionData.id against a database
    // to ensure the user still exists and the session is valid and not revoked.
    // For this example, we'll assume the decoded data is sufficient for basic user info.
    // You might want to fetch full user details (like name) from DB if not stored in session.
    
    // For now, we'll construct the user object from the sessionData
    const user = {
      id: sessionData.id,
      username: sessionData.username || 'unknown', // Assuming username is in sessionData
      name: sessionData.name || 'Unknown User', // Assuming name is in sessionData
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
