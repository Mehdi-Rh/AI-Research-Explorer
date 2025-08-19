import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { Person as UserIcon, SmartToy as AIIcon } from '@mui/icons-material';
import type { ChatMessage } from '../contexts/ChatContext';
import MarkdownText from './MarkdownText';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAI = message.role === 'ai';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        gap: 1,
      }}
    >
      {/* AI Avatar (left side) */}
      {isAI && (
        <Avatar
          sx={{
            bgcolor: 'grey.300',
            color: 'grey.700',
            width: 32,
            height: 32,
          }}
        >
          <AIIcon fontSize="small" />
        </Avatar>
      )}

      {/* Message Content */}
      <Box
        sx={{
          maxWidth: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Message Bubble */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.main' : 'grey.100',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
            borderTopRightRadius: isUser ? 0.5 : 2,
            borderTopLeftRadius: isAI ? 0.5 : 2,
            wordBreak: 'break-word',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.4,
            }}
          >
            {isAI ? <MarkdownText text={message.text} variant="body1" /> : message.text}
          </Typography>
        </Paper>

        {/* Timestamp */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0.5,
            px: 1,
          }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Box>

      {/* User Avatar (right side) */}
      {isUser && (
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 32,
            height: 32,
          }}
        >
          <UserIcon fontSize="small" />
        </Avatar>
      )}
    </Box>
  );
};

export default MessageBubble;
