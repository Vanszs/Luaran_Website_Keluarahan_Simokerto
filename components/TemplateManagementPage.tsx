'use client';

import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMockApi } from '../hooks/useMockApi';

export default function TemplateManagementPage() {
  const { templates } = useMockApi();
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'kategori', headerName: 'Kategori', flex: 1 },
    { field: 'name', headerName: 'Nama File', flex: 1 },
  ];

  const rows = templates.map(t => ({ id: t.id, ...t }));

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Template Surat
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Kategori Surat" />
        <Tab label="Template Surat" />
      </Tabs>
      {tab === 0 && (
        <Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField label="Kategori Baru" value={category} onChange={e => setCategory(e.target.value)} size="small" />
            <Button variant="contained">Tambah</Button>
          </Stack>
          <DataGrid rows={rows} columns={[{ field: 'kategori', headerName: 'Kategori', flex: 1 }]} hideFooterSelectedRowCount autoHeight />
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField label="Kategori" select size="small" sx={{ width: 160 }}>
              {Array.from(new Set(templates.map(t => t.kategori))).map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
            <Button variant="contained">Simpan</Button>
          </Stack>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
            />
          </div>
        </Box>
      )}
    </Paper>
  );
}
