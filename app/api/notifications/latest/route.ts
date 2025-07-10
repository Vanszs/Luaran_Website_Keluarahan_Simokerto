import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  user_role: string;
}

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = cookies().get('admin_session');
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false, message: 'No active session' },
        { status: 401 }
      );
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf8'));
    const userRole = sessionData.role;

    let notifications: Notification[] = [];
    let unreadCount = 0;

    if (userRole === 'superadmin') {
      notifications = await query(
        `SELECT * FROM notifications 
         WHERE (user_role = 'superadmin' OR user_role IS NULL)
         ORDER BY created_at DESC LIMIT 5`
      ) as Notification[];
      
      unreadCount = (await query(
        `SELECT COUNT(*) as count FROM notifications 
         WHERE is_read = FALSE AND (user_role = 'superadmin' OR user_role IS NULL)`
      ) as { count: number }[])[0].count;
    } else if (userRole === 'admin') {
      notifications = await query(
        `SELECT * FROM notifications 
         WHERE user_role = 'admin'
         ORDER BY created_at DESC LIMIT 5`
      ) as Notification[];
      
      unreadCount = (await query(
        `SELECT COUNT(*) as count FROM notifications 
         WHERE is_read = FALSE AND user_role = 'admin'`
      ) as { count: number }[])[0].count;
    }

    return NextResponse.json({ 
      success: true, 
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching latest notifications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}