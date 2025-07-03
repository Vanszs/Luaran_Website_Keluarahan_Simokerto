'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  useTheme,
  alpha,
  Button,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import DashboardStats from '../../components/admin/DashboardStats';
import { useRouter } from 'next/navigation';
import { useApiData } from '../../hooks/useMockApi';

export default function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: stats, loading, refresh } = useApiData({
    endpoint: '/api/admin/stats',
    useMock: false,
  });
  
  const fetchData = async () => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickStatsCards = [
    {
      title: 'Laporan Hari Ini',
      value: stats?.todayReports || 0,
      icon: <WarningIcon sx={{ fontSize: 24 }} />,
      color: '#3f51b5',
      trend: stats?.todayChange || 0,
      path: '/admin/reports'
    },
    {
      title: 'Total Laporan',
      value: stats?.totalReports || 0,
      icon: <AlertIcon sx={{ fontSize: 24 }} />,
      color: '#f44336',
      trend: stats?.totalReportsChange || 0,
      path: '/admin/reports'
    },
    {
      title: 'Warga Terdaftar',
      value: stats?.totalUsers || 0,
      icon: <PeopleIcon sx={{ fontSize: 24 }} />,
      color: '#4caf50',
      trend: stats?.userChange || 0,
      path: '/admin/citizens'
    },
    {
      title: 'Perangkat Aktif',
      value: stats?.activeDevices || 0,
      icon: <DashboardIcon sx={{ fontSize: 24 }} />,
      color: '#ff9800',
      trend: 0,
      path: '/admin/devices'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Modern welcome section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {loading ? 'Memuat...' : `Selamat Datang, ${user?.name?.split(' ')[0] || 'Admin'}`}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
              Panel kontrol PINTAR - Pelaporan Instant Tangkal Ancaman Rawan
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<WarningIcon />}
              onClick={() => router.push('/admin/reports')}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Lihat Laporan
            </Button>
            
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={fetchData} 
                disabled={refreshing || loading}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Modern stats cards */}
      <Grid container spacing={3} mb={3}>
        {quickStatsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: 140,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  borderColor: card.color,
                  boxShadow: `0 12px 40px ${alpha(card.color, 0.15)}`,
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
                  borderRadius: '2px 2px 0 0',
                },
              }}
              onClick={() => router.push(card.path)}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(card.color, 0.1),
                    color: card.color,
                    width: 48,
                    height: 48,
                    boxShadow: `0 4px 14px ${alpha(card.color, 0.25)}`,
                  }}
                >
                  {card.icon}
                </Avatar>
                {card.trend !== 0 && !loading && (
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      color: card.trend > 0 ? 'success.main' : 'error.main',
                      bgcolor: card.trend > 0 
                        ? alpha(theme.palette.success.main, 0.1) 
                        : alpha(theme.palette.error.main, 0.1),
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    {card.trend > 0 ? 
                      <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} /> : 
                      <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    }
                    {Math.abs(card.trend)}%
                  </Box>
                )}
              </Box>
              
              {loading ? (
                <LinearProgress sx={{ mb: 2, height: 3, borderRadius: 1.5 }} />
              ) : (
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1, fontSize: '2rem', color: theme.palette.text.primary }}>
                  {refreshing ? '-' : card.value}
                </Typography>
              )}
              
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                {card.title}
              </Typography>

              <ChevronRightIcon 
                sx={{ 
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  fontSize: 20,
                  color: alpha(card.color, 0.7),
                  transition: 'transform 0.2s ease',
                }} 
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modern dashboard content */}
      <DashboardStats useMockData={false} />
      
      {refreshing && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            }
          }}
        />
      )}
    </Box>
  );
}
