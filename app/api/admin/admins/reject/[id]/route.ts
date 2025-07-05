import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../../utils/db';

// DELETE to reject admin
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
    
    // Check if admin exists and is pending
    const admins = await query(
      'SELECT id FROM admin WHERE id = ? AND pending = TRUE',
      [adminId]
    );
      
    if ((admins as any[]).length === 0) {
      return NextResponse.json(
        { message: 'Pending admin not found' },
        { status: 404 }
      );
    }
      
    // Delete the admin
    await query(
      'DELETE FROM admin WHERE id = ?',
      [adminId]
    );
      
    return NextResponse.json({ message: 'Admin rejected successfully' });
  } catch (error) {
    console.error('Error rejecting admin:', error);
    return NextResponse.json(
      { message: 'Failed to reject admin' },
      { status: 500 }
    );
  }
}
