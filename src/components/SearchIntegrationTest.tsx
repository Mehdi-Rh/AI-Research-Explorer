import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSearch } from '../hooks/useSearch';

const SearchIntegrationTest: React.FC = () => {
  const { state } = useSearch();

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Search Context Integration Test
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Query:</strong> "{state.query || 'No query'}"
        </Typography>
        <Typography variant="body2">
          <strong>Results:</strong> {state.results.length} papers
        </Typography>
        <Typography variant="body2">
          <strong>Loading:</strong> {state.isLoading ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2">
          <strong>Error:</strong> {state.error || 'None'}
        </Typography>
        <Typography variant="body2">
          <strong>Active Filters:</strong>
        </Typography>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2">
            • Paper Types:{' '}
            {state.filters.paperTypes.length > 0 ? state.filters.paperTypes.join(', ') : 'None'}
          </Typography>
          <Typography variant="body2">
            • Topics: {state.filters.topics.length > 0 ? state.filters.topics.join(', ') : 'None'}
          </Typography>
          <Typography variant="body2">
            • Year Range: {state.filters.yearRange.min} - {state.filters.yearRange.max}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchIntegrationTest;
