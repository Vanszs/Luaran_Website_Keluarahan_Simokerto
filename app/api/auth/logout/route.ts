import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get the current session cookie
    const sessionCookie = cookies().get('admin_session');
    
    if (sessionCookie?.value) {
      // Delete the session from database (implement this in a real app)
      // await deleteSession(sessionCookie.value);
      
      // Clear the session cookie with same parameters as when setting it
      cookies().set({
        name: 'admin_session',
        value: '',
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: false, // Setting to false to work in all environments including HTTP
        sameSite: 'lax', // Changed from "strict" to "lax"
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully logged out' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error during logout' 
    }, { status: 500 });
  }
}
