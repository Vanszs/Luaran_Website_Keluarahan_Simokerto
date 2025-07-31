#!/usr/bin/env node

/**
 * Test script untuk verifikasi session functionality
 * Menguji pembuatan dan verifikasi session
 */


/**
 * Test script untuk verifikasi session functionality
 * Menguji pembuatan dan verifikasi session
 */

const crypto = require('crypto');

console.log('=== Testing Session Utils ===\n');

// Test configuration
const TEST_SECRET = process.env.SESSION_SECRET || 'test-secret-key-for-session-management-123456789';

// Recreate session functions for testing (CommonJS compatible)
function createSignature(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function verifySignature(data, signature, secret) {
  const expectedSignature = createSignature(data, secret);
  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'));
}

function createSession(userData, secret = TEST_SECRET) {
  const sessionData = {
    user: userData,
    createdAt: Date.now(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  
  const sessionString = JSON.stringify(sessionData);
  const signature = createSignature(sessionString, secret);
  
  return `${Buffer.from(sessionString).toString('base64')}.${signature}`;
}

function verifySession(sessionToken, secret = TEST_SECRET) {
  if (!sessionToken) return null;
  
  try {
    const [encodedData, signature] = sessionToken.split('.');
    if (!encodedData || !signature) return null;
    
    const sessionString = Buffer.from(encodedData, 'base64').toString();
    
    if (!verifySignature(sessionString, signature, secret)) {
      return null;
    }
    
    const sessionData = JSON.parse(sessionString);
    
    if (!sessionData.user || !sessionData.expiresAt) return null;
    if (Date.now() > sessionData.expiresAt) return null;
    
    return sessionData.user;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

// Test data
const testUser = {
  id: 'test-123',
  username: 'testuser',
  name: 'Test User',
  role: 'admin1'
};

console.log('1. Creating session for user:', testUser);

try {
  // Create session
  const sessionToken = createSession(testUser);
  console.log('✅ Session created successfully');
  console.log('Session token length:', sessionToken.length);
  console.log('Session token preview:', sessionToken.substring(0, 50) + '...\n');

  // Verify session
  console.log('2. Verifying session...');
  const verifiedData = verifySession(sessionToken);
  
  if (verifiedData) {
    console.log('✅ Session verified successfully');
    console.log('Verified user data:', verifiedData);
    
    // Check if data matches
    const dataMatches = (
      verifiedData.id === testUser.id &&
      verifiedData.username === testUser.username &&
      verifiedData.name === testUser.name &&
      verifiedData.role === testUser.role
    );
    
    if (dataMatches) {
      console.log('✅ All user data matches correctly');
    } else {
      console.log('❌ User data mismatch detected');
    }
    
  } else {
    console.log('❌ Session verification failed');
  }

  console.log('\n3. Testing invalid session...');
  const invalidSession = verifySession('invalid-session-data');
  if (!invalidSession) {
    console.log('✅ Invalid session correctly rejected');
  } else {
    console.log('❌ Invalid session was accepted (security issue!)');
  }

  console.log('\n4. Testing tampered session...');
  // Tamper with the session
  const tamperedSession = sessionToken.slice(0, -5) + 'XXXXX';
  const tamperedResult = verifySession(tamperedSession);
  if (!tamperedResult) {
    console.log('✅ Tampered session correctly rejected');
  } else {
    console.log('❌ Tampered session was accepted (security issue!)');
  }

} catch (error) {
  console.error('❌ Error during session testing:', error);
}

console.log('\n=== Session Test Complete ===');
