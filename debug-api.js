// Simple test to debug the API endpoint
// Copy and paste this into your browser console on the chat page

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoint...');

    const response = await fetch('/api/cohere', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Hello, this is a test message.',
        model: 'command-a-03-2025',
      }),
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ Success response:', data);
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Run the test
testAPI();
