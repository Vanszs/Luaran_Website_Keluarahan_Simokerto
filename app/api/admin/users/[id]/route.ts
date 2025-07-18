import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export const dynamic = 'force-dynamic';

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
    
    const { name, address, password, phone } = await request.json();
    
    console.log('Update user request:', { userId, name, address, phone, password: password ? '[provided]' : '[empty]' });
    
    // Validate input
    if (!name || !address) {
      return NextResponse.json(
        { message: 'Name and address are required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const users = await query(
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
      await query(
        'UPDATE users SET name = ?, address = ?, phone = ?, password = ? WHERE id = ?',
        [name, address, phone, password, userId]
      );
    } else {
      await query(
        'UPDATE users SET name = ?, address = ?, phone = ? WHERE id = ?',
        [name, address, phone, userId]
      );
    }

    return NextResponse.json({ message: 'User updated successfully' });
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
    
    // Check if user exists
    const users = await query(
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
    await query(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
