'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';
import { ColorModeContext } from './AppTheme';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  backgroundColor: theme.palette.mode === 'dark' ? 
    'rgba(96, 165, 250, 0.1)' : 
    'rgba(29, 78, 216, 0.08)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 
    'rgba(96, 165, 250, 0.2)' : 
    'rgba(29, 78, 216, 0.15)'}`,
  // UNIFIED TRANSITION
  transition: 'all 200ms ease-in-out !important',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(96, 165, 250, 0.15)' : 
      'rgba(29, 78, 216, 0.12)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark' ?
      '0 8px 24px rgba(96, 165, 250, 0.25)' :
      '0 4px 12px rgba(29, 78, 216, 0.15)',
  },
}));

export default function ColorModeSelect(props) {
  const colorModeContext = React.useContext(ColorModeContext);
  
  // PREVENT CRASH IF CONTEXT IS NULL
  if (!colorModeContext || !colorModeContext.mode) {
    return null;
  }

  const { mode, toggleColorMode } = colorModeContext;

  return (
    <Tooltip 
      title={mode === 'light' ? 'Mode Gelap' : 'Mode Terang'}
      placement="bottom"
    >
      <StyledIconButton
        onClick={toggleColorMode}
        aria-label="toggle color mode"
        {...props}
      >
        {mode === 'light' ? (
          <DarkModeIcon sx={{ fontSize: 24, color: 'primary.main' }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 24, color: 'warning.main' }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
}