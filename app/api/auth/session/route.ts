import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = cookies().get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Tidak terautentikasi' }, { status: 401 });
    }
    
    // Parse the session cookie
    const sessionData = JSON.parse(sessionCookie.value);
    
    return NextResponse.json({
      id: sessionData.id,
      username: sessionData.username,
      name: sessionData.name,
      role: sessionData.role
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { message: 'Sesi tidak valid' },
      { status: 401 }
    );
  }
}
