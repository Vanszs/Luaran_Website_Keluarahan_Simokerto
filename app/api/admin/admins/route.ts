import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../utils/db';
import { ActivityLogger, getClientIP, getUserAgent } from '../../../../utils/activityLogger';
import bcrypt from 'bcryptjs';

// GET all approved admins
export async function GET(request: NextRequest) {
  try {
    const admins = await query(
      'SELECT id, username, name, address, role, created_at FROM admin WHERE pending = FALSE ORDER BY id DESC'
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
    const { username, password, name, address, role, userId, userRole, userName } = await request.json();
    
    // Validate input
    if (!username || !password || !name || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Validate role
    if (!['admin1', 'admin2', 'petugas', 'superadmin', 'user'].includes(role)) {
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

    // Hash password before storing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new admin with hashed password
    const result = await query(
      'INSERT INTO admin (username, password, name, address, role) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, name, address || null, role]
    ) as any;

    // Log the activity
    if (userId && userRole && userName) {
      await ActivityLogger.logCreate(
        userId,
        userRole,
        userName,
        role === 'user' ? 'users' : 'admin',
        result.insertId,
        { username, name, address, role },
        `Created new ${role}: ${name} (${username})`,
        getClientIP(request),
        getUserAgent(request)
      );
    }

    return NextResponse.json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
