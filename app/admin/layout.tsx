'use client';

import React from 'react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../../components/layout/Layout';
import AppTheme from '../../shared-theme/AppTheme';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppTheme>
        <CssBaseline />
        <ProtectedRoute allowedRoles={['superadmin']}>
          <Layout>
            {children}
          </Layout>
        </ProtectedRoute>
      </AppTheme>
    </AuthProvider>
  );
}
