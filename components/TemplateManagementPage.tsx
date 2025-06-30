'use client';

import { Paper, Typography, Box, TextField, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'kategori', headerName: 'Kategori', flex: 1 },
  { field: 'nama', headerName: 'Nama File', flex: 1 },
];

const rows: GridRowsProp = [
  { id: 1, kategori: 'Domisili', nama: 'domisili.docx' },
  { id: 2, kategori: 'Usaha', nama: 'usaha.docx' },
  { id: 3, kategori: 'Kelahiran', nama: 'kelahiran.docx' },
  { id: 4, kategori: 'Kematian', nama: 'kematian.docx' },
  { id: 5, kategori: 'Nikah', nama: 'nikah.docx' },
  { id: 6, kategori: 'Cerai', nama: 'cerai.docx' },
];

export default function TemplateManagementPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Kelola Template Dokumen
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Kategori" size="small" />
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
          <Button variant="contained">Simpan</Button>
        </Stack>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
        />
      </div>
    </Paper>
  );
}
