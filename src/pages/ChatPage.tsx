import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Search } from '@mui/icons-material';
import { useChat } from '../hooks/useChat';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useChat();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToSearch = () => {
    navigate('/search');
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
            AI Research Explorer - Chat
          </Typography>
          <IconButton color="inherit" onClick={handleGoToSearch} sx={{ ml: 2 }}>
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 3, height: 'calc(100vh - 64px)' }}>
        {/* Selected Papers Summary */}
        {state.selectedPapers.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Selected Papers ({state.selectedPapers.length})
            </Typography>
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

        {/* Chat Interface */}
        <ChatWindow />
      </Container>
    </Box>
  );
};

export default ChatPage;
