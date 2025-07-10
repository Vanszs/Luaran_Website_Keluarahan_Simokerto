'use client';

import React from 'react';
import Layout from '../../../components/layout/Layout';
import AdminManagement from '../../../components/admin/AdminManagement';
import { Box } from '@mui/material';

export default function ManageAdminsPage() {
  return (
    <Layout title="Manage Admins">
      <Box sx={{ p: 1 }}>
        <AdminManagement />
      </Box>
    </Layout>
  );
}
