import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

// GET activity logs - Only accessible by superadmin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action');
    const tableName = searchParams.get('table');
    const userId = searchParams.get('userId');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    const offset = (page - 1) * limit;
    
    // Build query conditions
    let whereConditions = [];
    let queryParams = [];
    
    if (action && action !== 'all') {
      whereConditions.push('action = ?');
      queryParams.push(action);
    }
    
    if (tableName && tableName !== 'all') {
      whereConditions.push('table_name = ?');
      queryParams.push(tableName);
    }
    
    if (userId) {
      whereConditions.push('user_id = ?');
      queryParams.push(parseInt(userId));
    }
    
    if (dateFrom) {
      whereConditions.push('created_at >= ?');
      queryParams.push(dateFrom + ' 00:00:00');
    }
    
    if (dateTo) {
      whereConditions.push('created_at <= ?');
      queryParams.push(dateTo + ' 23:59:59');
    }
    
    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM activity_logs ${whereClause}`;
    const totalResult = await query(countQuery, queryParams) as any[];
    const total = totalResult[0]?.total || 0;
    
    // Get logs with pagination
    const logsQuery = `
      SELECT 
        id,
        user_id,
        user_role,
        user_name,
        action,
        table_name,
        record_id,
        old_data,
        new_data,
        description,
        ip_address,
        user_agent,
        created_at
      FROM activity_logs 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    const logs = await query(logsQuery, [...queryParams, limit, offset]);
    
    // Parse JSON data
    const parsedLogs = (logs as any[]).map(log => ({
      ...log,
      old_data: log.old_data ? JSON.parse(log.old_data) : null,
      new_data: log.new_data ? JSON.parse(log.new_data) : null
    }));
    
    return NextResponse.json({
      logs: parsedLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}

// GET unique actions for filter dropdown
export async function OPTIONS(request: NextRequest) {
  try {
    const actions = await query(`
      SELECT DISTINCT action 
      FROM activity_logs 
      WHERE action IS NOT NULL 
      ORDER BY action
    `);
    
    const tables = await query(`
      SELECT DISTINCT table_name 
      FROM activity_logs 
      WHERE table_name IS NOT NULL 
      ORDER BY table_name
    `);
    
    const users = await query(`
      SELECT DISTINCT user_id, user_name, user_role 
      FROM activity_logs 
      WHERE user_id IS NOT NULL 
      ORDER BY user_name
    `);
    
    return NextResponse.json({
      actions: (actions as any[]).map(row => row.action),
      tables: (tables as any[]).map(row => row.table_name),
      users: users as any[]
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { message: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
