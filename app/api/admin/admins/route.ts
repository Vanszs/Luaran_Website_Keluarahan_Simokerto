import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../utils/db';

// GET all approved admins
export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [admins] = await connection.execute(
        'SELECT id, username, name, role, created_at FROM admin WHERE role IS NOT NULL ORDER BY id DESC'
      );
      
      return NextResponse.json(admins);
    } finally {
      connection.release();
    }
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
    
    const connection = await pool.getConnection();
    
    try {
      // Check if username already exists
      const [existingAdmins] = await connection.execute(
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
      await connection.execute(
        'INSERT INTO admin (username, password, name, role) VALUES (?, ?, ?, ?)',
        [username, password, name, role]
      );
      
      return NextResponse.json({ message: 'Admin created successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
