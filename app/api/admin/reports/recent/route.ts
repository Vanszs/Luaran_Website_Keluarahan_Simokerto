import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function GET(request: NextRequest) {
  try {
    const reports = await query(`
      SELECT r.id, r.user_id, r.address, r.created_at, u.name as user_name
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 10
    `);

    const processedReports = (reports as any[]).map(report => {
      const statusValues = ['pending', 'processing', 'completed'];
      const statusIndex = (report as any).id % 3;
      return {
        ...report,
        description: `Laporan dari ${(report as any).address}`,
        status: statusValues[statusIndex],
      };
    });

    return NextResponse.json(processedReports);
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recent reports' },
      { status: 500 }
    );
  }
}
