import { useEffect, useState } from 'react';
import { mockDocuments } from '../utils/mockData';
import { mockUsers, mockTemplates, MockUser, MockTemplate } from '../utils/mockAdminData';

export interface Submission extends typeof mockDocuments[number] {
  mode: 'Online' | 'Offline';
}

export function useMockApi() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users] = useState<MockUser[]>(mockUsers);
  const [templates] = useState<MockTemplate[]>(mockTemplates);

  useEffect(() => {
    // add mode to mock documents for demo
    const withMode = mockDocuments.map((d, idx) => ({
      ...d,
      mode: idx % 2 === 0 ? 'Online' : 'Offline',
    }));
    setSubmissions(withMode);
  }, []);

  const getSubmissions = async () => {
    return new Promise<Submission[]>(resolve => {
      setTimeout(() => resolve(submissions), 300);
    });
  };

  const getUsers = async () => {
    return new Promise<MockUser[]>(resolve => {
      setTimeout(() => resolve(users), 300);
    });
  };

  const getTemplates = async () => {
    return new Promise<MockTemplate[]>(resolve => {
      setTimeout(() => resolve(templates), 300);
    });
  };

  return { submissions, users, templates, getSubmissions, getUsers, getTemplates };
}
