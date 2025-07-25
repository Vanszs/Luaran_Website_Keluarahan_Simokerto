import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '../../../../utils/sessionUtils.edge';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = cookies().get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ message: 'Tidak terautentikasi' }, { status: 401 });
    }
    
    // Verify session using secure utility
    const sessionData = verifySession(sessionCookie.value);
    
    if (!sessionData) {
      return NextResponse.json({ message: 'Sesi tidak valid atau sudah kedaluwarsa' }, { status: 401 });
    }
    
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
