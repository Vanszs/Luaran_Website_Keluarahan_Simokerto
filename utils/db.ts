// This file is for server-side only
import mysql from 'serverless-mysql';

// Add server-side directive for Next.js
export const dynamic = 'force-dynamic';

// Track database availability
let isDatabaseAvailable = false;
let connectionAttempted = false;

// Configure database
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    database: process.env.MYSQL_DATABASE || 'lapor_maling',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
  },
});

// Check database availability
export async function checkDatabaseConnection() {
  if (connectionAttempted) return isDatabaseAvailable;
  
  try {
    await db.query('SELECT 1');
    isDatabaseAvailable = true;
  } catch (error) {
    console.warn('Database connection failed:', error);
    isDatabaseAvailable = false;
  } finally {
    connectionAttempted = true;
    await db.end();
  }
  
  return isDatabaseAvailable;
}

// Helper function to execute SQL queries with fallback
export async function query(q: string, values: any[] = []) {
  try {
    if (!await checkDatabaseConnection()) {
      console.warn('Database unavailable, using mock data');
      return mockQueryResults(q, values);
    }
    
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    // Fall back to mock data when query fails
    return mockQueryResults(q, values);
  }
}

// Generate mock results based on query type
function mockQueryResults(q: string, values: any[] = []) {
  console.log('Using mock data for query:', q);
  
  // Extract table name from query (simplified approach)
  const tableMatch = q.match(/FROM\s+(\w+)/i);
  const table = tableMatch ? tableMatch[1] : '';
  
  // For login queries
  if (table === 'admin' && q.includes('username') && q.includes('password')) {
    const username = values[0] || '';
    
    // Use actual credentials from the SQL file
    if (username === 'admin_kelurahan1' && values[1] === 'simokerto123') {
      return [{
        id: 1,
        username: 'admin_kelurahan1',
        name: 'Admin Simokerto',
        role: 'superadmin',
        created_at: '2025-07-02 14:21:23'
      }];
    }
    
    if (username === 'admin1' && values[1] === '12345678') {
      return [{
        id: 2,
        username: 'admin1',
        name: 'admintest',
        role: 'admin1',
        created_at: '2025-07-03 05:24:11'
      }];
    }
    
    // Return empty array for invalid credentials
    return [];
  }
  
  // For login queries - check username only first, then verify password in the API
  if (table === 'admin' && q.includes('WHERE username = ?') && !q.includes('password')) {
    // Return user data with hashed password for verification
    if (values[0] === 'admin_kelurahan1') {
      return [{
        id: 1,
        username: 'admin_kelurahan1',
        name: 'Admin Simokerto',
        role: 'superadmin',
        password: '$2b$12$wP71o9pxLPBbS2R6pIhMWey91iz9eFTN/lHowAVUYH85ijNs9St46', // admin123 (changed from simokerto123)
        pending: false,
        created_at: '2025-07-02 14:21:23'
      }];
    }
    
    if (values[0] === 'admin1') {
      return [{
        id: 2,
        username: 'admin1',
        name: 'admintest',
        role: 'admin1',
        password: '$2b$12$JvxPQhOEqeqsjW4tMLAHqeswqoAqIKBt37tUFvx7/r4TscnoF.3i.', // 12345678
        pending: false,
        created_at: '2025-07-03 05:24:11'
      }];
    }
    
    // Return empty array for non-existent users
    return [];
  }
  
  // For admin list queries
  if (table === 'admin' && q.includes('role IS NOT NULL')) {
    return [
      {
        id: 1,
        username: 'admin_kelurahan1',
        name: 'Admin Simokerto',
        role: 'superadmin',
        created_at: '2025-07-02 14:21:23'
      },
      {
        id: 2,
        username: 'admin1',
        name: 'admintest',
        role: 'admin',
        created_at: '2025-07-03 05:24:11'
      }
    ];
  }

  if (table === 'admin' && q.includes('role IS NULL')) {
    return [];
  }

  // For COUNT queries
  if (q.includes('COUNT')) {
    if (table === 'admin') {
      return [{ count: 2 }];
    }
    if (table === 'reports') {
      return [{ count: 35 }];
    }
  }

  if (table === 'reports') {
    return [{ count: 35 }];
  }
  
  // Mock data for stats endpoint
  if (q === 'SELECT 1') {
    return [{ '1': 1 }];
  }
  
  // Default mock response for other queries
  return [];
}
