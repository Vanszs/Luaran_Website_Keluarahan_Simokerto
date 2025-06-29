'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import HistoryIcon from '@mui/icons-material/History';

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `
        linear-gradient(145deg, 
          rgba(255, 255, 255, 0.95) 0%, 
          rgba(248, 250, 252, 0.98) 20%,
          rgba(224, 242, 254, 0.9) 40%,
          rgba(241, 245, 249, 0.95) 60%,
          rgba(231, 229, 228, 0.9) 80%,
          rgba(254, 247, 205, 0.95) 100%
        )
      `,
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 20px 64px rgba(0, 0, 0, 0.6),
        0 12px 32px rgba(0, 0, 0, 0.4),
        0 6px 16px rgba(0, 0, 0, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.1),
        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
      `
    : `
        0 32px 80px rgba(37, 99, 235, 0.12),
        0 20px 48px rgba(16, 185, 129, 0.08),
        0 12px 24px rgba(124, 58, 237, 0.06),
        0 6px 12px rgba(37, 99, 235, 0.04),
        inset 0 2px 0 rgba(255, 255, 255, 0.9),
        inset 0 -2px 0 rgba(37, 99, 235, 0.05)
      `,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  position: 'relative',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  '&:hover': {
    transform: theme.palette.mode === 'dark' 
      ? 'translateY(-4px) scale(1.01)' 
      : 'translateY(-6px) scale(1.015)',
    boxShadow: theme.palette.mode === 'dark'
      ? `
          0 28px 80px rgba(0, 0, 0, 0.7),
          0 16px 40px rgba(0, 0, 0, 0.5),
          0 8px 20px rgba(0, 0, 0, 0.4),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 48px 120px rgba(37, 99, 235, 0.16),
          0 28px 64px rgba(16, 185, 129, 0.12),
          0 16px 32px rgba(124, 58, 237, 0.08),
          0 8px 16px rgba(37, 99, 235, 0.06),
          inset 0 2px 0 rgba(255, 255, 255, 1),
          inset 0 -2px 0 rgba(37, 99, 235, 0.08)
        `,
  },
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 50% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.6) 0%, 
          rgba(255, 255, 255, 0.3) 30%,
          rgba(255, 255, 255, 0.1) 70%,
          rgba(255, 255, 255, 0.05) 100%
        )
      `,
      borderRadius: '24px',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 3,
      left: 3,
      right: 3,
      bottom: 3,
      background: `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.4) 0%, 
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 100%
        )
      `,
      borderRadius: '21px',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
  ...(theme.palette.mode === 'dark' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0.02) 100%
        )
      `,
      borderRadius: '24px',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)'
    : `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 30%,
          rgba(224, 242, 254, 0.9) 70%,
          rgba(241, 245, 249, 0.98) 100%
        )
      `,
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.3)`
    : `3px solid rgba(37, 99, 235, 0.2)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 6px 20px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2)
      `
    : `
        0 16px 48px rgba(37, 99, 235, 0.1),
        0 8px 24px rgba(16, 185, 129, 0.06),
        0 4px 12px rgba(124, 58, 237, 0.04),
        inset 0 2px 0 rgba(255, 255, 255, 0.8),
        inset 0 -2px 0 rgba(37, 99, 235, 0.03)
      `,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: theme.palette.mode === 'dark' 
      ? 'translateY(-4px) scale(1.02)' 
      : 'translateY(-6px) scale(1.03)',
    boxShadow: theme.palette.mode === 'dark'
      ? `
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 10px 30px rgba(0, 0, 0, 0.4),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 24px 64px rgba(37, 99, 235, 0.14),
          0 12px 32px rgba(16, 185, 129, 0.08),
          0 6px 16px rgba(124, 58, 237, 0.06),
          inset 0 2px 0 rgba(255, 255, 255, 1),
          inset 0 -2px 0 rgba(37, 99, 235, 0.05)
        `,
    borderColor: theme.palette.primary.main,
  },
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '60%',
      background: `
        linear-gradient(180deg, 
          rgba(255, 255, 255, 0.6) 0%, 
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0) 100%
        )
      `,
      borderRadius: '20px 20px 0 0',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
  ...(theme.palette.mode === 'dark' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%',
      background: `
        linear-gradient(180deg, 
          rgba(255, 255, 255, 0.15) 0%, 
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0) 100%
        )
      `,
      borderRadius: '20px 20px 0 0',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '18px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
    : `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 50%,
          rgba(224, 242, 254, 0.9) 100%
        )
      `,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 4px 16px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `
    : `
        0 12px 40px rgba(37, 99, 235, 0.08),
        0 6px 20px rgba(16, 185, 129, 0.05),
        0 3px 10px rgba(124, 58, 237, 0.03),
        inset 0 2px 0 rgba(255, 255, 255, 0.7),
        inset 0 -1px 0 rgba(37, 99, 235, 0.02)
      `,
  color: theme.palette.text.primary,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: theme.palette.mode === 'dark' 
      ? 'translateY(-3px) scale(1.01)' 
      : 'translateY(-5px) scale(1.02)',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.palette.mode === 'dark'
      ? `
          0 16px 48px rgba(59, 130, 246, 0.3),
          0 8px 24px rgba(59, 130, 246, 0.2),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 20px 60px rgba(37, 99, 235, 0.12),
          0 10px 30px rgba(16, 185, 129, 0.08),
          0 5px 15px rgba(124, 58, 237, 0.05),
          inset 0 2px 0 rgba(255, 255, 255, 0.9),
          inset 0 -2px 0 rgba(37, 99, 235, 0.05)
        `,
  },
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%',
      background: `
        linear-gradient(180deg, 
          rgba(255, 255, 255, 0.5) 0%, 
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0) 100%
        )
      `,
      borderRadius: '18px 18px 0 0',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
  ...(theme.palette.mode === 'dark' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: `
        linear-gradient(180deg, 
          rgba(255, 255, 255, 0.12) 0%, 
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0) 100%
        )
      `,
      borderRadius: '18px 18px 0 0',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

export default function DashboardHome({ onViewChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  React.useEffect(() => {
    console.log('Current theme mode:', theme.palette.mode);
  }, [theme.palette.mode]);

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getStatusColor = (status) => {
    const colors = {
      selesai: isDark ? '#34d399' : '#059669',
      menunggu: isDark ? '#fbbf24' : '#d97706',
      diproses: isDark ? '#22d3ee' : '#0891b2',
      ditolak: isDark ? '#f87171' : '#dc2626',
    };
    return colors[status] || colors.menunggu;
  };

  const getStatusIcon = (status) => {
    const configs = {
      selesai: <CheckCircleIcon sx={{ fontSize: 16, color: getStatusColor(status) }} />,
      menunggu: <PendingIcon sx={{ fontSize: 16, color: getStatusColor(status) }} />,
      diproses: <TrendingUpIcon sx={{ fontSize: 16, color: getStatusColor(status) }} />,
      ditolak: <CancelIcon sx={{ fontSize: 16, color: getStatusColor(status) }} />,
    };
    return configs[status] || configs.menunggu;
  };

  const getDocumentIconColor = (type) => {
    switch (type) {
      case 'SKTM': return theme.palette.success.main;
      case 'Domisili': return theme.palette.primary.main;
      case 'SKU': return theme.palette.secondary.main;
      default: return theme.palette.text.secondary;
    }
  };

  const stats = [
    { title: 'Total Pengajuan', value: '8', icon: <DescriptionIcon />, color: theme.palette.primary.main },
    { title: 'Diproses', value: '2', icon: <PendingIcon />, color: theme.palette.warning.main },
    { title: 'Selesai', value: '5', icon: <CheckCircleIcon />, color: theme.palette.success.main },
    { title: 'Ditolak', value: '1', icon: <CancelIcon />, color: theme.palette.error.main },
  ];

  const documentHistory = [
    {
      id: 1,
      type: 'SKTM',
      fullType: 'Surat Keterangan Tidak Mampu',
      status: 'selesai',
      date: '2024-01-15',
      documentNumber: 'SKTM/001/2024',
      icon: <FamilyRestroomIcon />,
      description: 'Bantuan sosial & beasiswa'
    },
    {
      id: 2,
      type: 'Domisili',
      fullType: 'Surat Keterangan Domisili',
      status: 'diproses',
      date: '2024-01-20',
      documentNumber: 'DOM/045/2024',
      icon: <HomeWorkIcon />,
      description: 'Verifikasi tempat tinggal'
    },
    {
      id: 3,
      type: 'SKU',
      fullType: 'Surat Keterangan Usaha',
      status: 'menunggu',
      date: '2024-01-18',
      documentNumber: 'SKU/023/2024',
      icon: <BusinessIcon />,
      description: 'Legalisasi usaha'
    },
  ];

  const informationItems = [
    {
      id: 1,
      title: 'Jam Operasional',
      description: 'Sen-Jum: 08:00-15:00\nSabtu: 08:00-12:00',
      icon: <AccessTimeIcon />,
      color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
      type: 'info'
    },
    {
      id: 2,
      title: 'Persyaratan',
      description: 'Siapkan KTP, KK & dokumen pendukung',
      icon: <AssignmentIcon />,
      color: theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706',
      type: 'tip'
    },
    {
      id: 3,
      title: 'Waktu Proses',
      description: 'SKTM: 3-5 hari • Domisili: 2-3 hari\nSKU: 5-7 hari',
      icon: <SchoolIcon />,
      color: theme.palette.mode === 'dark' ? '#06b6d4' : '#0891b2',
      type: 'info'
    },
    {
      id: 4,
      title: 'Pengambilan',
      description: 'Ambil dokumen dengan tanda terima',
      icon: <HomeWorkIcon />,
      color: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
      type: 'reminder'
    },
    {
      id: 5,
      title: 'Kontak',
      description: 'WA: 0811-2345-6789\nTelp: (031) 123-4567',
      icon: <NotificationsIcon />,
      color: theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
      type: 'contact'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      p: 2,
      background: theme.palette.mode === 'dark'
        ? 'transparent'
        : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
      transition: 'background 300ms ease-in-out !important'
    }}>
      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        : `linear-gradient(135deg, #2563eb 0%, #059669 50%, #7c3aed 100%)`,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 6px 16px rgba(0, 0, 0, 0.4)'
                        : '0 8px 24px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(16, 185, 129, 0.1)',
                      border: theme.palette.mode === 'dark'
                        ? 'none'
                        : `2px solid rgba(255, 255, 255, 0.8)`,
                    }}
                  >
                    BS
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <WavingHandIcon sx={{ 
                        color: '#FFA726', 
                        fontSize: 18,
                        filter: 'drop-shadow(0 2px 4px rgba(255, 167, 38, 0.3))'
                      }} />
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.text.primary,
                        fontSize: '1.25rem',
                        textShadow: theme.palette.mode === 'dark' 
                          ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                          : '0 2px 4px rgba(37, 99, 235, 0.1)',
                      }}>
                        {getGreeting()}, Budi!
                      </Typography>
                    </Stack>
                    
                    <Typography variant="body1" sx={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      mb: 1,
                      color: theme.palette.text.secondary,
                    }}>
                      Selamat datang di layanan digital Kelurahan Simokerto
                    </Typography>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label="Warga"
                        color="primary"
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: 24,
                          px: 1,
                          background: theme.palette.mode === 'dark'
                            ? theme.palette.primary.main
                            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? 'none'
                            : '0 4px 12px rgba(37, 99, 235, 0.2)',
                        }}
                      />
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.75rem',
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}>
                        Simokerto, Surabaya
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.9) 100%)',
                    border: theme.palette.mode === 'dark'
                      ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                      : `2px solid rgba(37, 99, 235, 0.2)`,
                    backdropFilter: 'blur(10px)',
                    minWidth: 120,
                    display: { xs: 'none', md: 'block' },
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 16px rgba(59, 130, 246, 0.2)'
                      : '0 6px 20px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.primary.main,
                    fontFamily: 'monospace',
                    mb: 0.5,
                    textAlign: 'center',
                    fontSize: '1rem',
                    textShadow: theme.palette.mode === 'dark' 
                      ? 'none' 
                      : '0 1px 2px rgba(37, 99, 235, 0.2)',
                  }}>
                    {currentTime.toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'block',
                    fontSize: '0.65rem',
                  }}>
                    {currentTime.toLocaleDateString('id-ID', { 
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>

      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            mb: 2, 
            color: theme.palette.text.primary,
            textAlign: 'center',
            fontSize: '1.125rem',
            textShadow: theme.palette.mode === 'dark' 
              ? 'none' 
              : '0 2px 4px rgba(37, 99, 235, 0.1)',
          }}>
            Statistik Pengajuan Saya
          </Typography>

          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatsCard elevation={0}>
                  <CardContent sx={{ p: 2, position: 'relative', zIndex: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          background: theme.palette.mode === 'dark'
                            ? alpha(stat.color, 0.2)
                            : `linear-gradient(135deg, ${alpha(stat.color, 0.15)} 0%, ${alpha(stat.color, 0.25)} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stat.color,
                          border: theme.palette.mode === 'dark'
                            ? 'none'
                            : `2px solid ${alpha(stat.color, 0.3)}`,
                          boxShadow: theme.palette.mode === 'dark'
                            ? 'none'
                            : `0 3px 8px ${alpha(stat.color, 0.15)}`,
                        }}
                      >
                        {React.cloneElement(stat.icon, { sx: { fontSize: 20 } })}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          color: stat.color, 
                          mb: 0.25,
                          fontSize: '1.5rem',
                          textShadow: theme.palette.mode === 'dark' 
                            ? 'none' 
                            : `0 2px 4px ${alpha(stat.color, 0.2)}`,
                        }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.secondary,
                          fontSize: '0.75rem',
                        }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </SectionContainer>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionContainer elevation={0}>
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
              <Paper elevation={0} sx={{ 
                borderRadius: '16px', 
                border: theme.palette.mode === 'dark'
                  ? `2px solid rgba(148, 163, 184, 0.2)`
                  : `2px solid rgba(51, 65, 85, 0.08)`,
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.8)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
                overflow: 'hidden',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 12px 40px rgba(37, 99, 235, 0.06), 0 6px 20px rgba(16, 185, 129, 0.04)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #60a5fa 0%, #34d399 50%, #a78bfa 100%)'
                    : 'linear-gradient(90deg, #2563eb 0%, #059669 25%, #7c3aed 50%, #dc2626 75%, #d97706 100%)',
                  borderRadius: '16px 16px 0 0',
                  zIndex: 1,
                },
              }}>
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)'
                            : 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
                          animation: 'pulse 2s ease-in-out infinite',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 0 16px rgba(96, 165, 250, 0.5)'
                            : '0 0 16px rgba(37, 99, 235, 0.3)',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                            '50%': { opacity: 0.7, transform: 'scale(1.2)' },
                          }
                        }}
                      />
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.text.primary,
                        fontSize: '1.125rem',
                        textShadow: theme.palette.mode === 'dark' 
                          ? 'none' 
                          : '0 1px 2px rgba(37, 99, 235, 0.1)',
                      }}>
                        Pengajuan Terbaru Saya
                      </Typography>
                    </Stack>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<HistoryIcon sx={{ fontSize: 16 }} />}
                      onClick={() => onViewChange('riwayat')}
                      sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none', 
                        fontWeight: 600,
                        height: 36,
                        px: 2,
                        fontSize: '0.8rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Lihat Semua
                    </Button>
                  </Stack>

                  <Stack spacing={2}>
                    {documentHistory.map((doc, index) => (
                      <DocumentCard key={doc.id} elevation={0}>
                        <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 2 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 1.5,
                                  background: `linear-gradient(135deg, ${alpha(getDocumentIconColor(doc.type), 0.15)} 0%, ${alpha(getDocumentIconColor(doc.type), 0.25)} 100%)`,
                                  color: getDocumentIconColor(doc.type),
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: theme.palette.mode === 'dark'
                                    ? 'none'
                                    : `1px solid ${alpha(getDocumentIconColor(doc.type), 0.3)}`,
                                }}
                              >
                                {React.cloneElement(doc.icon, { sx: { fontSize: 18 } })}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 600,
                                  mb: 0.5, 
                                  color: theme.palette.text.primary,
                                  fontSize: '0.9rem'
                                }}>
                                  {doc.fullType}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                                  <Typography variant="body2" sx={{ 
                                    color: theme.palette.text.secondary,
                                    fontFamily: 'monospace',
                                    fontSize: '0.7rem',
                                    fontWeight: 500,
                                  }}>
                                    {doc.documentNumber}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: 2,
                                      height: 2,
                                      borderRadius: '50%',
                                      background: theme.palette.text.secondary,
                                      opacity: 0.5,
                                    }}
                                  />
                                  <Typography variant="body2" sx={{ 
                                    fontSize: '0.7rem',
                                    color: theme.palette.text.secondary,
                                  }}>
                                    {new Date(doc.date).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ 
                                  fontSize: '0.7rem',
                                  color: theme.palette.text.secondary,
                                  opacity: 0.8,
                                }}>
                                  {doc.description}
                                </Typography>
                              </Box>
                            </Stack>
                            <Chip
                              icon={getStatusIcon(doc.status)}
                              label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              sx={{ 
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                height: 28,
                                minWidth: 100,
                                borderRadius: '14px',
                                px: 1.5,
                                backgroundColor: alpha(getStatusColor(doc.status), isDark ? 0.2 : 0.15),
                                color: getStatusColor(doc.status),
                                border: `1px solid ${alpha(getStatusColor(doc.status), isDark ? 0.3 : 0.4)}`,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontWeight: 700,
                                },
                              }}
                            />
                          </Stack>
                        </CardContent>
                      </DocumentCard>
                    ))}
                  </Stack>
                </CardContent>
              </Paper>
            </CardContent>
          </SectionContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionContainer elevation={0}>
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <NotificationsIcon sx={{ 
                  fontSize: 20,
                  color: theme.palette.primary.main,
                }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: '1rem',
                }}>
                  Informasi Layanan
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                {informationItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
                    <Box 
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        background: theme.palette.mode === 'dark'
                          ? alpha(item.color, 0.1)
                          : alpha(item.color, 0.08),
                        border: theme.palette.mode === 'dark'
                          ? `1px solid ${alpha(item.color, 0.2)}`
                          : `1px solid ${alpha(item.color, 0.15)}`,
                        transition: 'all 0.2s ease',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? `0 4px 12px ${alpha(item.color, 0.2)}`
                            : `0 3px 8px ${alpha(item.color, 0.12)}`,
                        }
                      }}
                    >
                      <Stack spacing={1} sx={{ height: '100%' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 1,
                              background: alpha(item.color, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: item.color,
                              flexShrink: 0,
                            }}
                          >
                            {React.cloneElement(item.icon, { sx: { fontSize: 12 } })}
                          </Box>
                          
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 600, 
                              color: item.color,
                              fontSize: '0.75rem',
                              lineHeight: 1.2,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            fontSize: '0.65rem',
                            lineHeight: 1.3,
                            whiteSpace: 'pre-line',
                            flexGrow: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.description}
                        </Typography>

                        <Chip
                          label={
                            item.type === 'info' ? 'Info' :
                            item.type === 'tip' ? 'Tips' :
                            item.type === 'reminder' ? 'Pengingat' :
                            item.type === 'contact' ? 'Kontak' : 'Lainnya'
                          }
                          size="small"
                          sx={{
                            background: alpha(item.color, 0.15),
                            color: item.color,
                            fontWeight: 500,
                            fontSize: '0.6rem',
                            height: 16,
                            alignSelf: 'flex-start',
                            '& .MuiChip-label': {
                              px: 0.5,
                            }
                          }}
                        />
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      startIcon={<AssignmentIcon sx={{ fontSize: 12 }} />}
                      sx={{
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        height: 28,
                      }}
                    >
                      Panduan
                    </Button>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      startIcon={<NotificationsIcon sx={{ fontSize: 12 }} />}
                      sx={{
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        height: 28,
                      }}
                    >
                      Bantuan
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </SectionContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

