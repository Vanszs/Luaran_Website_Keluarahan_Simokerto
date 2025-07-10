import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = cookies().get('admin_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { authenticated: false, message: 'No active session' },
        { status: 401 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Notification ID is required' }, { status: 400 });
    }

    await query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Notification marked as read' });

  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to mark notification as read', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
