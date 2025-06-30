'use client';

import { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Box,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMockApi } from '../hooks/useMockApi';

export default function UserManagementPage() {
  const { users } = useMockApi();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const rows = useMemo(() => {
    return users
      .filter(u =>
        u.nama.toLowerCase().includes(search.toLowerCase()) ||
        u.nik.includes(search)
      )
      .filter(u => (statusFilter ? u.status === statusFilter : true))
      .map(u => ({ id: u.id, ...u }));
  }, [users, search, statusFilter]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nama', headerName: 'Nama', flex: 1 },
    { field: 'nik', headerName: 'NIK', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'rt', headerName: 'RT', width: 80 },
    { field: 'rw', headerName: 'RW', width: 80 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: params => <Chip label={params.value} size="small" color={params.value === 'Aktif' ? 'success' : 'default'} />,
    },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 150,
      renderCell: () => <Button size="small">Edit</Button>,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Kelola Akun Warga
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label="Cari" value={search} onChange={e => setSearch(e.target.value)} size="small" />
        <TextField label="Status" select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} size="small" sx={{ width: 140 }}>
          <MenuItem value="">Semua</MenuItem>
          <MenuItem value="Aktif">Aktif</MenuItem>
          <MenuItem value="Nonaktif">Nonaktif</MenuItem>
        </TextField>
      </Stack>
      <Box sx={{ height: 420, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
        />
      </Box>
    </Paper>
  );
}
