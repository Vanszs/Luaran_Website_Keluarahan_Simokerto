import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  Groups,
  Description,
  Settings,
  Logout,
  DriveFolderUpload,
  ExitToApp, // Added ExitToApp icon
} from '@mui/icons-material';
import Image from 'next/image';

interface AdminSideMenuProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 100%)'
      : 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: theme.palette.mode === 'dark'
      ? `2px solid rgba(148,163,184,0.25)`
      : `3px solid rgba(51,65,85,0.1)`,
    boxShadow: theme.palette.mode === 'dark'
      ? `4px 0 20px rgba(0,0,0,0.4), 2px 0 8px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.1)`
      : `4px 0 20px rgba(37,99,235,0.06), 2px 0 8px rgba(51,65,85,0.04), inset 1px 0 0 rgba(255,255,255,0.8)`,
    zIndex: theme.zIndex.drawer,
    paddingTop: '64px',
    position: 'fixed',
    height: '100vh',
    top: 0,
    left: 0,
    color: theme.palette.text.primary,
    transition: 'all 300ms ease-in-out !important',
    ...(theme.palette.mode === 'light' && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60%',
        height: '100%',
        background: `linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)`,
        pointerEvents: 'none',
        zIndex: 1,
      },
    }),
  },
}));

export default function AdminSideMenu({ currentView, onViewChange }: AdminSideMenuProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard sx={{ fontSize: 20 }} /> },
    { id: 'pengajuan', label: 'Pengajuan', icon: <Description sx={{ fontSize: 20 }} /> },
    { id: 'users', label: 'Data Akun Warga', icon: <Groups sx={{ fontSize: 20 }} /> },
    { id: 'templates', label: 'Kelola Template', icon: <DriveFolderUpload sx={{ fontSize: 20 }} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings sx={{ fontSize: 20 }} /> },
  ];

  return (
    <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            p: 3,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(51,65,85,0.8) 100%)'
              : 'linear-gradient(135deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            transition: 'all 300ms ease-in-out !important',
            position: 'relative',
            display: 'flex', // Use flexbox for alignment
            flexDirection: 'column', // Stack logo and text vertically
            alignItems: 'center', // Center items horizontally
            justifyContent: 'center', // Center items vertically
          }}
        >
          <Box
            sx={{
              width: 48, // Slightly smaller logo container
              height: 48, // Slightly smaller logo container
              borderRadius: 3, // Slightly less rounded corners
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5, // Reduced bottom margin
              boxShadow: theme => theme.palette.mode === 'dark'
                ? '0 6px 18px rgba(102,126,234,0.3), 0 3px 9px rgba(102,126,234,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
                : '0 6px 18px rgba(102,126,234,0.15), 0 3px 9px rgba(102,126,234,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: theme => `1px solid ${theme.palette.divider}`,
              transition: 'all 300ms ease-in-out', // Add transition
              '&:hover': {
                transform: 'scale(1.05)', // Add hover effect
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? '0 8px 24px rgba(102,126,234,0.4), 0 4px 12px rgba(102,126,234,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : '0 8px 24px rgba(102,126,234,0.2), 0 4px 12px rgba(102,126,234,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }
            }}
          >
            <Image src="/logo.png" alt="Logo" width={30} height={30} style={{ borderRadius: '6px' }} /> {/* Slightly smaller image */}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700, // Slightly less bold
              fontSize: '1rem', // Slightly smaller font size
              color: 'text.primary',
              letterSpacing: '0.05em', // Add slight letter spacing
              textTransform: 'uppercase', // Uppercase text
            }}
          >
            Portal Admin
          </Typography>
           {/* You can add a subtitle here if needed */}
           {/*
           <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              fontSize: '0.8rem',
              color: 'text.secondary',
              mt: 0.5,
            }}
           >
             Kota Surabaya
           </Typography>
           */}
        </Box>

        <Box sx={{ flex: 1, p: 2 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map(item => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={currentView === item.id}
                  onClick={() => onViewChange(item.id)}
                  sx={{
                    borderRadius: 3,
                    minHeight: 52,
                    px: 2.5,
                    py: 1.5,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 300ms ease-in-out !important',
                    '&.Mui-selected': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(29,78,216,0.1) 0%, rgba(29,78,216,0.05) 100%)',
                      color: theme => theme.palette.primary.main,
                      border: theme => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(96,165,250,0.3)' : 'rgba(29,78,216,0.2)'}`,
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 6px 16px rgba(96,165,250,0.2), 0 3px 8px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 4px 12px rgba(29,78,216,0.1), 0 2px 6px rgba(29,78,216,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: 'linear-gradient(180deg, #60a5fa 0%, #a78bfa 100%)',
                        borderRadius: '0 4px 4px 0',
                      },
                      '&:hover': {
                        background: theme => theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(96,165,250,0.15) 100%)'
                          : 'linear-gradient(135deg, rgba(29,78,216,0.15) 0%, rgba(29,78,216,0.08) 100%)',
                        transform: 'translateX(4px)',
                      },
                    },
                    '&:hover': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(96,165,250,0.08)'
                        : 'rgba(29,78,216,0.04)',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: currentView === item.id
                        ? theme => theme.palette.primary.main
                        : theme => theme.palette.text.secondary,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: currentView === item.id ? 700 : 500,
                      color: currentView === item.id
                        ? theme => theme.palette.primary.main
                        : theme => theme.palette.text.primary,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: theme => `1px solid ${theme.palette.divider}`,
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(51,65,85,0.8) 100%)'
              : 'linear-gradient(135deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            transition: 'all 300ms ease-in-out !important',
          }}
        >
          <ListItemButton
            sx={{
              borderRadius: 3,
              p: 2,
              background: theme => alpha(theme.palette.error.main, 0.08),
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              '&:hover': {
                background: theme => alpha(theme.palette.error.main, 0.12),
                transform: 'translateY(-2px)',
                boxShadow: theme => `0 8px 20px ${alpha(theme.palette.error.main, 0.2)}`,
              },
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            onClick={() => onViewChange('logout')}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                AD
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="Keluar"
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, color: 'text.primary' }}
            />
            <ExitToApp sx={{ fontSize: 20, color: 'error.main' }} /> {/* Changed icon to ExitToApp */}
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
}
