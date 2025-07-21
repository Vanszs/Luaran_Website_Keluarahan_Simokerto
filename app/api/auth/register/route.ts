import { query } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, name, address } = body;
    
    if (!username || !password || !name) {
      return NextResponse.json(
        { message: 'Username, password, and name are required' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const existingUser = await query(
      'SELECT id FROM admin WHERE username = ?',
      [username]
    );
    
    if ((existingUser as any[]).length > 0) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }
    
    // Insert new admin with default role as 'admin1' and pending status as TRUE
    await query(
      'INSERT INTO admin (username, password, name, address, role, pending) VALUES (?, ?, ?, ?, ?, TRUE)',
      [username, password, name, address || null, 'admin1']
    );
    
    // Insert notification for superadmin about new pending admin
    await query(
      'INSERT INTO notifications (message, user_role, is_read, created_at) VALUES (?, ?, FALSE, NOW())',
      [`New admin registration: ${name} (${username}) is pending approval.`, 'superadmin']
    );
    
    return NextResponse.json(
      { message: 'Registration successful. Waiting for approval.' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
