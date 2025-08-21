#!/usr/bin/env node

/**
 * Quick Test Script for Retry Mechanism
 * Run this with: node test-retry.js
 */

console.log('🧪 Testing Retry Mechanism Components...\n');

// Test 1: Exponential Backoff Calculation
console.log('1️⃣ Testing exponential backoff calculation:');
function calculateDelay(attempt, baseDelay = 1000, maxDelay = 16000) {
  const exponentialDelay = baseDelay * Math.pow(2, attempt);
  const jitteredDelay = exponentialDelay * (0.5 + Math.random() * 0.5);
  return Math.min(jitteredDelay, maxDelay);
}

for (let i = 0; i < 5; i++) {
  const delay = calculateDelay(i);
  console.log(`   Attempt ${i + 1}: ~${Math.round(delay)}ms`);
}

// Test 2: Status Code Extraction
console.log('\n2️⃣ Testing status code extraction:');
function getStatusCodeFromError(error) {
  if (error && typeof error === 'object' && 'status' in error) {
    return error.status;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const statusMatch = error.message.match(/(\d{3})/);
    if (statusMatch) {
      return parseInt(statusMatch[1], 10);
    }
  }
  return null;
}

const testErrors = [
  { status: 429, message: 'Rate limited' },
  { message: 'HTTP 500 Internal Server Error' },
  { message: 'Network error occurred' },
  { message: 'Something went wrong' },
];

testErrors.forEach((error, index) => {
  const statusCode = getStatusCodeFromError(error);
  console.log(`   Error ${index + 1}: ${statusCode || 'No status'} (${error.message})`);
});

// Test 3: Retryable Error Detection
console.log('\n3️⃣ Testing retryable error detection:');
function isRetryableError(error, retryableStatusCodes = [429, 500, 502, 503, 504]) {
  const statusCode = getStatusCodeFromError(error);
  return statusCode ? retryableStatusCodes.includes(statusCode) : false;
}

testErrors.forEach((error, index) => {
  const isRetryable = isRetryableError(error);
  console.log(`   Error ${index + 1}: ${isRetryable ? '✅ Retryable' : '❌ Not retryable'}`);
});

// Test 4: Retry Configuration
console.log('\n4️⃣ Testing retry configuration:');
const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 16000,
  retryableStatusCodes: [429, 500, 502, 503, 504],
};

console.log('   Default config:', DEFAULT_RETRY_CONFIG);

const customConfig = { ...DEFAULT_RETRY_CONFIG, maxRetries: 2, baseDelay: 500 };
console.log('   Custom config:', customConfig);

console.log('\n✅ Core retry mechanism tests completed!');
console.log('\n📋 Next steps to test in your app:');
console.log('   1. Start your dev server: npm run dev');
console.log('   2. Look for the "🧪 Retry Test Panel" in the top-right corner');
console.log('   3. Click "🔄 Test Basic Retry" to test with real API calls');
console.log('   4. Open browser console to see detailed retry logs');
console.log('   5. Try sending chat messages to see retry in action');
