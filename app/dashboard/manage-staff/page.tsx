'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import AdminManagement from '../../../components/admin/AdminManagement';

export default function ManageStaffPage() {
  return (
    <ProtectedRoute allowedRoles={['admin1']}>
      <Layout>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Kelola Petugas
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sebagai admin, Anda dapat menambahkan dan mengelola akun petugas.
          </Typography>
          <AdminManagement />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
