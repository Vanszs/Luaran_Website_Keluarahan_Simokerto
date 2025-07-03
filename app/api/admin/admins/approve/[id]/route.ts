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
    
    // Check if admin exists and is pending
    const admins = await query(
      'SELECT id FROM admin WHERE id = ? AND role IS NULL',
      [adminId]
    );
      
    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { message: 'Pending admin not found' },
        { status: 404 }
      );
    }
      
      // Set role to 'admin'
    await query(
      'UPDATE admin SET role = ? WHERE id = ?',
      ['admin', adminId]
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
