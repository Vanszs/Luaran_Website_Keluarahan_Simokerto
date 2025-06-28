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
import { useTheme } from '@mui/material/styles';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: theme.palette.mode === 'dark'
      ? `2px solid rgba(148, 163, 184, 0.25)`
      : `3px solid rgba(51, 65, 85, 0.1)`,
    boxShadow: theme.palette.mode === 'dark'
      ? `
          4px 0 20px rgba(0, 0, 0, 0.4),
          2px 0 8px rgba(0, 0, 0, 0.3),
          inset 1px 0 0 rgba(255, 255, 255, 0.1)
        `
      : `
          4px 0 20px rgba(37, 99, 235, 0.06),
          2px 0 8px rgba(51, 65, 85, 0.04),
          inset 1px 0 0 rgba(255, 255, 255, 0.8)
        `,
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
        background: `
          linear-gradient(90deg, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          )
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }
    }),
  },
}));

export default function SideMenu({ currentView, onViewChange }) {
  const theme = useTheme();

  React.useEffect(() => {
    console.log('SideMenu theme mode:', theme.palette.mode);
  }, [theme.palette.mode]);

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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          p: 3, 
          borderBottom: theme => `1px solid ${theme.palette.divider}`, 
          textAlign: 'center',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          transition: 'all 300ms ease-in-out !important',
          position: 'relative',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 12px rgba(37, 99, 235, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
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
                ? `
                    0 8px 24px rgba(102, 126, 234, 0.4),
                    0 4px 12px rgba(102, 126, 234, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                : `
                    0 8px 24px rgba(102, 126, 234, 0.2),
                    0 4px 12px rgba(102, 126, 234, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8)
                  `,
              border: theme => `1px solid ${theme.palette.divider}`,
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
            }}
          >
            Portal Warga
          </Typography>
        </Box>

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
                    transition: 'all 300ms ease-in-out !important',
                    '&.Mui-selected': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
                      color: theme => theme.palette.primary.main,
                      border: theme => `2px solid ${theme.palette.mode === 'dark' 
                        ? 'rgba(96, 165, 250, 0.3)' 
                        : 'rgba(29, 78, 216, 0.2)'}`,
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? `
                            0 6px 16px rgba(96, 165, 250, 0.2),
                            0 3px 8px rgba(96, 165, 250, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `
                        : `
                            0 4px 12px rgba(29, 78, 216, 0.1),
                            0 2px 6px rgba(29, 78, 216, 0.08),
                            inset 0 1px 0 rgba(255, 255, 255, 0.6)
                          `,
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
                          ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0.15) 100%)'
                          : 'linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(29, 78, 216, 0.08) 100%)',
                        transform: 'translateX(4px)',
                      },
                    },
                    '&:hover': {
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(96, 165, 250, 0.08)'
                        : 'rgba(29, 78, 216, 0.04)',
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

        <Box sx={{ 
          p: 2, 
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          transition: 'all 300ms ease-in-out !important',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 -4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 -4px 12px rgba(37, 99, 235, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }}>
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
              primaryTypographyProps={{ 
                fontSize: '0.9rem', 
                fontWeight: 600,
                color: 'text.primary'
              }}
              secondaryTypographyProps={{ 
                fontSize: '0.75rem', 
                color: 'error.main' 
              }}
            />
            <LogoutIcon sx={{ fontSize: 20, color: 'error.main' }} />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
}
