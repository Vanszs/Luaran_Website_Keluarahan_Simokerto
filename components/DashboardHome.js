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
import LinearProgress from '@mui/material/LinearProgress';
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

const WelcomeCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1a2332 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
  border: 'none',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '200px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 41, 59, 0.5)' 
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 41, 59, 0.3)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const ActionCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  border: `2px dashed ${theme.palette.divider}`,
  background: 'transparent',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: theme.palette.mode === 'dark' 
      ? 'rgba(25, 118, 210, 0.05)' 
      : 'rgba(25, 118, 210, 0.02)',
    transform: 'translateY(-4px)',
  },
}));

// Mock data untuk dashboard warga
const documentHistory = [
  {
    id: 1,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    status: 'approved',
    date: '2024-01-15',
    progress: 100,
    documentNumber: 'SKTM/001/2024'
  },
  {
    id: 2,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    status: 'processing',
    date: '2024-01-20',
    progress: 75,
    documentNumber: 'DOM/045/2024'
  },
  {
    id: 3,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    status: 'pending',
    date: '2024-01-18',
    progress: 30,
    documentNumber: 'SKU/023/2024'
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'success';
    case 'pending': return 'warning';
    case 'processing': return 'info';
    case 'rejected': return 'error';
    default: return 'default';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'approved': return 'Disetujui';
    case 'pending': return 'Menunggu';
    case 'processing': return 'Diproses';
    case 'rejected': return 'Ditolak';
    default: return 'Unknown';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'approved': return <CheckCircleIcon />;
    case 'pending': return <PendingIcon />;
    case 'processing': return <TrendingUpIcon />;
    case 'rejected': return <CancelIcon />;
    default: return <HistoryIcon />;
  }
};

export default function DashboardHome({ onViewChange }) {
  const stats = [
    { title: 'Total Pengajuan', value: '8', color: '#3b82f6', icon: <DescriptionIcon /> },
    { title: 'Sedang Diproses', value: '2', color: '#f59e0b', icon: <PendingIcon /> },
    { title: 'Selesai', value: '5', color: '#10b981', icon: <CheckCircleIcon /> },
    { title: 'Perlu Tindakan', value: '1', color: '#ef4444', icon: <CancelIcon /> },
  ];

  return (
    <Box sx={{ py: 1 }}>
      {/* Welcome Section */}
      <WelcomeCard sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  Selamat Datang, Budi!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Kelola pengajuan surat Anda dengan mudah di Kelurahan Simokerto
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  Pantau status pengajuan dan ajukan surat keterangan baru kapan saja
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100,
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                    B
                  </Typography>
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </WelcomeCard>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, my: 1, color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                      '&:hover': { backgroundColor: `${stat.color}25` },
                    }}
                  >
                    {stat.icon}
                  </IconButton>
                </Stack>
              </CardContent>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Recent Documents */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Pengajuan Terbaru
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<HistoryIcon />}
                  onClick={() => onViewChange('riwayat')}
                >
                  Lihat Semua
                </Button>
              </Stack>

              <Stack spacing={2}>
                {documentHistory.slice(0, 3).map((doc, index) => (
                  <DocumentCard key={doc.id}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                          <IconButton
                            sx={{
                              backgroundColor: 'primary.light',
                              color: 'primary.contrastText',
                              width: 48,
                              height: 48,
                            }}
                          >
                            <DescriptionIcon />
                          </IconButton>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {doc.fullType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              No. {doc.documentNumber} • {new Date(doc.date).toLocaleDateString('id-ID')}
                            </Typography>
                            {(doc.status === 'processing' || doc.status === 'pending') && (
                              <Box sx={{ mt: 1, mr: 2 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={doc.progress} 
                                  sx={{ height: 6, borderRadius: 3 }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {doc.progress}% selesai
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Stack>
                        <Chip
                          icon={getStatusIcon(doc.status)}
                          label={getStatusText(doc.status)}
                          color={getStatusColor(doc.status)}
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

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* New Document Action */}
            <ActionCard onClick={() => onViewChange('documents')}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <IconButton
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    mb: 2,
                    '&:hover': { backgroundColor: 'primary.dark', transform: 'scale(1.1)' },
                  }}
                >
                  <AddIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Ajukan Surat Baru
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Buat pengajuan surat keterangan sesuai kebutuhan Anda
                </Typography>
              </CardContent>
            </ActionCard>

            {/* Information Card */}
            <Card sx={{ borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <NotificationsIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informasi Penting
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Surat SKTM telah selesai
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Dapat diambil di kantor kelurahan
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Dokumen pendukung diperlukan
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Untuk pengajuan Surat Keterangan Usaha
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Jam pelayanan diperpanjang
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sekarang buka hingga pukul 16:00
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
