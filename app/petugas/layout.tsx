'use client';

import React from 'react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AppTheme from '../../shared-theme/AppTheme';

export default function PetugasLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppTheme>
        <CssBaseline />
        <ProtectedRoute allowedRoles={['petugas']}>
          {children}
        </ProtectedRoute>
      </AppTheme>
    </AuthProvider>
  );
}
