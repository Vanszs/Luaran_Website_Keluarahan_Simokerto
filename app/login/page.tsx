'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { styled, keyframes } from '@mui/material/styles';
import { Visibility, VisibilityOff, LockOutlined, PersonOutline } from '@mui/icons-material';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import Image from 'next/image';
import { useAuth, AuthProvider } from '../../contexts/AuthContext';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const { login } = useAuth();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    // Show success message if redirected after registration
    if (searchParams?.get('registered') === 'true') {
      setSuccessMessage('Registration successful! Your account is pending approval by an administrator.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        py: 4,
        position: 'relative',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '25vw',
            height: '25vw',
            backgroundImage: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            right: '15%',
            width: '30vw',
            height: '30vw',
            backgroundImage: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }
        }}
      />

      <Box maxWidth="sm" sx={{ position: 'relative', zIndex: 2, width: '100%', px: 3 }}>
        <MuiCard
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            animation: `${fadeIn} 0.6s ease-out`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)',
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                style={{ borderRadius: '8px' }}
              />
            </Box>
            
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                mb: 1,
              }}
            >
              PINTAR
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                mb: 2,
              }}
            >
              Pelaporan Instant Tangkal Ancaman Rawan
            </Typography>
          </Box>
          
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline sx={{ color: 'rgba(255,255,255,0.6)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: 'rgba(255,255,255,0.6)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  boxShadow: '0 15px 30px rgba(59, 130, 246, 0.6)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Need an admin account?{' '}
                <Link
                  href="/register"
                  style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  Request access
                </Link>
              </Typography>
            </Box>
          </Box>
        </MuiCard>

        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            textAlign: 'center',
            background: 'rgba(30, 41, 59, 0.7)',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} Kelurahan Simokerto • PINTAR
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSuccessMessage('')}
          sx={{ width: '100%', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const LoginPageWithProviders = () => {
  return (
    <AuthProvider>
      <AppTheme>
        <LoginPage />
      </AppTheme>
    </AuthProvider>
  );
};

export default LoginPageWithProviders;
