'use client';

import React from 'react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AppTheme from '../../shared-theme/AppTheme';

export default function Admin2Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppTheme>
        <CssBaseline />
        <ProtectedRoute allowedRoles={['admin2']}>
          {children}
        </ProtectedRoute>
      </AppTheme>
    </AuthProvider>
  );
}
