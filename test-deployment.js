#!/usr/bin/env node

/**
 * Vercel Deployment Test Script
 * Run this after deploying to test your serverless API
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function testDeployedAPI() {
  console.log('🚀 Vercel Deployment API Test\n');

  rl.question(
    'Enter your deployed Vercel URL (e.g., https://your-app.vercel.app): ',
    async (url) => {
      const apiUrl = `${url.replace(/\/$/, '')}/api/cohere`;

      console.log(`\n🧪 Testing API endpoint: ${apiUrl}\n`);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'Hello! This is a test message for the deployed API.',
            model: 'command-a-03-2025',
          }),
        });

        console.log(`📊 Response Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ API Test Successful!');
          console.log('📝 Response:', data);

          if (data.success && data.message?.content?.[0]?.text) {
            console.log('\n🤖 AI Response:');
            console.log(`"${data.message.content[0].text}"`);
          }
        } else {
          const errorData = await response.text();
          console.log('❌ API Test Failed');
          console.log('🔍 Error Details:', errorData);

          if (response.status === 500) {
            console.log('\n💡 Common fixes:');
            console.log('   - Check if COHERE_API_KEY is set in Vercel environment variables');
            console.log('   - Redeploy after adding environment variables');
          }
        }
      } catch (error) {
        console.log('❌ Network Error:', error.message);
        console.log('\n💡 Check:');
        console.log('   - URL is correct and accessible');
        console.log('   - API endpoint is deployed');
      }

      console.log('\n🎯 Next steps:');
      console.log('   - Test the retry mechanism in your deployed app');
      console.log('   - Use the retry test panel in the UI');
      console.log('   - Send chat messages to test full functionality');

      rl.close();
    }
  );
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with built-in fetch');
  console.log('💡 Alternative: Test your API using the deployed web app directly');
  process.exit(1);
}

testDeployedAPI();
