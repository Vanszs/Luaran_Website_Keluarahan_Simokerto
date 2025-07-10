'use client';

import { useState, useEffect } from 'react';

// Mock data generator functions
const generateMockData = (endpoint: string) => {
  // Return different mock data depending on the endpoint
  switch (endpoint) {
    case '/api/admin/stats':
      return {
        todayReports: Math.floor(Math.random() * 20),
        todayChange: Math.floor(Math.random() * 30) - 10,
        totalReports: 125 + Math.floor(Math.random() * 50),
        totalReportsChange: Math.floor(Math.random() * 20),
        totalUsers: 350 + Math.floor(Math.random() * 100),
        userChange: Math.floor(Math.random() * 10),
        activeAdmins: 3 + Math.floor(Math.random() * 2),
        activeDevices: 8 + Math.floor(Math.random() * 4),
      };
    default:
      return {};
  }
};

type ApiDataOptions<T> = {
  endpoint: string;
  useMock?: boolean;
  initialData?: T;
};

export function useApiData<T>({ endpoint, useMock = false, initialData = {} as T }: ApiDataOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      if (useMock) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setData(generateMockData(endpoint) as T);
      } else {
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result as T);
      }
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }

  function refresh() {
    fetchData();
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error, refresh };
}
