import { NextRequest, NextResponse } from 'next/server';
import { query, checkDatabaseConnection } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    console.log(`Database available for reports: ${isDatabaseAvailable}`);
    
    if (!isDatabaseAvailable) {
      // Return mock data if database is unavailable
      return NextResponse.json({
        reports: generateMockReports()
      });
    }
    
    // Query reports with user information using JOIN
    const reportsResult = await query(`
      SELECT r.id, r.user_id, r.address, r.description, r.created_at, u.name as user_name
      FROM reports r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 50
    `);

    const processed = (reportsResult as any[]).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      address: r.address,
      description: r.description,
      created_at: r.created_at,
      user: { name: r.user_name },
      // generate pseudo status since column doesn't exist
      status: ['pending', 'processing', 'completed'][r.id % 3]
    }));

    return NextResponse.json({
      reports: processed
    });
    
  } catch (error) {
    console.error('Reports API error:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching reports',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

function generateMockReports() {
  // Create an array of mock reports
  const reports = [];
  
  for (let i = 1; i <= 35; i++) {
    reports.push({
      id: i,
      address: `Jl. Contoh No. ${i}, Surabaya`,
      description: `Laporan kejadian ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      created_at: new Date(Date.now() - i * 3600000).toISOString(),
      submittedBy: `Warga ${i % 5 + 1}`,
      status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Pending'
    });
  }
  
  return reports;
}
