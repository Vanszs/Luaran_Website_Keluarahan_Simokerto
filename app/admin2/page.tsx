'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
  Stack,
  alpha,
  Card,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import DashboardStats from '../../components/admin/DashboardStats';
import { useRouter } from 'next/navigation';
import { useRealStats } from '../../hooks/useRealStats';
import Layout from '../../components/layout/Layout';

export default function Admin2Dashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: stats, loading, refresh } = useRealStats();

  // Debug logging for admin2 navigation
  React.useEffect(() => {
    console.log('🔍 Admin2Dashboard mounted, user:', user);
    console.log('🔍 Current pathname:', window.location.pathname);
    
    // Listen for navigation events
    const handleBeforeUnload = () => {
      console.log('🔍 Admin2Dashboard: Page is being unloaded');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      console.log('🔍 Admin2Dashboard unmounting');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  const fetchData = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickStatsCards = [
    {
      title: 'Laporan Hari Ini',
      value: stats?.todayReports || 0,
      icon: <WarningIcon fontSize="small" />,
      color: theme.palette.primary.main,
      path: '/admin2/reports',
      change: stats?.todayChange || 0,
    },
    {
      title: 'Total Laporan',
      value: stats?.totalReports || 0,
      icon: <AlertIcon fontSize="small" />,
      color: theme.palette.error.main,
      path: '/admin2/reports',
      change: stats?.totalReportsChange || 0,
    },
    {
      title: 'Warga Terdaftar',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon fontSize="small" />,
      color: theme.palette.success.main,
      path: '/admin2/citizens',
      change: stats?.userChange || 0,
    },
    {
      title: 'Total Admin',
      value: stats?.activeAdmins || 0,
      icon: <DashboardIcon fontSize="small" />,
      color: theme.palette.warning.main,
      path: '/admin2',
      change: 0,
    }
  ];

  return (
    <Layout title="">
      <Box>
          {/* Welcome Card */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`
                : `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: theme.palette.mode === 'dark'
                  ? 'radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.08), transparent 25%)'
                  : 'radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.05), transparent 25%)',
                pointerEvents: 'none',
              }
            }}
          >
            <Box sx={{ p: 3, position: 'relative' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      mb: 0.5,
                    }}
                  >
                    {loading ? 'Memuat...' : `Selamat Datang, ${user?.name?.split(' ')[0] || 'Admin2'}`}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ fontSize: '0.9rem' }}
                  >
                    Dashboard Admin2 - Kelola laporan dan data warga (read-only mode)
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Stack direction="row" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing={2}>
                    <Tooltip title="Refresh Data">
                      <IconButton 
                        onClick={fetchData}
                        disabled={refreshing}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                          },
                          '&:disabled': {
                            opacity: 0.6,
                          }
                        }}
                      >
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Card>

          {/* Quick Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {quickStatsCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
                        : `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
                    }
                  }}
                  onClick={() => router.push(card.path)}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(card.color, 0.1),
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.icon}
                    </Box>
                    
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.8rem' }}
                      >
                        {card.title}
                      </Typography>
                      
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 0.5,
                        }}
                      >
                        {loading ? '...' : card.value.toLocaleString()}
                      </Typography>
                      
                      {card.change !== 0 && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          {card.change > 0 ? (
                            <ArrowUpwardIcon sx={{ fontSize: 12, color: theme.palette.success.main }} />
                          ) : (
                            <ArrowDownwardIcon sx={{ fontSize: 12, color: theme.palette.error.main }} />
                          )}
                          <Typography
                            variant="caption"
                            color={card.change > 0 ? "success.main" : "error.main"}
                            sx={{ fontWeight: 500 }}
                          >
                            {Math.abs(card.change)}%
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Dashboard Stats Component */}
          <DashboardStats useMockData={false} />
        </Box>
      </Layout>
  );
}
