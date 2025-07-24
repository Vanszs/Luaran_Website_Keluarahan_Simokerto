import { query } from './db';

export interface LogEntry {
  userId?: number;
  userRole?: string;
  userName?: string;
  action: string;
  tableName?: string;
  recordId?: number;
  oldData?: any;
  newData?: any;
  description: string;
  ipAddress?: string;
  userAgent?: string;
}

export class ActivityLogger {
  static async log(entry: LogEntry): Promise<void> {
    try {
      await query(
        `INSERT INTO activity_logs (
          user_id, user_role, user_name, action, table_name, record_id, 
          old_data, new_data, description, ip_address, user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entry.userId || null,
          entry.userRole || null,
          entry.userName || null,
          entry.action,
          entry.tableName || null,
          entry.recordId || null,
          entry.oldData ? JSON.stringify(entry.oldData) : null,
          entry.newData ? JSON.stringify(entry.newData) : null,
          entry.description,
          entry.ipAddress || null,
          entry.userAgent || null
        ]
      );
    } catch (error) {
      console.error('Failed to log activity:', error);
      // Don't throw error to prevent breaking main functionality
    }
  }

  static async logLogin(userId: number, userRole: string, userName: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'LOGIN',
      description: `User ${userName} logged into the system`,
      ipAddress,
      userAgent
    });
  }

  static async logLogout(userId: number, userRole: string, userName: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'LOGOUT',
      description: `User ${userName} logged out of the system`,
      ipAddress,
      userAgent
    });
  }

  static async logCreate(
    userId: number, 
    userRole: string, 
    userName: string, 
    tableName: string, 
    recordId: number, 
    newData: any,
    description: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'CREATE',
      tableName,
      recordId,
      newData,
      description,
      ipAddress,
      userAgent
    });
  }

  static async logUpdate(
    userId: number, 
    userRole: string, 
    userName: string, 
    tableName: string, 
    recordId: number, 
    oldData: any,
    newData: any,
    description: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'UPDATE',
      tableName,
      recordId,
      oldData,
      newData,
      description,
      ipAddress,
      userAgent
    });
  }

  static async logDelete(
    userId: number, 
    userRole: string, 
    userName: string, 
    tableName: string, 
    recordId: number, 
    oldData: any,
    description: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'DELETE',
      tableName,
      recordId,
      oldData,
      description,
      ipAddress,
      userAgent
    });
  }

  static async logPasswordChange(
    userId: number, 
    userRole: string, 
    userName: string, 
    targetUserId: number,
    targetUserName: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'PASSWORD_CHANGE',
      tableName: 'users',
      recordId: targetUserId,
      description: `Password changed for user: ${targetUserName}`,
      ipAddress,
      userAgent
    });
  }

  static async logStatusChange(
    userId: number, 
    userRole: string, 
    userName: string, 
    tableName: string,
    recordId: number,
    oldStatus: string,
    newStatus: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      userRole,
      userName,
      action: 'STATUS_CHANGE',
      tableName,
      recordId,
      oldData: { status: oldStatus },
      newData: { status: newStatus },
      description: `Status changed from "${oldStatus}" to "${newStatus}" for ${tableName} ID: ${recordId}`,
      ipAddress,
      userAgent
    });
  }
}

// Helper function to get client IP from request
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Helper function to get user agent from request
export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}
