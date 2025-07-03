import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../utils/db';

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Get total users count
      const [usersResult] = await connection.execute('SELECT COUNT(*) as count FROM users');
      const totalUsers = (usersResult as any[])[0].count;
      
      // Get total reports count
      const [reportsResult] = await connection.execute('SELECT COUNT(*) as count FROM reports');
      const totalReports = (reportsResult as any[])[0].count;
      
      // Get today's reports count
      const today = new Date().toISOString().split('T')[0];
      const [todayReportsResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) = ?',
        [today]
      );
      const todayReports = (todayReportsResult as any[])[0].count;
      
      // Get yesterday's reports count to calculate trend percentage
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const [yesterdayReportsResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) = ?',
        [yesterdayStr]
      );
      const yesterdayReports = (yesterdayReportsResult as any[])[0].count;
      
      // Calculate trend percentage
      let todayChange = 0;
      if (yesterdayReports > 0) {
        todayChange = Math.round(((todayReports - yesterdayReports) / yesterdayReports) * 100);
      } else if (todayReports > 0) {
        todayChange = 100; // 100% increase from 0
      }
      
      // Get last week's reports count to calculate trend percentage
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastWeekStr = lastWeek.toISOString().split('T')[0];
      const [lastWeekReportsResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) >= ?',
        [lastWeekStr]
      );
      const lastWeekReports = (lastWeekReportsResult as any[])[0].count;
      
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0];
      const [twoWeeksAgoReportsResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) >= ? AND DATE(created_at) < ?',
        [twoWeeksAgoStr, lastWeekStr]
      );
      const twoWeeksAgoReports = (twoWeeksAgoReportsResult as any[])[0].count;
      
      // Calculate weekly report trend
      let totalReportsChange = 0;
      if (twoWeeksAgoReports > 0) {
        totalReportsChange = Math.round(((lastWeekReports - twoWeeksAgoReports) / twoWeeksAgoReports) * 100);
      } else if (lastWeekReports > 0) {
        totalReportsChange = 100;
      }
      
      // Get weekly report counts for chart (last 7 days)
      const weeklyReportCounts = [];
      for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayStr = day.toISOString().split('T')[0];
        
        const [dayReportsResult] = await connection.execute(
          'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) = ?',
          [dayStr]
        );
        weeklyReportCounts.push((dayReportsResult as any[])[0].count);
      }
      
      // Get user change percentage (past month vs previous month)
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const oneMonthAgoStr = oneMonthAgo.toISOString().split('T')[0];
      
      const [newUsersResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM users WHERE DATE(created_at) >= ?',
        [oneMonthAgoStr]
      );
      const newUsers = (newUsersResult as any[])[0].count;
      
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      const twoMonthsAgoStr = twoMonthsAgo.toISOString().split('T')[0];
      
      const [prevMonthNewUsersResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM users WHERE DATE(created_at) >= ? AND DATE(created_at) < ?',
        [twoMonthsAgoStr, oneMonthAgoStr]
      );
      const prevMonthNewUsers = (prevMonthNewUsersResult as any[])[0].count;
      
      // Calculate user growth trend
      let userChange = 0;
      if (prevMonthNewUsers > 0) {
        userChange = Math.round(((newUsers - prevMonthNewUsers) / prevMonthNewUsers) * 100);
      } else if (newUsers > 0) {
        userChange = 100;
      }
      
      // Get report status counts
      const [pendingResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE status = ?',
        ['pending']
      );
      const pending = (pendingResult as any[])[0].count;
      
      const [processingResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE status = ?',
        ['processing']
      );
      const processing = (processingResult as any[])[0].count;
      
      const [completedResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE status = ?',
        ['completed']
      );
      const completed = (completedResult as any[])[0].count;
      
      // Get monthly reports count
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthStr = thisMonth.toISOString().split('T')[0];
      const [monthlyReportsResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM reports WHERE DATE(created_at) >= ?',
        [thisMonthStr]
      );
      const monthlyReports = (monthlyReportsResult as any[])[0].count;
      
      // Get active users (users who reported this month)
      const [activeUsersResult] = await connection.execute(
        'SELECT COUNT(DISTINCT user_id) as count FROM reports WHERE DATE(created_at) >= ?',
        [thisMonthStr]
      );
      const activeUsers = (activeUsersResult as any[])[0].count;
      
      // Hardcode active devices for now since there's no table for it
      const activeDevices = 8;
      
      return NextResponse.json({
        totalUsers,
        totalReports,
        todayReports,
        todayChange,
        totalReportsChange,
        userChange,
        activeDevices,
        weeklyReportCounts,
        reportsByStatus: { pending, processing, completed },
        monthlyReports,
        activeUsers
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
