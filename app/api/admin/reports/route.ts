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
    
    // Query reports with user information using JOIN, also get admin info if reporter_type is admin
    const reportsResult = await query(`
      SELECT r.id, r.user_id, r.address, r.description, r.created_at, 
             r.pelapor, r.jenis_laporan, r.reporter_type, r.status,
             u.name as user_name, u.phone as user_phone,
             a.id as admin_id, a.name as admin_name
      FROM reports r
      JOIN users u ON r.user_id = u.id
      LEFT JOIN admin a ON r.reporter_type = 'admin' AND a.name = r.pelapor
      ORDER BY r.created_at DESC
      LIMIT 50
    `);

    const processed = (reportsResult as any[]).map((r) => {
      // Determine the correct name to display based on reporter_type
      let displayName = r.user_name; // Default to user name
      
      // If it's an admin report, use the pelapor field which contains admin name
      if (r.reporter_type === 'admin') {
        displayName = r.pelapor || 'Admin';
      }
      
      return {
        id: r.id,
        user_id: r.user_id,
        address: r.address,
        description: r.description,
        created_at: r.created_at,
        pelapor: displayName,
        jenis_laporan: r.jenis_laporan || 'Umum',
        reporter_type: r.reporter_type || 'user',
        status: r.status || 'pending',
        user: { 
          name: displayName,
          phone: r.user_phone || null
        }
      };
    });

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

// POST endpoint to create a new report (for admin reporting)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, address, description, jenis_laporan } = body;
    
    // Get admin info from session
    const sessionCookie = req.cookies.get('admin_session');
    const authHeader = req.headers.get('Authorization');
    let sessionValue = sessionCookie?.value;
    
    // Extract token from Authorization header if present
    if (!sessionValue && authHeader?.startsWith('Bearer ')) {
      sessionValue = authHeader.substring(7);
    }
    
    if (!sessionValue) {
      return NextResponse.json(
        { message: 'Unauthorized: No session found' },
        { status: 401 }
      );
    }
    
    // Decode admin session
    const decoded = Buffer.from(sessionValue, 'base64').toString('utf8');
    const sessionData = JSON.parse(decoded);
    const adminName = sessionData.name;
    
    // Validate input
    if (!user_id || !address || !description || !jenis_laporan) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert new report as admin
    const result = await query(
      `INSERT INTO reports 
       (user_id, address, description, jenis_laporan, reporter_type, pelapor, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, address, description, jenis_laporan, 'admin', adminName, 'pending']
    );
    
    return NextResponse.json({
      message: 'Report created successfully',
      report_id: (result as any).insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { message: 'Failed to create report', error: String(error) },
      { status: 500 }
    );
  }
}

function generateMockReports() {
  // Create an array of mock reports with the updated fields
  const reports = [];
  const reportTypes = ['kemalingan', 'kebakaran', 'tawuran', 'hmmm', 'jaguh', 'jatuh', 'ngantuk'];
  
  for (let i = 1; i <= 35; i++) {
    reports.push({
      id: i,
      user_id: i % 5 + 1,
      address: `Jl. Contoh No. ${i}, Surabaya`,
      description: `Laporan kejadian ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      created_at: new Date(Date.now() - i * 3600000).toISOString(),
      pelapor: `Warga ${i % 5 + 1}`,
      jenis_laporan: reportTypes[i % reportTypes.length],
      reporter_type: i % 10 === 0 ? 'admin' : 'user',
      status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'processing' : 'pending',
      user: {
        name: `Warga ${i % 5 + 1}`,
        phone: `0812345${i.toString().padStart(4, '0')}`
      }
    });
  }
  
  return reports;
}
