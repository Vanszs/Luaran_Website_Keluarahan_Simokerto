'use client';

import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

export default function PetugasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute allowedRoles={['petugas']}>
        {children}
      </ProtectedRoute>
    </AuthProvider>
  );
}
