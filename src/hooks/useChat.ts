import { useContext, useCallback } from 'react';
import ChatContext from '../contexts/ChatContext';
import type { ChatContextType } from '../contexts/ChatContext';
import { sendMessageToCohere } from './useAI';

export function useChat(): ChatContextType & {
  sendMessage: (userMessage: string) => Promise<void>;
} {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  // Mock API call function
  const sendMessage = useCallback(
    async (userMessage: string): Promise<void> => {
      if (!userMessage.trim()) {
        return; // Don't send empty messages
      }

      try {
        // Add user message to chat history
        context.addMessage('user', userMessage.trim());

        // Set loading state
        context.setLoading(true);

        // Mock API call with setTimeout to simulate AI API delay
        await new Promise((resolve) => {
          setTimeout(async () => {
            try {
              // Generate context for AI
              const selectedPapers = context.state.selectedPapers;
              let contextualPrompt: string;

              if (selectedPapers.length > 0) {
                const papersInfo = selectedPapers
                  .map(
                    (paper, idx) =>
                      `${idx + 1}. Title: "${paper.title}"\n   Abstract: ${
                        paper.abstract
                      }\n   Authors: ${paper.authors.join(', ')}\n   Year: ${paper.year}`
                  )
                  .join('\n\n');

                contextualPrompt = `Based on the following research papers, please answer this question: "${userMessage.trim()}"\n\nSelected Papers:\n${papersInfo}\n\nPlease provide a comprehensive answer based on these papers.`;
              } else {
                contextualPrompt = userMessage.trim();
              }

              const aiResponse = await sendMessageToCohere(contextualPrompt);

              // Add AI response to chat history
              let responseText = 'An error has occurred';
              if (aiResponse?.message?.content) {
                // Handle different content types from Cohere
                const content = aiResponse.message.content[0];
                if (content && 'text' in content) {
                  responseText = content.text;
                }
              }

              context.addMessage('ai', responseText);
            } catch (aiError) {
              // Handle AI API errors specifically
              console.error('AI API Error:', aiError);

              let errorMessage = '❌ **AI Service Error**\n\n';

              if (aiError instanceof Error) {
                const errorMsg = aiError.message.toLowerCase();

                // Check for specific HTTP status codes from Cohere API
                if (errorMsg.includes('400') || errorMsg.includes('bad request')) {
                  errorMessage +=
                    '📝 **Bad Request (400)**: Invalid request format. Please check your input and try again.';
                } else if (errorMsg.includes('401') || errorMsg.includes('unauthorized')) {
                  errorMessage +=
                    '🔑 **Unauthorized (401)**: Invalid or expired API key. Please check your Cohere API configuration.';
                } else if (errorMsg.includes('402') || errorMsg.includes('payment required')) {
                  errorMessage +=
                    '💳 **Payment Required (402)**: Account billing limit reached. Please update your payment method.';
                } else if (errorMsg.includes('404') || errorMsg.includes('not found')) {
                  errorMessage +=
                    '🔍 **Not Found (404)**: Requested model or resource not found. The model may be unavailable.';
                } else if (
                  errorMsg.includes('429') ||
                  errorMsg.includes('rate limit') ||
                  errorMsg.includes('too many requests')
                ) {
                  errorMessage +=
                    '⏱️ **Rate Limit (429)**: Too many requests. Please wait a moment and try again.';
                } else if (errorMsg.includes('499') || errorMsg.includes('cancelled')) {
                  errorMessage +=
                    '🚫 **Request Cancelled (499)**: Request was cancelled. Please try again.';
                } else if (
                  errorMsg.includes('500') ||
                  errorMsg.includes('server error') ||
                  errorMsg.includes('internal')
                ) {
                  errorMessage +=
                    '🔧 **Server Error (500)**: Internal server error. Please try again later or contact support.';
                } else if (errorMsg.includes('timeout')) {
                  errorMessage +=
                    '⏰ **Timeout**: The AI service is taking too long to respond. Please try again.';
                } else if (errorMsg.includes('network')) {
                  errorMessage +=
                    '🌐 **Network Error**: Unable to connect to AI service. Please check your internet connection.';
                } else {
                  errorMessage += `🔧 **Service Error**: ${aiError.message}`;
                }
              } else {
                errorMessage +=
                  '🔧 **Unknown Error**: Something went wrong with the AI service. Please try again later.';
              }

              errorMessage +=
                '\n\n💡 *Tip: You can still browse and select research papers while we resolve this issue.*';

              context.addMessage('ai', errorMessage);
            }

            // Clear loading state
            context.setLoading(false);

            resolve(undefined);
          }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
        });
      } catch (error) {
        // Handle error
        context.setError('Failed to send message. Please try again.');
        context.setLoading(false);
        console.error('Error sending message:', error);
      }
    },
    [context]
  );

  return {
    ...context,
    sendMessage,
  };
}
