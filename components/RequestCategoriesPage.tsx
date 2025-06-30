'use client';

import { Box, Typography, Paper } from '@mui/material';

export default function RequestCategoriesPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Data Pengajuan per Kategori
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Halaman ini menampilkan daftar pengajuan berdasarkan kategori.
      </Typography>
    </Paper>
  );
}
