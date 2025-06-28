'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';

const WelcomeCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.2)'
    : '0 8px 32px rgba(148, 163, 184, 0.1)',
  position: 'relative',
  overflow: 'hidden',
}));

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.1)'
    : '0 4px 20px rgba(148, 163, 184, 0.06)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(0, 0, 0, 0.2)'
      : '0 8px 30px rgba(148, 163, 184, 0.12)',
  },
}));

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '10px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.6)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: `2px dashed ${theme.palette.divider}`,
  background: 'transparent',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: theme.palette.mode === 'dark'
      ? 'rgba(59, 130, 246, 0.05)'
      : 'rgba(59, 130, 246, 0.02)',
    transform: 'translateY(-2px)',
  },
}));

const documentHistory = [
  {
    id: 1,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    status: 'selesai',
    date: '2024-01-15',
    documentNumber: 'SKTM/001/2024'
  },
  {
    id: 2,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    status: 'diproses',
    date: '2024-01-20',
    documentNumber: 'DOM/045/2024'
  },
  {
    id: 3,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    status: 'menunggu',
    date: '2024-01-18',
    documentNumber: 'SKU/023/2024'
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'selesai': return 'success';
    case 'menunggu': return 'warning';
    case 'diproses': return 'info';
    case 'ditolak': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'selesai': return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    case 'menunggu': return <PendingIcon sx={{ fontSize: 16 }} />;
    case 'diproses': return <TrendingUpIcon sx={{ fontSize: 16 }} />;
    case 'ditolak': return <CancelIcon sx={{ fontSize: 16 }} />;
    default: return <HistoryIcon sx={{ fontSize: 16 }} />;
  }
};

export default function DashboardHome({ onViewChange }) {
  const stats = [
    { title: 'Total Pengajuan', value: '8', icon: <DescriptionIcon />, color: '#3b82f6' },
    { title: 'Sedang Diproses', value: '2', icon: <PendingIcon />, color: '#f59e0b' },
    { title: 'Selesai', value: '5', icon: <CheckCircleIcon />, color: '#10b981' },
    { title: 'Ditolak', value: '1', icon: <CancelIcon />, color: '#ef4444' },
  ];

  return (
    <Box sx={{ py: 2 }}>
      {/* Welcome Section */}
      <WelcomeCard sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 1.5,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo Kelurahan Simokerto"
                width={36}
                height={36}
                style={{ borderRadius: '6px' }}
              />
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Selamat Datang, Budi Santoso
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Kelola pengajuan surat Anda di Kelurahan Simokerto
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Terakhir login: Hari ini, 10:30
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Simokerto, Surabaya
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </WelcomeCard>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      background: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Documents */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: '12px', 
            border: '1px solid', 
            borderColor: 'divider', 
            boxShadow: 'none',
          }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Pengajuan Terbaru
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<HistoryIcon />}
                  onClick={() => onViewChange('riwayat')}
                  sx={{ borderRadius: '8px', textTransform: 'none' }}
                >
                  Lihat Semua
                </Button>
              </Stack>

              <Stack spacing={2}>
                {documentHistory.map((doc) => (
                  <DocumentCard key={doc.id}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '8px',
                              background: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {doc.fullType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {doc.documentNumber} • {new Date(doc.date).toLocaleDateString('id-ID')}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip
                          icon={getStatusIcon(doc.status)}
                          label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          color={getStatusColor(doc.status)}
                          size="small"
                          variant="filled"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>
                    </CardContent>
                  </DocumentCard>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Info */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Quick Action */}
            <QuickActionCard onClick={() => onViewChange('documents')}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    mb: 2,
                    '&:hover': { 
                      backgroundColor: 'primary.dark',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <AddIcon sx={{ fontSize: 28 }} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Ajukan Surat Baru
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Buat pengajuan surat keterangan sesuai kebutuhan
                </Typography>
              </CardContent>
            </QuickActionCard>

            {/* Information Card */}
            <Card sx={{ borderRadius: '12px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <NotificationsIcon color="primary" sx={{ fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Pengumuman
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Surat SKTM telah selesai
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Dapat diambil mulai besok di kantor kelurahan
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Persyaratan dokumen baru
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Mohon lengkapi scan KTP untuk pengajuan SKU
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Jam pelayanan
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Senin - Jumat: 08:00 - 15:00 WIB
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
