'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  LinearProgress,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';

interface Citizen {
  id: number;
  username: string;
  name: string;
  address: string;
  created_at: string;
}

export default function CitizensPage() {
  const theme = useTheme();
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setCitizens(data);
      } else {
        console.error('Failed to fetch citizens');
      }
    } catch (error) {
      console.error('Error fetching citizens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setDetailDialogOpen(true);
  };

  const handleEdit = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setFormData({
      name: citizen.name,
      address: citizen.address,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCitizen) return;
    
    try {
      const response = await fetch(`/api/admin/users/${selectedCitizen.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Update local state to reflect changes
        setCitizens(prevCitizens => 
          prevCitizens.map(citizen => 
            citizen.id === selectedCitizen.id 
              ? { ...citizen, ...formData }
              : citizen
          )
        );
        
        setEditDialogOpen(false);
      } else {
        console.error('Failed to update citizen');
      }
    } catch (error) {
      console.error('Error updating citizen:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCitizen) return;
    
    try {
      const response = await fetch(`/api/admin/users/${selectedCitizen.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Remove from local state
        setCitizens(prevCitizens => 
          prevCitizens.filter(citizen => citizen.id !== selectedCitizen.id)
        );
        
        setDeleteDialogOpen(false);
      } else {
        console.error('Failed to delete citizen');
      }
    } catch (error) {
      console.error('Error deleting citizen:', error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter citizens based on search term
  const filteredCitizens = citizens.filter(citizen =>
    citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get citizens for current page
  const paginatedCitizens = filteredCitizens.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout title="Manajemen Warga">
      <Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h5" fontWeight={600}>
            Data Warga
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            size="small"
          >
            Tambah Warga
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 2, borderRadius: 1.5 }}>
          <TextField
            placeholder="Cari berdasarkan nama, username, atau alamat"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {loading ? (
            <LinearProgress />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Terdaftar</TableCell>
                    <TableCell align="right">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCitizens.length > 0 ? (
                    paginatedCitizens.map((citizen) => (
                      <TableRow key={citizen.id} hover>
                        <TableCell>{citizen.id}</TableCell>
                        <TableCell>{citizen.username}</TableCell>
                        <TableCell>{citizen.name}</TableCell>
                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {citizen.address}
                        </TableCell>
                        <TableCell>
                          {new Date(citizen.created_at).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Lihat Detail">
                            <IconButton size="small" onClick={() => handleViewDetails(citizen)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEdit(citizen)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton size="small" color="error" onClick={() => handleDelete(citizen)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Tidak ada data warga'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            component="div"
            count={filteredCitizens.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Baris per halaman:"
          />
        </Paper>
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Detail Warga
        </DialogTitle>
        <DialogContent dividers>
          {selectedCitizen && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">ID</Typography>
                <Typography variant="body1">{selectedCitizen.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Username</Typography>
                <Typography variant="body1">{selectedCitizen.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Nama Lengkap</Typography>
                <Typography variant="body1">{selectedCitizen.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Alamat</Typography>
                <Typography variant="body1">{selectedCitizen.address}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Terdaftar Pada</Typography>
                <Typography variant="body1">
                  {new Date(selectedCitizen.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Data Warga
        </DialogTitle>
        <DialogContent dividers>
          {selectedCitizen && (
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">ID</Typography>
                <Typography variant="body1">{selectedCitizen.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Username</Typography>
                <Typography variant="body1">{selectedCitizen.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nama Lengkap"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Alamat"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          Konfirmasi Hapus
        </DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus data warga "{selectedCitizen?.name}"?
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
