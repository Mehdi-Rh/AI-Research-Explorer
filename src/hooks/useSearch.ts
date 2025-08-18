import { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';
import type { SearchContextType } from '../contexts/SearchContext';

// Custom hook to use Search Context
export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
