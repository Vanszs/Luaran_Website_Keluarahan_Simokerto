'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  useTheme,
  Stack,
  Container,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Dashboard as DashboardIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import UserManagement from '../../components/admin/UserManagement';
import AdminManagement from '../../components/admin/AdminManagement';
import ReportsList from '../../components/admin/ReportsList';
import DashboardStats from '../../components/admin/DashboardStats';

export default function AdminSubmissionsPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <DashboardStats useMockData={false} />;
      case 1: return <UserManagement />;
      case 2: return user?.role === 'superadmin' ? <AdminManagement /> : <Box p={3}>You don't have permission to access this feature.</Box>;
      case 3: return <ReportsList />;
      default: return <DashboardStats useMockData={false} />;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 3,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #283c56 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(0,0,0,0.2)'
            : '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 64, 
              height: 64,
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
          >
            <AlertIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              PINTAR Control Panel
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sistem Pelaporan Instant Tangkal Ancaman Rawan Kelurahan Simokerto
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper 
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 3,
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            minHeight: 64,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab 
            icon={<DashboardIcon />} 
            label="Dashboard" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
          <Tab 
            icon={<PeopleIcon />} 
            label="Warga" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
          <Tab 
            icon={<AdminIcon />} 
            label="Admin" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
            disabled={user?.role !== 'superadmin'}
          />
          <Tab 
            icon={<WarningIcon />} 
            label="Laporan" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
        </Tabs>

        <Box p={3}>
          {renderTabContent()}
        </Box>
      </Paper>
    </Container>
  );
}