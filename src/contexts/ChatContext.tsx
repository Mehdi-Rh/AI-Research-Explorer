import React, { createContext, useReducer, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { MockPaper } from '../types/paper';

// Chat Message Interface
export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Chat State Interface
export interface ChatState {
  chatHistory: ChatMessage[];
  selectedPapers: MockPaper[];
  isLoading: boolean;
  error: string | null;
}

// Initial Chat State
const initialState: ChatState = {
  chatHistory: [],
  selectedPapers: [],
  isLoading: false,
  error: null,
};

// Chat Action Types
export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Omit<ChatMessage, 'id' | 'timestamp'> }
  | { type: 'CLEAR_CHAT_HISTORY' }
  | { type: 'SET_SELECTED_PAPERS'; payload: MockPaper[] }
  | { type: 'ADD_SELECTED_PAPER'; payload: MockPaper }
  | { type: 'REMOVE_SELECTED_PAPER'; payload: string } // paper id
  | { type: 'CLEAR_SELECTED_PAPERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_CHAT' };

// Generate unique ID for messages
const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Chat Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage: ChatMessage = {
        ...action.payload,
        id: generateMessageId(),
        timestamp: new Date(),
      };
      return {
        ...state,
        chatHistory: [...state.chatHistory, newMessage],
        isLoading: false,
        error: null,
      };
    }

    case 'CLEAR_CHAT_HISTORY':
      return {
        ...state,
        chatHistory: [],
        error: null,
      };

    case 'SET_SELECTED_PAPERS':
      return {
        ...state,
        selectedPapers: action.payload,
      };

    case 'ADD_SELECTED_PAPER': {
      // Check if paper is already selected
      const paperExists = state.selectedPapers.some((paper) => paper.id === action.payload.id);
      if (paperExists) {
        return state; // Don't add duplicate
      }
      return {
        ...state,
        selectedPapers: [...state.selectedPapers, action.payload],
      };
    }

    case 'REMOVE_SELECTED_PAPER':
      return {
        ...state,
        selectedPapers: state.selectedPapers.filter((paper) => paper.id !== action.payload),
      };

    case 'CLEAR_SELECTED_PAPERS':
      return {
        ...state,
        selectedPapers: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? null : state.error, // Clear error when starting new operation
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'RESET_CHAT':
      return initialState;

    default:
      return state;
  }
}

// Chat Context Interface
export interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  // Message functions
  addMessage: (role: 'user' | 'ai', text: string) => void;
  clearChatHistory: () => void;
  // Selected papers functions
  setSelectedPapers: (papers: MockPaper[]) => void;
  addSelectedPaper: (paper: MockPaper) => void;
  removeSelectedPaper: (paperId: string) => void;
  clearSelectedPapers: () => void;
  // Utility functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetChat: () => void;
  // Computed values
  hasSelectedPapers: boolean;
  messageCount: number;
  lastMessage: ChatMessage | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Chat Provider Props
interface ChatProviderProps {
  children: ReactNode;
}

// Chat Provider Component
export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Message functions - memoize to prevent re-creation on every render
  const addMessage = useMemo(
    () => (role: 'user' | 'ai', text: string) => {
      dispatch({ type: 'ADD_MESSAGE', payload: { role, text } });
    },
    []
  );

  const clearChatHistory = useMemo(
    () => () => {
      dispatch({ type: 'CLEAR_CHAT_HISTORY' });
    },
    []
  );

  // Selected papers functions
  const setSelectedPapers = useMemo(
    () => (papers: MockPaper[]) => {
      dispatch({ type: 'SET_SELECTED_PAPERS', payload: papers });
    },
    []
  );

  const addSelectedPaper = useMemo(
    () => (paper: MockPaper) => {
      dispatch({ type: 'ADD_SELECTED_PAPER', payload: paper });
    },
    []
  );

  const removeSelectedPaper = useMemo(
    () => (paperId: string) => {
      dispatch({ type: 'REMOVE_SELECTED_PAPER', payload: paperId });
    },
    []
  );

  const clearSelectedPapers = useMemo(
    () => () => {
      dispatch({ type: 'CLEAR_SELECTED_PAPERS' });
    },
    []
  );

  // Utility functions
  const setLoading = useMemo(
    () => (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    []
  );

  const setError = useMemo(
    () => (error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
    []
  );

  const resetChat = useMemo(
    () => () => {
      dispatch({ type: 'RESET_CHAT' });
    },
    []
  );

  // Computed values - memoize to prevent recalculation
  const hasSelectedPapers = useMemo(
    () => state.selectedPapers.length > 0,
    [state.selectedPapers.length]
  );

  const messageCount = useMemo(() => state.chatHistory.length, [state.chatHistory.length]);

  const lastMessage = useMemo(
    () => (state.chatHistory.length > 0 ? state.chatHistory[state.chatHistory.length - 1] : null),
    [state.chatHistory]
  );

  // Memoize the entire context value to prevent unnecessary re-renders
  const contextValue: ChatContextType = useMemo(
    () => ({
      state,
      dispatch,
      addMessage,
      clearChatHistory,
      setSelectedPapers,
      addSelectedPaper,
      removeSelectedPaper,
      clearSelectedPapers,
      setLoading,
      setError,
      resetChat,
      hasSelectedPapers,
      messageCount,
      lastMessage,
    }),
    [
      state,
      addMessage,
      clearChatHistory,
      setSelectedPapers,
      addSelectedPaper,
      removeSelectedPaper,
      clearSelectedPapers,
      setLoading,
      setError,
      resetChat,
      hasSelectedPapers,
      messageCount,
      lastMessage,
    ]
  );

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
}

// Export default
export default ChatContext;
