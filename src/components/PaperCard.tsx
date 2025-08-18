import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';

import type { MockPaper } from '../types/paper';

interface PaperCardProps {
  paper: MockPaper;
  isSelected?: boolean;
  onSelectionChange?: (paperId: string, selected: boolean) => void;
  maxAbstractLength?: number;
}

const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  isSelected = false,
  onSelectionChange,
  maxAbstractLength = 200,
}) => {
  // Truncate abstract if it's too long
  const truncatedAbstract =
    paper.abstract.length > maxAbstractLength
      ? `${paper.abstract.substring(0, maxAbstractLength)}...`
      : paper.abstract;

  // Get paper type color
  const getPaperTypeColor = (
    type: string
  ): 'primary' | 'secondary' | 'warning' | 'info' | 'default' => {
    switch (type) {
      case 'journal':
        return 'primary';
      case 'conference':
        return 'secondary';
      case 'preprint':
        return 'warning';
      case 'workshop':
        return 'info';
      default:
        return 'default';
    }
  };

  // Format author names for display
  const formatAuthors = (authors: string[]) => {
    if (authors.length <= 3) {
      return authors.join(', ');
    }
    return `${authors.slice(0, 3).join(', ')} et al.`;
  };

  // Handle selection change
  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent card click when clicking checkbox
    if (onSelectionChange) {
      onSelectionChange(paper.id, event.target.checked);
    }
  };

  // Handle card click for selection
  const handleCardClick = () => {
    if (onSelectionChange) {
      onSelectionChange(paper.id, !isSelected);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        cursor: onSelectionChange ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        {/* Paper Type and Year */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip
            label={paper.paperType.toUpperCase()}
            size="small"
            color={getPaperTypeColor(paper.paperType)}
            variant="outlined"
          />
          {/* Selection Checkbox */}
          {onSelectionChange && (
            <FormControlLabel
              control={
                <Checkbox checked={isSelected} onChange={handleSelectionChange} color="primary" />
              }
              label=""
              sx={{
                m: 0,
              }}
            />
          )}
        </Box>

        {/* Title */}
        <Box display={'flex'}>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {paper.title}
          </Typography>
        </Box>

        {/* Authors */}
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontStyle: 'italic',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {formatAuthors(paper.authors)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {paper.year}
        </Typography>

        {/* Publication Venue */}
        <Typography variant="body2" color="primary.main" gutterBottom sx={{ fontWeight: 500 }}>
          {paper.publicationVenue}
        </Typography>

        {/* Abstract Preview */}
        <Typography
          variant="body2"
          color="text.primary"
          paragraph
          sx={{
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {truncatedAbstract}
        </Typography>

        {/* Citations */}
        {paper.citations !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Citations: {paper.citations.toLocaleString()}
            </Typography>
          </Box>
        )}

        {/* Topics/Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
          {paper.topics.slice(0, 4).map((topic, index) => (
            <Chip
              key={index}
              label={topic}
              size="small"
              variant="filled"
              sx={{
                bgcolor: 'grey.100',
                color: 'text.secondary',
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
          {paper.topics.length > 4 && (
            <Chip
              label={`+${paper.topics.length - 4} more`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                height: 24,
                color: 'text.secondary',
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
