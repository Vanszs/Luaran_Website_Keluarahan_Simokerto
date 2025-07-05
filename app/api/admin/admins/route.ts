import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

// GET all approved admins
export async function GET(request: NextRequest) {
  try {
    const admins = await query(
      'SELECT id, username, name, role, created_at FROM admin WHERE pending = FALSE ORDER BY id DESC'
    );

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

// POST new admin
export async function POST(request: NextRequest) {
  try {
    const { username, password, name, role } = await request.json();
    
    // Validate input
    if (!username || !password || !name || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate role
    if (role !== 'admin' && role !== 'superadmin') {
      return NextResponse.json(
        { message: 'Invalid role' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const existingAdmins = await query(
      'SELECT id FROM admin WHERE username = ?',
      [username]
    );

    if ((existingAdmins as any[]).length > 0) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }

    // Insert new admin
    await query(
      'INSERT INTO admin (username, password, name, role) VALUES (?, ?, ?, ?)',
      [username, password, name, role]
    );

    return NextResponse.json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
