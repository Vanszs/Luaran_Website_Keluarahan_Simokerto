import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../../utils/db';

// PUT to approve admin
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
    
    // Check if admin exists
    const admins = await query(
      'SELECT id, pending FROM admin WHERE id = ?',
      [adminId]
    );
      
    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }
    
    // Check if admin is already approved
    if (!(admins as any[])[0].pending) {
      return NextResponse.json({ 
        message: 'Admin already approved',
        alreadyApproved: true 
      });
    }
      
    // Get the role from the request body if available, otherwise default to 'admin'
    let role = 'admin';
    try {
      const body = await request.json();
      if (body && body.role && ['admin', 'superadmin', 'petugas'].includes(body.role)) {
        role = body.role;
      }
    } catch (e) {
      console.warn('No body or invalid JSON in admin approval request, using default role:', e);
      // No body or invalid JSON, use default role
    }

    // Set role and pending to FALSE
    await query(
      'UPDATE admin SET role = ?, pending = FALSE WHERE id = ?',
      [role, adminId]
    );
      
    return NextResponse.json({ message: 'Admin approved successfully' });
  } catch (error) {
    console.error('Error approving admin:', error);
    return NextResponse.json(
      { message: 'Failed to approve admin' },
      { status: 500 }
    );
  }
}
