'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ 
  mode: 'light',
  toggleColorMode: () => {} 
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  backgroundColor: theme.palette.mode === 'dark' ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.06)',
  border: `2px solid ${theme.palette.mode === 'dark' ? 
    'rgba(255, 255, 255, 0.2)' : 
    'rgba(0, 0, 0, 0.1)'}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.2)' : 
      'rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.1)',
    boxShadow: theme.palette.mode === 'dark' ?
      '0 6px 20px rgba(255, 255, 255, 0.2)' :
      '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

export default function ColorModeSelect(props) {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  
  if (!mode) {
    return null;
  }

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
          <DarkModeIcon sx={{ fontSize: 24, color: 'text.primary' }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 24, color: 'text.primary' }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
}