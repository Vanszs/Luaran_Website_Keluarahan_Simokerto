'use client';

import React from 'react';
import { Box } from '@mui/material';
import ActivityLogs from '../../../components/admin/ActivityLogs';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function ActivityLogsPage() {
  return (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'grey.50',
        pt: 2
      }}>
        <ActivityLogs />
      </Box>
    </ProtectedRoute>
  );
}
