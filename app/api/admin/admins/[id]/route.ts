import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';
import { ActivityLogger, getClientIP, getUserAgent } from '../../../../../utils/activityLogger';

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
    
    const { name, role, password, username, phone, address, userId, userRole, userName } = await request.json();
    
    console.log('Update admin request:', { adminId, name, role, password: password ? '[provided]' : '[empty]', username, phone, address });
    
    // Validate input
    if (!name || !role) {
      return NextResponse.json(
        { message: 'Name and role are required' },
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
    
    // Get old data for logging
    const oldAdminData = await query(
      'SELECT * FROM admin WHERE id = ?',
      [adminId]
    ) as any[];

    if (oldAdminData.length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    const oldData = oldAdminData[0];
    
    // Update admin with or without password, including phone and address
    if (password) {
      await query(
        'UPDATE admin SET name = ?, role = ?, password = ?, phone = ?, address = ? WHERE id = ?',
        [name, role, password, phone || null, address || null, adminId]
      );
      
      // Log password change
      if (userId && userRole && userName) {
        await ActivityLogger.logPasswordChange(
          userId,
          userRole,
          userName,
          adminId,
          name,
          getClientIP(request),
          getUserAgent(request)
        );
      }
    } else {
      await query(
        'UPDATE admin SET name = ?, role = ?, phone = ?, address = ? WHERE id = ?',
        [name, role, phone || null, address || null, adminId]
      );
    }

    // Log the update activity
    if (userId && userRole && userName) {
      const newData = { name, role, phone, address };
      await ActivityLogger.logUpdate(
        userId,
        userRole,
        userName,
        'admin',
        adminId,
        { name: oldData.name, role: oldData.role, phone: oldData.phone, address: oldData.address },
        newData,
        `Updated admin: ${name} (${username || oldData.username})`,
        getClientIP(request),
        getUserAgent(request)
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

    // Get request body for user info
    const body = await request.json().catch(() => ({}));
    const { userId, userRole, userName } = body;
    
    // Get admin data before deletion for logging
    const adminData = await query(
      'SELECT * FROM admin WHERE id = ?',
      [adminId]
    ) as any[];
      
    if (adminData.length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    const deletedAdmin = adminData[0];
      
    // Delete admin
    await query(
      'DELETE FROM admin WHERE id = ?',
      [adminId]
    );

    // Log the deletion
    if (userId && userRole && userName) {
      await ActivityLogger.logDelete(
        userId,
        userRole,
        userName,
        'admin',
        adminId,
        { name: deletedAdmin.name, username: deletedAdmin.username, role: deletedAdmin.role },
        `Deleted admin: ${deletedAdmin.name} (${deletedAdmin.username})`,
        getClientIP(request),
        getUserAgent(request)
      );
    }
      
    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { message: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
