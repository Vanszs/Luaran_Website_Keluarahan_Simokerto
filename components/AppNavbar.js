'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ColorModeSelect from '../shared-theme/ColorModeSelect.js';
import Image from 'next/image';
import { alpha, useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  background: theme.palette.mode === 'dark'
    ? 'rgba(15, 23, 42, 0.96)'
    : 'rgba(255, 255, 255, 0.96)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 8px rgba(0, 0, 0, 0.3)'
    : '0 2px 12px rgba(51, 65, 85, 0.06)',
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  color: theme.palette.text.primary,
  transition: 'background-color 200ms ease-in-out, border-color 200ms ease-in-out !important',
}));

const Toolbar = styled(MuiToolbar)({
  padding: '6px 20px',
  minHeight: '64px !important',
});

export default function AppNavbar() {
  const theme = useTheme();

  React.useEffect(() => {
    console.log('AppNavbar theme mode:', theme.palette.mode);
  }, [theme.palette.mode]);

  // Helper style for all navbar icon buttons (NO BLUR on light mode)
  const navIconButtonStyle = {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.05)',
    ...(theme.palette.mode === 'dark'
      ? { backdropFilter: 'blur(8px)' }
      : { backdropFilter: 'none' }),
    borderRadius: '50%',
    width: 40,
    height: 40,
    transition: 'all 0.3s ease',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.15)'
        : 'rgba(0,0,0,0.1)',
      transform: 'scale(1.05)',
    },
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton
            sx={{
              ...navIconButtonStyle,
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <MenuRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          {/* Enhanced Logo */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              boxShadow: theme => theme.palette.mode === 'dark'
                ? '0 6px 16px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 6px 16px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              border: theme => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              style={{ borderRadius: '6px' }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: '1.2rem',
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
              textShadow: theme => theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(255, 255, 255, 0.1)'
                : 'none',
            }}
          >
            Kelurahan Simokerto
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Notification Button */}
          <IconButton
            color="inherit"
            sx={navIconButtonStyle}
          >
            <NotificationsIcon />
          </IconButton>
          {/* Theme Toggle Button */}
          <ColorModeSelect sx={navIconButtonStyle} />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}
