'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#6d28d9',
            contrastText: '#ffffff',
          },
          error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
          },
          warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
          info: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
          },
          success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
          },
          grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          divider: 'rgba(0, 0, 0, 0.08)',
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#6d28d9',
            contrastText: '#ffffff',
          },
          error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
          },
          warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
          info: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
          },
          success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
          },
          grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          divider: 'rgba(255, 255, 255, 0.08)',
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: ({ theme }) => ({
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: `0 8px 20px ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)'}`,
            transform: 'translateY(-2px)',
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          padding: '16px',
        }),
        head: ({ theme }) => ({
          fontWeight: 600,
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 3px 6px rgba(0, 0, 0, 0.08)',
    '0px 5px 10px rgba(0, 0, 0, 0.1)',
    '0px 7px 14px rgba(0, 0, 0, 0.1)',
    '0px 10px 20px rgba(0, 0, 0, 0.12)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 14px 28px rgba(0, 0, 0, 0.14)',
    '0px 16px 32px rgba(0, 0, 0, 0.14)',
    '0px 18px 36px rgba(0, 0, 0, 0.16)',
    '0px 20px 40px rgba(0, 0, 0, 0.16)',
    '0px 22px 44px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.18)',
    '0px 26px 52px rgba(0, 0, 0, 0.2)',
    '0px 28px 56px rgba(0, 0, 0, 0.2)',
    '0px 30px 60px rgba(0, 0, 0, 0.22)',
    '0px 32px 64px rgba(0, 0, 0, 0.22)',
    '0px 34px 68px rgba(0, 0, 0, 0.24)',
    '0px 36px 72px rgba(0, 0, 0, 0.24)',
    '0px 38px 76px rgba(0, 0, 0, 0.26)',
    '0px 40px 80px rgba(0, 0, 0, 0.26)',
    '0px 42px 84px rgba(0, 0, 0, 0.28)',
    '0px 44px 88px rgba(0, 0, 0, 0.28)',
    '0px 46px 92px rgba(0, 0, 0, 0.3)',
    '0px 48px 96px rgba(0, 0, 0, 0.3)',
  ],
});

export default function AppTheme({ children }) {
  const [mode, setMode] = useState('light');
  
  // Try to load saved theme preference on first render
  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference as fallback
      setMode('dark');
    }
  }, []);
  
  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Update theme when mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}