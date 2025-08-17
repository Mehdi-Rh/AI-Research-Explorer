import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();

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
            AI Research Explorer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ py: 4, px: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          AI Chat
        </Typography>
        <Typography variant="body1">
          This is the chat page. AI chat functionality will be added later.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatPage;
