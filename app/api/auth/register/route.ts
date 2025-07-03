import { query } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, name } = body;
    
    if (!username || !password || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
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
    
    // Insert new admin with default role as 'admin'
    await query(
      'INSERT INTO admin (username, password, name, role) VALUES (?, ?, ?, ?)',
      [username, password, name, 'admin']
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
