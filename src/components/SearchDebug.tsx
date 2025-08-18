import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSearch } from '../hooks/useSearch';

const SearchDebug: React.FC = () => {
  const { state } = useSearch();

  console.log('SearchDebug render', {
    query: state.query,
    resultsCount: state.results.length,
    isLoading: state.isLoading,
    timestamp: new Date().toISOString(),
  });

  return (
    <Box sx={{ p: 2, bgcolor: 'info.light', mb: 2 }}>
      <Typography variant="h6">Search Debug Info</Typography>
      <Typography variant="body2">Query: "{state.query}"</Typography>
      <Typography variant="body2">Results: {state.results.length}</Typography>
      <Typography variant="body2">Loading: {state.isLoading ? 'Yes' : 'No'}</Typography>
      <Typography variant="body2">Render Count: Check console</Typography>
    </Box>
  );
};

export default SearchDebug;
