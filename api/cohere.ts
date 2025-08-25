import { CohereClientV2 } from 'cohere-ai';

interface VercelRequest {
  method?: string;
  body: Record<string, unknown>;
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  json: (object: Record<string, unknown>) => void;
  end: () => void;
}

interface CohereRequest {
  prompt: string;
  model?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate API key exists
    const apiKey = process.env.COHERE_API_KEY;
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      apiKeyStart: apiKey?.substring(0, 4) || 'none',
    });

    if (!apiKey) {
      console.error('COHERE_API_KEY environment variable not set');
      return res.status(500).json({ error: 'Server configuration error: Missing API key' });
    }

    // Parse and validate request body
    const requestData = req.body as unknown as CohereRequest;

    if (!requestData.prompt || typeof requestData.prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt is required' });
    }

    // Initialize Cohere client
    const cohere = new CohereClientV2({
      token: apiKey,
    });

    console.log('Making request to Cohere API...', {
      model: requestData.model || 'command-a-03-2025',
      promptLength: requestData.prompt.length,
    });

    // Make request to Cohere API using the official SDK
    const response = await cohere.chat({
      model: requestData.model || 'command-a-03-2025',
      messages: [
        {
          role: 'user',
          content: requestData.prompt,
        },
      ],
    });

    console.log('Cohere API request successful');

    // Extract text from response
    let responseText = 'No response generated';
    if (response.message?.content) {
      for (const contentItem of response.message.content) {
        if ('text' in contentItem && contentItem.text) {
          responseText = contentItem.text;
          break;
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: {
        content: [{ text: responseText }],
      },
    });
  } catch (error) {
    console.error('Proxy API error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
    });

    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
