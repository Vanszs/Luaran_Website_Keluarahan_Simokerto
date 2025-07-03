'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Backup as BackupIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import Layout from '../../../components/layout/Layout';

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

export default function SettingsPage() {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    maintenanceMode: false,
    dataRetention: '365',
    language: 'id',
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Layout title="System Settings">
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
          System Settings
        </Typography>

        <Grid container spacing={3}>
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Notifications
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={() => handleSettingChange('emailNotifications')}
                      />
                    }
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={() => handleSettingChange('smsNotifications')}
                      />
                    }
                    label="SMS Notifications"
                  />
                </Box>
              </CardContent>
            </ModernCard>
          </Grid>

          {/* Security Settings */}
          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Security
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoBackup}
                        onChange={() => handleSettingChange('autoBackup')}
                      />
                    }
                    label="Auto Backup"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={() => handleSettingChange('maintenanceMode')}
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Box>
              </CardContent>
            </ModernCard>
          </Grid>

          {/* System Settings */}
          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorageIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Data Management
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Data Retention (days)</InputLabel>
                    <Select
                      value={settings.dataRetention}
                      label="Data Retention (days)"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="30">30 days</MenuItem>
                      <MenuItem value="90">90 days</MenuItem>
                      <MenuItem value="365">1 year</MenuItem>
                      <MenuItem value="0">Forever</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Button
                    variant="outlined"
                    startIcon={<BackupIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Create Backup Now
                  </Button>
                </Box>
              </CardContent>
            </ModernCard>
          </Grid>

          {/* Appearance Settings */}
          <Grid item xs={12} md={6}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaletteIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Appearance
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.language}
                      label="Language"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="id">Bahasa Indonesia</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Use the theme toggle in the top right corner to switch between light and dark modes.
                  </Alert>
                </Box>
              </CardContent>
            </ModernCard>
          </Grid>

          {/* System Info */}
          <Grid item xs={12}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <UpdateIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    System Information
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Version</Typography>
                    <Typography variant="h6" fontWeight={600}>v1.0.0</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Last Update</Typography>
                    <Typography variant="h6" fontWeight={600}>Jan 15, 2024</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Database Size</Typography>
                    <Typography variant="h6" fontWeight={600}>245 MB</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Active Users</Typography>
                    <Typography variant="h6" fontWeight={600}>124</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    },
                  }}
                >
                  Check for Updates
                </Button>
              </CardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
