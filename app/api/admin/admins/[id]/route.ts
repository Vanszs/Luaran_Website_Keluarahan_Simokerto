import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

// PUT (update) admin
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = parseInt(params.id);
    if (isNaN(adminId)) {
      return NextResponse.json(
        { message: 'Invalid admin ID' },
        { status: 400 }
      );
    }
    
    const { name, role, password, username, phone } = await request.json();
    
    console.log('Update admin request:', { adminId, name, role, password: password ? '[provided]' : '[empty]', username, phone });
    
    // Validate input
    if (!name || !role) {
      return NextResponse.json(
        { message: 'Name and role are required' },
        { status: 400 }
      );
    }
    
    // Validate role
    if (!['admin1', 'admin2', 'petugas', 'superadmin'].includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role' },
        { status: 400 }
      );
    }
    
    // Check if admin exists
    const admins = await query(
      'SELECT id FROM admin WHERE id = ?',
      [adminId]
    );

    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }
      
    // Update admin with or without password, including phone
    if (password) {
      await query(
        'UPDATE admin SET name = ?, role = ?, password = ?, phone = ? WHERE id = ?',
        [name, role, password, phone || null, adminId]
      );
    } else {
      await query(
        'UPDATE admin SET name = ?, role = ?, phone = ? WHERE id = ?',
        [name, role, phone || null, adminId]
      );
    }
      
      return NextResponse.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json(
      { message: 'Failed to update admin' },
      { status: 500 }
    );
  }
}

// DELETE admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = parseInt(params.id);
    if (isNaN(adminId)) {
      return NextResponse.json(
        { message: 'Invalid admin ID' },
        { status: 400 }
      );
    }
    
    // Check if admin exists
    const admins = await query(
      'SELECT id FROM admin WHERE id = ?',
      [adminId]
    );
      
    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }
      
      // Delete admin
    await query(
      'DELETE FROM admin WHERE id = ?',
      [adminId]
    );
      
      return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { message: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
