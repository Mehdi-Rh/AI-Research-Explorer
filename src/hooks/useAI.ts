import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

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

      const response = await cohere.chat({
        model: 'command-a-03-2025',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      return response;
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
