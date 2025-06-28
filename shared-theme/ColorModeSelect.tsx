'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';
import { ColorModeContext } from './AppTheme';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'dark' ? 
    theme.palette.background.paper : 
    theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-1px)',
  },
}));

export default function ColorModeSelect(props: any) {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  
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
          <DarkModeIcon sx={{ 
            fontSize: 20, 
            color: 'text.primary'  // Use theme color
          }} />
        ) : (
          <LightModeIcon sx={{ 
            fontSize: 20, 
            color: 'warning.main'  // Use theme warning color
          }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
}