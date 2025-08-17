import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Chat } from '@mui/icons-material';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToChat = () => {
    navigate('/chat');
  };

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
          Articles Search
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          This is the articles search page. More functionality will be added later.
        </Typography>

        {/* CTA to Chat */}
        <Button variant="contained" startIcon={<Chat />} onClick={handleGoToChat} sx={{ mt: 2 }}>
          Go to Chat
        </Button>
      </Box>
    </Box>
  );
};

export default SearchPage;
