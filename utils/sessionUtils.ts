import crypto from 'crypto';

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

export function verifySession(sessionValue: string): SessionData | null {
  try {
    const decoded = Buffer.from(sessionValue, 'base64').toString('utf8');
    const sessionPayload: SessionPayload = JSON.parse(decoded);
    
    // Verify signature
    const secret = process.env.SESSION_SECRET || 'default-secret-change-in-production';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(sessionPayload.data))
      .digest('hex');
    
    if (sessionPayload.signature !== expectedSignature) {
      console.warn('Session signature verification failed');
      return null;
    }
    
    // Check session expiration (7 days)
    const now = new Date().getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    
    if (now - sessionPayload.data.timestamp > sevenDaysMs) {
      console.warn('Session expired');
      return null;
    }
    
    return sessionPayload.data;
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
  
  // Create HMAC signature for session integrity
  const secret = process.env.SESSION_SECRET || 'default-secret-change-in-production';
  const sessionPayload = JSON.stringify(sessionData);
  const signature = crypto.createHmac('sha256', secret).update(sessionPayload).digest('hex');
  
  return Buffer.from(JSON.stringify({
    data: sessionData,
    signature: signature
  })).toString('base64');
}
