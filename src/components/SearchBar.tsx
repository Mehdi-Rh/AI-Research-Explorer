import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Paper,
  IconButton,
  Tooltip,
  Autocomplete,
  Slider,
  Typography,
  Button,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Tune as TuneIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useSearch } from '../hooks/useSearch';
import { mockPapers, searchPapers } from '../data/mockPapers';
import type { SearchFilters } from '../contexts/SearchContext';

// Constants for filter options
const PAPER_TYPES = ['conference', 'journal', 'preprint', 'workshop'];

// Dynamic year range calculation
const getCurrentYear = (): number => new Date().getFullYear();
const getOldestPaperYear = (): number => Math.min(...mockPapers.map((paper) => paper.year));
const getMinYearRange = (): number => getOldestPaperYear() - 10;
const getMaxYearRange = (): number => getCurrentYear();

const CURRENT_YEAR = getMaxYearRange();
const MIN_YEAR = getMinYearRange();

// Extract unique values from mock data
const getUniqueTopics = () => {
  const topics = new Set<string>();
  mockPapers.forEach((paper) => {
    paper.topics.forEach((topic) => topics.add(topic));
  });
  return Array.from(topics).sort();
};

const getUniqueAuthors = () => {
  const authors = new Set<string>();
  mockPapers.forEach((paper) => {
    paper.authors.forEach((author) => authors.add(author));
  });
  return Array.from(authors).sort();
};

const getUniqueVenues = () => {
  const venues = new Set<string>();
  mockPapers.forEach((paper) => {
    venues.add(paper.publicationVenue);
  });
  return Array.from(venues).sort();
};

const SearchBar: React.FC = () => {
  const { state, setQuery, setFilters, resetSearch, setResults, setLoading, addToSearchHistory } =
    useSearch();

  // Local state
  const [searchValue, setSearchValue] = useState(state.query);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Track initial render to prevent search on mount
  const isInitialRender = useRef(true);

  // Memoized filter options
  const uniqueTopics = useMemo(() => getUniqueTopics(), []);
  const uniqueAuthors = useMemo(() => getUniqueAuthors(), []);
  const uniqueVenues = useMemo(() => getUniqueVenues(), []);

  // Handle search input change with debouncing - split into separate effects
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(searchValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, setQuery]);

  // Handle search execution when query or filters change
  useEffect(() => {
    // Skip search on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Check if we're in default state (no search query and default filters)
    const isDefaultState =
      !state.query &&
      state.filters.paperTypes.length === 0 &&
      state.filters.topics.length === 0 &&
      state.filters.venues.length === 0 &&
      state.filters.authors.length === 0 &&
      state.filters.yearRange.min === MIN_YEAR &&
      state.filters.yearRange.max === CURRENT_YEAR &&
      state.filters.citationRange.min === 0 &&
      state.filters.citationRange.max === 100000;

    const performSearchAsync = async () => {
      setLoading(true);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        let results = mockPapers;

        // If in default state, show all papers
        if (isDefaultState) {
          setResults(results);
          // Note: Search history functionality removed
          setLoading(false);
          return;
        }

        // Apply text search
        if (state.query.trim()) {
          results = searchPapers(state.query);
        }

        // Apply filters
        results = results.filter((paper) => {
          // Year range filter
          if (
            paper.year < state.filters.yearRange.min ||
            paper.year > state.filters.yearRange.max
          ) {
            return false;
          }

          // Paper type filter
          if (
            state.filters.paperTypes.length > 0 &&
            !state.filters.paperTypes.includes(paper.paperType)
          ) {
            return false;
          }

          // Topics filter
          if (state.filters.topics.length > 0) {
            const hasMatchingTopic = state.filters.topics.some((topic) =>
              paper.topics.some((paperTopic) =>
                paperTopic.toLowerCase().includes(topic.toLowerCase())
              )
            );
            if (!hasMatchingTopic) return false;
          }

          // Venues filter
          if (
            state.filters.venues.length > 0 &&
            !state.filters.venues.includes(paper.publicationVenue)
          ) {
            return false;
          }

          // Citation range filter
          const citations = paper.citations || 0;
          if (
            citations < state.filters.citationRange.min ||
            citations > state.filters.citationRange.max
          ) {
            return false;
          }

          // Authors filter
          if (state.filters.authors.length > 0) {
            const hasMatchingAuthor = state.filters.authors.some((author) =>
              paper.authors.some((paperAuthor) =>
                paperAuthor.toLowerCase().includes(author.toLowerCase())
              )
            );
            if (!hasMatchingAuthor) return false;
          }

          return true;
        });

        setResults(results);

        // Add to search history if there's a query and results were found
        if (state.query.trim() && results.length > 0) {
          addToSearchHistory(state.query.trim());
        }

        // Note: Search history functionality added
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    performSearchAsync();
  }, [state.query, state.filters, setResults, setLoading, addToSearchHistory]);

  // Handle filter changes
  const handleFilterChange = (filterUpdate: Partial<SearchFilters>) => {
    setFilters(filterUpdate);
  };

  // Handle search history selection
  const handleHistorySelect = (query: string) => {
    setSearchValue(query);
    setHistoryOpen(false);
  };

  // Handle search history toggle
  const handleHistoryToggle = () => {
    setHistoryOpen(!historyOpen);
  };

  // Clear all filters and search
  const handleClearFilters = () => {
    resetSearch();
    setSearchValue('');
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (state.filters.paperTypes.length > 0) count++;
    if (state.filters.topics.length > 0) count++;
    if (state.filters.venues.length > 0) count++;
    if (state.filters.authors.length > 0) count++;
    if (state.filters.yearRange.min !== MIN_YEAR || state.filters.yearRange.max !== CURRENT_YEAR)
      count++;
    if (state.filters.citationRange.min !== 0 || state.filters.citationRange.max !== 100000)
      count++;
    return count;
  }, [state.filters]);

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      {/* Main Search Bar */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, position: 'relative' }}>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search papers by title, abstract, authors, or topics..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              endAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {/* Search History Button */}
                  {state.searchHistory.length > 0 && (
                    <Tooltip title="Search History">
                      <IconButton
                        size="small"
                        onClick={handleHistoryToggle}
                        color={historyOpen ? 'primary' : 'default'}
                      >
                        <HistoryIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {/* Clear Search Button */}
                  {searchValue && (
                    <IconButton
                      size="small"
                      onClick={() => setSearchValue('')}
                      aria-label="clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </Box>
              ),
            }}
          />

          {/* Search History Dropdown */}
          {historyOpen && state.searchHistory.length > 0 && (
            <ClickAwayListener onClickAway={() => setHistoryOpen(false)}>
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  mt: 1,
                  maxHeight: 300,
                  overflow: 'auto',
                }}
                elevation={3}
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                    Recent Searches
                  </Typography>
                  <Divider />
                </Box>
                <List dense>
                  {state.searchHistory.map((query, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => handleHistorySelect(query)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <HistoryIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                        <ListItemText
                          primary={query}
                          primaryTypographyProps={{
                            variant: 'body2',
                            noWrap: true,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          )}
        </Box>

        {/* Filter Toggle Button */}
        <Tooltip title="Filters">
          <IconButton
            onClick={() => setFiltersOpen(!filtersOpen)}
            color={activeFiltersCount > 0 ? 'primary' : 'default'}
          >
            <Badge badgeContent={activeFiltersCount} color="primary">
              <TuneIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Clear All Button */}
        {(searchValue || activeFiltersCount > 0) && (
          <Button variant="outlined" onClick={handleClearFilters} startIcon={<ClearIcon />}>
            Clear All
          </Button>
        )}
      </Box>

      {/* Advanced Filters */}
      {filtersOpen && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Advanced Filters
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {/* Paper Types */}
            <FormControl>
              <InputLabel>Paper Types</InputLabel>
              <Select
                multiple
                value={state.filters.paperTypes}
                onChange={(e) => handleFilterChange({ paperTypes: e.target.value as string[] })}
                input={<OutlinedInput label="Paper Types" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {PAPER_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Topics */}
            <Autocomplete
              multiple
              options={uniqueTopics}
              value={state.filters.topics}
              onChange={(_, newValue) => handleFilterChange({ topics: newValue })}
              getOptionLabel={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              renderInput={(params) => (
                <TextField {...params} label="Topics" placeholder="Select topics" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                    size="small"
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />

            {/* Authors */}
            <Autocomplete
              multiple
              options={uniqueAuthors}
              value={state.filters.authors}
              onChange={(_, newValue) => handleFilterChange({ authors: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Authors" placeholder="Select authors" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />

            {/* Venues */}
            <Autocomplete
              multiple
              options={uniqueVenues}
              value={state.filters.venues}
              onChange={(_, newValue) => handleFilterChange({ venues: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Publication Venues" placeholder="Select venues" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Box>

          {/* Year Range Slider */}
          <Box>
            <Typography gutterBottom>
              Year Range: {state.filters.yearRange.min} - {state.filters.yearRange.max}
            </Typography>
            <Slider
              value={[state.filters.yearRange.min, state.filters.yearRange.max]}
              onChange={(_, newValue) => {
                const [min, max] = newValue as number[];
                handleFilterChange({
                  yearRange: { min, max },
                });
              }}
              valueLabelDisplay="auto"
              min={MIN_YEAR}
              max={CURRENT_YEAR}
              marks={[
                { value: MIN_YEAR, label: MIN_YEAR.toString() },
                { value: CURRENT_YEAR, label: CURRENT_YEAR.toString() },
              ]}
            />
          </Box>

          {/* Citation Range Slider */}
          <Box>
            <Typography gutterBottom>
              Citation Range: {state.filters.citationRange.min} - {state.filters.citationRange.max}
            </Typography>
            <Slider
              value={[state.filters.citationRange.min, state.filters.citationRange.max]}
              onChange={(_, newValue) => {
                const [min, max] = newValue as number[];
                handleFilterChange({
                  citationRange: { min, max },
                });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
              marks={[
                { value: 0, label: '0' },
                { value: 50000, label: '50K' },
                { value: 100000, label: '100K' },
              ]}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default memo(SearchBar);
