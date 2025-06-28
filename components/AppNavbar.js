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
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Image from 'next/image';
import { alpha, useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  // SOLID BACKGROUND - NO BACKDROP FILTER
  background: theme.palette.mode === 'dark'
    ? 'rgba(15, 23, 42, 1)'
    : 'rgba(255, 255, 255, 1)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 8px rgba(0, 0, 0, 0.3)'
    : '0 2px 8px rgba(51, 65, 85, 0.04)',
  // REMOVE backdrop-filter
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  color: theme.palette.text.primary,
  // UNIFIED TRANSITION
  transition: 'background-color 200ms ease-in-out, border-color 200ms ease-in-out !important',
}));

const Toolbar = styled(MuiToolbar)({
  padding: '6px 20px',
  minHeight: '64px !important',
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px',
  width: '44px',
  height: '44px',
  background: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.12),
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.3)'
      : '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 20px rgba(59, 130, 246, 0.2)',
  },
}));

export default function AppNavbar() {
  const theme = useTheme();

  // DEBUG LOG for theme tracking
  React.useEffect(() => {
    console.log('AppNavbar theme mode:', theme.palette.mode);
  }, [theme.palette.mode]);

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <StyledIconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuRoundedIcon sx={{ fontSize: 20 }} />
          </StyledIconButton>
          
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
          
          {/* Enhanced Title - USE THEME COLOR */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: '1.2rem',
              color: 'text.primary', // USE THEME COLOR
              display: { xs: 'none', sm: 'block' },
              textShadow: theme => theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(255, 255, 255, 0.1)' 
                : 'none',
            }}
          >
            Kelurahan Simokerto
          </Typography>
        </Stack>

        {/* Right side - Only Theme Toggle */}
        <Stack direction="row" spacing={2} alignItems="center">
          <ColorModeSelect />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}
