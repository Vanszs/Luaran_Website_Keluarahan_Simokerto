import { NextRequest, NextResponse } from 'next/server';
import { query, checkDatabaseConnection } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    console.log(`Database available for stats: ${isDatabaseAvailable}`);
    
    if (!isDatabaseAvailable) {
      // Return mock data if database is unavailable
      return NextResponse.json({
        todayReports: 5,
        todayChange: 20,
        totalReports: 35,
        totalReportsChange: 15,
        totalUsers: 3,
        userChange: 0,
        activeAdmins: 2,
        activeDevices: 4,
      });
    }
    
    // Get current date in MySQL format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    // Query total reports
    const totalReportsResult = await query(
      'SELECT COUNT(*) as count FROM reports'
    );
    const totalReports = (totalReportsResult as any[])[0].count || 0;
    
    // Query today's reports
    const todayReportsResult = await query(
      `SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) = ?`,
      [today]
    );
    const todayReports = (todayReportsResult as any[])[0].count || 0;
    
    // Query total users
    const totalUsersResult = await query(
      'SELECT COUNT(*) as count FROM users'
    );
    const totalUsers = (totalUsersResult as any[])[0].count || 0;
    
    // Query active admins
    const activeAdminsResult = await query(
      'SELECT COUNT(*) as count FROM admin'
    );
    const activeAdmins = (activeAdminsResult as any[])[0].count || 0;
    
    // Calculate change percentages (mock values for now)
    const todayChange = 10; 
    const totalReportsChange = 15;
    const userChange = 0;
    
    return NextResponse.json({
      todayReports,
      todayChange,
      totalReports,
      totalReportsChange,
      totalUsers,
      userChange,
      activeAdmins,
      activeDevices: 4,  // Mock value since there's no devices table
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching statistics',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
