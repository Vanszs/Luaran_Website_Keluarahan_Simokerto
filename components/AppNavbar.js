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
import { alpha } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.99) 0%, rgba(30, 41, 59, 0.99) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 0.99) 100%)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
    : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(30px)',
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `
        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
        radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)
      `
      : `
        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%),
        radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)
      `,
    pointerEvents: 'none',
  }
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
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.08) 100%)'
    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.04) 100%)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.12) 100%)'
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.06) 100%)',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.3)'
      : '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 20px rgba(59, 130, 246, 0.2)',
  },
}));

export default function AppNavbar() {
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
              border: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
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
          
          {/* Enhanced Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: '1.2rem',
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
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
