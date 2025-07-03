import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../utils/db';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [reports] = await connection.execute(`
        SELECT r.id, r.user_id, r.address, r.created_at, u.name as user_name
        FROM reports r
        JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
      `);
      
      // Format the result
      const formattedReports = (reports as any[]).map(report => ({
        id: report.id,
        user_id: report.user_id,
        address: report.address,
        created_at: report.created_at,
        user: {
          name: report.user_name
        }
      }));
      
      return NextResponse.json(formattedReports);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
