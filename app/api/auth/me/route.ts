import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query, checkDatabaseConnection } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = cookies().get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    console.log(`Database available for auth check: ${isDatabaseAvailable}`);
    
    // In a real app with a sessions table, you'd do something like:
    // const sessionData = await query('SELECT user_id FROM sessions WHERE id = ?', [sessionId]);
    // const userId = sessionData[0]?.user_id;
    // const userData = await query('SELECT id, username, name, role FROM admin WHERE id = ?', [userId]);
    
    // For now we'll return a mock user based on the existing credentials
    // In a real app, you would fetch this from the database based on the session
    const user = {
      id: '1',
      username: 'admin_kelurahan1',
      name: 'Admin Simokerto',
      role: 'superadmin'
    };
    
    return NextResponse.json({
      authenticated: true,
      user
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { 
        error: 'Authentication check failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
