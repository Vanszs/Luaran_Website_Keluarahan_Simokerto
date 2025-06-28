'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
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

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(26, 26, 26, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    backdropFilter: 'blur(20px)',
    zIndex: theme.zIndex.drawer,
    paddingTop: '64px',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '10px',
  margin: '4px 12px',
  padding: '10px 16px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(144, 202, 249, 0.08)' 
      : 'rgba(25, 118, 210, 0.06)',
    transform: 'translateX(2px)',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(144, 202, 249, 0.12)'
      : 'rgba(25, 118, 210, 0.1)',
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(144, 202, 249, 0.16)'
        : 'rgba(25, 118, 210, 0.12)',
    },
  },
}));

export default function SideMenu({ currentView, onViewChange }) {
  const menuItems = [
    { id: 'dashboard', text: 'Beranda', icon: <DashboardIcon /> },
    { id: 'documents', text: 'Ajukan Surat', icon: <DescriptionIcon /> },
    { id: 'riwayat', text: 'Riwayat Pengajuan', icon: <HistoryIcon /> },
    { id: 'settings', text: 'Pengaturan', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      {/* Navigation */}
      <Box sx={{ flexGrow: 1, py: 1.5 }}>
        <List sx={{ px: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <StyledListItemButton 
                selected={currentView === item.id}
                onClick={() => onViewChange(item.id)}
              >
                <ListItemIcon sx={{ 
                  minWidth: 36, 
                  color: currentView === item.id ? 'primary.main' : 'inherit' 
                }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: currentView === item.id ? 600 : 500,
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* User Profile */}
      <Box sx={{ 
        p: 1.5, 
        borderTop: '1px solid', 
        borderColor: 'divider',
        background: theme => theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(0, 0, 0, 0.02)'
      }}>
        <StyledListItemButton>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Avatar sx={{ 
              width: 32, 
              height: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 600,
              p: 0.5,
            }}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                style={{ borderRadius: '2px' }}
              />
            </Avatar>
          </ListItemIcon>
          <ListItemText 
            primary="Budi Santoso"
            secondary="budi.santoso@email.com"
            primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 600 }}
            secondaryTypographyProps={{ fontSize: '0.75rem' }}
          />
          <LogoutIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        </StyledListItemButton>
      </Box>
    </Drawer>
  );
}
