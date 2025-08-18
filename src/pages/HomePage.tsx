import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, AutoAwesome, School } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartResearch = () => {
    navigate('/search');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            mb: 8,
          }}
        >
          {/* Hero Section */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            AI Research Explorer
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 6,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover, analyze, and understand research papers with the power of artificial
            intelligence
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleStartResearch}
            startIcon={<AutoAwesome />}
            sx={{
              fontSize: '1.2rem',
              py: 2,
              px: 4,
              borderRadius: 3,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF5252, #26C6DA)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              },
              transition: 'all 0.3s ease',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Start Your Research with AI
          </Button>
        </Box>

        {/* Features Section */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 8 }}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Search sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Smart Search
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find relevant research papers using advanced AI-powered search algorithms
            </Typography>
          </Paper>

          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <AutoAwesome sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              AI Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get instant insights, summaries, and explanations powered by artificial intelligence
            </Typography>
          </Paper>

          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <School sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Knowledge Discovery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore connections between papers and discover new research opportunities
            </Typography>
          </Paper>
        </Stack>

        {/* Tags Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 3, opacity: 0.9 }}>
            Popular Research Areas
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: 2 }}
          >
            {[
              'Machine Learning',
              'Artificial Intelligence',
              'Computer Vision',
              'Natural Language Processing',
              'Deep Learning',
              'Robotics',
            ].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
