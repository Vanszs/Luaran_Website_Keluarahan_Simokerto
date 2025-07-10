import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, status } = body;
    
    if (!reportId || !status) {
      return NextResponse.json(
        { message: 'Report ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status value
    const validStatuses = ['pending', 'processing', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status value. Must be one of: pending, processing, completed, rejected' },
        { status: 400 }
      );
    }
    
    // Update report status in database
    await query(
      'UPDATE reports SET status = ? WHERE id = ?',
      [status, reportId]
    );
    
    return NextResponse.json({
      message: 'Report status updated successfully',
      reportId,
      newStatus: status
    });
    
  } catch (error) {
    console.error('Error updating report status:', error);
    return NextResponse.json(
      { 
        message: 'Failed to update report status', 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
