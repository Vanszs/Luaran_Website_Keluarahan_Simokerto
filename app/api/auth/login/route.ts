import { query, checkDatabaseConnection } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ActivityLogger, getClientIP, getUserAgent } from '../../../../utils/activityLogger';

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
    
    // Clear any existing session cookies first
    cookies().delete('admin_session');
    
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

    // Log successful login
    await ActivityLogger.logLogin(
      userData.id,
      userData.role,
      userData.name || userData.username,
      getClientIP(req),
      getUserAgent(req)
    );
    
    // Generate a simple session ID
    const sessionId = Buffer.from(JSON.stringify({ 
      id: userData.id, 
      role: userData.role, 
      username: userData.username, 
      name: userData.name,
      timestamp: new Date().getTime()
    })).toString('base64');
    
    // Create response with JSON data first
    const response = NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        role: userData.role
      },
      // Also include session token in the response body for mobile clients
      sessionToken: sessionId
    });
    
    // Set secure HTTP-only cookie with more compatible settings
    response.cookies.set({
      name: 'admin_session',
      value: sessionId,
      httpOnly: true,
      path: '/',
      secure: false, // Setting to false to work in all environments including HTTP
      sameSite: 'lax', // Using lax as a safer option that still works in most environments
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60
    });
    
    return response;
    
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
