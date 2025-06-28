'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';

export const ColorModeContext = React.createContext({ 
  mode: 'light',
  toggleColorMode: () => {} 
});

// ENHANCED COLOR PALETTES - BEAUTIFUL GRADIENTS FOR LIGHT MODE
const getDesignTokens = (mode) => {
  console.log('Creating enhanced theme for mode:', mode);
  
  return {
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#60a5fa' : '#2563eb', // Blue
        light: mode === 'dark' ? '#93c5fd' : '#3b82f6',
        dark: mode === 'dark' ? '#1e40af' : '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'dark' ? '#34d399' : '#059669', // Emerald
        light: mode === 'dark' ? '#6ee7b7' : '#10b981',
        dark: mode === 'dark' ? '#047857' : '#065f46',
        contrastText: '#ffffff',
      },
      tertiary: {
        main: mode === 'dark' ? '#a78bfa' : '#7c3aed', // Violet
        light: mode === 'dark' ? '#c4b5fd' : '#8b5cf6',
        dark: mode === 'dark' ? '#7c3aed' : '#6d28d9',
        contrastText: '#ffffff',
      },
      error: {
        main: mode === 'dark' ? '#f87171' : '#dc2626',
        light: mode === 'dark' ? '#fca5a5' : '#ef4444',
        dark: mode === 'dark' ? '#dc2626' : '#991b1b',
        contrastText: '#ffffff',
      },
      warning: {
        main: mode === 'dark' ? '#fbbf24' : '#d97706',
        light: mode === 'dark' ? '#fcd34d' : '#f59e0b',
        dark: mode === 'dark' ? '#d97706' : '#92400e',
        contrastText: '#ffffff',
      },
      success: {
        main: mode === 'dark' ? '#34d399' : '#059669',
        light: mode === 'dark' ? '#6ee7b7' : '#10b981',
        dark: mode === 'dark' ? '#047857' : '#065f46',
        contrastText: '#ffffff',
      },
      info: {
        main: mode === 'dark' ? '#22d3ee' : '#0891b2',
        light: mode === 'dark' ? '#67e8f9' : '#06b6d4',
        dark: mode === 'dark' ? '#0891b2' : '#164e63',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc', // Light blue-gray for light mode
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
        // BEAUTIFUL GRADIENT BACKGROUNDS FOR LIGHT MODE
        gradient: mode === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
        surface1: mode === 'dark' ? '#1e293b' : '#ffffff',
        surface2: mode === 'dark' ? '#334155' : '#f1f5f9',
        surface3: mode === 'dark' ? '#475569' : '#e2e8f0',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#1e293b',
        secondary: mode === 'dark' ? '#cbd5e1' : '#475569',
        disabled: mode === 'dark' ? '#64748b' : '#94a3b8',
      },
      divider: mode === 'dark' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(51, 65, 85, 0.12)',
      action: {
        hover: mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)',
        selected: mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
        disabled: mode === 'dark' ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.26)',
        disabledBackground: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      },
      // BEAUTIFUL COLOR SCHEMES FOR LIGHT MODE
      glass: {
        primary: mode === 'dark' 
          ? 'rgba(59, 130, 246, 0.1)' 
          : 'rgba(255, 255, 255, 0.85)',
        secondary: mode === 'dark' 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(255, 255, 255, 0.75)',
        surface: mode === 'dark' 
          ? 'rgba(30, 41, 59, 0.8)' 
          : 'rgba(255, 255, 255, 0.9)',
      },
      shadow: {
        light: mode === 'dark' 
          ? '0 4px 16px rgba(0, 0, 0, 0.4)' 
          : '0 8px 32px rgba(37, 99, 235, 0.08), 0 4px 16px rgba(16, 185, 129, 0.06), 0 2px 8px rgba(124, 58, 237, 0.04)',
        medium: mode === 'dark' 
          ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
          : '0 16px 48px rgba(37, 99, 235, 0.12), 0 8px 24px rgba(16, 185, 129, 0.08), 0 4px 12px rgba(124, 58, 237, 0.06)',
        heavy: mode === 'dark' 
          ? '0 16px 64px rgba(0, 0, 0, 0.6)' 
          : '0 24px 64px rgba(37, 99, 235, 0.16), 0 12px 32px rgba(16, 185, 129, 0.12), 0 6px 16px rgba(124, 58, 237, 0.08)',
      },
    },
    spacing: 8,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 },
      h2: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3 },
      h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.3 },
      h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
      h5: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
      h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
      body1: { fontSize: '0.875rem', lineHeight: 1.6 },
      body2: { fontSize: '0.8rem', lineHeight: 1.5 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            transition: 'none !important',
          },
          'html, body, #__next, [data-nextjs-scroll-focus-boundary]': {
            transition: 'background-color 200ms ease-in-out, color 200ms ease-in-out !important',
            transitionDelay: '0ms !important',
          },
          body: {
            backgroundColor: mode === 'dark' ? '#0f172a' : '#f8fafc',
            color: mode === 'dark' ? '#f8fafc' : '#1e293b',
            // BEAUTIFUL GRADIENT BACKGROUND FOR LIGHT MODE
            background: mode === 'dark' 
              ? '#0f172a'
              : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
            backgroundAttachment: 'fixed',
          },
          '*::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#1e293b' : '#f1f5f9',
          },
          '*::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? '#475569' : '#cbd5e1',
            borderRadius: 4,
            '&:hover': {
              background: mode === 'dark' ? '#64748b' : '#94a3b8',
            }
          },
        },
      },
      // ...existing component overrides...
    },
  };
};

export default function AppTheme({ children, ...props }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initializeTheme = () => {
      const savedMode = localStorage.getItem('mui-mode');
      console.log('Saved mode from localStorage:', savedMode);
      
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        setMode(savedMode);
      } else {
        const systemMode = prefersDarkMode ? 'dark' : 'light';
        console.log('Using system preference:', systemMode);
        setMode(systemMode);
        localStorage.setItem('mui-mode', systemMode);
      }
      setIsInitialized(true);
    };
    
    initializeTheme();
  }, [prefersDarkMode]);

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      console.log('Theme switched from', prevMode, 'to', newMode);
      localStorage.setItem('mui-mode', newMode);
      return newMode;
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ mode: mode || 'light', toggleColorMode }),
    [mode, toggleColorMode],
  );

  const theme = React.useMemo(() => {
    const currentMode = mode || 'light';
    console.log('Creating theme with mode:', currentMode);
    return createTheme(getDesignTokens(currentMode));
  }, [mode]);

  if (!isInitialized) {
    return (
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', zIndex: 9999 
      }}>
        <div style={{ 
          width: '40px', height: '40px', border: '4px solid #e2e8f0', 
          borderTop: '4px solid #1d4ed8', borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
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