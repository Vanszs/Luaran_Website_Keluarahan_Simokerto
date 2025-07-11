'use client';

import React from 'react';
import Layout from '../../../components/layout/Layout';
import UserManagement from '../../../components/admin/UserManagement';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { Box, Typography } from '@mui/material';

export default function CitizensPage() {
  return (
    <ProtectedRoute allowedRoles={['admin1']}>
      <Layout title="Citizens Management">
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Kelola Warga
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Kelola data warga dan pendaftaran akun pengguna.
          </Typography>
          <UserManagement />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
