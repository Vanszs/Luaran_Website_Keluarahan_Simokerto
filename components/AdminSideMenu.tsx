import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Groups,
  Description,
  Settings,
  Logout,
  DriveFolderUpload,
} from '@mui/icons-material';

interface AdminSideMenuProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function AdminSideMenu({ currentView, onViewChange }: AdminSideMenuProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
    },
    {
      id: 'pengajuan',
      label: 'Pengajuan',
      icon: <Description />,
    },
    {
      id: 'users',
      label: 'Data Akun Warga',
      icon: <Groups />,
    },
    {
      id: 'templates',
      label: 'Kelola Template',
      icon: <DriveFolderUpload />,
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: <Settings />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          Portal Admin
        </Typography>
      </Box>
      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentView === item.id}
              onClick={() => onViewChange(item.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onViewChange('logout')}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}
