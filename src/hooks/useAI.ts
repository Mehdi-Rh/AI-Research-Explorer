import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

export async function sendMessageToCohere(prompt: string) {
  try {
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
    console.error('Error communicating with Cohere:', error);
    throw error;
  }
}
