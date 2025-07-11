'use client';

import { useState, useEffect, useCallback } from 'react';

interface StatsData {
  todayReports: number;
  todayChange: number;
  totalReports: number;
  totalReportsChange: number;
  totalUsers: number;
  userChange: number;
  activeAdmins: number;
  activeDevices?: number;
}

export function useRealStats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      // Set fallback data on error
      setData({
        todayReports: 0,
        todayChange: 0,
        totalReports: 0,
        totalReportsChange: 0,
        totalUsers: 0,
        userChange: 0,
        activeAdmins: 0,
        activeDevices: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = useCallback(() => {
    return fetchStats();
  }, [fetchStats]);

  return { data, loading, error, refresh };
}
