import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Box, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // You can change this to other themes

const StyledMarkdown = styled(Box)(({ theme }) => ({
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    margin: theme.spacing(1.5, 0, 1, 0),
    fontWeight: 600,
  },
  '& h1': {
    fontSize: '1.5rem',
    borderBottom: `2px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(0.5),
  },
  '& h2': {
    fontSize: '1.3rem',
  },
  '& h3': {
    fontSize: '1.1rem',
  },
  '& p': {
    margin: theme.spacing(1, 0),
    lineHeight: 1.6,
  },
  '& ul, & ol': {
    margin: theme.spacing(1, 0),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    margin: theme.spacing(0.5, 0),
  },
  '& blockquote': {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 2),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.grey[50],
    fontStyle: 'italic',
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.2, 0.5),
    borderRadius: theme.spacing(0.5),
    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
    fontSize: '0.9em',
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    overflow: 'auto',
    margin: theme.spacing(1, 0),
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
  '& strong': {
    fontWeight: 600,
  },
  '& em': {
    fontStyle: 'italic',
  },
  '& hr': {
    margin: theme.spacing(2, 0),
    border: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    margin: theme.spacing(1, 0),
  },
  '& th, & td': {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: theme.palette.grey[100],
    fontWeight: 600,
  },
}));

interface MarkdownTextProps {
  text: string;
  variant?: 'body1' | 'body2' | 'caption';
}

const MarkdownText: React.FC<MarkdownTextProps> = ({ text, variant = 'body1' }) => {
  return (
    <StyledMarkdown>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom component overrides
          p: ({ children }) => (
            <Typography variant={variant} component="p" sx={{ mb: 1 }}>
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h5" component="h1" sx={{ mb: 1, mt: 2 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h6" component="h2" sx={{ mb: 1, mt: 1.5 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="subtitle1" component="h3" sx={{ mb: 0.5, mt: 1 }}>
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="subtitle2" component="h4" sx={{ mb: 0.5, mt: 1 }}>
              {children}
            </Typography>
          ),
          h5: ({ children }) => (
            <Typography variant="body1" component="h5" sx={{ mb: 0.5, mt: 1, fontWeight: 600 }}>
              {children}
            </Typography>
          ),
          h6: ({ children }) => (
            <Typography variant="body2" component="h6" sx={{ mb: 0.5, mt: 1, fontWeight: 600 }}>
              {children}
            </Typography>
          ),
          strong: ({ children }) => (
            <Typography component="strong" sx={{ fontWeight: 600 }}>
              {children}
            </Typography>
          ),
          em: ({ children }) => (
            <Typography component="em" sx={{ fontStyle: 'italic' }}>
              {children}
            </Typography>
          ),
          code: ({ children, className }) => {
            const isInline = !className || !className.includes('language-');
            if (isInline) {
              return (
                <Typography
                  component="code"
                  sx={{
                    backgroundColor: 'grey.100',
                    px: 0.5,
                    py: 0.2,
                    borderRadius: 0.5,
                    fontFamily: 'monospace',
                    fontSize: '0.9em',
                  }}
                >
                  {children}
                </Typography>
              );
            }
            return (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: 'grey.50',
                  overflow: 'auto',
                  my: 1,
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.9em',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <code className={className}>{children}</code>
                </Typography>
              </Paper>
            );
          },
          blockquote: ({ children }) => (
            <Paper
              variant="outlined"
              sx={{
                borderLeft: 4,
                borderLeftColor: 'primary.main',
                backgroundColor: 'grey.50',
                p: 2,
                my: 1,
                fontStyle: 'italic',
              }}
            >
              {children}
            </Paper>
          ),
          hr: () => <Divider sx={{ my: 2 }} />,
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, my: 1 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, my: 1 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" variant={variant} sx={{ mb: 0.5 }}>
              {children}
            </Typography>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </StyledMarkdown>
  );
};

export default MarkdownText;
