'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import ReportsList from '../../../components/admin/ReportsList';

export default function PetugasReportsPage() {
  return (
    <ProtectedRoute allowedRoles={['petugas']}>
      <Layout>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Laporan Warga
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sebagai petugas, Anda dapat melihat laporan namun tidak dapat mengubah status.
          </Typography>
          <ReportsList isReadOnly={true} />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
