'use client';

import React from 'react';
import Layout from '../../../components/layout/Layout';
import UserManagement from '../../../components/admin/UserManagement';
import { Box } from '@mui/material';

export default function CitizensPage() {
  return (
    <Layout title="Citizens Management">
      <Box sx={{ p: 1 }}>
        <UserManagement />
      </Box>
    </Layout>
  );
}
