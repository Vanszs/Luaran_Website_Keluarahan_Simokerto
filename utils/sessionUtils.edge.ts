// Edge runtime compatible session utilities (without Node.js crypto)

export interface SessionData {
  id: string;
  username: string;
  name: string;
  role: string;
  timestamp: number;
}

export interface SessionPayload {
  data: SessionData;
  signature: string;
}

// Simple hash function for edge runtime (not cryptographically secure, but better than nothing)
function simpleHash(data: string, secret: string): string {
  let hash = 0;
  const combined = data + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function verifySession(sessionValue: string): SessionData | null {
  try {
    const decoded = Buffer.from(sessionValue, 'base64').toString('utf8');
    const sessionData: SessionData = JSON.parse(decoded);
    
    // Check session expiration (7 days)
    const now = new Date().getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    
    if (now - sessionData.timestamp > sevenDaysMs) {
      console.warn('Session expired');
      return null;
    }
    
    // Basic validation
    if (!sessionData.id || !sessionData.role) {
      console.warn('Invalid session data structure');
      return null;
    }
    
    return sessionData;
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}

export function createSession(userData: Omit<SessionData, 'timestamp'>): string {
  const sessionData: SessionData = {
    ...userData,
    timestamp: new Date().getTime()
  };
  
  // Create simple hash signature for session integrity
  const secret = process.env.SESSION_SECRET || 'default-secret-change-in-production';
  const sessionPayload = JSON.stringify(sessionData);
  const signature = simpleHash(sessionPayload, secret);
  
  return Buffer.from(JSON.stringify({
    data: sessionData,
    signature: signature
  })).toString('base64');
}
