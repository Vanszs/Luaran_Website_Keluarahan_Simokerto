'use client';

import React from 'react';
import Layout from '../../../components/layout/Layout';
import ReportsList from '../../../components/admin/ReportsList';
import { Box } from '@mui/material';

export default function AdminReportsPage() {
  return (
    <Layout title="Reports Management">
      <Box sx={{ p: 1 }}>
        <ReportsList />
      </Box>
    </Layout>
  );
}
