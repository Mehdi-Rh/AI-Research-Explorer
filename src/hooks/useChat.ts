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
