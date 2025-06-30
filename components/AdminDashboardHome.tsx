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
  useTheme,
  alpha,
  Container,
  Card,
  CardActions,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  PersonOutline,
  Dashboard as DashboardIcon,
  Description,
  Settings,
  AccessTime,
  CheckCircle,
  Pending,
  ArrowForward,
  Groups,
} from '@mui/icons-material';

interface DashboardHomeProps {
  onViewChange: (view: string) => void;
}

// ENHANCED 3D SECTION CONTAINER - UNIFIED WITH OTHER COMPONENTS
const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `
        linear-gradient(145deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 20%,
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
        inset 0 2px 0 rgba(255, 255, 255, 0.1),
        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
      `
    : `
        0 32px 80px rgba(37, 99, 235, 0.12),
        0 20px 48px rgba(16, 185, 129, 0.08),
        0 12px 24px rgba(124, 58, 237, 0.06),
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
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 48px 120px rgba(37, 99, 235, 0.16),
          0 28px 64px rgba(16, 185, 129, 0.12),
          0 16px 32px rgba(124, 58, 237, 0.08),
          inset 0 2px 0 rgba(255, 255, 255, 1),
          inset 0 -2px 0 rgba(37, 99, 235, 0.08)
        `,
  },
  
  // BEAUTIFUL 3D EFFECTS
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
}));

export default function DashboardHome({ onViewChange }: DashboardHomeProps) {
  const theme = useTheme();
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

  const quickActions = [
    {
      title: "Dashboard",
      description: "Ringkasan aktivitas",
      icon: DashboardIcon,
      action: "dashboard",
      count: "4"
    },
    {
      title: "Pengajuan",
      description: "Kelola permohonan surat",
      icon: Description,
      action: "documents",
      count: "10"
    },
    {
      title: "Data Warga",
      description: "Manajemen warga",
      icon: Groups,
      action: "users",
      count: "1250"
    },
    {
      title: "Pengaturan",
      description: "Atur sistem",
      icon: Settings,
      action: "settings",
      count: "1"
    }
  ];

  const stats = [
    { title: 'Total Warga', value: '1250', icon: <Groups />, color: theme.palette.info.main },
    { title: 'Pengajuan Baru', value: '24', icon: <Description />, color: theme.palette.primary.main },
    { title: 'Diproses', value: '8', icon: <Pending />, color: theme.palette.warning.main },
    { title: 'Selesai', value: '14', icon: <CheckCircle />, color: theme.palette.success.main },
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
      {/* Professional Welcome Section */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : `linear-gradient(135deg, #2563eb 0%, #059669 50%, #7c3aed 100%)`,
                    fontSize: '2rem',
                    fontWeight: 700,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                      : '0 12px 32px rgba(37, 99, 235, 0.2), 0 6px 16px rgba(16, 185, 129, 0.1)',
                    border: theme.palette.mode === 'dark'
                      ? 'none'
                      : `3px solid rgba(255, 255, 255, 0.8)`,
                  }}
                >
                  <PersonOutline sx={{ fontSize: 40 }} />
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: 'text.primary',
                    textShadow: theme.palette.mode === 'dark' 
                      ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                      : '0 2px 4px rgba(37, 99, 235, 0.1)',
                  }}>
                    {getGreeting()}, Budi Santoso
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1rem' }}>
                    Selamat datang di portal layanan digital Kelurahan Simokerto
                  </Typography>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      label="Warga Simokerto"
                      color="primary"
                      sx={{ 
                        fontWeight: 600,
                        background: theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? 'none'
                          : '0 4px 12px rgba(37, 99, 235, 0.2)',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Terakhir login: {currentTime.toLocaleString('id-ID')}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <SectionContainer sx={{ 
                textAlign: 'center',
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.9) 100%)',
                border: theme.palette.mode === 'dark'
                  ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  : `2px solid rgba(37, 99, 235, 0.2)`,
              }}>
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                    <AccessTime sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700,
                      color: 'text.primary',
                      fontFamily: 'monospace',
                    }}>
                      {currentTime.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      })}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {currentTime.toLocaleDateString('id-ID', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </Typography>
                </CardContent>
              </SectionContainer>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>

      {/* Statistics Section */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            mb: 3,
            color: 'text.primary',
            textAlign: 'center',
            textShadow: theme.palette.mode === 'dark' 
              ? 'none' 
              : '0 2px 4px rgba(37, 99, 235, 0.1)',
          }}>
            Ringkasan Aktivitas
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <SectionContainer sx={{ 
                  height: 120,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                  }
                }}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          background: alpha(stat.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stat.color,
                        }}
                      >
                        {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          color: stat.color, 
                          mb: 0.5 
                        }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </SectionContainer>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </SectionContainer>

      {/* Quick Actions */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            mb: 3,
            color: 'text.primary',
            textAlign: 'center',
          }}>
            Akses Cepat
          </Typography>
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} lg={3} key={action.action}>
                <SectionContainer sx={{ 
                  height: 160,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                  }
                }}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'primary.main',
                        }}
                      >
                        <action.icon sx={{ fontSize: 24 }} />
                      </Box>
                      <Chip
                        label={action.count}
                        size="small"
                        color="primary"
                      />
                    </Stack>
                    
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      color: 'text.primary' 
                    }}>
                      {action.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {action.description}
                    </Typography>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<ArrowForward />}
                      onClick={() => onViewChange(action.action)}
                      sx={{ textTransform: 'none' }}
                    >
                      Buka
                    </Button>
                  </CardActions>
                </SectionContainer>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}
