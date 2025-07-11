'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import UserManagement from '../../../components/admin/UserManagement';

export default function PetugasCitizensPage() {
  return (
    <ProtectedRoute allowedRoles={['petugas']}>
      <Layout>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Kelola Data Warga
          </Typography>
          <UserManagement />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
