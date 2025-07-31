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
    
    // Generate a secure session using sessionUtils
    const { createSession } = await import('../../../../utils/sessionUtils.edge');
    
    const sessionToken = createSession({
      id: userData.id, 
      role: userData.role, 
      username: userData.username, 
      name: userData.name
    });
    
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
      sessionToken: sessionToken
    });
    
    // Set secure HTTP-only cookie with proper domain configuration
    const cookieOptions = {
      name: 'admin_session',
      value: sessionToken,
      httpOnly: true,
      path: '/',
      secure: false, // Set to false for HTTP server
      sameSite: 'lax' as const, // Changed from strict to lax for better cross-origin support
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60
    };
    
    // Add domain configuration for production HTTP server
    if (process.env.NODE_ENV === 'production') {
      // For HTTP server, we don't set domain to avoid cross-domain issues
      // cookieOptions.domain = 'simokerto.my.id'; // Commented out for HTTP
    }
    
    response.cookies.set(cookieOptions);
    
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
