import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../utils/db';

// GET all pending admins
export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [admins] = await connection.execute(
        'SELECT id, username, name, role, created_at FROM admin WHERE role IS NULL ORDER BY created_at DESC'
      );
      
      return NextResponse.json(admins);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching pending admins:', error);
    return NextResponse.json(
      { message: 'Failed to fetch pending admins' },
      { status: 500 }
    );
  }
}
