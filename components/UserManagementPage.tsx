'use client';

import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'nama', headerName: 'Nama', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const rows: GridRowsProp = [
  { id: 1, nama: 'Ahmad', email: 'ahmad@example.com', status: 'Aktif' },
  { id: 2, nama: 'Budi', email: 'budi@example.com', status: 'Aktif' },
  { id: 3, nama: 'Citra', email: 'citra@example.com', status: 'Nonaktif' },
  { id: 4, nama: 'Dewi', email: 'dewi@example.com', status: 'Aktif' },
];

export default function UserManagementPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Data Akun Warga
      </Typography>
      <div style={{ height: 350, width: '100%' }}>
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
