import { useContext, useCallback } from 'react';
import ChatContext from '../contexts/ChatContext';
import type { ChatContextType } from '../contexts/ChatContext';

export function useChat(): ChatContextType & {
  sendMessage: (userMessage: string) => Promise<void>;
} {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  // Mock API call function
  const sendMessage = useCallback(async (userMessage: string): Promise<void> => {
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
        setTimeout(() => {
          // Generate mock AI response
          const selectedPapersContext = context.state.selectedPapers.length > 0
            ? ` I can see you have ${context.state.selectedPapers.length} selected paper${context.state.selectedPapers.length > 1 ? 's' : ''} for context: ${context.state.selectedPapers.map(paper => `"${paper.title}"`).join(', ')}.`
            : ' No papers are currently selected for context.';

          const aiResponse = `Mock AI response for: "${userMessage}"${selectedPapersContext}`;
          
          // Add AI response to chat history
          context.addMessage('ai', aiResponse);
          
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
  }, [context]);
  
  return {
    ...context,
    sendMessage,
  };
}
