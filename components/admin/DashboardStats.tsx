'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Avatar, 
  useTheme, 
  alpha,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useApiData } from '../../hooks/useMockApi';
import { useRouter } from 'next/navigation';

interface DashboardStatsProps {
  stats?: {
    todayReports: number;
    totalReports: number;
    totalUsers: number;
  };
  useMockData?: boolean;
}

const SimpleBarChart = ({ data, height = 80 }: { data: number[], height?: number }) => {
  const theme = useTheme();
  const max = Math.max(...data);

  return (
    <Box sx={{ height, display: 'flex', alignItems: 'flex-end', gap: '3px', mt: 2 }}>
      {data.map((value, index) => (
        <Box 
          key={index} 
          sx={{ 
            height: `${(value/max) * 100}%`,
            width: `calc(100% / ${data.length} - 4px)`,
            backgroundColor: theme.palette.primary.main,
            opacity: 0.6 + (0.4 * value / max),
            borderRadius: '3px 3px 0 0',
            transition: 'all 0.3s ease',
            '&:hover': {
              opacity: 1,
              transform: 'scaleY(1.1)',
              transformOrigin: 'bottom',
            }
          }} 
        />
      ))}
    </Box>
  );
};

export default function DashboardStats({ stats: propStats, useMockData = false }: DashboardStatsProps) {
  const theme = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { 
    data: statsData, 
    loading: statsLoading, 
    refresh: refreshStats 
  } = useApiData({
    endpoint: '/api/admin/stats',
    useMock: useMockData,
  });

  const { 
    data: recentReports, 
    loading: reportsLoading,
    refresh: refreshReports
  } = useApiData({
    endpoint: '/api/admin/reports/recent',
    useMock: useMockData,
  });

  const stats = statsData || propStats;
  
  const handleRefresh = () => {
    setRefreshing(true);
    refreshStats();
    refreshReports();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return theme.palette.warning.main;
      case 'processing': return theme.palette.info.main;
      case 'completed': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  return (
    <Box>
      {/* Modern header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ fontSize: '1.4rem' }}>
          Statistik & Aktivitas
        </Typography>
        <Tooltip title="Refresh">
          <IconButton 
            onClick={handleRefresh}
            disabled={statsLoading || refreshing}
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              width: 40,
              height: 40,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Modern stats overview */}
      <Grid container spacing={3} mb={3}>
        {/* Weekly Activity */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              height: 180, 
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                Aktivitas Mingguan
              </Typography>
              <Avatar sx={{ bgcolor: alpha('#3f51b5', 0.1), color: '#3f51b5', width: 36, height: 36 }}>
                <CalendarIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
            {statsLoading ? (
              <LinearProgress sx={{ my: 3, height: 3, borderRadius: 1.5 }} />
            ) : (
              <>
                <SimpleBarChart 
                  data={statsData?.weeklyReportCounts || [0,0,0,0,0,0,0]} 
                  height={80}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    Min
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    Sab
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        {/* Report Status */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              height: 180, 
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.05) 0%, rgba(244, 67, 54, 0.02) 100%)'
                : 'linear-gradient(135deg, rgba(244, 67, 54, 0.05) 0%, rgba(244, 67, 54, 0.02) 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha('#f44336', 0.15)}`,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                Status Laporan
              </Typography>
              <Avatar sx={{ bgcolor: alpha('#f44336', 0.1), color: '#f44336', width: 36, height: 36 }}>
                <WarningIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
            
            {statsLoading ? (
              <LinearProgress sx={{ my: 3, height: 3, borderRadius: 1.5 }} />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2.5 }}>
                {statsData?.reportsByStatus ? (
                  Object.entries(statsData.reportsByStatus).map(([status, count]) => (
                    <Box key={status} sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ fontSize: '1.8rem', mb: 1 }}>
                        {count}
                      </Typography>
                      <Chip
                        label={getStatusLabel(status)}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          bgcolor: alpha(getStatusColor(status), 0.1),
                          color: getStatusColor(status),
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada data
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Users & Devices */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              height: 180, 
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)'
                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha('#4caf50', 0.15)}`,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                Warga & Perangkat
              </Typography>
              <Avatar sx={{ bgcolor: alpha('#4caf50', 0.1), color: '#4caf50', width: 36, height: 36 }}>
                <PeopleIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
            
            {statsLoading ? (
              <LinearProgress sx={{ my: 3, height: 3, borderRadius: 1.5 }} />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2.5 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} sx={{ fontSize: '1.8rem', mb: 1 }}>
                    {stats?.totalUsers || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    Warga
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} sx={{ fontSize: '1.8rem', mb: 1 }}>
                    {stats?.activeDevices || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    Perangkat
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Modern recent reports */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <Box sx={{ 
          px: 3, 
          py: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
            Laporan Terbaru
          </Typography>
          <Button 
            endIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push('/admin/reports')}
            sx={{ 
              fontSize: '0.9rem', 
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          >
            Lihat Semua
          </Button>
        </Box>
        
        {reportsLoading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress sx={{ height: 3, borderRadius: 1.5 }} />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 2, fontSize: '0.9rem', fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ py: 2, fontSize: '0.9rem', fontWeight: 600 }}>Pelapor</TableCell>
                  <TableCell sx={{ py: 2, fontSize: '0.9rem', fontWeight: 600 }}>Alamat</TableCell>
                  <TableCell sx={{ py: 2, fontSize: '0.9rem', fontWeight: 600 }}>Waktu</TableCell>
                  <TableCell sx={{ py: 2, fontSize: '0.9rem', fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentReports && recentReports.length > 0 ? (
                  recentReports.slice(0, 5).map((report: any) => {
                    const status = report.status || 'pending';
                    return (
                    <TableRow key={report.id} hover sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) } }}>
                      <TableCell sx={{ py: 2, fontSize: '0.9rem' }}>#{report.id}</TableCell>
                      <TableCell sx={{ py: 2, fontSize: '0.9rem' }}>{report.user?.name}</TableCell>
                      <TableCell sx={{ 
                        py: 2, 
                        fontSize: '0.9rem', 
                        maxWidth: 180, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}>
                        {report.address}
                      </TableCell>
                      <TableCell sx={{ py: 2, fontSize: '0.9rem' }}>
                        {new Date(report.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={getStatusLabel(status)}
                          size="small"
                          sx={{
                            height: 28,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            backgroundColor: alpha(getStatusColor(status), 0.1),
                            color: getStatusColor(status),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                        Tidak ada laporan terbaru
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

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
