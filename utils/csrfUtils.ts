import crypto from 'crypto';

const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

export interface CSRFToken {
  token: string;
  timestamp: number;
}

// Generate CSRF token
export function generateCSRFToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now();
  
  const tokenData: CSRFToken = {
    token,
    timestamp
  };
  
  return Buffer.from(JSON.stringify(tokenData)).toString('base64');
}

// Verify CSRF token
export function verifyCSRFToken(tokenString: string, expectedToken?: string): boolean {
  try {
    const decoded = Buffer.from(tokenString, 'base64').toString('utf8');
    const tokenData: CSRFToken = JSON.parse(decoded);
    
    // Check if token is expired
    if (Date.now() - tokenData.timestamp > CSRF_TOKEN_EXPIRY) {
      return false;
    }
    
    // If expectedToken is provided, compare it
    if (expectedToken && tokenData.token !== expectedToken) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying CSRF token:', error);
    return false;
  }
}

// Extract token from CSRF token string
export function extractTokenFromCSRF(tokenString: string): string | null {
  try {
    const decoded = Buffer.from(tokenString, 'base64').toString('utf8');
    const tokenData: CSRFToken = JSON.parse(decoded);
    return tokenData.token;
  } catch (error) {
    return null;
  }
}
