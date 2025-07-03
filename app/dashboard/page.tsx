'use client';

import React from 'react';
import { 
  Box, 
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  NotificationsActive as AlertIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useApiData } from '../../hooks/useMockApi';
import DashboardStats from '../../components/admin/DashboardStats';
import Layout from '../../components/layout/Layout';

export default function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  
  // Get dashboard stats from the database
  const { data: stats, loading, refresh } = useApiData({
    endpoint: '/api/admin/stats',
    useMock: false, // Use real data
  });
  
  const fetchData = async () => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  // Quick stats cards data
  const quickStatsCards = [
    {
      title: 'Laporan Hari Ini',
      value: stats?.todayReports || 0,
      icon: <WarningIcon />,
      color: '#3f51b5',
      path: '/dashboard/reports'
    },
    {
      title: 'Total Laporan',
      value: stats?.totalReports || 0,
      icon: <AlertIcon />,
      color: '#f44336',
      path: '/dashboard/reports'
    },
    {
      title: 'Warga Terdaftar',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon />,
      color: '#4caf50',
      path: '/dashboard/citizens'
    },
    {
      title: 'Perangkat Aktif',
      value: stats?.activeDevices || 0,
      icon: <DashboardIcon />,
      color: '#ff9800',
      path: '/dashboard/devices'
    }
  ];

  return (
    <Layout title="Dashboard Admin">
      <Box>
        {/* Welcome section with refresh button */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {loading ? 
                'Memuat data...' : 
                `Selamat Datang, ${user?.name?.split(' ')[0] || 'Admin'}`
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dashboard Admin PINTAR - Pelaporan Instant Tangkal Ancaman Rawan
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<WarningIcon />}
              onClick={() => router.push('/dashboard/reports')}
            >
              Lihat Laporan
            </Button>
            
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={fetchData} 
                disabled={refreshing || loading}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        {/* Quick stats cards */}
        <Grid container spacing={2} mb={2}>
          {quickStatsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: card.color,
                  },
                }}
                onClick={() => router.push(card.path)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(card.color, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                      color: card.color,
                      width: 36,
                      height: 36
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
                
                {loading ? (
                  <LinearProgress sx={{ mb: 1 }} />
                ) : (
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                    {refreshing ? '-' : card.value}
                  </Typography>
                )}
                
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main dashboard content */}
        <DashboardStats useMockData={false} />
        
        {/* Refresh indicator */}
        {refreshing && (
          <LinearProgress
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          />
        )}
      </Box>
    </Layout>
  );
}
