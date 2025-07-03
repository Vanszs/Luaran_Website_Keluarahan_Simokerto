import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../utils/db';

// PUT (update) user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const { name, address, password } = await request.json();
    
    // Validate input
    if (!name || !address) {
      return NextResponse.json(
        { message: 'Name and address are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    try {
      // Check if user exists
      const [users] = await connection.execute(
        'SELECT id FROM users WHERE id = ?',
        [userId]
      );
      
      if ((users as any[]).length === 0) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Update user with or without password
      if (password) {
        await connection.execute(
          'UPDATE users SET name = ?, address = ?, password = ? WHERE id = ?',
          [name, address, password, userId]
        );
      } else {
        await connection.execute(
          'UPDATE users SET name = ?, address = ? WHERE id = ?',
          [name, address, userId]
        );
      }
      
      return NextResponse.json({ message: 'User updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    try {
      // Check if user exists
      const [users] = await connection.execute(
        'SELECT id FROM users WHERE id = ?',
        [userId]
      );
      
      if ((users as any[]).length === 0) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Delete user
      await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [userId]
      );
      
      return NextResponse.json({ message: 'User deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
