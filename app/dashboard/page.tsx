'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import AppNavbar from '../../components/AppNavbar';
import SideMenu from '../../components/SideMenu';
import DashboardHome from '../../components/DashboardHome';
import DocumentSelection from '../../components/DocumentSelection';
import DocumentForm from '../../components/DocumentForm';
import RiwayatPage from '../../components/RiwayatPage';
import Image from 'next/image';
import { Fade, Grow, Slide, CircularProgress, Zoom } from '@mui/material';

// Enhanced modern animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-50px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) scale(1); 
  }
`;

const slideInFromRight = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(50px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) scale(1); 
  }
`;

const scaleIn = keyframes`
  from { 
    opacity: 0; 
    transform: scale(0.8) rotate(-5deg); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) rotate(0deg); 
  }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3); }
`;

export default function Dashboard() {
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [selectedDocument, setSelectedDocument] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [contentVisible, setContentVisible] = React.useState(false);
  const theme = useTheme();

  const handleViewChange = (view: any) => {
    setContentVisible(false);
    setTimeout(() => {
      setCurrentView(view);
      if (view !== 'documents') {
        setSelectedDocument('');
      }
      setContentVisible(true);
    }, 200);
  };

  const handleDocumentSelect = (documentType: any) => {
    setSelectedDocument(documentType);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setContentVisible(true), 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Original Loading Screen
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
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${float} 2s ease-in-out infinite`,
              mb: 4,
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
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                p: 2,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo Kelurahan Simokerto"
                width={48}
                height={48}
                style={{ borderRadius: '8px' }}
              />
            </Box>
          </Box>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              textAlign: 'center',
              mb: 1,
              animation: `${fadeIn} 0.8s ease-out 0.5s both`,
            }}
          >
            Dashboard Kelurahan
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              textAlign: 'center',
              animation: `${fadeIn} 0.8s ease-out 0.7s both`,
            }}
          >
            Memuat sistem informasi...
          </Typography>
          
          <Box
            sx={{
              width: '200px',
              height: '3px',
              backgroundColor: 'divider',
              borderRadius: '2px',
              mt: 3,
              overflow: 'hidden',
              animation: `${fadeIn} 0.8s ease-out 0.9s both`,
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '100%',
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: '2px',
                animation: 'loading 1.5s ease-in-out infinite',
                '@keyframes loading': {
                  '0%': { transform: 'translateX(-100px)' },
                  '100%': { transform: 'translateX(240px)' },
                },
              }}
            />
          </Box>
        </Box>
      </AppTheme>
    );
  }

  const renderContent = () => {
    const getContentWithAnimation = (content: React.ReactNode, index: number = 0) => {
      const animations = [slideInFromLeft, slideInFromRight, scaleIn];
      const selectedAnimation = animations[index % animations.length];
      
      return (
        <Box
          sx={{
            animation: contentVisible ? `${selectedAnimation} 0.8s ease-out` : 'none',
            opacity: contentVisible ? 1 : 0,
          }}
        >
          {content}
        </Box>
      );
    };

    if (currentView === 'dashboard') {
      return (
        <Grow in={contentVisible} timeout={800}>
          <Box
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.4) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme.palette.mode === 'dark'
                  ? 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                  : 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
              },
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.3s ease',
                animation: `${glow} 2s ease-in-out infinite`,
              }
            }}
          >
            <DashboardHome onViewChange={handleViewChange} />
          </Box>
        </Grow>
      );
    }
    
    if (currentView === 'documents') {
      const content = selectedDocument ? (
        <DocumentForm 
          selectedDocument={selectedDocument} 
          onBack={() => setSelectedDocument('')}
        />
      ) : (
        <DocumentSelection onDocumentSelect={handleDocumentSelect} />
      );

      return (
        <Slide direction="up" in={contentVisible} timeout={600}>
          <Box
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.6) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(30px)',
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.3)',
              p: 4,
              minHeight: '500px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
              }
            }}
          >
            {content}
          </Box>
        </Slide>
      );
    }

    if (currentView === 'riwayat') {
      return (
        <Zoom in={contentVisible} timeout={700}>
          <Box
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
              backdropFilter: 'blur(25px)',
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              boxShadow: '0 20px 40px -10px rgba(34, 197, 94, 0.2)',
              p: 3,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: theme.palette.mode === 'dark'
                  ? 'conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.1), transparent)'
                  : 'conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.05), transparent)',
                animation: 'rotate 10s linear infinite',
                '@keyframes rotate': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
                pointerEvents: 'none',
              }
            }}
          >
            <RiwayatPage />
          </Box>
        </Zoom>
      );
    }
    
    if (currentView === 'settings') {
      return (
        <Fade in={contentVisible} timeout={800}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 16,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
              boxShadow: '0 20px 40px -10px rgba(245, 158, 11, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.1) 50%, transparent 70%)',
                animation: 'shimmer 3s ease-in-out infinite',
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%)' },
                  '50%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <CircularProgress 
                sx={{ 
                  mb: 4, 
                  color: 'warning.main',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
                size={60}
                thickness={3}
              />
              <Typography 
                variant="h4" 
                color="text.primary" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #f59e0b 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #f59e0b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Halaman Pengaturan
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  fontWeight: 400,
                  opacity: 0.8 
                }}
              >
                Fitur dalam tahap pengembangan
              </Typography>
            </Box>
          </Box>
        </Fade>
      );
    }
    
    return null;
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideMenu 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <AppNavbar />
        
        {/* Ultra-modern main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
            ml: { xs: 0 },
            pt: { xs: '90px', md: '90px' },
            px: { xs: 2, md: 4 },
            pb: 4,
            minHeight: '100vh',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.mode === 'dark'
                ? `
                  radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
                `
                : `
                  radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
                `,
              pointerEvents: 'none',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.mode === 'dark'
                ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.01) 2px, rgba(255, 255, 255, 0.01) 4px)'
                : 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.005) 2px, rgba(0, 0, 0, 0.005) 4px)',
              pointerEvents: 'none',
              zIndex: 0,
            }
          }}
        >
          <Box 
            sx={{ 
              maxWidth: '1600px', 
              mx: 'auto', 
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
