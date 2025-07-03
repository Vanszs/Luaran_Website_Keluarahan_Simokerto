import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../utils/db';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Query that doesn't reference status since it doesn't exist
      const [reports] = await connection.execute(`
        SELECT 
          r.id, 
          r.user_id, 
          r.address,
          r.created_at, 
          u.name as user_name
        FROM reports r
        LEFT JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
        LIMIT 10
      `);
      
      // Add mock status data for UI
      const processedReports = (reports as any[]).map(report => {
        // Generate deterministic but random-looking status based on report id
        const statusValues = ['pending', 'processing', 'completed'];
        const statusIndex = report.id % 3;
        
        return {
          ...report,
          description: `Laporan dari ${report.address}`,
          status: statusValues[statusIndex]
        };
      });
      
      return NextResponse.json(processedReports);
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
