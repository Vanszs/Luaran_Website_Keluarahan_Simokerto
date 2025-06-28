'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import { styled, keyframes } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import Image from 'next/image';
// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(1deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Ultra-modern comfortable card - same as login
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

// Comfortable background - same as login
const RegisterContainer = styled(Stack)(({ theme }) => ({
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

// Attractive branding - same as login
const BrandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(0.1), // Much much smaller gap - like single <br>
  textAlign: 'center',
  animation: `${fadeInUp} 0.6s ease-out both`,
}));

// Modern comfortable input - same as login
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

// Attractive smooth button - same as login
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

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const getStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = getStrength();
  const getColor = () => {
    if (strength < 25) return 'error';
    if (strength < 50) return 'warning';
    if (strength < 75) return 'info';
    return 'success';
  };

  const getText = () => {
    if (strength < 25) return 'Lemah';
    if (strength < 50) return 'Cukup';
    if (strength < 75) return 'Baik';
    return 'Kuat';
  };

  if (!password) return null;

  return (
    <Box sx={{ mt: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          Kekuatan kata sandi
        </Typography>
        <Typography variant="caption" color={`${getColor()}.main`} sx={{ fontSize: '0.8rem' }}>
          {getText()}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={strength}
        color={getColor() as any}
        sx={{
          height: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.08)',
        }}
      />
    </Box>
  );
};

export default function Register() {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError || confirmPasswordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
    });
  };

  const validateInputs = () => {
    const name = document.getElementById('name') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;

    let isValid = true;

    if (!name.value || name.value.length < 2) {
      setNameError(true);
      setNameErrorMessage('Nama harus diisi minimal 2 karakter.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

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
      setPasswordErrorMessage('Kata sandi harus minimal 6 karakter.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!confirmPassword.value || confirmPassword.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Konfirmasi kata sandi tidak cocok.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
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
      <AppTheme>
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
              width: 110,
              height: 110,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
              position: 'relative',
              zIndex: 1,
              p: 2,
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo Kelurahan Simokerto"
              width={70}
              height={70}
              style={{ borderRadius: '12px' }}
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
            Memuat pendaftaran...
          </Typography>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <CssBaseline />
      <RegisterContainer direction="column" justifyContent="center">
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
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Kelurahan Simokerto"
                    width={50}
                    height={50}
                    style={{ borderRadius: '8px' }}
                  />
                </Box>
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
            
            <Typography
              component="h2"
              variant="h5"
              sx={{ 
                textAlign: 'center',
                marginBottom: 0.1,
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              Daftar Akun Baru
            </Typography>

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
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nameError ? 'error' : 'primary'}
              />

              <StyledTextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
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
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthIndicator password={password} />

              <StyledTextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                name="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                color={confirmPasswordError ? 'error' : 'primary'}
              />
              
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{ mt: 2 }}
              >
                Daftar
              </StyledButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                Sudah punya akun?{' '}
                <Link
                  href="/"
                  variant="body2"
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
                  Masuk di sini
                </Link>
              </Typography>
            </Box>
          </Card>
        </Fade>
      </RegisterContainer>
    </AppTheme>
  );
}
