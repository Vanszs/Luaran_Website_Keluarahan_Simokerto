import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../utils/db';

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
    
    const connection = await pool.getConnection();
    
    try {
      // Check if admin exists and is pending
      const [admins] = await connection.execute(
        'SELECT id FROM admin WHERE id = ? AND role IS NULL',
        [adminId]
      );
      
      if ((admins as any[]).length === 0) {
        return NextResponse.json(
          { message: 'Pending admin not found' },
          { status: 404 }
        );
      }
      
      // Delete the admin
      await connection.execute(
        'DELETE FROM admin WHERE id = ?',
        [adminId]
      );
      
      return NextResponse.json({ message: 'Admin rejected successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error rejecting admin:', error);
    return NextResponse.json(
      { message: 'Failed to reject admin' },
      { status: 500 }
    );
  }
}
