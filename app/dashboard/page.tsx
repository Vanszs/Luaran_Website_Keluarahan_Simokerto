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
import SettingsPage from '../../components/SettingsPage';
import Image from 'next/image';
import { Fade, Grow, Slide, CircularProgress, Zoom, Container, Paper } from '@mui/material';

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

const modernGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15),
                0 4px 16px rgba(147, 51, 234, 0.1);
  }
  50% { 
    box-shadow: 0 12px 48px rgba(59, 130, 246, 0.25),
                0 6px 24px rgba(147, 51, 234, 0.15);
  }
`;

export default function Dashboard() {
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [selectedDocument, setSelectedDocument] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [contentVisible, setContentVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Add theme mode debugging
  React.useEffect(() => {
    console.log('Dashboard theme mode:', theme.palette.mode);
  }, [theme.palette.mode]);

  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

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
    const getModernContentWrapper = (content: React.ReactNode, TransitionComponent: any, transitionProps: any) => {
      return (
        <TransitionComponent {...transitionProps}>
          <Box
            sx={{
              background: 'transparent',
              borderRadius: 0,
              border: 'none',
              boxShadow: 'none',
              p: 0,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {content}
          </Box>
        </TransitionComponent>
      );
    };

    if (currentView === 'dashboard') {
      return getModernContentWrapper(
        <DashboardHome onViewChange={handleViewChange} />,
        Grow,
        { in: contentVisible, timeout: 800 }
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

      return getModernContentWrapper(
        content,
        Slide,
        { direction: "up", in: contentVisible, timeout: 600 }
      );
    }

    if (currentView === 'riwayat') {
      return getModernContentWrapper(
        <RiwayatPage />,
        Zoom,
        { in: contentVisible, timeout: 700 }
      );
    }
    
    if (currentView === 'settings') {
      return getModernContentWrapper(
        <SettingsPage />,
        Fade,
        { in: contentVisible, timeout: 800 }
      );
    }
    
    return null;
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box 
        sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'background-color 0.3s ease-in-out'
        }}
      >
        <SideMenu 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <AppNavbar />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            position: 'relative',
            pt: { xs: '90px', md: '90px' },
            pb: 4,
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              position: 'relative',
              zIndex: 1,
              px: { xs: 2, sm: 3, md: 4, lg: 6 },
              bgcolor: 'transparent',
            }}
          >
            <Box
              sx={{
                maxWidth: '1600px',
                mx: 'auto',
                width: '100%',
                bgcolor: 'transparent',
              }}
            >
              {renderContent()}
            </Box>
          </Container>
        </Box>
      </Box>
    </AppTheme>
  );
}
