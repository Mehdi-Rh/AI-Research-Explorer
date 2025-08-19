import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Psychology as AIIcon, ArrowBack } from '@mui/icons-material';
import { useChat } from '../hooks/useChat';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, sendMessage } = useChat();

  // Redirect to search if no papers are selected
  useEffect(() => {
    if (state.selectedPapers.length === 0) {
      navigate('/search', { replace: true });
    }
  }, [state.selectedPapers.length, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleBackToSearch = () => {
    navigate('/search');
  };

  // Generate suggested prompts based on number of selected papers
  const getSuggestedPrompts = () => {
    const paperCount = state.selectedPapers.length;

    if (paperCount === 0) return [];

    if (paperCount === 1) {
      return ['Summarize this research paper', 'Extract main topics from this paper'];
    }

    if (paperCount >= 2 && paperCount <= 3) {
      return ['Compare these selected research papers'];
    }

    if (paperCount > 5) {
      return ['Perform a trend analysis of these research papers'];
    }

    return [];
  };

  const handleSuggestedPrompt = async (prompt: string) => {
    const fullPrompt = prompt;

    await sendMessage(fullPrompt);
  };

  // Don't render content if no papers are selected (redirect in progress)
  if (state.selectedPapers.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleGoHome} sx={{ mr: 2 }}>
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Research Explorer - Chat
          </Typography>
          <IconButton color="inherit" onClick={handleBackToSearch} sx={{ ml: 2 }}>
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 3, height: '100%' }}>
        {/* Selected Papers Summary */}
        {state.selectedPapers.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconButton
                onClick={handleBackToSearch}
                size="small"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.50',
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" color="primary.main">
                Selected Papers ({state.selectedPapers.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {state.selectedPapers.map((paper) => (
                <Chip
                  key={paper.id}
                  label={`${paper.title.substring(0, 50)}${paper.title.length > 50 ? '...' : ''}`}
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Suggested Prompts */}
        {state.selectedPapers.length > 0 && getSuggestedPrompts().length > 0 && (
          <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'primary.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AIIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Suggested Questions
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {getSuggestedPrompts().map((prompt, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleSuggestedPrompt(prompt)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'text.primary',
                    borderColor: 'primary.200',
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'primary.100',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </Box>
          </Paper>
        )}

        {/* Chat Interface */}
        <ChatWindow />
      </Container>
    </Box>
  );
};

export default ChatPage;
