'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  useTheme,
  IconButton,
  Tooltip,
  Chip,
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

export default function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: stats, loading, refresh } = useRealStats();

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
      path: '/admin/reports',
      change: stats?.todayChange || 0,
    },
    {
      title: 'Total Laporan',
      value: stats?.totalReports || 0,
      icon: <AlertIcon fontSize="small" />,
      color: theme.palette.error.main,
      path: '/admin/reports',
      change: stats?.totalReportsChange || 0,
    },
    {
      title: 'Warga Terdaftar',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon fontSize="small" />,
      color: theme.palette.success.main,
      path: '/admin/citizens',
      change: stats?.userChange || 0,
    },
    {
      title: 'Admin Aktif',
      value: stats?.activeAdmins || 0,
      icon: <DashboardIcon fontSize="small" />,
      color: theme.palette.warning.main,
      path: '/admin/manage-admins',
      change: 0,
    }
  ];

  return (
    <Layout title="">
      <Box>
        {/* Welcome Card - Removed search bar */}
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
                  {loading ? 'Memuat...' : `Selamat Datang, ${user?.name?.split(' ')[0] || 'Admin'}`}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                >
                  PINTAR Control Panel - Sistem Pelaporan Instant Tangkal Ancaman Rawan
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    startIcon={<WarningIcon />}
                    onClick={() => router.push('/admin/reports')}
                    sx={{
                      borderRadius: 2,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 18px ${alpha(theme.palette.primary.main, 0.4)}`,
                      }
                    }}
                  >
                    Lihat Laporan
                  </Button>
                  
                  <Tooltip title="Refresh Data" arrow>
                    <IconButton 
                      onClick={fetchData} 
                      disabled={refreshing || loading}
                      size="small"
                      sx={{ 
                        width: 38,
                        height: 38,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.16),
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

        {/* Stats Cards Grid */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {quickStatsCards.map((card, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 2,
                  },
                }}
                onClick={() => router.push(card.path)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: alpha(card.color, 0.12),
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                  
                  {card.change !== 0 && (
                    <Chip
                      icon={card.change > 0 ? <ArrowUpwardIcon sx={{ fontSize: '0.75rem !important' }} /> : <ArrowDownwardIcon sx={{ fontSize: '0.75rem !important' }} />}
                      label={`${card.change > 0 ? '+' : ''}${card.change}%`}
                      size="small"
                      color={card.change > 0 ? 'success' : 'error'}
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        '& .MuiChip-icon': { 
                          fontSize: '0.75rem',
                        }
                      }}
                    />
                  )}
                </Box>
                
                <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5, fontSize: '1.5rem' }}>
                  {refreshing ? '...' : card.value.toLocaleString()}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {card.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Reports */}
        <DashboardStats useMockData={false} />
      </Box>
    </Layout>
  );
}
