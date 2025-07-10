import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

// GET all pending admins
export async function GET(request: NextRequest) {
  try {
    const admins = await query(
      'SELECT id, username, name, role, created_at FROM admin WHERE pending = TRUE ORDER BY created_at DESC'
    );

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error fetching pending admins:', error);
    return NextResponse.json(
      { message: 'Failed to fetch pending admins' },
      { status: 500 }
    );
  }
}
