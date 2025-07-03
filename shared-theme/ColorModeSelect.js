'use client';

import React, { useContext } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { ColorModeContext } from './AppTheme';

const ColorModeSelect = (props) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip title={theme.palette.mode === 'dark' ? 'Light mode' : 'Dark mode'}>
      <IconButton 
        onClick={colorMode.toggleColorMode} 
        color="inherit"
        {...props}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.05)',
          // Only apply blur in dark mode for modern effect, not in light mode
          ...(theme.palette.mode === 'dark'
            ? { backdropFilter: 'blur(8px)' }
            : {}),
          borderRadius: '50%',
          width: 40,
          height: 40,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.05)',
          },
          ...props.sx
        }}
      >
        {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ColorModeSelect;