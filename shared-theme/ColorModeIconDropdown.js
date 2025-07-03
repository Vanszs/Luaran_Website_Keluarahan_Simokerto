'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { ColorModeContext } from './AppTheme'; // FIXED: Import dari AppTheme

export default function ColorModeIconDropdown() {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = () => {
    console.log('Theme toggle triggered from dropdown'); // DEBUG LOG
    toggleColorMode();
    handleClose();
  };

  const getIcon = () => {
    if (mode === 'dark') return <DarkModeIcon />;
    if (mode === 'light') return <LightModeIcon />;
    return <SettingsBrightnessIcon />;
  };

  return (
    <>
      <Tooltip title="Toggle color mode">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 1,
            backgroundColor: mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.05)',
            // Only apply blur in dark mode
            ...(mode === 'dark'
              ? { backdropFilter: 'blur(8px)' }
              : {}),
            borderRadius: '50%',
            width: 40,
            height: 40,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? 'rgba(255,255,255,0.15)'
                : 'rgba(0,0,0,0.1)',
              transform: 'scale(1.05)',
            },
          }}
          aria-controls={open ? 'color-mode-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {getIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="color-mode-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleModeChange}>
          <LightModeIcon sx={{ mr: 1 }} />
          Light
        </MenuItem>
        <MenuItem onClick={handleModeChange}>
          <DarkModeIcon sx={{ mr: 1 }} />
          Dark
        </MenuItem>
      </Menu>
    </>
  );
}
