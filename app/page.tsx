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

// Ultra-modern comfortable card
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(3),
  margin: 'auto',
  borderRadius: '20px',
  border: 'none',
  background: theme.palette.mode === 'dark' ? 
    'rgba(20, 20, 20, 0.9)' : 
    'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '440px',
  },
  boxShadow: theme.palette.mode === 'dark' ? 
    '0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(255, 255, 255, 0.05)' : 
    '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark' ? 
      '0 16px 50px rgba(0, 0, 0, 0.5), 0 6px 16px rgba(255, 255, 255, 0.08)' : 
      '0 16px 50px rgba(0, 0, 0, 0.15), 0 6px 16px rgba(0, 0, 0, 0.06)',
  },
}));

// Comfortable background
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? '#0d1117' : '#f8fafc',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' ?
      'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)' :
      'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
    animation: `${float} 8s ease-in-out infinite`,
  },
}));

// Attractive branding
const BrandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  animation: `${fadeInUp} 0.6s ease-out both`,
}));

// Modern comfortable input
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.06)' : 
      'rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(0, 0, 0, 0.04)',
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(0, 0, 0, 0.05)',
      transform: 'translateY(-1px)',
      borderColor: theme.palette.primary.main,
      boxShadow: theme.palette.mode === 'dark' ? 
        '0 6px 20px rgba(144, 202, 249, 0.25)' : 
        '0 6px 20px rgba(25, 118, 210, 0.2)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    fontWeight: 500,
    padding: '16px 14px',
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));

// Attractive smooth button
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '14px',
  padding: '16px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'none',
  background: theme.palette.mode === 'dark' ?
    'linear-gradient(135deg, #3b82f6, #1d4ed8)' :
    'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ?
      '0 8px 25px rgba(59, 130, 246, 0.4)' :
      '0 8px 25px rgba(59, 130, 246, 0.3)',
    transform: 'translateY(-2px)',
    background: theme.palette.mode === 'dark' ?
      'linear-gradient(135deg, #1d4ed8, #1e40af)' :
      'linear-gradient(135deg, #1d4ed8, #1e40af)',
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
              'linear-gradient(135deg, #0d1117 0%, #161b22 100%)' :
              'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${float} 3s ease-in-out infinite`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                borderRadius: '50%',
                animation: `${float} 4s ease-in-out infinite reverse`,
              },
            }}
          >
            <Image
              src={logoImage}
              alt="Logo Surabaya"
              width={110}
              height={110}
              style={{
                borderRadius: '20px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              mt: 3,
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
              mt: 1,
              fontSize: '1rem',
            }}
          >
            Memuat sistem...
          </Typography>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props} defaultMode="light">
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <ColorModeSelect
          sx={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 10,
            backgroundColor: theme => theme.palette.mode === 'dark' ? 
              'rgba(255, 255, 255, 0.1)' : 
              'rgba(0, 0, 0, 0.06)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: theme => theme.palette.mode === 'dark' ? 
                'rgba(255, 255, 255, 0.15)' : 
                'rgba(0, 0, 0, 0.1)',
              transform: 'scale(1.05)',
            },
          }}
        />

        <Fade in timeout={800}>
          <Card>
            <BrandingContainer>
              <Box
                sx={{
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(2deg)',
                  },
                }}
              >
                <Image
                  src={logoImage}
                  alt="Logo Surabaya"
                  width={80}
                  height={80}
                  style={{
                    borderRadius: '16px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.1,
                  marginBottom: 0.5,
                }}
              >
                Kelurahan Simokerto
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
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
                gap: 2.5,
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
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember" 
                      color="primary" 
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent',
                          transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
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
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-1px)',
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

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  variant="body1"
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.dark',
                      transform: 'translateY(-1px)',
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
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              animation: `${fadeInUp} 0.3s ease-out`,
            }}
            onClick={handleForgotPasswordClose}
          >
            <Card 
              sx={{
                maxWidth: 380,
                p: 4,
                m: 2,
                animation: `${fadeInUp} 0.4s ease-out`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Reset Kata Sandi
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Masukkan email Anda dan kami akan mengirimkan tautan untuk reset kata sandi.
              </Typography>
              <StyledTextField
                fullWidth
                type="email"
                placeholder="Email Anda"
                sx={{ mb: 3 }}
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
                      background: theme => theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : 
                        'rgba(0,0,0,0.04)',
                      transform: 'translateY(-1px)',
                      borderColor: 'primary.main',
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