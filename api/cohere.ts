export default async function handler(req, res) {
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
    const requestData = req.body;

    if (!requestData.prompt || typeof requestData.prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt is required' });
    }

    // Prepare Cohere API request
    const coherePayload = {
      model: requestData.model || 'command-a-03-2025',
      messages: [
        {
          role: 'user',
          content: requestData.prompt,
        },
      ],
    };

    console.log('Making request to Cohere API...', {
      model: coherePayload.model,
      promptLength: coherePayload.messages[0].content.length,
    });

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
      return res.status(response.status).json({
        error: `Cohere API error: ${response.status}`,
        details: errorText,
      });
    }

    const cohereResponse = await response.json();

    // Extract text from Cohere response
    let responseText = 'No response generated';
    if (cohereResponse.message?.content?.[0]?.text) {
      responseText = cohereResponse.message.content[0].text;
    }

    console.log('Cohere API request successful');

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
    const requestData = req.body as CohereRequest;

    if (!requestData.prompt || typeof requestData.prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt is required' });
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

    console.log('Making request to Cohere API...', {
      model: coherePayload.model,
      promptLength: coherePayload.messages[0].content.length,
    });

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
      return res.status(response.status).json({
        error: `Cohere API error: ${response.status}`,
        details: errorText,
      });
    }

    const cohereResponse: CohereResponse = await response.json();

    // Extract text from Cohere response
    let responseText = 'No response generated';
    if (cohereResponse.message?.content?.[0]?.text) {
      responseText = cohereResponse.message.content[0].text;
    }

    console.log('Cohere API request successful');

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
