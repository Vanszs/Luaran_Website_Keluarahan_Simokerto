'use client';

import { useState, useEffect } from 'react';

// Individual stat hooks with separate loading states
export function useTodayReports() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading today reports...');
        // Simulate API call delay - shorter for today reports
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 800));
        
        // Mock data - replace with actual API call
        const mockData = Math.floor(Math.random() * 25) + 5;
        setData(mockData);
        console.log('Today reports loaded:', mockData);
      } catch (err) {
        setError('Failed to load today reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { value: data, isLoading, error };
}

export function useTotalReports() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading total reports...');
        // Simulate API call delay - medium for total reports
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        // Mock data - replace with actual API call
        const mockData = Math.floor(Math.random() * 200) + 150;
        setData(mockData);
        console.log('Total reports loaded:', mockData);
      } catch (err) {
        setError('Failed to load total reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { value: data, isLoading, error };
}

export function useTotalUsers() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading total users...');
        // Simulate API call delay - longer for total users
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        // Mock data - replace with actual API call
        const mockData = Math.floor(Math.random() * 500) + 300;
        setData(mockData);
        console.log('Total users loaded:', mockData);
      } catch (err) {
        setError('Failed to load total users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { value: data, isLoading, error };
}

export function useActiveAdmins() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading active admins...');
        // Simulate API call delay - shortest for active admins
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
        
        // Mock data - replace with actual API call
        const mockData = Math.floor(Math.random() * 8) + 3;
        setData(mockData);
        console.log('Active admins loaded:', mockData);
      } catch (err) {
        setError('Failed to load active admins');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { value: data, isLoading, error };
}
