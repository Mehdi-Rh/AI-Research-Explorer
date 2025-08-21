// Production deployment: Use serverless proxy to protect API keys
const API_ENDPOINT = '/api/cohere';

// For development, we need a fallback since we don't have the serverless function running locally
const isDevelopment = import.meta.env.DEV;

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryableStatusCodes: number[];
}

interface RetryStatus {
  attempt: number;
  maxRetries: number;
  nextRetryIn?: number;
  isRetrying: boolean;
}

interface ProxyResponse {
  success: boolean;
  message: {
    content: Array<{ text: string }>;
  };
  error?: string;
  details?: string;
}

export type { RetryStatus };

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 16000, // 16 seconds
  retryableStatusCodes: [429, 500, 502, 503, 504],
};

// Utility function to extract status code from error
function getStatusCodeFromError(error: unknown): number | null {
  // Check if error has a status property
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: unknown }).status;
    if (typeof status === 'number') {
      return status;
    }
  }

  // Check if error message contains status code
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === 'string') {
      const statusMatch = message.match(/(\d{3})/);
      if (statusMatch) {
        return parseInt(statusMatch[1], 10);
      }
    }
  }

  // Check for network errors that should be retried
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === 'string' && message.toLowerCase().includes('network')) {
      return 503; // Treat network errors as service unavailable
    }
  }

  return null;
}

// Check if error is retryable
function isRetryableError(error: unknown, retryableStatusCodes: number[]): boolean {
  const statusCode = getStatusCodeFromError(error);
  return statusCode ? retryableStatusCodes.includes(statusCode) : false;
}

// Calculate exponential backoff delay
function calculateDelay(attempt: number, baseDelay: number, maxDelay: number): number {
  const exponentialDelay = baseDelay * Math.pow(2, attempt);
  const jitteredDelay = exponentialDelay * (0.5 + Math.random() * 0.5); // Add jitter
  return Math.min(jitteredDelay, maxDelay);
}

// Sleep utility
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Test utility functions for simulating errors
export function createMockError(statusCode: number, message?: string): Error {
  const error = new Error(message || `HTTP Error ${statusCode}`);
  (error as unknown as { status: number }).status = statusCode;
  return error;
}

export async function testRetryMechanism(): Promise<unknown> {
  console.log('🧪 Testing retry mechanism with reduced delays...');

  return sendMessageToCohere(
    'Test message: Hello, this is a test of the retry mechanism.',
    (status) => {
      console.log(`🔄 Retry Status:`, {
        attempt: status.attempt,
        maxRetries: status.maxRetries,
        isRetrying: status.isRetrying,
        nextRetryIn: status.nextRetryIn ? `${Math.ceil(status.nextRetryIn / 1000)}s` : undefined,
      });
    },
    {
      maxRetries: 2, // Reduced for faster testing
      baseDelay: 500, // Reduced delay for testing
      maxDelay: 2000,
    }
  );
}

export async function sendMessageToCohere(
  prompt: string,
  onRetryStatus?: (status: RetryStatus) => void,
  retryConfig: Partial<RetryConfig> = {}
) {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError: unknown;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      // Report retry status
      if (onRetryStatus) {
        onRetryStatus({
          attempt: attempt + 1,
          maxRetries: config.maxRetries + 1,
          isRetrying: attempt > 0,
        });
      }

      // In development, check if we have a local API key for direct access
      if (isDevelopment && import.meta.env.VITE_COHERE_API_KEY) {
        // Direct API call for development (keeping the original behavior)
        const response = await fetch('https://api.cohere.com/v2/chat', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'command-a-03-2025',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          const error = new Error(`HTTP ${response.status}: ${errorText}`);
          (error as unknown as { status: number }).status = response.status;
          throw error;
        }

        const data = await response.json();
        return {
          message: {
            content: data.message?.content || [{ text: 'No response generated' }],
          },
        };
      } else {
        // Use serverless proxy for production or when no local API key
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            model: 'command-a-03-2025',
          }),
        });

        if (!response.ok) {
          // Extract error details for better error handling
          let errorMessage = `HTTP ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = (await response.text()) || errorMessage;
          }

          const error = new Error(errorMessage);
          (error as unknown as { status: number }).status = response.status;
          throw error;
        }

        const data: ProxyResponse = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'API request failed');
        }

        // Return response in the same format as Cohere client
        return {
          message: {
            content: data.message.content,
          },
        };
      }
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error);

      // If this is the last attempt or error is not retryable, throw
      if (attempt === config.maxRetries || !isRetryableError(error, config.retryableStatusCodes)) {
        throw error;
      }

      // Calculate delay for next retry
      const delay = calculateDelay(attempt, config.baseDelay, config.maxDelay);

      // Report retry status with delay information
      if (onRetryStatus) {
        onRetryStatus({
          attempt: attempt + 1,
          maxRetries: config.maxRetries + 1,
          nextRetryIn: delay,
          isRetrying: true,
        });
      }

      // Wait before retrying
      await sleep(delay);
    }
  }

  // This should never be reached, but just in case
  throw lastError;
}
