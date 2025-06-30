'use client';

import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'kategori', headerName: 'Kategori', flex: 1 },
  { field: 'jumlah', headerName: 'Jumlah Pengajuan', type: 'number', flex: 1 },
];

const rows: GridRowsProp = [
  { id: 1, kategori: 'Surat Keterangan Domisili', jumlah: 12 },
  { id: 2, kategori: 'Surat Keterangan Usaha', jumlah: 8 },
  { id: 3, kategori: 'Surat Kelahiran', jumlah: 5 },
];

export default function RequestCategoriesPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Data Pengajuan per Kategori
      </Typography>
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
