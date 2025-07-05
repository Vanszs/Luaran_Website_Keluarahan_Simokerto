import { query, checkDatabaseConnection } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    console.log(`Database available: ${isDatabaseAvailable}`);
    
    // Query the database, including the pending status
    const results = await query(
      'SELECT id, username, name, role, pending FROM admin WHERE username = ? AND password = ?',
      [username, password]
    );
    
    if (!results || (results as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    const userData = (results as any[])[0];
    
    // Check if the account is pending approval
    if (userData.pending) {
      return NextResponse.json(
        { success: false, message: 'Your account is pending approval by an administrator.' },
        { status: 401 }
      );
    }
    
    // Generate a simple session ID
    const sessionId = Buffer.from(JSON.stringify({ id: userData.id, role: userData.role, username: userData.username, name: userData.name })).toString('base64');
    
    // Set secure HTTP-only cookie
    cookies().set({
      name: 'admin_session',
      value: sessionId,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60
    });
    
    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        role: userData.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during login. Please try again later.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
