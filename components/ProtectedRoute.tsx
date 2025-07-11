'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin1' | 'admin2' | 'petugas' | 'superadmin')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin1', 'superadmin'],
  redirectTo = '/'
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
      return;
    }
  }, [loading, user, router, redirectTo]);
  
  if (loading) {
    return <LoadingScreen message="Memverifikasi akses..." />;
  }
  
  if (!user || !allowedRoles.includes(user.role as any)) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
