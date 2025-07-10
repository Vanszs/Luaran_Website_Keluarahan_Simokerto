import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    await query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to mark notification as read' },
      { status: 500 }
    );
  }
}