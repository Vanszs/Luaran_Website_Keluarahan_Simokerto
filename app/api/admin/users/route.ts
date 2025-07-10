import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

// GET all users
export async function GET(request: NextRequest) {
  try {
    const users = await query(
      'SELECT id, username, name, address, phone, created_at FROM users ORDER BY id DESC'
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    const { username, password, name, address, phone } = await request.json();
    
    // Validate input
    if (!username || !password || !name || !address) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Phone is optional
    
    // Check if username already exists
    const existingUsers = await query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }

    // Insert new user
    await query(
      'INSERT INTO users (username, password, name, address, phone) VALUES (?, ?, ?, ?, ?)',
      [username, password, name, address, phone || null]
    );

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
