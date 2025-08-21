import { useState } from 'react';
import { testRetryMechanism, createMockError } from '../hooks/useAI';

interface TestResult {
  success: boolean;
  message: string;
  timestamp: string;
  duration: number;
}

interface ErrorWithStatus extends Error {
  status: number;
}

export function RetryTestPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    setResults((prev) => [
      ...prev,
      {
        ...result,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const clearResults = () => {
    setResults([]);
    console.clear();
  };

  const testBasicRetry = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      console.log('🧪 Starting basic retry test...');
      const result = await testRetryMechanism();
      const duration = Date.now() - startTime;

      addResult({
        success: true,
        message: 'Basic retry test completed successfully',
        duration,
      });
      console.log('✅ Test completed:', result);
    } catch (error) {
      const duration = Date.now() - startTime;
      addResult({
        success: false,
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration,
      });
      console.error('❌ Test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testErrorHandling = () => {
    console.log('🧪 Testing error creation and status code extraction...');

    try {
      // Test different error types
      const error429 = createMockError(429, 'Rate limit exceeded');
      const error500 = createMockError(500, 'Internal server error');
      const error503 = createMockError(503, 'Service unavailable');

      console.log('Created test errors:', {
        error429: {
          status: (error429 as unknown as ErrorWithStatus).status,
          message: error429.message,
        },
        error500: {
          status: (error500 as unknown as ErrorWithStatus).status,
          message: error500.message,
        },
        error503: {
          status: (error503 as unknown as ErrorWithStatus).status,
          message: error503.message,
        },
      });

      addResult({
        success: true,
        message: 'Error creation test passed - check console for details',
        duration: 0,
      });
    } catch (error) {
      addResult({
        success: false,
        message: `Error creation test failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        duration: 0,
      });
    }
  };

  const testDelayCalculation = () => {
    console.log('🧪 Testing exponential backoff delay calculation...');

    // Test delay calculation for different attempts
    const baseDelay = 1000;
    const maxDelay = 16000;

    for (let attempt = 0; attempt < 5; attempt++) {
      const exponentialDelay = baseDelay * Math.pow(2, attempt);
      const jitteredDelay = exponentialDelay * (0.5 + Math.random() * 0.5);
      const finalDelay = Math.min(jitteredDelay, maxDelay);

      console.log(
        `Attempt ${attempt + 1}: ${Math.round(finalDelay)}ms (exponential: ${exponentialDelay}ms)`
      );
    }

    addResult({
      success: true,
      message: 'Delay calculation test completed - check console for details',
      duration: 0,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        border: '2px solid #007acc',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '300px',
        maxHeight: '500px',
        overflow: 'auto',
        fontSize: '14px',
        zIndex: 1000,
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', color: '#007acc' }}>🧪 Retry Test Panel</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={testBasicRetry}
          disabled={isLoading}
          style={{
            padding: '8px 12px',
            backgroundColor: isLoading ? '#ccc' : '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? '⏳ Testing...' : '🔄 Test Basic Retry'}
        </button>

        <button
          onClick={testErrorHandling}
          style={{
            padding: '8px 12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🔧 Test Error Handling
        </button>

        <button
          onClick={testDelayCalculation}
          style={{
            padding: '8px 12px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ⏱️ Test Delay Calculation
        </button>

        <button
          onClick={clearResults}
          style={{
            padding: '8px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🗑️ Clear Results
        </button>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '12px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>Test Results:</h4>
        {results.length === 0 ? (
          <p style={{ margin: 0, color: '#999', fontSize: '12px' }}>No tests run yet</p>
        ) : (
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '6px',
                  marginBottom: '4px',
                  backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                  border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                  borderRadius: '4px',
                  fontSize: '11px',
                }}
              >
                <div style={{ fontWeight: 'bold', color: result.success ? '#155724' : '#721c24' }}>
                  {result.success ? '✅' : '❌'} {result.timestamp}
                </div>
                <div style={{ color: result.success ? '#155724' : '#721c24', marginTop: '2px' }}>
                  {result.message}
                </div>
                {result.duration > 0 && (
                  <div style={{ color: '#666', fontSize: '10px', marginTop: '2px' }}>
                    Duration: {result.duration}ms
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '12px', fontSize: '11px', color: '#666' }}>
        💡 Open browser console for detailed logs
      </div>
    </div>
  );
}
