'use client';

import { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMockApi } from '../hooks/useMockApi';

export default function AdminSubmissionsPage() {
  const { submissions } = useMockApi();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const rows = useMemo(() => {
    return submissions
      .filter(s =>
        s.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase())
      )
      .filter(s => (statusFilter ? s.status === statusFilter : true))
      .map(s => ({ ...s, id: s.id }));

  }, [submissions, search, statusFilter]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'submittedBy', headerName: 'Nama Pemohon', flex: 1 },
    { field: 'templateId', headerName: 'Jenis Surat', flex: 1 },
    { field: 'mode', headerName: 'Mode', width: 120 },
    { field: 'submittedAt', headerName: 'Tanggal', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: params => <Chip label={params.value} size="small" color={params.value === 'approved' ? 'success' : params.value === 'rejected' ? 'error' : 'warning'} />,
    },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 150,
      renderCell: () => <Button size="small">Detail</Button>,
      sortable: false,
      filterable: false,
    },
  ];

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
          Daftar Pengajuan Surat
        </Typography>
        <Chip label={`Pending: ${pendingCount}`} color="warning" />
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label="Cari" value={search} onChange={e => setSearch(e.target.value)} size="small" />
        <TextField label="Status" select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} size="small" sx={{ width: 140 }}>
          <MenuItem value="">Semua</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="processing">Proses</MenuItem>
          <MenuItem value="approved">Selesai</MenuItem>
          <MenuItem value="rejected">Ditolak</MenuItem>
        </TextField>
        <Button variant="contained">Approve Selected</Button>
        <Button variant="outlined">Reject Selected</Button>
      </Stack>
      <div style={{ height: 420, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
        />
      </div>
    </Paper>
  );
}
