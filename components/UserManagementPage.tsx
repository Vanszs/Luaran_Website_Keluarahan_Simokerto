'use client';

import { Box, Typography, Paper } from '@mui/material';

export default function UserManagementPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Kelola Data Warga
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Halaman ini akan menampilkan dan mengelola data warga.
      </Typography>
    </Paper>
  );
}
