'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'superadmin' | 'petugas')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin', 'superadmin'],
  redirectTo = '/'
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
      return;
    }
    
    if (!loading && user && !allowedRoles.includes(user.role)) {
      if (user.role === 'superadmin' && window.location.pathname.includes('/dashboard')) {
        router.push('/admin');
        return;
      }
      
      if (user.role === 'admin' && window.location.pathname.includes('/admin/manage-admins')) {
        router.push('/dashboard');
        return;
      }
    }
  }, [loading, user, allowedRoles, router]);
  
  if (loading) {
    return <LoadingScreen message="Memverifikasi akses..." />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
