import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Dialog,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack,
  Skeleton,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import type { MockPaper } from '../types/paper';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface InsightsPanelProps {
  open: boolean;
  onClose: () => void;
  papers: MockPaper[];
}

interface WordCloudWord {
  text: string;
  value: number;
  color?: string;
}

// Custom WordCloud component using SVG
const WordCloud: React.FC<{ words: WordCloudWord[]; loading?: boolean }> = ({ words, loading }) => {
  if (loading) {
    return (
      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  // Sort words by value and take top 20
  const sortedWords = words
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);
  const maxValue = Math.max(...sortedWords.map((w) => w.value));

  return (
    <Box sx={{ height: 200, overflow: 'hidden', p: 1 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {sortedWords.map((word) => {
          const fontSize = 12 + (word.value / maxValue) * 20;
          const opacity = 0.6 + (word.value / maxValue) * 0.4;

          return (
            <Chip
              key={word.text}
              label={word.text}
              size="small"
              sx={{
                fontSize: `${fontSize}px`,
                opacity,
                bgcolor: word.color || 'primary.main',
                color: 'white',
                fontWeight: 500,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const InsightsPanel: React.FC<InsightsPanelProps> = ({ open, onClose, papers }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Generate mock insights data based on papers
  const generateInsights = () => {
    if (!papers.length) {
      return {
        timeline: { labels: [], datasets: [] },
        wordCloud: [],
        metrics: { labels: [], datasets: [] },
      };
    }

    // Publication Timeline Data
    const yearCounts = papers.reduce((acc, paper) => {
      acc[paper.year] = (acc[paper.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const timelineLabels = Object.keys(yearCounts).map(Number).sort().map(String);
    const timelineData = timelineLabels.map((year) => yearCounts[Number(year)]);

    const timeline = {
      labels: timelineLabels,
      datasets: [
        {
          label: 'Publications',
          data: timelineData,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.dark,
          borderWidth: 1,
        },
      ],
    };

    // Word Cloud Data (extract keywords from abstracts)
    const wordFreq: Record<string, number> = {};
    const stopWords = new Set([
      'the',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'with',
      'by',
      'this',
      'that',
      'these',
      'those',
      'a',
      'an',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'have',
      'has',
      'had',
      'do',
      'does',
      'did',
      'will',
      'would',
      'could',
      'should',
      'may',
      'might',
      'must',
      'can',
      'we',
      'our',
      'study',
      'research',
      'paper',
      'analysis',
      'method',
      'approach',
      'results',
      'conclusion',
    ]);

    papers.forEach((paper) => {
      const text = `${paper.title} ${paper.abstract}`.toLowerCase();
      const words = text.match(/\b[a-z]{4,}\b/g) || [];
      words.forEach((word) => {
        if (!stopWords.has(word)) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
    });

    const wordCloud: WordCloudWord[] = Object.entries(wordFreq)
      .map(([text, value]) => ({
        text,
        value,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 30);

    // Topic Metrics (simplified categorization)
    const topicCounts = papers.reduce((acc, paper) => {
      // Simple topic categorization based on title/abstract keywords
      const text = `${paper.title} ${paper.abstract}`.toLowerCase();
      if (
        text.includes('machine learning') ||
        text.includes('ai') ||
        text.includes('artificial intelligence')
      ) {
        acc['AI/ML'] = (acc['AI/ML'] || 0) + 1;
      } else if (
        text.includes('computer vision') ||
        text.includes('image') ||
        text.includes('visual')
      ) {
        acc['Computer Vision'] = (acc['Computer Vision'] || 0) + 1;
      } else if (
        text.includes('nlp') ||
        text.includes('natural language') ||
        text.includes('text')
      ) {
        acc['NLP'] = (acc['NLP'] || 0) + 1;
      } else if (text.includes('robot') || text.includes('autonomous')) {
        acc['Robotics'] = (acc['Robotics'] || 0) + 1;
      } else if (text.includes('data') || text.includes('analysis')) {
        acc['Data Science'] = (acc['Data Science'] || 0) + 1;
      } else {
        acc['Other'] = (acc['Other'] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const metrics = {
      labels: Object.keys(topicCounts),
      datasets: [
        {
          data: Object.values(topicCounts),
          backgroundColor: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.info.main,
          ],
          borderWidth: 2,
          borderColor: theme.palette.background.paper,
        },
      ],
    };

    return { timeline, wordCloud, metrics };
  };

  const insights = generateInsights();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const LoadingCard: React.FC<{ title: string; height?: number }> = ({ title, height = 250 }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Skeleton variant="rectangular" width="100%" height={height} />
      </CardContent>
    </Card>
  );

  const content = (
    <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Search Results Insights
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Analysis of {papers.length} search result{papers.length !== 1 ? 's' : ''}
      </Typography>

      <Stack spacing={3}>
        {/* Publication Timeline */}
        {loading ? (
          <LoadingCard title="Publication Timeline" height={300} />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Publication Timeline
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={insights.timeline} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Topic Word Cloud */}
        {loading ? (
          <LoadingCard title="Key Topics" height={200} />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Topics
              </Typography>
              <WordCloud words={insights.wordCloud} loading={loading} />
            </CardContent>
          </Card>
        )}

        {/* Topic Distribution */}
        {loading ? (
          <LoadingCard title="Topic Distribution" height={300} />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Topic Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={insights.metrics} options={pieOptions} />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Placeholder for Author Collaboration Network */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Author Collaboration Network
            </Typography>
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Collaboration network visualization coming soon...
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );

  if (isMobile) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
          },
        }}
      >
        {content}
      </Dialog>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 450, md: 500 },
          bgcolor: 'background.default',
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default InsightsPanel;
