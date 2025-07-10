'use client';

import { useState, useEffect } from 'react';

// Interface untuk data statistik
interface StatisticData {
  value: number;
  change?: number;
  isLoading: boolean;
  error?: string;
}

// Hook untuk statistik individual
export function useStatistic(endpoint: string, initialValue: number = 0) {
  const [data, setData] = useState<StatisticData>({
    value: initialValue,
    isLoading: true,
    error: undefined
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Simulasi network delay yang berbeda untuk setiap endpoint
        const delay = Math.random() * 2000 + 500; // 500ms - 2.5s
        await new Promise(resolve => setTimeout(resolve, delay));

        if (!isMounted) return;

        // Mock data berdasarkan endpoint
        let mockValue = initialValue;
        let mockChange = 0;

        switch (endpoint) {
          case '/api/stats/today-reports':
            mockValue = Math.floor(Math.random() * 20) + 5;
            mockChange = Math.floor(Math.random() * 10) - 5;
            break;
          case '/api/stats/total-reports':
            mockValue = Math.floor(Math.random() * 200) + 100;
            mockChange = Math.floor(Math.random() * 20) + 5;
            break;
          case '/api/stats/total-users':
            mockValue = Math.floor(Math.random() * 500) + 200;
            mockChange = Math.floor(Math.random() * 30) + 10;
            break;
          case '/api/stats/active-admins':
            mockValue = Math.floor(Math.random() * 5) + 2;
            mockChange = Math.floor(Math.random() * 3) - 1;
            break;
          default:
            mockValue = Math.floor(Math.random() * 100);
        }

        setData({
          value: mockValue,
          change: mockChange,
          isLoading: false,
          error: undefined
        });
      } catch (error) {
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load data'
        }));
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, initialValue]);

  return data;
}

// Hook untuk semua statistik dengan loading terpisah
export function useIndividualStats() {
  const todayReports = useStatistic('/api/stats/today-reports', 0);
  const totalReports = useStatistic('/api/stats/total-reports', 0);
  const totalUsers = useStatistic('/api/stats/total-users', 0);
  const activeAdmins = useStatistic('/api/stats/active-admins', 0);

  return {
    todayReports,
    totalReports,
    totalUsers,
    activeAdmins
  };
}
