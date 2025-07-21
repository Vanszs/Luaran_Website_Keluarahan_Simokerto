'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  alpha,
  useTheme,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface JenisLaporan {
  id: number;
  nama: string;
}

export default function JenisLaporanManagement() {
  const theme = useTheme();
  const { user } = useAuth();
  const [jenisLaporanList, setJenisLaporanList] = useState<JenisLaporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({
    open: false,
    jenisLaporan: null as JenisLaporan | null,
    mode: 'add' as 'add' | 'edit'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    jenisLaporanId: null as number | null,
    jenisLaporanNama: ''
  });
  const [formData, setFormData] = useState({
    nama: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info'
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchJenisLaporan();
  }, []);

  const fetchJenisLaporan = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/jenis-laporan');
      if (response.ok) {
        const data = await response.json();
        setJenisLaporanList(data);
      } else {
        throw new Error('Failed to fetch jenis laporan');
      }
    } catch (error) {
      console.error('Error fetching jenis laporan:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load jenis laporan',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({ nama: '' });
    setDialog({
      open: true,
      jenisLaporan: null,
      mode: 'add'
    });
  };

  const handleEdit = (jenisLaporan: JenisLaporan) => {
    setFormData({ nama: jenisLaporan.nama });
    setDialog({
      open: true,
      jenisLaporan,
      mode: 'edit'
    });
  };

  const handleDelete = (jenisLaporan: JenisLaporan) => {
    setConfirmDialog({
      open: true,
      jenisLaporanId: jenisLaporan.id,
      jenisLaporanNama: jenisLaporan.nama
    });
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const submitForm = async () => {
    setSubmitLoading(true);
    try {
      // Capitalize first letter
      const nama = capitalizeFirstLetter(formData.nama.trim());
      
      const url = dialog.mode === 'add' 
        ? '/api/admin/jenis-laporan' 
        : `/api/admin/jenis-laporan/${dialog.jenisLaporan?.id}`;
      
      const method = dialog.mode === 'add' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save jenis laporan');
      }

      // Refresh list
      fetchJenisLaporan();
      
      setSnackbar({
        open: true,
        message: dialog.mode === 'add' 
          ? 'Jenis laporan berhasil ditambahkan' 
          : 'Jenis laporan berhasil diperbarui',
        severity: 'success'
      });
      
      setDialog({ ...dialog, open: false });
    } catch (error) {
      console.error('Error saving jenis laporan:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to save jenis laporan',
        severity: 'error'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/admin/jenis-laporan/${confirmDialog.jenisLaporanId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete jenis laporan');
      }

      // Remove from state
      setJenisLaporanList(jenisLaporanList.filter(item => item.id !== confirmDialog.jenisLaporanId));
      
      setSnackbar({
        open: true,
        message: 'Jenis laporan berhasil dihapus',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting jenis laporan:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to delete jenis laporan',
        severity: 'error'
      });
    } finally {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredJenisLaporan = jenisLaporanList.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Manajemen Jenis Laporan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ borderRadius: 2 }}
        >
          Tambah Jenis Laporan
        </Button>
      </Box>

      {/* Enhanced Search Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari jenis laporan..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.05)
                : alpha(theme.palette.common.black, 0.03),
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.08)
                  : alpha(theme.palette.common.black, 0.05),
              },
              '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.1)
                  : alpha(theme.palette.common.black, 0.06),
              }
            }
          }}
        />
      </Paper>

      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        padding: 0.5,
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.8),
      }}>
        <Table>
          <TableHead sx={{ 
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama Jenis Laporan</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJenisLaporan.length > 0 ? (
              filteredJenisLaporan.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{item.nama}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(item)}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(item)}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                    <CategoryIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'Tidak ada jenis laporan yang sesuai' : 'Tidak ada data jenis laporan'}
                    </Typography>
                    {!searchTerm && (
                      <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        sx={{ mt: 2, borderRadius: 2 }}
                      >
                        Tambah Jenis Laporan
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Dialog */}
      <Dialog 
        open={dialog.open} 
        onClose={() => setDialog({ ...dialog, open: false })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {dialog.mode === 'add' ? 'Tambah Jenis Laporan Baru' : 'Edit Jenis Laporan'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Jenis Laporan"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Contoh: Pencurian, Keamanan, dll"
                helperText="Huruf awal akan otomatis menjadi kapital"
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ ...dialog, open: false })}>
            Batal
          </Button>
          <Button 
            onClick={submitForm} 
            variant="contained"
            disabled={submitLoading || !formData.nama.trim()}
            startIcon={submitLoading ? <CircularProgress size={16} /> : null}
          >
            {submitLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      >
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus jenis laporan "{confirmDialog.jenisLaporanNama}"? 
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
            Batal
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
