import React, { createContext, useReducer, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { MockPaper } from '../types/paper';
import { mockPapers } from '../data/mockPapers';

// Helper functions for dynamic year range calculation
const getCurrentYear = (): number => new Date().getFullYear();

const getOldestPaperYear = (): number => {
  return Math.min(...mockPapers.map((paper) => paper.year));
};

const getMinYearRange = (): number => {
  const oldestYear = getOldestPaperYear();
  return oldestYear - 10;
};

const getMaxYearRange = (): number => {
  return getCurrentYear();
};

// Search history localStorage utilities
const SEARCH_HISTORY_KEY = 'ai-research-explorer-search-history';
const MAX_SEARCH_HISTORY = 10;

const getSearchHistoryFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSearchHistoryToStorage = (history: string[]): void => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Silently fail if localStorage is not available
  }
};

const addToSearchHistory = (query: string, currentHistory: string[]): string[] => {
  if (!query.trim()) return currentHistory;

  // Remove existing instance of the query (case-insensitive)
  const filteredHistory = currentHistory.filter(
    (item) => item.toLowerCase() !== query.toLowerCase()
  );

  // Add to beginning and limit to MAX_SEARCH_HISTORY
  const newHistory = [query, ...filteredHistory].slice(0, MAX_SEARCH_HISTORY);
  saveSearchHistoryToStorage(newHistory);
  return newHistory;
};

// Search Filters Interface
export interface SearchFilters {
  yearRange: {
    min: number;
    max: number;
  };
  paperTypes: string[];
  topics: string[];
  venues: string[];
  citationRange: {
    min: number;
    max: number;
  };
  authors: string[];
}

// Search State Interface
export interface SearchState {
  query: string;
  filters: SearchFilters;
  results: MockPaper[];
  isLoading: boolean;
  error: string | null;
  sortBy: 'relevance' | 'year' | 'citations' | 'title';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  totalResults: number;
  searchHistory: string[];
}

// Initial Search Filters
const initialFilters: SearchFilters = {
  yearRange: {
    min: getMinYearRange(),
    max: getMaxYearRange(),
  },
  paperTypes: [],
  topics: [],
  venues: [],
  citationRange: {
    min: 0,
    max: 100000,
  },
  authors: [],
};

// Initial Search State
const initialState: SearchState = {
  query: '',
  filters: initialFilters,
  results: mockPapers, // Load all papers by default
  isLoading: false,
  error: null,
  sortBy: 'relevance',
  sortOrder: 'desc',
  currentPage: 1,
  itemsPerPage: 10,
  totalResults: mockPapers.length, // Set total results to all papers
  searchHistory: getSearchHistoryFromStorage(),
};

// Search Action Types
export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_RESULTS'; payload: MockPaper[] }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | {
      type: 'SET_SORT';
      payload: { sortBy: SearchState['sortBy']; sortOrder: SearchState['sortOrder'] };
    }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_TOTAL_RESULTS'; payload: number }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_HISTORY' }
  | { type: 'RESET_SEARCH' };

// Search Reducer
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
        currentPage: 1, // Reset to first page when query changes
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        currentPage: 1, // Reset to first page when filters change
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialFilters,
        currentPage: 1,
      };

    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
        totalResults: action.payload.length,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_RESULTS':
      return {
        ...state,
        results: [],
        totalResults: 0,
        currentPage: 1,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? null : state.error, // Clear error when starting new search
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
        currentPage: 1, // Reset to first page when sorting changes
      };

    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };

    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1, // Reset to first page when page size changes
      };

    case 'SET_TOTAL_RESULTS':
      return {
        ...state,
        totalResults: action.payload,
      };

    case 'ADD_TO_SEARCH_HISTORY': {
      const newHistory = addToSearchHistory(action.payload, state.searchHistory);
      return {
        ...state,
        searchHistory: newHistory,
      };
    }

    case 'CLEAR_SEARCH_HISTORY':
      saveSearchHistoryToStorage([]);
      return {
        ...state,
        searchHistory: [],
      };

    case 'RESET_SEARCH':
      return {
        ...initialState,
        searchHistory: state.searchHistory, // Preserve search history on reset
      };

    default:
      return state;
  }
}

// Search Context
export interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  // Helper functions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setResults: (results: MockPaper[]) => void;
  clearResults: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSort: (sortBy: SearchState['sortBy'], sortOrder: SearchState['sortOrder']) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setTotalResults: (total: number) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  resetSearch: () => void;
  // Computed values
  paginatedResults: MockPaper[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Search Provider Props
interface SearchProviderProps {
  children: ReactNode;
}

// Search Provider Component
export function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Helper functions - memoize to prevent re-creation on every render
  const setQuery = useMemo(
    () => (query: string) => {
      dispatch({ type: 'SET_QUERY', payload: query });
    },
    []
  );

  const setFilters = useMemo(
    () => (filters: Partial<SearchFilters>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },
    []
  );

  const resetFilters = useMemo(
    () => () => {
      dispatch({ type: 'RESET_FILTERS' });
    },
    []
  );

  const setResults = useMemo(
    () => (results: MockPaper[]) => {
      dispatch({ type: 'SET_RESULTS', payload: results });
    },
    []
  );

  const clearResults = useMemo(
    () => () => {
      dispatch({ type: 'CLEAR_RESULTS' });
    },
    []
  );

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

  const setSort = useMemo(
    () => (sortBy: SearchState['sortBy'], sortOrder: SearchState['sortOrder']) => {
      dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
    },
    []
  );

  const setPage = useMemo(
    () => (page: number) => {
      dispatch({ type: 'SET_PAGE', payload: page });
    },
    []
  );

  const setItemsPerPage = useMemo(
    () => (itemsPerPage: number) => {
      dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });
    },
    []
  );

  const setTotalResults = useMemo(
    () => (total: number) => {
      dispatch({ type: 'SET_TOTAL_RESULTS', payload: total });
    },
    []
  );

  const addToSearchHistoryMemo = useMemo(
    () => (query: string) => {
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: query });
    },
    []
  );

  const clearSearchHistory = useMemo(
    () => () => {
      dispatch({ type: 'CLEAR_SEARCH_HISTORY' });
    },
    []
  );

  const resetSearch = useMemo(
    () => () => {
      dispatch({ type: 'RESET_SEARCH' });
    },
    []
  );

  // Computed values - memoize to prevent recalculation
  const paginatedResults = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return state.results.slice(startIndex, endIndex);
  }, [state.results, state.currentPage, state.itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(state.totalResults / state.itemsPerPage),
    [state.totalResults, state.itemsPerPage]
  );
  const hasNextPage = useMemo(
    () => state.currentPage < totalPages,
    [state.currentPage, totalPages]
  );
  const hasPreviousPage = useMemo(() => state.currentPage > 1, [state.currentPage]);

  // Memoize the entire context value to prevent unnecessary re-renders
  const contextValue: SearchContextType = useMemo(
    () => ({
      state,
      dispatch,
      setQuery,
      setFilters,
      resetFilters,
      setResults,
      clearResults,
      setLoading,
      setError,
      setSort,
      setPage,
      setItemsPerPage,
      setTotalResults,
      addToSearchHistory: addToSearchHistoryMemo,
      clearSearchHistory,
      resetSearch,
      paginatedResults,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    }),
    [
      state,
      setQuery,
      setFilters,
      resetFilters,
      setResults,
      clearResults,
      setLoading,
      setError,
      setSort,
      setPage,
      setItemsPerPage,
      setTotalResults,
      addToSearchHistoryMemo,
      clearSearchHistory,
      resetSearch,
      paginatedResults,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    ]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

// Export default
export default SearchContext;
