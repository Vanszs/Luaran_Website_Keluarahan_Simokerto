'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';

// SINGLE SOURCE OF TRUTH FOR COLOR MODE CONTEXT
export const ColorModeContext = React.createContext({ 
  mode: 'light',
  toggleColorMode: () => {} 
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: '12px',
  backgroundColor: theme.palette.mode === 'dark' ? 
    'rgba(251, 191, 36, 0.15)' : 
    'rgba(59, 130, 246, 0.1)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 
    'rgba(251, 191, 36, 0.3)' : 
    'rgba(59, 130, 246, 0.2)'}`,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(251, 191, 36, 0.2)' : 
      'rgba(59, 130, 246, 0.15)',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: theme.palette.mode === 'dark' ?
      '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(251, 191, 36, 0.3)' :
      '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 20px rgba(59, 130, 246, 0.2)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

export default function ColorModeSelect(props: any) {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  
  return (
    <Tooltip 
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      placement="bottom"
    >
      <StyledIconButton
        onClick={toggleColorMode}
        aria-label="toggle color mode"
        {...props}
      >
        {mode === 'light' ? (
          <DarkModeIcon sx={{ 
            fontSize: 20, 
            color: '#1d4ed8'
          }} />
        ) : (
          <LightModeIcon sx={{ 
            fontSize: 20, 
            color: '#fbbf24'
          }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
}