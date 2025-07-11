'use client';

import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Admin2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute allowedRoles={['admin2']}>
        {children}
      </ProtectedRoute>
    </AuthProvider>
  );
}
