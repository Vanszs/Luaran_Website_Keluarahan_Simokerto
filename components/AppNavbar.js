'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Image from 'next/image';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(26, 26, 26, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  backdropFilter: 'blur(20px)',
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
}));

const Toolbar = styled(MuiToolbar)({
  padding: '6px 20px',
  minHeight: '64px !important',
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

export default function AppNavbar() {
  return (
    <StyledAppBar>
      <Toolbar>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Left side - Mobile menu & Title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <StyledIconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuRoundedIcon sx={{ fontSize: 20 }} />
            </StyledIconButton>
            
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CustomIcon />
              <Typography 
                variant="h6" 
                component="h1" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Kelurahan Simokerto
              </Typography>
            </Stack>
          </Stack>

          {/* Right side - Actions */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ColorModeSelect />
            
            <StyledIconButton>
              <Badge badgeContent={3} color="error" variant="dot">
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </StyledIconButton>

            <StyledIconButton>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                A
              </Avatar>
            </StyledIconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}

function CustomIcon() {
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        transition: 'all 0.2s ease',
      }}
    >
      <Image
        src="/logo.png"
        alt="Logo Kelurahan Simokerto"
        width={16}
        height={16}
        style={{ borderRadius: '2px' }}
      />
    </Box>
  );
}
