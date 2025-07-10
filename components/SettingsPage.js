'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Security,
  Notifications,
  Palette,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

// Styled components
const SectionContainer = (props) => {
  const theme = useTheme();
  return (
    <Paper
      {...props}
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)}`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(30,41,59,0.5), 0 2px 8px rgba(59,130,246,0.08)'
          : '0 8px 32px rgba(37,99,235,0.08), 0 2px 8px rgba(16,185,129,0.04)',
        ...props.sx
      }}
    />
  );
};

const StyledTextField = (props) => (
  <TextField
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
      },
      ...props.sx
    }}
  />
);

const StyledFormControl = (props) => (
  <FormControl
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
      },
      ...props.sx
    }}
  />
);

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '081234567890',
    address: 'Jl. Simokerto No. 123, Surabaya',
  });

  const [notifications, setNotifications] = useState({
    email: false,
    push: false,
    sms: false,
    statusUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    return;
  };

  const handleSecurityChange = (field) => {
    setSecurity(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header in consistent container */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: '1.5rem' }}>
          Pengaturan Akun
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
          Kelola profil dan preferensi akun Anda sebagai warga Kelurahan Simokerto
        </Typography>
      </SectionContainer>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <SectionContainer elevation={0}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Person color="primary" sx={{ fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Profil Saya
                </Typography>
              </Stack>
              <IconButton
                size="small"
                onClick={() => setIsEditing(!isEditing)}
                sx={{ 
                  width: 36, 
                  height: 36,
                  bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: theme => alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Edit sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            <Stack spacing={3}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  BS
                </Avatar>
                {isEditing && (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      borderRadius: 2,
                      fontSize: '0.8rem',
                      height: 32,
                    }}
                  >
                    Ubah Foto
                  </Button>
                )}
              </Box>

              <StyledTextField
                label="Nama Lengkap"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
              />

              <StyledTextField
                label="Email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                type="email"
              />

              <StyledTextField
                label="Nomor Telepon"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
              />

              <StyledTextField
                label="Alamat"
                value={profile.address}
                onChange={(e) => handleProfileChange('address', e.target.value)}
                disabled={!isEditing}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              {isEditing && (
                <Button
                  variant="contained"
                  startIcon={<Save sx={{ fontSize: 18 }} />}
                  onClick={handleSaveProfile}
                  sx={{ 
                    borderRadius: 2, 
                    alignSelf: 'flex-start', 
                    mt: 2,
                    height: 40,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Simpan Perubahan
                </Button>
              )}
            </Stack>
          </SectionContainer>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <SectionContainer elevation={0}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Security color="primary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Keamanan
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <StyledTextField
                label="Password Saat Ini"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                placeholder="Masukkan password saat ini"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  ),
                }}
              />

              <StyledTextField
                label="Password Baru"
                type="password"
                fullWidth
                variant="outlined"
                placeholder="Masukkan password baru"
              />

              <StyledTextField
                label="Konfirmasi Password Baru"
                type="password"
                fullWidth
                variant="outlined"
                placeholder="Konfirmasi password baru"
              />

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                color="warning"
                sx={{ 
                  borderRadius: 2, 
                  alignSelf: 'flex-start',
                  height: 40,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Ubah Password
              </Button>
            </Stack>
          </SectionContainer>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <SectionContainer elevation={0}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Notifications color="primary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Notifikasi
              </Typography>
            </Stack>

            <Box sx={{ 
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme => theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)',
                borderRadius: 2,
                backdropFilter: 'blur(2px)',
                zIndex: 1,
                pointerEvents: 'none',
              }
            }}>
              <Stack spacing={2} sx={{ opacity: 0.6 }}>
                <Tooltip 
                  title="Fitur notifikasi sedang dalam pengembangan" 
                  placement="top"
                  arrow
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        size="medium"
                        disabled
                        sx={{
                          cursor: 'not-allowed',
                          '& .MuiSwitch-track': {
                            cursor: 'not-allowed',
                          },
                          '& .MuiSwitch-thumb': {
                            cursor: 'not-allowed',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ cursor: 'not-allowed' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          Notifikasi Email
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Terima update melalui email
                        </Typography>
                      </Box>
                    }
                    sx={{ 
                      alignItems: 'flex-start',
                      cursor: 'not-allowed',
                      '&:hover': {
                        cursor: 'not-allowed',
                      },
                    }}
                  />
                </Tooltip>

                <Tooltip 
                  title="Fitur notifikasi sedang dalam pengembangan" 
                  placement="top"
                  arrow
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        size="medium"
                        disabled
                        sx={{
                          cursor: 'not-allowed',
                        }}
                      />
                    }
                    label={
                      <Box sx={{ cursor: 'not-allowed' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          Notifikasi Browser
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Notifikasi pop-up di browser
                        </Typography>
                      </Box>
                    }
                    sx={{ 
                      alignItems: 'flex-start',
                      cursor: 'not-allowed',
                    }}
                  />
                </Tooltip>

                <Tooltip 
                  title="Fitur notifikasi sedang dalam pengembangan" 
                  placement="top"
                  arrow
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        size="medium"
                        disabled
                        sx={{
                          cursor: 'not-allowed',
                        }}
                      />
                    }
                    label={
                      <Box sx={{ cursor: 'not-allowed' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          SMS Notifikasi
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Pesan singkat ke nomor telepon
                        </Typography>
                      </Box>
                    }
                    sx={{ 
                      alignItems: 'flex-start',
                      cursor: 'not-allowed',
                    }}
                  />
                </Tooltip>

                <Tooltip 
                  title="Fitur notifikasi sedang dalam pengembangan" 
                  placement="top"
                  arrow
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.statusUpdates}
                        onChange={() => handleNotificationChange('statusUpdates')}
                        size="medium"
                        disabled
                        sx={{
                          cursor: 'not-allowed',
                        }}
                      />
                    }
                    label={
                      <Box sx={{ cursor: 'not-allowed' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          Update Status Pengajuan
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Informasi progress pengajuan surat
                        </Typography>
                      </Box>
                    }
                    sx={{ 
                      alignItems: 'flex-start',
                      cursor: 'not-allowed',
                    }}
                  />
                </Tooltip>
              </Stack>
            </Box>

            {/* Development Notice */}
            <Alert 
              severity="info" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                fontSize: '0.875rem',
                background: theme => theme.palette.mode === 'dark'
                  ? 'rgba(60, 165, 250, 0.1)'
                  : 'rgba(37, 99, 235, 0.05)',
                border: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(60, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.2)'}`,
                '& .MuiAlert-message': {
                  fontSize: '0.875rem',
                }
              }}
            >
              Fitur notifikasi sedang dalam tahap pengembangan dan akan segera tersedia.
            </Alert>
          </SectionContainer>
        </Grid>

        {/* Theme Settings */}
        <Grid item xs={12} md={6}>
          <SectionContainer elevation={0}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Palette color="primary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Tampilan
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                  Tema Aplikasi
                </Typography>
                <Paper sx={{ 
                  p: 3, 
                  border: theme => `1px solid ${theme.palette.divider}`, 
                  bgcolor: theme => theme.palette.mode === 'dark'
                    ? 'rgba(15, 23, 42, 0.6)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2 
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    Gunakan toggle tema di pojok kanan atas untuk mengubah antara mode terang dan gelap
                  </Typography>
                </Paper>
              </Box>

              <Box>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                  Bahasa Interface
                </Typography>
                <StyledFormControl fullWidth>
                  <InputLabel>Pilih Bahasa</InputLabel>
                  <Select
                    value="id"
                    label="Pilih Bahasa"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    <MenuItem value="id" sx={{ fontSize: '0.875rem' }}>Bahasa Indonesia</MenuItem>
                    <MenuItem value="en" sx={{ fontSize: '0.875rem' }}>English</MenuItem>
                  </Select>
                </StyledFormControl>
              </Box>

              <Alert 
                severity="info" 
                sx={{ 
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  '& .MuiAlert-message': {
                    fontSize: '0.875rem',
                  }
                }}
              >
                Perubahan pengaturan akan diterapkan secara otomatis
              </Alert>
            </Stack>
          </SectionContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
