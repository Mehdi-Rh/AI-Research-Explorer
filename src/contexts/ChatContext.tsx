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
  lastPaperIds: string; // Track the last set of paper IDs
  isLoading: boolean;
  error: string | null;
}

// LocalStorage keys
const CHAT_STORAGE_KEY = 'ai-research-explorer-chat';
const SELECTED_PAPERS_STORAGE_KEY = 'ai-research-explorer-selected-papers';

// Persistence utilities
const saveToLocalStorage = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadChatFromLocalStorage = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((message: ChatMessage & { timestamp: string }) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }));
    }
  } catch (error) {
    console.warn('Failed to load chat from localStorage:', error);
  }
  return [];
};

const loadPapersFromLocalStorage = (): MockPaper[] => {
  try {
    const stored = localStorage.getItem(SELECTED_PAPERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load papers from localStorage:', error);
  }
  return [];
};

// Load initial state from localStorage
const getInitialState = (): ChatState => {
  const savedChatHistory = loadChatFromLocalStorage();
  const savedSelectedPapers = loadPapersFromLocalStorage();

  // Generate lastPaperIds from saved papers
  const lastPaperIds = savedSelectedPapers
    .map((paper) => paper.id)
    .sort()
    .join(',');

  return {
    chatHistory: savedChatHistory,
    selectedPapers: savedSelectedPapers,
    lastPaperIds,
    isLoading: false,
    error: null,
  };
};

// Initial Chat State
const initialState: ChatState = getInitialState();

// Chat Action Types
export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Omit<ChatMessage, 'id' | 'timestamp'> }
  | { type: 'UPDATE_LAST_MESSAGE'; payload: { role: 'user' | 'ai'; text: string } }
  | { type: 'CLEAR_CHAT_HISTORY' }
  | { type: 'SET_SELECTED_PAPERS'; payload: MockPaper[] }
  | { type: 'ADD_SELECTED_PAPER'; payload: MockPaper }
  | { type: 'REMOVE_SELECTED_PAPER'; payload: string } // paper id
  | { type: 'CLEAR_SELECTED_PAPERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CHECK_AND_CLEAR_ON_PAPER_CHANGE' } // Check if papers changed and clear if needed
  | { type: 'RESET_CHAT' };

// Generate unique ID for messages
const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Chat Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  let newState: ChatState;

  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage: ChatMessage = {
        ...action.payload,
        id: generateMessageId(),
        timestamp: new Date(),
      };
      newState = {
        ...state,
        chatHistory: [...state.chatHistory, newMessage],
        isLoading: false,
        error: null,
      };
      break;
    }

    case 'UPDATE_LAST_MESSAGE': {
      if (state.chatHistory.length === 0) {
        // If no messages exist, add a new one
        const newMessage: ChatMessage = {
          ...action.payload,
          id: generateMessageId(),
          timestamp: new Date(),
        };
        newState = {
          ...state,
          chatHistory: [newMessage],
          isLoading: false,
          error: null,
        };
      } else {
        // Update the last message
        const updatedHistory = [...state.chatHistory];
        const lastMessageIndex = updatedHistory.length - 1;
        updatedHistory[lastMessageIndex] = {
          ...updatedHistory[lastMessageIndex],
          text: action.payload.text,
          timestamp: new Date(),
        };
        newState = {
          ...state,
          chatHistory: updatedHistory,
          isLoading: false,
          error: null,
        };
      }
      break;
    }

    case 'CLEAR_CHAT_HISTORY':
      newState = {
        ...state,
        chatHistory: [],
        error: null,
      };
      break;

    case 'SET_SELECTED_PAPERS': {
      const currentPaperIds = state.selectedPapers
        .map((paper) => paper.id)
        .sort()
        .join(',');
      const newPaperIds = action.payload
        .map((paper) => paper.id)
        .sort()
        .join(',');

      // If papers actually changed and we have chat history, clear it
      const shouldClearHistory =
        state.lastPaperIds !== '' &&
        currentPaperIds !== newPaperIds &&
        state.chatHistory.length > 0;

      newState = {
        ...state,
        selectedPapers: action.payload,
        lastPaperIds: newPaperIds,
        chatHistory: shouldClearHistory ? [] : state.chatHistory,
      };
      break;
    }

    case 'ADD_SELECTED_PAPER': {
      // Check if paper is already selected
      const paperExists = state.selectedPapers.some((paper) => paper.id === action.payload.id);
      if (paperExists) {
        return state; // Don't add duplicate
      }
      newState = {
        ...state,
        selectedPapers: [...state.selectedPapers, action.payload],
      };
      break;
    }

    case 'REMOVE_SELECTED_PAPER':
      newState = {
        ...state,
        selectedPapers: state.selectedPapers.filter((paper) => paper.id !== action.payload),
      };
      break;

    case 'CLEAR_SELECTED_PAPERS':
      newState = {
        ...state,
        selectedPapers: [],
      };
      break;

    case 'SET_LOADING':
      newState = {
        ...state,
        isLoading: action.payload,
        error: action.payload ? null : state.error, // Clear error when starting new operation
      };
      break;

    case 'SET_ERROR':
      newState = {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      break;

    case 'RESET_CHAT':
      newState = getInitialState();
      break;

    default:
      return state;
  }

  // Save to localStorage after state changes (except for loading and error states)
  if (action.type !== 'SET_LOADING' && action.type !== 'SET_ERROR') {
    // Save chat history
    saveToLocalStorage(CHAT_STORAGE_KEY, newState.chatHistory);
    // Save selected papers
    saveToLocalStorage(SELECTED_PAPERS_STORAGE_KEY, newState.selectedPapers);
  }

  return newState;
}

// Chat Context Interface
export interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  // Message functions
  addMessage: (role: 'user' | 'ai', text: string) => void;
  updateLastMessage: (role: 'user' | 'ai', text: string) => void;
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
  clearPersistedData: () => void; // New function to clear localStorage
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

  const updateLastMessage = useMemo(
    () => (role: 'user' | 'ai', text: string) => {
      dispatch({ type: 'UPDATE_LAST_MESSAGE', payload: { role, text } });
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

  const clearPersistedData = useMemo(
    () => () => {
      try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
        localStorage.removeItem(SELECTED_PAPERS_STORAGE_KEY);
        dispatch({ type: 'RESET_CHAT' });
      } catch (error) {
        console.warn('Failed to clear localStorage:', error);
      }
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
      updateLastMessage,
      clearChatHistory,
      setSelectedPapers,
      addSelectedPaper,
      removeSelectedPaper,
      clearSelectedPapers,
      setLoading,
      setError,
      resetChat,
      clearPersistedData,
      hasSelectedPapers,
      messageCount,
      lastMessage,
    }),
    [
      state,
      addMessage,
      updateLastMessage,
      clearChatHistory,
      setSelectedPapers,
      addSelectedPaper,
      removeSelectedPaper,
      clearSelectedPapers,
      setLoading,
      setError,
      resetChat,
      clearPersistedData,
      hasSelectedPapers,
      messageCount,
      lastMessage,
    ]
  );

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
}

// Export default
export default ChatContext;
