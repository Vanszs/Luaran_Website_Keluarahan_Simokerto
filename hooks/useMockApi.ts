'use client';

import { useState, useCallback, useEffect } from 'react';

export interface Submission {
  id: string;
  templateId: string;
  title: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  submittedAt?: string;
  processedAt?: string;
  submittedBy: string;
  documentNumber?: string;
  data: Record<string, any>;
  notes?: string;
  mode?: 'Online' | 'Offline';
}

export interface Template {
  id: string;
  kategori: string;
  name: string;
}

export interface User {
  id: string;
  nama: string;
  nik: string;
  email: string;
  phone: string;
  rt: string;
  rw: string;
  status: 'Aktif' | 'Nonaktif';
}

export const useMockApi = () => {
  // Ini adalah mock untuk integrasi dengan database MySQL nantinya
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'SUB001',
      templateId: 'daftar_warga',
      title: 'Pendaftaran Warga Baru',
      status: 'pending',
      submittedAt: '2023-08-15T09:30:00Z',
      submittedBy: 'Ahmad Rizky',
      data: {
        nama: 'Ahmad Rizky',
        alamat: 'Jl. Simokerto No. 15, Surabaya',
        telp: '082345678901'
      },
      mode: 'Online'
    },
    {
      id: 'SUB002',
      templateId: 'laporan_maling',
      title: 'Laporan Maling',
      status: 'approved',
      submittedAt: '2023-08-14T14:20:00Z',
      processedAt: '2023-08-14T15:45:00Z',
      submittedBy: 'Siti Aminah',
      documentNumber: 'LPR/001/VIII/2023',
      data: {
        lokasi: 'Jl. Melati No. 10, RT 003/RW 002',
        waktu: '14:15:00',
        keterangan: 'Maling sepeda di halaman rumah'
      },
      mode: 'Offline'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR001',
      nama: 'Budi Santoso',
      nik: '3578123456789001',
      email: 'budi@example.com',
      phone: '081234567890',
      rt: '03',
      rw: '02',
      status: 'Aktif',
    },
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    { id: 'TMP001', kategori: 'Domisili', name: 'domisili.docx' },
    { id: 'TMP002', kategori: 'Usaha', name: 'usaha.docx' },
  ]);

  const refreshSubmissions = useCallback(async () => {
    // Simulasi API fetch - nantinya akan diganti dengan fetch dari endpoint MySQL
    console.log('Refreshing submissions data...');
    return Promise.resolve();
  }, []);

  const approveSubmission = useCallback(async (id: string, noSurat: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id 
        ? { 
            ...sub, 
            status: 'approved', 
            documentNumber: noSurat, 
            processedAt: new Date().toISOString() 
          } 
        : sub
    ));
    return Promise.resolve();
  }, []);

  const rejectSubmission = useCallback(async (id: string, reason: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id 
        ? { 
            ...sub, 
            status: 'rejected', 
            notes: reason, 
            processedAt: new Date().toISOString() 
          } 
        : sub
    ));
    return Promise.resolve();
  }, []);

  return {
    submissions,
    users,
    templates,
    refreshSubmissions,
    approveSubmission,
    rejectSubmission
  };
};

interface FetchOptions<T = any> {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  mockData?: any;
  mockDelay?: number;
  useMock?: boolean;
  initialData?: T;
}

export function useApiData<T>(options: FetchOptions<T>) {
  const [data, setData] = useState<T | null>(options.initialData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refresh = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (options.useMock) {
          // Mock data response with delay
          await new Promise(resolve => setTimeout(resolve, options.mockDelay || 800));
          setData(options.mockData as T);
        } else {
          // Real API call
          const response = await fetch(options.endpoint, {
            method: options.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
          });
          
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (err) {
        console.error('API fetch error:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger, options.endpoint, options.method, options.body, options.useMock]);

  return { data, loading, error, refresh };
}

// Mock data for development
export const mockData = {
  users: [
    { id: 1, username: 'user1', name: 'Siti Aminah', address: 'Jl. Melati No. 10, Simokerto', created_at: '2023-07-01 12:45:07' },
    { id: 2, username: 'user2', name: 'Budi Santoso', address: 'Jl. Kenanga No. 22, Simokerto', created_at: '2023-07-02 14:27:17' },
    { id: 3, username: 'warga3', name: 'Rina Wijaya', address: 'Jl. Anggrek No. 5, Simokerto', created_at: '2023-07-03 09:15:30' },
    { id: 4, username: 'citizen4', name: 'Ahmad Hadi', address: 'Jl. Mawar No. 8, Simokerto', created_at: '2023-07-04 16:22:45' },
    { id: 5, username: 'warga5', name: 'Dewi Kartika', address: 'Jl. Dahlia No. 15, Simokerto', created_at: '2023-07-05 10:40:12' },
  ],
  admins: [
    { id: 1, username: 'admin_lurah', name: 'Admin Kelurahan', created_at: '2023-06-15 08:30:00', role: 'superadmin' },
    { id: 2, username: 'admin_rt', name: 'Admin RT', created_at: '2023-06-20 10:15:22', role: 'admin' },
  ],
  pendingAdmins: [
    { id: 3, username: 'admin_baru', name: 'Admin Baru', created_at: '2023-07-10 14:25:36', role: null },
  ],
  reports: [
    { 
      id: 1, 
      user_id: 1, 
      address: 'Jl. Melati No. 12, Simokerto', 
      description: 'Terlihat orang mencurigakan berkeliaran di sekitar rumah',
      created_at: '2023-07-12 22:15:30',
      status: 'pending',
      user: { name: 'Siti Aminah' }
    },
    { 
      id: 2, 
      user_id: 2, 
      address: 'Jl. Kenanga No. 20, Simokerto', 
      description: 'Pencurian sepeda motor terjadi di depan toko',
      created_at: '2023-07-12 23:05:45',
      status: 'processing',
      user: { name: 'Budi Santoso' }
    },
    { 
      id: 3, 
      user_id: 3, 
      address: 'Jl. Anggrek No. 5, Simokerto', 
      description: 'Percobaan pembobolan rumah tetangga',
      created_at: '2023-07-13 01:30:22',
      status: 'completed',
      user: { name: 'Rina Wijaya' }
    },
    { 
      id: 4, 
      user_id: 4, 
      address: 'Jl. Mawar No. 8, Simokerto', 
      description: 'Orang tidak dikenal mencoba masuk rumah',
      created_at: new Date().toISOString(),
      status: 'pending',
      user: { name: 'Ahmad Hadi' }
    },
  ],
  stats: {
    todayReports: 3,
    totalReports: 27,
    totalUsers: 124,
    activeDevices: 8,
    weeklyReportCounts: [4, 2, 5, 3, 7, 4, 3],
    reportsByStatus: { pending: 12, processing: 8, completed: 7 }
  }
};
