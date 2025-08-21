import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import PaperCard from './PaperCard';
import { mockPapers } from '../data/mockPapers';

const PaperCardDemo: React.FC = () => {
  const [selectedPapers, setSelectedPapers] = useState<Set<string>>(new Set());

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

  // Show first 6 papers for demo
  const demopapers = mockPapers.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Paper Cards Demo
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Selected papers: {selectedPapers.size}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {demopapers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            isSelected={selectedPapers.has(paper.id)}
            onSelectionChange={handleSelectionChange}
            maxAbstractLength={150}
          />
        ))}
      </Box>
    </Container>
  );
};

export default PaperCardDemo;
