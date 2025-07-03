'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  useTheme,
  alpha,
  Card,
  CardContent,
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
      icon: <WarningIcon />,
      color: theme.palette.primary.main,
      description: 'Laporan yang masuk bulan ini'
    },
    {
      title: 'Rata-rata Harian',
      value: Math.round((stats?.totalReports || 0) / 30),
      icon: <AssessmentIcon />,
      color: theme.palette.secondary.main,
      description: 'Rata-rata laporan per hari'
    },
    {
      title: 'Tingkat Penyelesaian',
      value: `${Math.round(((stats?.reportsByStatus?.completed || 0) / (stats?.totalReports || 1)) * 100)}%`,
      icon: <TrendingUpIcon />,
      color: theme.palette.success.main,
      description: 'Persentase laporan selesai'
    },
    {
      title: 'Warga Aktif',
      value: stats?.activeUsers || 0,
      icon: <PeopleIcon />,
      color: theme.palette.info.main,
      description: 'Warga yang melaporkan bulan ini'
    }
  ];

  return (
    <Layout title="Statistik">
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Statistik Sistem
        </Typography>

        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {statisticsCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                          backgroundColor: alpha(card.color, 0.1),
                          color: card.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1
                        }}
                      >
                        {React.cloneElement(card.icon, { sx: { fontSize: 18 } })}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
