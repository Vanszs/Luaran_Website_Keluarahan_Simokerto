'use client';

import React from 'react';
import { 
  Box, 
  Typography,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  Stack,
  Button,
  Skeleton,
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

interface Stats {
  todayReports: number;
  totalReports: number;
  totalUsers: number;
  activeDevices: number;
}

export default function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  
  // Get dashboard stats from the database
  const { data: stats, loading, refresh } = useApiData<Stats>({
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
      icon: <WarningIcon fontSize="small" />,
      color: theme.palette.primary.main,
      path: '/dashboard/reports'
    },
    {
      title: 'Total Laporan',
      value: stats?.totalReports || 0,
      icon: <AlertIcon fontSize="small" />,
      color: theme.palette.error.main,
      path: '/dashboard/reports'
    },
    {
      title: 'Warga Terdaftar',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon fontSize="small" />,
      color: theme.palette.success.main,
      path: '/dashboard/citizens'
    },
    {
      title: 'Perangkat Aktif',
      value: stats?.activeDevices || 0,
      icon: <DashboardIcon fontSize="small" />,
      color: theme.palette.warning.main,
      path: '/dashboard/devices'
    }
  ];

  return (
    <Layout title="Dashboard Admin">
      <Box>
        {/* Simple header with refresh button */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #283c56 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(0,0,0,0.2)'
              : '0 8px 24px rgba(0,0,0,0.1)'
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {loading ?
                'Memuat data...' :
                `Selamat Datang, ${user?.name?.split(' ')[0] || 'Admin'}`
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dashboard Admin PINTAR - Pelaporan Instant Tangkal Ancaman Rawan
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<WarningIcon />}
              onClick={() => router.push('/dashboard/reports')}
            >
              Lihat Laporan
            </Button>
            
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={fetchData} 
                disabled={refreshing || loading}
                size="small"
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>

        {/* Quick stats cards */}
        <Grid container spacing={2} mb={3}>
          {quickStatsCards.map((card, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => router.push(card.path)}
              >
                <Stack spacing={1}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 1.5,
                      bgcolor: alpha(card.color, 0.12),
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                  
                  {loading ? (
                    <LinearProgress sx={{ my: 1 }} />
                  ) : (
                    <Typography variant="h6" fontWeight={600}>
                      {refreshing ? '-' : card.value}
                    </Typography>
                  )}
                  
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main dashboard content */}
        <DashboardStats useMockData={false} />
      </Box>
    </Layout>
  );
}
