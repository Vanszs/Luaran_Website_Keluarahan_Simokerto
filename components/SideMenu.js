'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.99) 50%, rgba(51, 65, 85, 0.98) 100%)'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 1) 50%, rgba(241, 245, 249, 0.99) 100%)',
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '4px 0 32px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgba(255, 255, 255, 0.08)'
      : '4px 0 32px rgba(0, 0, 0, 0.08), inset -1px 0 0 rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(25px)',
    zIndex: theme.zIndex.drawer,
    paddingTop: '64px',
    position: 'fixed',
    height: '100vh',
    top: 0,
    left: 0,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.mode === 'dark'
        ? `
          radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%)
        `
        : `
          radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.06) 0%, transparent 50%)
        `,
      pointerEvents: 'none',
    },
  },
}));

export default function SideMenu({ currentView, onViewChange }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'documents',
      label: 'Dokumen',
      icon: <DescriptionIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'riwayat',
      label: 'Riwayat',
      icon: <HistoryIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: <SettingsIcon sx={{ fontSize: 20 }} />,
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Modern Logo Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: theme => `1px solid ${alpha(theme.palette.divider, 0.15)}`, 
          textAlign: 'center',
          background: theme => theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.8)'
            : 'rgba(248, 250, 252, 0.8)',
          backdropFilter: 'blur(10px)',
        }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: theme => theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 8px 24px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              border: theme => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              style={{ borderRadius: '8px' }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'text.primary',
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Portal Warga
          </Typography>
        </Box>

        {/* Enhanced Menu Items */}
        <Box sx={{ flex: 1, p: 2 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item) => (
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
                    '&.Mui-selected': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 100%)'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.08) 100%)',
                      color: theme => theme.palette.primary.main,
                      border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                        : `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
                      backdropFilter: 'blur(10px)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)',
                        borderRadius: '0 4px 4px 0',
                      },
                      '&:hover': {
                        background: theme => theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.2) 100%)'
                          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.1) 100%)',
                        transform: 'translateX(4px)',
                      },
                    },
                    '&:hover': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.08)'
                        : 'rgba(59, 130, 246, 0.04)',
                      transform: 'translateX(2px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.08)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

        {/* Enhanced User Profile at Bottom */}
        <Box sx={{ 
          p: 2, 
          borderTop: theme => `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          background: theme => theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(248, 250, 252, 0.8)',
          backdropFilter: 'blur(10px)',
        }}>
          <ListItemButton
            sx={{
              borderRadius: 3,
              p: 2,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.04) 100%)',
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              '&:hover': {
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.12) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.06) 100%)',
                transform: 'translateY(-2px)',
                boxShadow: theme => `0 8px 20px ${alpha(theme.palette.error.main, 0.2)}`,
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Avatar sx={{ 
                width: 36, 
                height: 36,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                  : '0 4px 12px rgba(102, 126, 234, 0.2)',
              }}>
                BS
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary="Budi Santoso"
              secondary="Keluar"
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }}
              secondaryTypographyProps={{ fontSize: '0.75rem', color: 'error.main' }}
            />
            <LogoutIcon sx={{ fontSize: 20, color: 'error.main' }} />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
}
