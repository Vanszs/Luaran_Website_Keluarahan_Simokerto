'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import { styled, keyframes } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Image from 'next/image';
import logoImage from './logo.png';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(0.5deg); }
`;

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

// Ultra-modern minimalist card
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2.5),
  margin: 'auto',
  borderRadius: '16px',
  border: 'none',
  background: theme.palette.mode === 'dark' ? 
    'rgba(20, 20, 20, 0.85)' : 
    'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '380px',
  },
  boxShadow: theme.palette.mode === 'dark' ? 
    '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(255, 255, 255, 0.05)' : 
    '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Ultra-clean background
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? '#0f0f0f' : '#fafbfc',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

// Clean branding
const BrandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  animation: `${fadeInUp} 0.5s ease-out both`,
}));

// Ultra-minimal input
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.04)' : 
      'rgba(0, 0, 0, 0.02)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.06)' : 
        'rgba(0, 0, 0, 0.03)',
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(0, 0, 0, 0.04)',
      transform: 'translateY(-1px)',
      boxShadow: theme.palette.mode === 'dark' ? 
        '0 4px 16px rgba(144, 202, 249, 0.2)' : 
        '0 4px 16px rgba(25, 118, 210, 0.15)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));

// Ultra-smooth button
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '14px 20px',
  fontSize: '0.95rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'none',
  background: theme.palette.mode === 'dark' ?
    'linear-gradient(135deg, #1976d2, #1565c0)' :
    'linear-gradient(135deg, #1976d2, #1565c0)',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ?
      '0 6px 20px rgba(25, 118, 210, 0.3)' :
      '0 6px 20px rgba(25, 118, 210, 0.25)',
    transform: 'translateY(-2px)',
    background: theme.palette.mode === 'dark' ?
      'linear-gradient(135deg, #1565c0, #0d47a1)' :
      'linear-gradient(135deg, #1565c0, #0d47a1)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

  const handleForgotPasswordOpen = () => {
    setOpenForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPassword(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Masukkan alamat email yang valid.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Kata sandi harus terdiri dari minimal 6 karakter.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Loading Screen
  if (isLoading) {
    return (
      <AppTheme {...props} defaultMode="light">
        <CssBaseline />
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme => theme.palette.mode === 'dark' ?
              'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' :
              'linear-gradient(135deg, #fafbfc 0%, #f0f2f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${float} 2.5s ease-in-out infinite`,
            }}
          >
            <Image
              src={logoImage}
              alt="Logo Surabaya"
              width={90}
              height={90}
              style={{
                borderRadius: '16px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))',
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              mt: 2.5,
              fontWeight: 700,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            Kelurahan Simokerto
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary', 
              mt: 0.5,
              fontSize: '0.9rem',
            }}
          >
            Memuat sistem...
          </Typography>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props} defaultMode="dark">
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <ColorModeSelect
          sx={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 10,
            backgroundColor: theme => theme.palette.mode === 'dark' ? 
              'rgba(255, 255, 255, 0.08)' : 
              'rgba(0, 0, 0, 0.04)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme => theme.palette.mode === 'dark' ? 
                'rgba(255, 255, 255, 0.12)' : 
                'rgba(0, 0, 0, 0.08)',
            },
          }}
        />

        <Fade in timeout={600}>
          <Card>
            <BrandingContainer>
              <Image
                src={logoImage}
                alt="Logo Surabaya"
                width={64}
                height={64}
                style={{
                  borderRadius: '12px',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.1,
                  marginBottom: 0,
                }}
              >
                Kelurahan Simokerto
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                }}
              >
                Kota Surabaya
              </Typography>
            </BrandingContainer>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <StyledTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                size="small"
                InputProps={{
                  sx: { 
                    py: 1.5,
                  }
                }}
              />

              <StyledTextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="Kata Sandi"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                size="small"
                InputProps={{
                  sx: { 
                    py: 1.5,
                  }
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember" 
                      color="primary" 
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      Ingat saya
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  type="button"
                  onClick={handleForgotPasswordOpen}
                  variant="body2"
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Lupa kata sandi?
                </Link>
              </Box>

              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{ mt: 2 }}
              >
                Masuk
              </StyledButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.dark',
                    },
                  }}
                >
                  Daftar di sini
                </Link>
              </Typography>
            </Box>
          </Card>
        </Fade>

        {/* Forgot Password Dialog */}
        {openForgotPassword && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={handleForgotPasswordClose}
          >
            <Card 
              sx={{
                maxWidth: 340,
                p: 3,
                m: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Reset Kata Sandi
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', fontSize: '0.9rem' }}>
                Masukkan email Anda dan kami akan mengirimkan tautan untuk reset kata sandi.
              </Typography>
              <StyledTextField
                fullWidth
                type="email"
                placeholder="Email Anda"
                sx={{ mb: 3 }}
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <StyledButton
                  variant="outlined"
                  onClick={handleForgotPasswordClose}
                  sx={{ 
                    flex: 1,
                    background: 'transparent',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.04)',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Batal
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleForgotPasswordClose}
                  sx={{ flex: 1 }}
                >
                  Kirim
                </StyledButton>
              </Box>
            </Card>
          </Box>
        )}
      </SignInContainer>
    </AppTheme>
  );
}