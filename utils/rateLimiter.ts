interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private readonly BLOCK_DURATION_MS = 30 * 60 * 1000; // 30 minutes

  public isBlocked(identifier: string): boolean {
    const entry = this.attempts.get(identifier);
    if (!entry) return false;

    // Check if currently blocked
    if (entry.blockedUntil && Date.now() < entry.blockedUntil) {
      return true;
    }

    // Reset if block period has passed
    if (entry.blockedUntil && Date.now() >= entry.blockedUntil) {
      this.attempts.delete(identifier);
      return false;
    }

    return false;
  }

  public recordAttempt(identifier: string, success: boolean): boolean {
    const now = Date.now();
    let entry = this.attempts.get(identifier);

    if (!entry) {
      entry = { attempts: 0, lastAttempt: now };
    }

    // Reset attempts if window has passed
    if (now - entry.lastAttempt > this.WINDOW_MS) {
      entry.attempts = 0;
    }

    if (success) {
      // Reset on successful attempt
      this.attempts.delete(identifier);
      return false;
    }

    // Increment failed attempts
    entry.attempts++;
    entry.lastAttempt = now;

    // Block if too many attempts
    if (entry.attempts >= this.MAX_ATTEMPTS) {
      entry.blockedUntil = now + this.BLOCK_DURATION_MS;
      this.attempts.set(identifier, entry);
      return true;
    }

    this.attempts.set(identifier, entry);
    return false;
  }

  public getRemainingAttempts(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry) return this.MAX_ATTEMPTS;

    const now = Date.now();
    
    // Reset if window has passed
    if (now - entry.lastAttempt > this.WINDOW_MS) {
      return this.MAX_ATTEMPTS;
    }

    return Math.max(0, this.MAX_ATTEMPTS - entry.attempts);
  }

  public getBlockTimeRemaining(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry || !entry.blockedUntil) return 0;

    return Math.max(0, entry.blockedUntil - Date.now());
  }

  // Clean up old entries periodically
  public cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.attempts.forEach((entry, key) => {
      // Remove entries older than block duration + window
      if (now - entry.lastAttempt > (this.BLOCK_DURATION_MS + this.WINDOW_MS)) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.attempts.delete(key));
  }
}

// Global rate limiter instance
export const loginRateLimiter = new RateLimiter();

// Cleanup old entries every hour
setInterval(() => loginRateLimiter.cleanup(), 60 * 60 * 1000);
