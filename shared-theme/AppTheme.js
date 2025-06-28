'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ColorModeContext } from './ColorModeSelect';

// CONSOLIDATED DESIGN TOKENS
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60a5fa' : '#2563eb',
      light: mode === 'dark' ? '#93c5fd' : '#60a5fa',
      dark: mode === 'dark' ? '#3b82f6' : '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'dark' ? '#a78bfa' : '#7c3aed',
      light: mode === 'dark' ? '#c4b5fd' : '#a78bfa',
      dark: mode === 'dark' ? '#8b5cf6' : '#6d28d9',
      contrastText: '#ffffff',
    },
    error: {
      main: mode === 'dark' ? '#f87171' : '#dc2626',
      light: mode === 'dark' ? '#fca5a5' : '#f87171',
      dark: mode === 'dark' ? '#ef4444' : '#b91c1c',
    },
    warning: {
      main: mode === 'dark' ? '#fbbf24' : '#d97706',
      light: mode === 'dark' ? '#fcd34d' : '#fbbf24',
      dark: mode === 'dark' ? '#f59e0b' : '#b45309',
    },
    success: {
      main: mode === 'dark' ? '#34d399' : '#059669',
      light: mode === 'dark' ? '#6ee7b7' : '#34d399',
      dark: mode === 'dark' ? '#10b981' : '#047857',
    },
    info: {
      main: mode === 'dark' ? '#60a5fa' : '#2563eb',
      light: mode === 'dark' ? '#93c5fd' : '#60a5fa',
      dark: mode === 'dark' ? '#3b82f6' : '#1d4ed8',
    },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f8fafc',
      paper: mode === 'dark' ? '#1e293b' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      disabled: mode === 'dark' ? '#64748b' : '#94a3b8',
    },
    divider: mode === 'dark' ? 'rgba(148, 163, 184, 0.12)' : 'rgba(15, 23, 42, 0.08)',
    action: {
      hover: mode === 'dark' ? 'rgba(60, 165, 250, 0.08)' : 'rgba(37, 99, 235, 0.04)',
      selected: mode === 'dark' ? 'rgba(60, 165, 250, 0.12)' : 'rgba(37, 99, 235, 0.08)',
      disabled: mode === 'dark' ? 'rgba(148, 163, 184, 0.3)' : 'rgba(100, 116, 139, 0.3)',
      disabledBackground: mode === 'dark' ? 'rgba(148, 163, 184, 0.12)' : 'rgba(100, 116, 139, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'dark' 
            ? 'radial-gradient(circle at 25% 25%, rgba(60, 165, 250, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)',
          minHeight: '100vh',
          transition: 'background-image 0.3s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: mode === 'dark' 
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
          '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
          },
        },
        contained: {
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          '&:hover': {
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              : 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            display: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: mode === 'dark' 
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : '1px solid rgba(15, 23, 42, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

export default function AppTheme({ children, ...props }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // PROPER INITIALIZATION WITH SYSTEM PREFERENCE
  React.useEffect(() => {
    const initializeTheme = () => {
      const savedMode = localStorage.getItem('mui-mode');
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        setMode(savedMode);
      } else {
        const systemMode = prefersDarkMode ? 'dark' : 'light';
        setMode(systemMode);
        localStorage.setItem('mui-mode', systemMode);
      }
      setIsInitialized(true);
    };

    // Small delay to prevent hydration mismatch
    const timer = setTimeout(initializeTheme, 100);
    return () => clearTimeout(timer);
  }, [prefersDarkMode]);

  // RELIABLE TOGGLE FUNCTION
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mui-mode', newMode);
      
      // Force immediate DOM update for visual feedback
      document.documentElement.setAttribute('data-theme', newMode);
      
      return newMode;
    });
  }, []);

  // CONTEXT VALUE WITH STABLE REFERENCE
  const contextValue = React.useMemo(
    () => ({
      mode: mode || 'light',
      toggleColorMode,
    }),
    [mode, toggleColorMode],
  );

  // THEME CREATION WITH MEMOIZATION
  const theme = React.useMemo(() => {
    const currentMode = mode || 'light';
    const designTokens = getDesignTokens(currentMode);
    
    return createTheme({
      ...designTokens,
      // Enhanced theme stability
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 225,
          leavingScreen: 195,
        },
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
      },
    });
  }, [mode]);

  // PREVENT HYDRATION MISMATCH
  if (!isInitialized) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #e2e8f0', 
          borderTop: '4px solid #3b82f6', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme} {...props}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}