'use client';

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';
import { useApiData } from '../../../hooks/useMockApi';

export default function StatisticsPage() {
  const theme = useTheme();
  
  const { data: stats, loading } = useApiData({
    endpoint: '/api/admin/stats',
    useMock: false,
  });

  const statisticsCards = [
    {
      title: 'Total Laporan Bulan Ini',
      value: stats?.monthlyReports || 0,
      icon: <WarningIcon fontSize="small" />,
      color: theme.palette.primary.main,
      description: 'Laporan yang masuk bulan ini'
    },
    {
      title: 'Rata-rata Harian',
      value: Math.round((stats?.totalReports || 0) / 30),
      icon: <AssessmentIcon fontSize="small" />,
      color: theme.palette.secondary.main,
      description: 'Rata-rata laporan per hari'
    },
    {
      title: 'Tingkat Penyelesaian',
      value: `${Math.round(((stats?.reportsByStatus?.completed || 0) / (stats?.totalReports || 1)) * 100)}%`,
      icon: <TrendingUpIcon fontSize="small" />,
      color: theme.palette.success.main,
      description: 'Persentase laporan selesai'
    },
    {
      title: 'Warga Aktif',
      value: stats?.activeUsers || 0,
      icon: <PeopleIcon fontSize="small" />,
      color: theme.palette.info.main,
      description: 'Warga yang melaporkan bulan ini'
    }
  ];

  return (
    <Layout title="Statistik">
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Statistik Sistem
        </Typography>

        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {statisticsCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        backgroundColor: alpha(card.color, 0.12),
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {card.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
