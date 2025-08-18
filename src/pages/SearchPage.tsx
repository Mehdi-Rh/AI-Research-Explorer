import React, { useState, useEffect, memo } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Badge,
  Menu,
  ListItemText,
} from '@mui/material';
import {
  Home,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  Close as CloseIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import PaperCard from '../components/PaperCard';
import { mockPapers } from '../data/mockPapers';

type ViewMode = 'grid' | 'list';
type SortOption =
  | 'relevance'
  | 'year_desc'
  | 'year_asc'
  | 'citations_desc'
  | 'citations_asc'
  | 'title_asc';

// SelectedPapersMenu Component
interface SelectedPapersMenuProps {
  selectedPapers: Set<string>;
  onRemovePaper: (paperId: string) => void;
}

const SelectedPapersMenu: React.FC<SelectedPapersMenuProps> = ({
  selectedPapers,
  onRemovePaper,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemovePaper = (paperId: string) => {
    onRemovePaper(paperId);
  };

  // Get paper details from mockPapers
  const selectedPaperDetails = Array.from(selectedPapers)
    .map((paperId) => mockPapers.find((paper) => paper.id === paperId))
    .filter(Boolean);

  // Don't render if no papers are selected
  if (selectedPapers.size === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleClick}
        color="primary"
        aria-label="view selected papers"
        sx={{
          bgcolor: 'primary.50',
          '&:hover': {
            bgcolor: 'primary.100',
          },
        }}
      >
        <Badge badgeContent={selectedPapers.size} color="secondary">
          <Box component="span" sx={{ ml: 0.5 }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ verticalAlign: 'middle' }}
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
          </Box>{' '}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            minWidth: 350,
            maxWidth: 450,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="primary">
            Selected Papers ({selectedPapers.size})
          </Typography>
        </Box>
        {selectedPaperDetails.map((paper) => (
          <MenuItem
            key={paper!.id}
            sx={{ py: 1.5, alignItems: 'flex-start' }}
            disableRipple
            disabled
            style={{ cursor: 'default', pointerEvents: 'none', opacity: 1 }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.3,
                    maxWidth: 280,
                  }}
                >
                  {paper!.title}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {paper!.year} • {paper!.authors[0]} et al.
                </Typography>
              }
            />
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePaper(paper!.id);
              }}
              sx={{
                ml: 1,
                mt: 0.5,
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'error.50',
                },
              }}
              aria-label={`Remove ${paper!.title} from selection`}
              style={{ pointerEvents: 'auto', opacity: 1, cursor: 'pointer' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useSearch();

  // Local state for view preferences
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [selectedPapers, setSelectedPapers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12;

  // Reset pagination when results change
  useEffect(() => {
    setCurrentPage(1);
  }, [state.results]);

  // Sort results based on selected option
  const sortedResults = React.useMemo(() => {
    const results = [...state.results];

    switch (sortBy) {
      case 'year_desc':
        return results.sort((a, b) => b.year - a.year);
      case 'year_asc':
        return results.sort((a, b) => a.year - b.year);
      case 'citations_desc':
        return results.sort((a, b) => (b.citations || 0) - (a.citations || 0));
      case 'citations_asc':
        return results.sort((a, b) => (a.citations || 0) - (b.citations || 0));
      case 'title_asc':
        return results.sort((a, b) => a.title.localeCompare(b.title));
      case 'relevance':
      default:
        return results; // Keep original order (relevance-based from search)
    }
  }, [state.results, sortBy]);

  // Paginate results
  const paginatedResults = React.useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return sortedResults.slice(startIndex, endIndex);
  }, [sortedResults, currentPage, resultsPerPage]);

  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);

  // Handle view mode change
  const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Handle paper selection
  const handleSelectionChange = (paperId: string, selected: boolean) => {
    setSelectedPapers((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(paperId);
      } else {
        newSet.delete(paperId);
      }
      return newSet;
    });
  };

  // Handle removing paper from selection
  const handleRemovePaper = (paperId: string) => {
    setSelectedPapers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(paperId);
      return newSet;
    });
  };

  // Handle pagination change
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get grid columns based on view mode
  const getGridColumns = () => {
    if (viewMode === 'list') {
      return { xs: '1fr' };
    }
    return {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
    };
  };

  // Count active filters
  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    const getCurrentYear = (): number => new Date().getFullYear();
    const getOldestPaperYear = (): number => Math.min(...mockPapers.map((paper) => paper.year));
    const getMinYearRange = (): number => getOldestPaperYear() - 10;
    const getMaxYearRange = (): number => getCurrentYear();

    const CURRENT_YEAR = getMaxYearRange();
    const MIN_YEAR = getMinYearRange();
    if (state.filters.paperTypes.length > 0) count++;
    if (state.filters.topics.length > 0) count++;
    if (state.filters.venues.length > 0) count++;
    if (state.filters.authors.length > 0) count++;
    if (state.filters.yearRange.min !== MIN_YEAR || state.filters.yearRange.max !== CURRENT_YEAR)
      if (state.filters.citationRange.min !== 0 || state.filters.citationRange.max !== 100000)
        count++;
    console.log({ count });

    return count;
  }, [state.filters]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleGoHome} sx={{ mr: 2 }}>
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Research Explorer - Search
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Selected Papers Menu */}
        {selectedPapers.size > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.primary">
                You have selected {selectedPapers.size} paper{selectedPapers.size > 1 ? 's' : ''}
              </Typography>
              <SelectedPapersMenu
                selectedPapers={selectedPapers}
                onRemovePaper={handleRemovePaper}
              />
            </Box>
          </Paper>
        )}

        {/* Search Bar */}
        <SearchBar />

        {/* Results Header with Controls */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Results Info */}
            <Box>
              <Typography variant="h6" component="div">
                {state.isLoading ? 'Searching...' : `${sortedResults.length} papers found`}
              </Typography>
              {state.query && (
                <Typography variant="body2" color="text.secondary">
                  Results for: "{state.query}"
                </Typography>
              )}
              {activeFiltersCount > 0 && (
                <Typography variant="body2" color="text.secondary">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                </Typography>
              )}
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {/* Sort Dropdown */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="year_desc">Year (Newest)</MenuItem>
                  <MenuItem value="year_asc">Year (Oldest)</MenuItem>
                  <MenuItem value="citations_desc">Citations (High)</MenuItem>
                  <MenuItem value="citations_asc">Citations (Low)</MenuItem>
                  <MenuItem value="title_asc">Title (A-Z)</MenuItem>
                </Select>
              </FormControl>

              {/* View Mode Toggle */}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
                size="small"
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ListViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Paper>

        {/* Loading State */}
        {state.isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {state.error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {state.error}
          </Alert>
        )}

        {/* No Results */}
        {!state.isLoading && !state.error && sortedResults.length === 0 && state.query && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No papers found for "{state.query}". Try adjusting your search terms or filters.
          </Alert>
        )}

        {/* Results Grid/List */}
        {!state.isLoading && !state.error && paginatedResults.length > 0 && (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: getGridColumns(),
                gap: viewMode === 'list' ? 2 : 3,
                mb: 4,
              }}
            >
              {paginatedResults.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  isSelected={selectedPapers.has(paper.id)}
                  onSelectionChange={handleSelectionChange}
                  maxAbstractLength={viewMode === 'list' ? 300 : 150}
                />
              ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}

        {/* Welcome State */}
        {!state.isLoading && !state.error && sortedResults.length === 0 && !state.query && (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Welcome to AI Research Explorer
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Use the search bar above to find research papers, or apply filters to browse by
              category.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default memo(SearchPage);
