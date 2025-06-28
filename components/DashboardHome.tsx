import * as React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Stack,
  IconButton,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import {
  AccountCircle,
  LocationOn,
  AccessTime,
  Verified,
  NotificationsActive,
  TrendingUp,
  Dashboard as DashboardIcon,
  Description,
  History,
  Settings,
  WbSunny,
  Schedule
} from '@mui/icons-material';

// Modern animations
const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const slideInLeft = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-40px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

interface DashboardHomeProps {
  onViewChange: (view: string) => void;
}

export default function DashboardHome({ onViewChange }: DashboardHomeProps) {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
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

  const quickActions = [
    {
      title: 'Dashboard',
      description: 'Lihat ringkasan aktivitas',
      icon: DashboardIcon,
      color: '#3b82f6',
      action: 'dashboard'
    },
    {
      title: 'Dokumen',
      description: 'Buat surat baru',
      icon: Description,
      color: '#10b981',
      action: 'documents'
    },
    {
      title: 'Riwayat',
      description: 'Lihat pengajuan lama',
      icon: History,
      color: '#f59e0b',
      action: 'riwayat'
    },
    {
      title: 'Pengaturan',
      description: 'Kelola akun Anda',
      icon: Settings,
      color: '#8b5cf6',
      action: 'settings'
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Modern Header Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          animation: `${fadeInUp} 0.8s ease-out`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
              : 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* User Info Section */}
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={3} alignItems="center">
              {/* Enhanced Avatar */}
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    animation: `${float} 3s ease-in-out infinite`,
                    border: `3px solid ${alpha(theme.palette.background.paper, 0.8)}`,
                  }}
                >
                  <AccountCircle sx={{ fontSize: 50, color: 'white' }} />
                </Avatar>
                <Chip
                  icon={<Verified sx={{ fontSize: 16 }} />}
                  label="Verified"
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }}
                />
              </Box>

              {/* Welcome Text */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1,
                    letterSpacing: '-0.02em',
                    animation: `${slideInLeft} 0.8s ease-out 0.2s both`,
                  }}
                >
                  Selamat Datang! 👋
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 0.5,
                    animation: `${slideInLeft} 0.8s ease-out 0.4s both`,
                  }}
                >
                  Budi Santoso
                </Typography>

                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip
                    icon={<LocationOn sx={{ fontSize: 16 }} />}
                    label="Kelurahan Simokerto, Surabaya"
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      animation: `${slideInLeft} 0.8s ease-out 0.6s both`,
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  />
                </Stack>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    maxWidth: 600,
                    lineHeight: 1.6,
                    animation: `${slideInLeft} 0.8s ease-out 0.8s both`,
                  }}
                >
                  Sistem informasi digital untuk mengelola pengajuan dokumen dan surat-menyurat 
                  dengan mudah dan efisien. Nikmati layanan digital terpadu Kelurahan Simokerto.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Status & Time Section */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                animation: `${slideInLeft} 0.8s ease-out 1s both`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WbSunny sx={{ color: '#f59e0b', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(currentTime)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                    <Typography variant="h6" fontWeight={600}>
                      {formatTime(currentTime)}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ color: '#10b981', fontSize: 16 }} />
                    <Typography variant="body2" color="text.secondary">
                      Terakhir login: Hari ini, 10:30
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUp sx={{ color: '#ef4444', fontSize: 16 }} />
                    <Typography variant="body2" color="text.secondary">
                      Status: Aktif
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: 'text.primary',
            animation: `${fadeInUp} 0.8s ease-out 0.5s both`,
          }}
        >
          Akses Cepat
        </Typography>

        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={action.action}>
              <Card
                onClick={() => onViewChange(action.action)}
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(action.color, 0.2)}`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `${fadeInUp} 0.8s ease-out ${0.7 + index * 0.1}s both`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 20px 40px ${alpha(action.color, 0.3)}`,
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
                    background: `linear-gradient(135deg, ${alpha(action.color, 0.1)} 0%, ${alpha(action.color, 0.05)} 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }
                }}
              >
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: `0 8px 24px ${alpha(action.color, 0.3)}`,
                        animation: `${pulse} 2s ease-in-out infinite`,
                      }}
                    >
                      <action.icon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                  </Box>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    {action.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.4,
                    }}
                  >
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Notification Alert */}
      <Card
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
          border: `1px solid ${alpha('#10b981', 0.2)}`,
          animation: `${fadeInUp} 0.8s ease-out 1.2s both`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <NotificationsActive 
              sx={{ 
                color: '#10b981', 
                fontSize: 24,
                animation: `${pulse} 2s ease-in-out infinite`,
              }} 
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#10b981', mb: 0.5 }}>
                Sistem Aktif & Terhubung
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Semua layanan digital Kelurahan Simokerto siap melayani Anda 24/7. 
                Gunakan menu navigasi untuk mengakses berbagai layanan yang tersedia.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
