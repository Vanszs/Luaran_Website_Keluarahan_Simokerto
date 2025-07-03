import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../utils/db';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [reports] = await connection.execute(`
        SELECT 
          r.id, 
          r.user_id, 
          r.address, 
          r.description,
          r.status,
          r.created_at, 
          u.name as user_name
        FROM reports r
        LEFT JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
        LIMIT 10
      `);
      
      // Format the result
      const formattedReports = (reports as any[]).map(report => ({
        id: report.id,
        user_id: report.user_id,
        address: report.address,
        description: report.description,
        status: report.status || 'pending', // Default status if null
        created_at: report.created_at,
        user: {
          name: report.user_name || 'Unknown User'
        }
      }));
      
      return NextResponse.json(formattedReports);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recent reports' },
      { status: 500 }
    );
  }
}
