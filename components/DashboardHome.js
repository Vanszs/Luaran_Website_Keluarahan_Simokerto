'use client';

import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
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
import { useTheme, alpha } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 50%, rgba(241, 245, 249, 0.98) 100%)',
  backdropFilter: 'blur(30px)',
  borderRadius: '24px',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)'
      : '0 25px 50px rgba(0, 0, 0, 0.12), 0 12px 24px rgba(0, 0, 0, 0.06)',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(0, 0, 0, 0.4)'
      : '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
  backdropFilter: 'blur(20px)',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.6) 50%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.4),
    transform: 'translateX(8px) translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 12px 32px rgba(0, 0, 0, 0.4), 0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`
      : `0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '1px',
    background: `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.4)} 20%, ${alpha(theme.palette.secondary.main, 0.4)} 80%, transparent 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  }
}));

export default function DashboardHome({ onViewChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Log theme mode for debugging
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
      icon: <FamilyRestroomIcon />
    },
    {
      id: 2,
      type: 'Domisili',
      fullType: 'Surat Keterangan Domisili',
      status: 'diproses',
      date: '2024-01-20',
      documentNumber: 'DOM/045/2024',
      icon: <HomeWorkIcon />
    },
    {
      id: 3,
      type: 'SKU',
      fullType: 'Surat Keterangan Usaha',
      status: 'menunggu',
      date: '2024-01-18',
      documentNumber: 'SKU/023/2024',
      icon: <BusinessIcon />
    },
  ];

  const informationItems = [
    {
      id: 1,
      title: 'Jam Pelayanan',
      description: 'Senin - Jumat: 08:00 - 15:00 WIB\nSabtu: 08:00 - 12:00 WIB\nMinggu & Hari Libur: Tutup',
      icon: <AccessTimeIcon />,
      color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
      type: 'info'
    },
    {
      id: 2,
      title: 'Dokumen Persyaratan',
      description: 'Pastikan KTP, KK, dan dokumen pendukung sudah disiapkan sebelum mengajukan surat',
      icon: <AssignmentIcon />,
      color: theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706',
      type: 'tip'
    },
    {
      id: 3,
      title: 'Estimasi Waktu Proses',
      description: 'SKTM: 3-5 hari kerja\nDomisili: 2-3 hari kerja\nSKU: 5-7 hari kerja\nSKCK: 1-2 hari kerja',
      icon: <SchoolIcon />,
      color: theme.palette.mode === 'dark' ? '#06b6d4' : '#0891b2',
      type: 'info'
    },
    {
      id: 4,
      title: 'Pengambilan Dokumen',
      description: 'Dokumen yang sudah jadi dapat diambil langsung di kantor kelurahan dengan membawa tanda terima',
      icon: <HomeWorkIcon />,
      color: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
      type: 'reminder'
    },
    {
      id: 5,
      title: 'Kontak Darurat',
      description: 'WhatsApp: 0811-2345-6789\nTelepon: (031) 123-4567\nEmail: info@simokerto.surabaya.go.id',
      icon: <NotificationsIcon />,
      color: theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
      type: 'contact'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      p: 2,
      transition: 'background-color 0.3s ease-in-out'
    }}>
      {/* Compact Welcome Section - Centered */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
                {/* Left: Compact Avatar + Greeting */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    BS
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <WavingHandIcon sx={{ color: '#FFA726', fontSize: 20 }} />
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.text.primary,
                        fontSize: '1.5rem'
                      }}>
                        {getGreeting()}, Budi!
                      </Typography>
                    </Stack>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 500,
                      mb: 1
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
                          fontSize: '0.75rem',
                          height: 24,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Simokerto, Surabaya
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Right: Compact Time Display */}
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    backdropFilter: 'blur(10px)',
                    minWidth: 140,
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.primary.main,
                    fontFamily: 'monospace',
                    mb: 0.25,
                    textAlign: 'center',
                    fontSize: '1rem'
                  }}>
                    {currentTime.toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontWeight: 500,
                    textAlign: 'center',
                    display: 'block',
                    fontSize: '0.7rem'
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

      {/* Statistics Section */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: theme.palette.text.primary,
            textAlign: 'center'
          }}>
            Statistik Pengajuan Saya
          </Typography>

          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatsCard elevation={0}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: alpha(stat.color, 0.15),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stat.color,
                        }}
                      >
                        {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 0.5 }}>
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
        </CardContent>
      </SectionContainer>

      {/* Enhanced Recent Documents & Information Section */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Recent Documents Section with Modern Borders */}
            <Grid item xs={12} lg={8}>
              <Paper elevation={0} sx={{ 
                borderRadius: 3, 
                border: `2px solid ${alpha(theme.palette.divider, 0.15)}`, 
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.7)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(25px)',
                mb: 3,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  borderRadius: '3px 3px 0 0',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          animation: 'pulse 2s ease-in-out infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                            '50%': { opacity: 0.7, transform: 'scale(1.2)' },
                          }
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
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
                        fontSize: '0.875rem',
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

                  <Stack spacing={3}>
                    {documentHistory.map((doc, index) => (
                      <DocumentCard key={doc.id} elevation={0}>
                        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={3} alignItems="center" sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 3,
                                  background: `linear-gradient(135deg, ${alpha(getDocumentIconColor(doc.type), 0.15)} 0%, ${alpha(getDocumentIconColor(doc.type), 0.25)} 100%)`,
                                  color: getDocumentIconColor(doc.type),
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -2,
                                    left: -2,
                                    right: -2,
                                    bottom: -2,
                                    borderRadius: 3,
                                    background: `linear-gradient(135deg, ${getDocumentIconColor(doc.type)}, transparent)`,
                                    opacity: 0.2,
                                    zIndex: -1,
                                  }
                                }}
                              >
                                {React.cloneElement(doc.icon, { sx: { fontSize: 24 } })}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 700, 
                                  mb: 0.5, 
                                  color: theme.palette.text.primary,
                                  fontSize: '1rem'
                                }}>
                                  {doc.fullType}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <Typography variant="body2" sx={{ 
                                    color: theme.palette.text.secondary,
                                    fontFamily: 'monospace',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                  }}>
                                    {doc.documentNumber}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: 4,
                                      height: 4,
                                      borderRadius: '50%',
                                      background: theme.palette.text.secondary,
                                      opacity: 0.5,
                                    }}
                                  />
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                    {new Date(doc.date).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Stack>
                            <Chip
                              icon={getStatusIcon(doc.status)}
                              label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              color={getStatusColor(doc.status)}
                              size="small"
                              sx={{ 
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                height: 28,
                                minWidth: 100,
                                borderRadius: '14px',
                                px: 2,
                                '& .MuiChip-label': {
                                  px: 1,
                                },
                                '& .MuiChip-icon': {
                                  fontSize: 14,
                                }
                              }}
                            />
                          </Stack>
                        </CardContent>
                      </DocumentCard>
                    ))}
                  </Stack>
                </CardContent>
              </Paper>
            </Grid>

            {/* Enhanced Information Section */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={0} sx={{ 
                borderRadius: 3, 
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.6)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <NotificationsIcon sx={{ fontSize: 22, color: theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      Informasi & Panduan
                    </Typography>
                  </Stack>

                  <Stack spacing={3}>
                    {informationItems.map((item) => (
                      <Box 
                        key={item.id}
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: theme.palette.mode === 'dark'
                            ? alpha(item.color, 0.08)
                            : alpha(item.color, 0.05),
                          border: `1px solid ${alpha(item.color, 0.2)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 20px ${alpha(item.color, 0.15)}`,
                          }
                        }}
                      >
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background: alpha(item.color, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: item.color,
                              flexShrink: 0,
                              mt: 0.25,
                            }}
                          >
                            {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                          </Box>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontWeight: 700, 
                                color: item.color,
                                mb: 1,
                                fontSize: '0.875rem'
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                fontSize: '0.8rem',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-line'
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Type indicator */}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                          <Chip
                            label={
                              item.type === 'info' ? 'Informasi' :
                              item.type === 'tip' ? 'Tips' :
                              item.type === 'reminder' ? 'Pengingat' :
                              item.type === 'contact' ? 'Kontak' : 'Lainnya'
                            }
                            size="small"
                            sx={{
                              background: alpha(item.color, 0.15),
                              color: item.color,
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              height: 22,
                              '& .MuiChip-label': {
                                px: 1.5,
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  {/* Quick Action Buttons */}
                  <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        startIcon={<AssignmentIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          height: 36,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          }
                        }}
                      >
                        Panduan Lengkap
                      </Button>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        startIcon={<NotificationsIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          height: 36,
                          background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                          }
                        }}
                      >
                        Hubungi Admin
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}
