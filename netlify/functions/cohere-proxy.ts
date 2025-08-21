import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface CohereRequest {
  prompt: string;
  model?: string;
}

interface CohereMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CohereResponse {
  message?: {
    content: Array<{ text: string }>;
  };
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    // Validate API key exists
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) {
      console.error('COHERE_API_KEY environment variable not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const requestData: CohereRequest = JSON.parse(event.body);

    if (!requestData.prompt || typeof requestData.prompt !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Valid prompt is required' }),
      };
    }

    // Prepare Cohere API request
    const coherePayload = {
      model: requestData.model || 'command-a-03-2025',
      messages: [
        {
          role: 'user' as const,
          content: requestData.prompt,
        },
      ],
    };

    console.log('Making request to Cohere API...');

    // Make request to Cohere API
    const response = await fetch('https://api.cohere.com/v2/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(coherePayload),
    });

    // Handle Cohere API response
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cohere API error (${response.status}):`, errorText);

      // Return the same status code to preserve retry logic
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: `Cohere API error: ${response.status}`,
          details: errorText,
        }),
      };
    }

    const cohereResponse: CohereResponse = await response.json();

    // Extract text from Cohere response
    let responseText = 'No response generated';
    if (cohereResponse.message?.content?.[0]?.text) {
      responseText = cohereResponse.message.content[0].text;
    }

    console.log('Cohere API request successful');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: {
          content: [{ text: responseText }],
        },
      }),
    };
  } catch (error) {
    console.error('Proxy function error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
