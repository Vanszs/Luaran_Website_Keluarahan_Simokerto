'use client';

import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  useTheme,
  alpha,
  Fade
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Image from 'next/image';

// Floating animation for logo
const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) scale(1);
  }
  50% { 
    transform: translateY(-10px) scale(1.05);
  }
`;

// Pulse animation for the background
const pulse = keyframes`
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, 
        rgba(15, 23, 42, 0.98) 0%, 
        rgba(30, 41, 59, 0.95) 50%, 
        rgba(51, 65, 85, 0.98) 100%
      )`
    : `linear-gradient(135deg, 
        rgba(248, 250, 252, 0.98) 0%, 
        rgba(241, 245, 249, 0.95) 50%, 
        rgba(226, 232, 240, 0.98) 100%
      )`,
  backdropFilter: 'blur(20px)',
  zIndex: 9999,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
         radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
      : `radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
         radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
    animation: `${pulse} 3s ease-in-out infinite`,
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 80,
  height: 80,
  marginBottom: theme.spacing(3),
  animation: `${float} 3s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, 
          rgba(59, 130, 246, 0.2) 0%, 
          rgba(139, 92, 246, 0.2) 100%
        )`
      : `linear-gradient(135deg, 
          rgba(59, 130, 246, 0.1) 0%, 
          rgba(139, 92, 246, 0.1) 100%
        )`,
    borderRadius: '50%',
    animation: `${pulse} 2s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiCircularProgress-svg': {
    filter: theme.palette.mode === 'dark'
      ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
      : 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))',
  },
}));

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Memuat...', 
  size = 'medium' 
}) => {
  const theme = useTheme();
  
  const progressSize = {
    small: 32,
    medium: 48,
    large: 64
  };

  return (
    <Fade in timeout={300}>
      <LoadingContainer>
        <LogoContainer>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.secondary.main} 100%
              )`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.palette.mode === 'dark'
                ? `0 8px 32px rgba(59, 130, 246, 0.3)`
                : `0 8px 32px rgba(59, 130, 246, 0.2)`,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.2) 0%, 
                  rgba(255, 255, 255, 0) 50%
                )`,
                borderRadius: '14px',
              }
            }}
          >
            <Image
              src="/logo.png"
              alt="PINTAR"
              width={50}
              height={50}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                zIndex: 2,
              }}
            />
          </Box>
        </LogoContainer>
        
        <StyledProgress
          size={progressSize[size]}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
        
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 500,
            textAlign: 'center',
            mb: 1,
            textShadow: theme.palette.mode === 'dark'
              ? '0 2px 4px rgba(0, 0, 0, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {message}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: 300,
            lineHeight: 1.5,
          }}
        >
          Mohon tunggu sebentar...
        </Typography>
      </LoadingContainer>
    </Fade>
  );
};

export default LoadingScreen;
