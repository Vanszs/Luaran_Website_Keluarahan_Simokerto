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

const drawerWidth = 280;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(26, 26, 26, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(20px)',
    zIndex: theme.zIndex.drawer,
    paddingTop: '72px',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '14px',
  margin: '6px 16px',
  padding: '14px 18px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(144, 202, 249, 0.08)' 
      : 'rgba(25, 118, 210, 0.06)',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(144, 202, 249, 0.12)'
      : 'rgba(25, 118, 210, 0.1)',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.2)',
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
      <Box sx={{ flexGrow: 1, py: 2 }}>
        <List sx={{ px: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <StyledListItemButton 
                selected={currentView === item.id}
                onClick={() => onViewChange(item.id)}
              >
                <ListItemIcon sx={{ 
                  minWidth: 44, 
                  color: currentView === item.id ? 'primary.main' : 'inherit' 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
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
        p: 2, 
        borderTop: '1px solid', 
        borderColor: 'divider',
        background: theme => theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(0, 0, 0, 0.02)'
      }}>
        <StyledListItemButton>
          <ListItemIcon sx={{ minWidth: 44 }}>
            <Avatar sx={{ 
              width: 36, 
              height: 36,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 600
            }}>
              B
            </Avatar>
          </ListItemIcon>
          <ListItemText 
            primary="Budi Santoso"
            secondary="budi.santoso@email.com"
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }}
            secondaryTypographyProps={{ fontSize: '0.8rem' }}
          />
          <LogoutIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        </StyledListItemButton>
      </Box>
    </Drawer>
  );
}
