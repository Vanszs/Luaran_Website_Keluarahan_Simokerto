'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';

// Define proper interfaces for type safety
interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin1' | 'admin2' | 'superadmin' | 'petugas';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  registerAdmin: (data: { username: string; password: string; name: string }) => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('[AuthContext] Initial auth check started...');
        
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          credentials: 'include',
        });

        console.log('[AuthContext] Initial auth response status:', response.status);

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('[AuthContext] Initial auth data:', { 
              authenticated: data.authenticated, 
              hasUser: !!data.user,
              userRole: data.user?.role 
            });
            
            if (data.authenticated && data.user) {
              setUser(data.user);
            } else {
              console.log('[AuthContext] No valid session on initial load');
              setUser(null);
            }
          }
        } else {
          console.log('[AuthContext] Initial auth check failed with status:', response.status);
          setUser(null);
        }
      } catch (error) {
        console.error('[AuthContext] Initial auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      console.log('[AuthContext] Login attempt for user:', username);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      console.log('[AuthContext] Login response status:', response.status);

      // Check if response is ok first
      if (!response.ok) {
        // Try to get error message from response
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log('[AuthContext] Login error response:', errorData);
          throw new Error(errorData.message || 'Login gagal');
        } else {
          // If not JSON, probably an HTML error page
          const errorText = await response.text();
          console.error('[AuthContext] Non-JSON response from login API:', errorText);
          throw new Error('Terjadi kesalahan server. Silakan coba lagi.');
        }
      }

      const data = await response.json();
      console.log('[AuthContext] Login success response:', { 
        success: data.success, 
        hasUser: !!data.user,
        userRole: data.user?.role,
        hasSessionToken: !!data.sessionToken 
      });
      
      setUser(data.user);
      console.log('[AuthContext] User data set in context:', data.user);
      
      // Manually navigate based on role after successful login
      if (data.user && data.user.role) {
        console.log('[AuthContext] Navigating user to dashboard based on role:', data.user.role);
        // A slight delay to ensure cookie is properly set
        setTimeout(() => {
          if (data.user.role === 'superadmin') {
            router.push('/admin');
          } else if (data.user.role === 'admin1') {
            router.push('/dashboard');
          } else if (data.user.role === 'admin2') {
            router.push('/admin2');
          } else if (data.user.role === 'petugas') {
            router.push('/petugas');
          } else {
            router.push('/');
          }
        }, 100);
      }
      
      return data; // This will include user with role information
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      router.push('/?logout=true');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const registerAdmin = async (data: { username: string; password: string; name: string }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registrasi gagal');
        } else {
          const errorText = await response.text();
          console.error('Non-JSON response from register API:', errorText);
          throw new Error('Terjadi kesalahan server. Silakan coba lagi.');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    registerAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingScreen message="Memeriksa akses..." />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
