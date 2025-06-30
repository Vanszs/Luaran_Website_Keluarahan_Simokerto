'use client';

import { Paper, Typography } from '@mui/material';

export default function TemplateManagementPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Kelola Template Dokumen
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Di sini admin dapat menambah kategori dokumen dan mengunggah template
        baru.
      </Typography>
    </Paper>
  );
}
