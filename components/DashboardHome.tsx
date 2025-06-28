import * as React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  CardContent, 
  Avatar, 
  Chip,
  Stack,
  Button,
  Divider,
  useTheme,
  alpha,
  Paper,
  Badge
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import {
  PersonOutline,
  LocationOnOutlined,
  AccessTimeOutlined,
  VerifiedOutlined,
  NotificationsActiveOutlined,
  TrendingUpOutlined,
  Dashboard as DashboardIcon,
  Description,
  History,
  Settings,
  WbSunnyOutlined,
  RocketLaunchOutlined,
  FiberManualRecordOutlined,
  ArrowForwardOutlined,
  WorkspacePremiumOutlined
} from '@mui/icons-material';

// Ultra-modern animations
const floatSmooth = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(0.5deg); }
  50% { transform: translateY(-6px) rotate(0deg); }
  75% { transform: translateY(-3px) rotate(-0.5deg); }
`;

const slideInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const slideInLeft = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-60px) scale(0.9); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) scale(1); 
  }
`;

const slideInRight = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(60px) scale(0.9); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) scale(1); 
  }
`;

const gradientFlow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const pulseRing = keyframes`
  0% { 
    transform: scale(0.33);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { text-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6); }
`;

const morphBorder = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    transform: scale(1.02);
  }
`;

interface DashboardHomeProps {
  onViewChange: (view: string) => void;
}

export default function DashboardHome({ onViewChange }: DashboardHomeProps) {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const isDark = theme.palette.mode === 'dark';

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const quickActions = [
    {
      title: 'Dashboard',
      description: 'Lihat ringkasan aktivitas',
      icon: DashboardIcon,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      action: 'dashboard',
      count: '12'
    },
    {
      title: 'Dokumen',
      description: 'Buat surat baru',
      icon: Description,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      action: 'documents',
      count: '3'
    },
    {
      title: 'Riwayat',
      description: 'Lihat pengajuan lama',
      icon: History,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      action: 'riwayat',
      count: '8'
    },
    {
      title: 'Pengaturan',
      description: 'Kelola akun Anda',
      icon: Settings,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      action: 'settings',
      count: '2'
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* ULTRA-MODERN HERO WELCOME SECTION */}
      <Paper
        elevation={0}
        sx={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.99) 50%, rgba(51, 65, 85, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 1) 50%, rgba(241, 245, 249, 0.99) 100%)',
          backdropFilter: 'blur(40px)',
          borderRadius: 6,
          border: `2px solid ${alpha(isDark ? '#3b82f6' : '#e2e8f0', 0.4)}`,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          animation: `${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1)`,
          boxShadow: isDark 
            ? '0 32px 64px -12px rgba(0, 0, 0, 0.7), 0 20px 25px -5px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : '0 32px 64px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
              `
              : `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
              `,
            animation: `${gradientFlow} 8s ease-in-out infinite`,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
            backgroundSize: '200% 100%',
            animation: `${gradientFlow} 4s ease-in-out infinite`,
          }
        }}
      >
        {/* Ultra-Modern CardContent with Enhanced Styling */}
        <CardContent 
          sx={{ 
            p: { xs: 4, md: 6, lg: 8 },
            background: 'transparent',
            position: 'relative',
            zIndex: 2,
            '&.MuiCardContent-root': {
              paddingBottom: { xs: 4, md: 6, lg: 8 },
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            },
            '&:last-child': {
              paddingBottom: { xs: 4, md: 6, lg: 8 },
            }
          }}
        >
          {/* Floating decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#3b82f6',
              animation: `${sparkle} 3s ease-in-out infinite`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 20,
                left: 15,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#8b5cf6',
                animation: `${sparkle} 3s ease-in-out infinite 1s`,
              }
            }}
          />

          <Grid container spacing={6} alignItems="center">
            {/* Left: Enhanced User Profile */}
            <Grid item xs={12} xl={9}>
              <Stack 
                direction={{ xs: 'column', lg: 'row' }} 
                spacing={6} 
                alignItems={{ xs: 'center', lg: 'flex-start' }}
              >
                {/* Revolutionary Avatar Section */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    animation: `${slideInLeft} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both`
                  }}
                >
                  {/* Animated pulse rings */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      background: isDark 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(59, 130, 246, 0.1)',
                      transform: 'translate(-50%, -50%)',
                      animation: `${pulseRing} 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      background: isDark 
                        ? 'rgba(147, 51, 234, 0.2)' 
                        : 'rgba(147, 51, 234, 0.1)',
                      transform: 'translate(-50%, -50%)',
                      animation: `${pulseRing} 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 1.5s`,
                    }}
                  />

                  {/* Main Avatar */}
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `3px solid ${theme.palette.background.paper}`,
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                          animation: `${floatSmooth} 2s ease-in-out infinite`,
                        }}
                      >
                        <VerifiedOutlined sx={{ fontSize: 20, color: 'white' }} />
                      </Box>
                    }
                  >
                    <Avatar
                      sx={{
                        width: 140,
                        height: 140,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%, #ff6b9d 100%)',
                        backgroundSize: '400% 400%',
                        animation: `${gradientFlow} 6s ease-in-out infinite, ${floatSmooth} 4s ease-in-out infinite, ${morphBorder} 8s ease-in-out infinite`,
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        border: `6px solid ${alpha(theme.palette.background.paper, 0.9)}`,
                        boxShadow: isDark
                          ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(102, 126, 234, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
                          : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 60px rgba(102, 126, 234, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <PersonOutline sx={{ fontSize: 70, color: 'white' }} />
                    </Avatar>
                  </Badge>

                  {/* Premium Badge */}
                  <Chip
                    icon={<WorkspacePremiumOutlined sx={{ fontSize: 16 }} />}
                    label="Premium User"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -10,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      height: 32,
                      px: 1,
                      boxShadow: '0 8px 16px rgba(245, 158, 11, 0.4)',
                      animation: `${floatSmooth} 3s ease-in-out infinite 0.5s`,
                      '& .MuiChip-icon': { color: 'white' },
                      zIndex: 3,
                    }}
                  />
                </Box>

                {/* Enhanced Welcome Content */}
                <Box 
                  sx={{ 
                    flex: 1, 
                    textAlign: { xs: 'center', lg: 'left' },
                    maxWidth: { xs: '100%', lg: '800px' }
                  }}
                >
                  {/* Dynamic Greeting */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      background: isDark
                        ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)'
                        : 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
                      backgroundSize: '300% 300%',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1,
                      letterSpacing: '-0.04em',
                      lineHeight: 1.1,
                      animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both, ${gradientFlow} 6s ease-in-out infinite, ${textGlow} 4s ease-in-out infinite`,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
                      textShadow: isDark ? '0 4px 20px rgba(59, 130, 246, 0.3)' : 'none',
                    }}
                  >
                    {getGreeting()}! ✨
                  </Typography>
                  
                  {/* User Name with Status */}
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems={{ xs: 'center', lg: 'flex-start', sm: 'center' }}
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        color: theme.palette.text.primary,
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both`,
                        fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Budi Santoso
                    </Typography>

                    <Chip
                      icon={<FiberManualRecordOutlined sx={{ fontSize: 12, animation: `${sparkle} 2s ease-in-out infinite` }} />}
                      label="Online"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        height: 36,
                        px: 2,
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both`,
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                  </Stack>

                  {/* Enhanced Description with Modern Typography */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      borderRadius: 4,
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      backdropFilter: 'blur(10px)',
                      animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1s both`,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        lineHeight: 1.7,
                        fontSize: { xs: '1.1rem', md: '1.4rem', lg: '1.6rem' },
                        opacity: 0.9,
                      }}
                    >
                      Selamat datang di <strong style={{ color: theme.palette.primary.main }}>platform digital terdepan</strong> Kelurahan Simokerto! 
                      Kelola semua kebutuhan administrasi Anda dengan mudah, cepat, dan efisien 
                      melalui sistem terintegrasi yang modern. 🚀
                    </Typography>
                  </Box>

                  {/* Location & Status Enhanced */}
                  <Stack 
                    direction={{ xs: 'column', md: 'row' }} 
                    spacing={2} 
                    sx={{ mb: 5 }}
                  >
                    <Chip
                      icon={<LocationOnOutlined sx={{ fontSize: 20 }} />}
                      label="Kelurahan Simokerto, Surabaya"
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: '1rem',
                        height: 48,
                        px: 3,
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s both`,
                        background: alpha(theme.palette.primary.main, 0.08),
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.15),
                          transform: 'translateY(-3px) scale(1.02)',
                          boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }
                      }}
                    />
                    
                    <Chip
                      icon={<AccessTimeOutlined sx={{ fontSize: 20 }} />}
                      label={`Terakhir login: Hari ini, ${formatTime(currentTime)}`}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1rem',
                        height: 48,
                        px: 3,
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.4s both`,
                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-3px) scale(1.02)',
                          boxShadow: '0 12px 30px rgba(99, 102, 241, 0.5)',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }
                      }}
                    />
                  </Stack>

                  {/* CTA Buttons */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<RocketLaunchOutlined />}
                      endIcon={<ArrowForwardOutlined />}
                      onClick={() => onViewChange('documents')}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                        backgroundSize: '200% 200%',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        px: 5,
                        py: 2,
                        borderRadius: 4,
                        textTransform: 'none',
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.6s both, ${gradientFlow} 4s ease-in-out infinite`,
                        boxShadow: '0 12px 30px rgba(102, 126, 234, 0.5)',
                        border: '2px solid transparent',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.05)',
                          boxShadow: '0 20px 50px rgba(102, 126, 234, 0.6)',
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }
                      }}
                    >
                      Mulai Pengajuan Sekarang
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<TrendingUpOutlined />}
                      onClick={() => onViewChange('riwayat')}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        px: 4,
                        py: 2,
                        borderRadius: 4,
                        textTransform: 'none',
                        animation: `${slideInRight} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.8s both`,
                        borderWidth: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.1),
                          transform: 'translateY(-3px)',
                          boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                    >
                      Lihat Aktivitas
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            {/* Right: Live Status Card */}
            <Grid item xs={12} xl={3}>
              <Paper
                elevation={0}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
                  backdropFilter: 'blur(30px)',
                  border: `2px solid ${alpha(isDark ? '#475569' : '#e2e8f0', 0.4)}`,
                  borderRadius: 5,
                  animation: `${slideInUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1s both`,
                  boxShadow: isDark 
                    ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 12px 25px rgba(59, 130, 246, 0.2)' 
                    : '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 25px rgba(59, 130, 246, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: isDark 
                      ? '0 35px 70px rgba(0, 0, 0, 0.6), 0 20px 35px rgba(59, 130, 246, 0.3)' 
                      : '0 35px 70px rgba(0, 0, 0, 0.2), 0 20px 35px rgba(59, 130, 246, 0.15)',
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    p: 4,
                    '&.MuiCardContent-root': {
                      paddingBottom: 4,
                    },
                    '&:last-child': {
                      paddingBottom: 4,
                    }
                  }}
                >
                  <Stack spacing={4}>
                    {/* Live Clock */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 900,
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontFamily: 'monospace',
                          mb: 1,
                          animation: `${textGlow} 3s ease-in-out infinite`,
                        }}
                      >
                        {formatTime(currentTime)}
                      </Typography>
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <WbSunnyOutlined sx={{ color: '#f59e0b', fontSize: 24 }} />
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {formatDate(currentTime)}
                        </Typography>
                      </Stack>
                    </Box>

                    <Divider sx={{ opacity: 0.4 }} />

                    {/* Status Grid */}
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: `${floatSmooth} 3s ease-in-out infinite`,
                            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                          }}
                        >
                          <AccessTimeOutlined sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Session Status
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                            Aktif & Terhubung
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: `${floatSmooth} 3s ease-in-out infinite 1s`,
                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                          }}
                        >
                          <TrendingUpOutlined sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Pengajuan Aktif
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                            12 Dokumen
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {/* Enhanced Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 4,
            color: theme.palette.text.primary,
            animation: `${slideInUp} 1s ease-out 0.5s both`,
          }}
        >
          Akses Cepat
        </Typography>

        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} lg={3} key={action.action}>
              <Paper
                elevation={0}
                onClick={() => onViewChange(action.action)}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: `1px solid ${alpha(isDark ? '#475569' : '#e2e8f0', 0.3)}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `${slideInUp} 1s ease-out ${0.7 + index * 0.1}s both`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: isDark 
                      ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 12px 25px rgba(59, 130, 246, 0.2)' 
                      : '0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 25px rgba(59, 130, 246, 0.1)',
                    '&::before': {
                      opacity: 0.1,
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: action.gradient,
                    opacity: 0.05,
                    transition: 'opacity 0.3s ease',
                  }
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: action.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                        animation: `${floatSmooth} 3s ease-in-out infinite`,
                      }}
                    >
                      <action.icon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    
                    <Chip
                      label={action.count}
                      size="small"
                      sx={{
                        background: action.gradient,
                        color: 'white',
                        fontWeight: 'bold',
                        minWidth: 32,
                        height: 24,
                      }}
                    />
                  </Box>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {action.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.5,
                    }}
                  >
                    {action.description}
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Enhanced System Status */}
      <Paper
        elevation={0}
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
          border: `1px solid ${alpha('#10b981', 0.3)}`,
          borderRadius: 4,
          animation: `${slideInUp} 1s ease-out 1.2s both`,
          backdropFilter: 'blur(20px)',
          boxShadow: isDark
            ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(16, 185, 129, 0.2)'
            : '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(16, 185, 129, 0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `${pulseGlow} 2s ease-in-out infinite`,
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
              }}
            >
              <NotificationsActiveOutlined sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#10b981', 
                  mb: 1 
                }}
              >
                🚀 Sistem Aktif & Siap Melayani
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6 
                }}
              >
                Platform digital Kelurahan Simokerto telah terintegrasi penuh dan siap memberikan 
                layanan terbaik 24/7. Akses semua fitur premium dengan sekali klik.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Paper>
    </Box>
  );
}
