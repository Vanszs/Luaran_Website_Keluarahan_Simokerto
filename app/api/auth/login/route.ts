import { query, checkDatabaseConnection } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ActivityLogger, getClientIP, getUserAgent } from '../../../../utils/activityLogger';
import bcrypt from 'bcryptjs';
import { loginRateLimiter } from '../../../../utils/rateLimiter';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    const rateLimitIdentifier = `${clientIP}:${username}`;
    
    // Check rate limiting
    if (loginRateLimiter.isBlocked(rateLimitIdentifier)) {
      const remainingTime = Math.ceil(loginRateLimiter.getBlockTimeRemaining(rateLimitIdentifier) / 1000 / 60);
      return NextResponse.json(
        { 
          success: false, 
          message: `Terlalu banyak percobaan login yang gagal. Silakan coba lagi dalam ${remainingTime} menit.` 
        },
        { status: 429 }
      );
    }
    
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    console.log(`Database available: ${isDatabaseAvailable}`);
    
    // Clear any existing session cookies first
    cookies().delete('admin_session');
    
    // Query the database for user with username (we'll verify password separately)
    const results = await query(
      'SELECT id, username, name, role, pending, password FROM admin WHERE username = ?',
      [username]
    );
    
    if (!results || (results as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }
    
    const userData = (results as any[])[0];
    
    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      // Record failed attempt
      loginRateLimiter.recordAttempt(rateLimitIdentifier, false);
      const remainingAttempts = loginRateLimiter.getRemainingAttempts(rateLimitIdentifier);
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Username atau password salah. ${remainingAttempts} percobaan tersisa.` 
        },
        { status: 401 }
      );
    }
    
    // Record successful attempt (resets rate limiting)
    loginRateLimiter.recordAttempt(rateLimitIdentifier, true);
    
    // Check if the account is pending approval
    if (userData.pending) {
      return NextResponse.json(
        { success: false, message: 'Akun Anda sedang menunggu persetujuan administrator.' },
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
    
    // Generate a simple session (compatible with edge runtime)
    const sessionData = {
      id: userData.id, 
      role: userData.role, 
      username: userData.username, 
      name: userData.name,
      timestamp: new Date().getTime()
    };
    
    const sessionId = Buffer.from(JSON.stringify(sessionData)).toString('base64');
    
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
    
    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'admin_session',
      value: sessionId,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict', // More secure than lax
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan saat login. Silakan coba lagi nanti.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
