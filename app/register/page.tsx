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
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import { styled, keyframes } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import Image from 'next/image';
import logoImage from '../logo.png';

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

// Modern minimalist card
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  margin: 'auto',
  borderRadius: '16px',
  border: 'none',
  background: theme.palette.mode === 'dark' ? 
    'rgba(18, 18, 18, 0.8)' : 
    'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '440px',
  },
  boxShadow: theme.palette.mode === 'dark' ? 
    '0 10px 40px rgba(0, 0, 0, 0.3)' : 
    '0 10px 40px rgba(0, 0, 0, 0.1)',
  animation: `${fadeInUp} 0.6s ease-out`,
}));

// Clean background container
const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f7f9fc',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

// Minimalist branding
const BrandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

// Modern minimal input
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.05)' : 
      'rgba(0, 0, 0, 0.02)',
    transition: 'all 0.2s ease',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(0, 0, 0, 0.05)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

// Clean, modern button
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  padding: '12px',
  fontSize: '0.95rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s ease',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },
}));

// Minimal divider
const OrDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  opacity: 0.6,
  '&::before, &::after': {
    borderColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(0, 0, 0, 0.1)',
  },
  color: theme.palette.text.secondary,
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
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Kekuatan kata sandi
        </Typography>
        <Typography variant="caption" color={`${getColor()}.main`}>
          {getText()}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={strength}
        color={getColor() as any}
        sx={{
          height: 3,
          borderRadius: 3,
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      />
    </Box>
  );
};

export default function Register(props: { disableCustomTheme?: boolean }) {
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
      <AppTheme {...props} defaultMode="dark">
        <CssBaseline />
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme => theme.palette.mode === 'dark' ?
              'linear-gradient(135deg, #101010 0%, #1a1a1a 100%)' :
              'linear-gradient(135deg, #f7f9fc 0%, #e6eef7 100%)',
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
            }}
          >
            <Image
              src={logoImage}
              alt="Logo Surabaya"
              width={100}
              height={100}
              style={{
                borderRadius: '16px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              fontWeight: 700,
              color: theme => theme.palette.mode === 'dark' ? '#fff' : '#333',
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
            }}
          >
            Memuat pendaftaran...
          </Typography>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props} defaultMode="dark">
      <CssBaseline />
      <RegisterContainer direction="column" justifyContent="center">
        <ColorModeSelect sx={{ 
          position: 'fixed', 
          top: '1.5rem', 
          right: '1.5rem', 
          zIndex: 10,
          backgroundColor: theme => theme.palette.mode === 'dark' ? 
            'rgba(255, 255, 255, 0.05)' : 
            'rgba(0, 0, 0, 0.05)',
          borderRadius: '50%',
        }} />
        
        <Fade in timeout={800}>
          <Card>
            <BrandingContainer>
              <Image
                src={logoImage}
                alt="Logo Surabaya"
                width={70}
                height={70}
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
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Kelurahan Simokerto
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Kota Surabaya
              </Typography>
            </BrandingContainer>
            
            <Typography
              component="h2"
              variant="h6"
              sx={{ 
                textAlign: 'center',
                marginBottom: 3,
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
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

            <OrDivider>atau</OrDivider>

            <StyledButton
              fullWidth
              variant="outlined"
              onClick={() => window.location.href = '/'}
              sx={{ 
                borderWidth: 1,
                '&:hover': {
                  borderWidth: 1,
                },
              }}
            >
              Masuk ke Akun
            </StyledButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Sudah punya akun?{' '}
                <Link
                  href="/"
                  variant="body2"
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
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
