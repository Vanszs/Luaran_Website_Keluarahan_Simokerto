import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '../../../utils/db';

export const dynamic = 'force-dynamic';

interface Notification {
  id: string;
  type: string;
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

    let sessionData;
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf8');
      sessionData = JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding session cookie in /api/notifications:', error);
      return NextResponse.json({ authenticated: false, message: 'Invalid session data' }, { status: 401 });
    }

    const userRole = sessionData.role;
    let notifications: Notification[] = [];

    if (userRole === 'superadmin') {
      const adminRequests = (await query(
        `SELECT id, 'admin_request' as type, username as message, created_at, 'superadmin' as user_role, pending as is_read FROM admin WHERE pending = 1 ORDER BY created_at DESC LIMIT 5`
      )) as Notification[];

      const reports = (await query(
        `SELECT id, 'report' as type, title as message, created_at, 'superadmin' as user_role, 0 as is_read FROM reports ORDER BY created_at DESC LIMIT 5`
      )) as Notification[];

      const generalNotifications = (await query(
        `SELECT id, type, message, is_read, created_at, user_role FROM notifications WHERE user_role = 'superadmin' OR user_role = 'all' ORDER BY created_at DESC LIMIT 5`
      )) as Notification[];

      notifications = [...adminRequests, ...reports, ...generalNotifications];

    } else if (userRole === 'admin') {
      const reports = (await query(
        `SELECT id, 'report' as type, title as message, created_at, 'admin' as user_role, 0 as is_read FROM reports ORDER BY created_at DESC LIMIT 5`
      )) as Notification[];

      const generalNotifications = (await query(
        `SELECT id, type, message, is_read, created_at, user_role FROM notifications WHERE user_role = 'admin' OR user_role = 'all' ORDER BY created_at DESC LIMIT 5`
      )) as Notification[];

      notifications = [...reports, ...generalNotifications];
    }

    // Sort notifications by created_at in descending order and take the top 5
    notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    notifications = notifications.slice(0, 5);

    return NextResponse.json({ success: true, notifications });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch notifications', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
