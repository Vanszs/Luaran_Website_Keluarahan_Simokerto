'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Refresh as RefreshIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';
import { styled, keyframes } from '@mui/material/styles';

// Same modern styling as login
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.1)' 
    : '1px solid rgba(0, 0, 0, 0.08)',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 16px rgba(0, 0, 0, 0.2)' 
    : '0 4px 16px rgba(0, 0, 0, 0.08)',
  animation: `${fadeInUp} 0.6s ease-out both`,
}));

export default function DevicesPage() {
  const theme = useTheme();
  const [devices] = useState([
    {
      id: 1,
      name: 'Admin Desktop 1',
      type: 'desktop',
      ip: '192.168.1.101',
      status: 'online',
      lastSeen: '2024-01-15 14:30:00',
      user: 'Admin Kelurahan'
    },
    {
      id: 2,
      name: 'RT Mobile App',
      type: 'mobile',
      ip: '192.168.1.105',
      status: 'online',
      lastSeen: '2024-01-15 14:25:00',
      user: 'Admin RT'
    },
    {
      id: 3,
      name: 'Tablet Pos Ronda',
      type: 'tablet',
      ip: '192.168.1.110',
      status: 'offline',
      lastSeen: '2024-01-15 12:45:00',
      user: 'Petugas Ronda'
    },
    {
      id: 4,
      name: 'Backup Terminal',
      type: 'desktop',
      ip: '192.168.1.102',
      status: 'maintenance',
      lastSeen: '2024-01-15 10:30:00',
      user: 'System Admin'
    },
  ]);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'desktop': return <ComputerIcon />;
      case 'mobile': return <SmartphoneIcon />;
      case 'tablet': return <TabletIcon />;
      default: return <ComputerIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return theme.palette.success.main;
      case 'offline': return theme.palette.error.main;
      case 'maintenance': return theme.palette.warning.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalDevices = devices.length;

  return (
    <Layout title="Device Management">
      <Box>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          sx={{ 
            mb: 3,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Device Management
        </Typography>

        {/* Device Status Overview */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ComputerIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Total Devices
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {totalDevices}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Registered devices
                </Typography>
              </CardContent>
            </ModernCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WifiIcon sx={{ fontSize: 24, color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Online
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {onlineDevices}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active connections
                </Typography>
              </CardContent>
            </ModernCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WifiOffIcon sx={{ fontSize: 24, color: theme.palette.error.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Offline
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {totalDevices - onlineDevices}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disconnected devices
                </Typography>
              </CardContent>
            </ModernCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CircleIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Uptime
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  99.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  System availability
                </Typography>
              </CardContent>
            </ModernCard>
          </Grid>
        </Grid>

        {/* Device List */}
        <ModernCard>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ 
              p: 3, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: `1px solid ${theme.palette.divider}`
            }}>
              <Typography variant="h6" fontWeight={600}>
                Connected Devices
              </Typography>
              <Tooltip title="Refresh">
                <IconButton 
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Device</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Seen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getDeviceIcon(device.type)}
                          <Typography sx={{ ml: 1, fontWeight: 500 }}>
                            {device.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {device.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {device.ip}
                        </Typography>
                      </TableCell>
                      <TableCell>{device.user}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(device.status)}
                          size="small"
                          sx={{
                            bgcolor: alpha(getStatusColor(device.status), 0.1),
                            color: getStatusColor(device.status),
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(device.lastSeen).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </ModernCard>
      </Box>
    </Layout>
  );
}
