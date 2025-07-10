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
  Chip,
  Grid,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface Admin {
  id: number;
  username: string;
  name: string | null;
  created_at: string;
  role: 'superadmin' | 'admin' | 'petugas' | null; // Allow null for pending admins
  pending: boolean; // Add pending status
}

export default function AdminManagement() {
  const theme = useTheme();
  const { user } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminDialog, setAdminDialog] = useState({
    open: false,
    admin: null as Admin | null,
    mode: 'add' as 'add' | 'edit'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    role: 'admin' as 'admin' | 'superadmin' | 'petugas',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info'
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Reset the form when opening the dialog in add mode
  const resetForm = () => {
    setFormData({
      username: '',
      name: '',
      password: '',
      role: 'admin', // Default role for new admins
    });
  };

  // Populate form with admin data when editing
  const populateForm = (admin: Admin) => {
    setFormData({
      username: admin.username,
      name: admin.name || '',
      password: '', // Don't populate password for security
      role: admin.role || 'admin', // Default to admin if role is null
    });
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      console.log('Fetching admins and pending admins...');
      const adminsResponse = await fetch('/api/admin/admins');
      const pendingResponse = await fetch('/api/admin/admins/pending');

      console.log('Admin response status:', adminsResponse.status);
      console.log('Pending response status:', pendingResponse.status);

      if (adminsResponse.ok && pendingResponse.ok) {
        const adminsData = await adminsResponse.json();
        const pendingData = await pendingResponse.json();
        
        console.log('Admins data:', adminsData);
        console.log('Pending data:', pendingData);
        
        setAdmins(adminsData);
        setPendingAdmins(pendingData);
      } else {
        console.error('Failed to fetch admins:', {
          adminsStatus: adminsResponse.status,
          pendingStatus: pendingResponse.status
        });
        throw new Error('Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load admin data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = () => {
    resetForm();
    setAdminDialog({
      open: true,
      admin: null,
      mode: 'add'
    });
  };

  const handleEditAdmin = (admin: Admin) => {
    populateForm(admin);
    setAdminDialog({
      open: true,
      admin,
      mode: 'edit'
    });
  };

  const handleDeleteAdmin = (admin: Admin) => {
    if (admin.id === Number(user?.id)) {
      setSnackbar({
        open: true,
        message: 'Anda tidak dapat menghapus akun Anda sendiri',
        severity: 'error'
      });
      return;
    }

    setConfirmDialog({
      open: true,
      title: 'Hapus Admin',
      message: `Apakah Anda yakin ingin menghapus admin "${admin.name}"?`,
      onConfirm: () => confirmDeleteAdmin(admin.id)
    });
  };

  // State for approval role selection
  const [approvalRole, setApprovalRole] = useState<'admin' | 'petugas' | 'superadmin'>('admin');
  const [approvalDialog, setApprovalDialog] = useState({
    open: false,
    admin: null as Admin | null
  });
  
  const handleApproveAdmin = (admin: Admin) => {
    setApprovalRole('admin'); // Reset to default role
    setApprovalDialog({
      open: true,
      admin
    });
  };

  const handleRejectAdmin = (admin: Admin) => {
    setConfirmDialog({
      open: true,
      title: 'Tolak Admin',
      message: `Apakah Anda yakin ingin menolak "${admin.name}" sebagai admin?`,
      onConfirm: () => confirmRejectAdmin(admin.id)
    });
  };

  const submitAdminForm = async () => {
    try {
      const url = adminDialog.mode === 'add' 
        ? '/api/admin/admins' 
        : `/api/admin/admins/${adminDialog.admin?.id}`;
      
      const method = adminDialog.mode === 'add' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save admin');
      }

      // Refresh admin list
      fetchAdmins();
      
      setSnackbar({
        open: true,
        message: adminDialog.mode === 'add' 
          ? 'Admin added successfully' 
          : 'Admin updated successfully',
        severity: 'success'
      });
      
      setAdminDialog({ ...adminDialog, open: false });
    } catch (error) {
      console.error('Error saving admin:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to save admin',
        severity: 'error'
      });
    }
  };

  const confirmDeleteAdmin = async (adminId: number) => {
    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete admin');
      }

      // Remove admin from state
      setAdmins(admins.filter(admin => admin.id !== adminId));
      
      setSnackbar({
        open: true,
        message: 'Admin deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting admin:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete admin',
        severity: 'error'
      });
    } finally {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmApproveAdmin = async (adminId: number, selectedRole: 'admin' | 'petugas' | 'superadmin') => {
    try {
      const response = await fetch(`/api/admin/admins/approve/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }) // Pass the selected role
      });

      const data = await response.json();
      
      if (data.alreadyApproved) {
        setSnackbar({
          open: true,
          message: 'Admin ini telah disetujui sebelumnya',
          severity: 'info'
        });
        
        // Even if already approved, refresh the lists
        // This ensures UI consistency when admins click multiple times
        fetchAdmins();
      } else if (response.ok) {
        // Remove from pending list
        setPendingAdmins(pendingAdmins.filter(admin => admin.id !== adminId));
        
        // Refresh admin lists
        fetchAdmins();
        
        setSnackbar({
          open: true,
          message: 'Admin berhasil disetujui',
          severity: 'success'
        });
      } else {
        throw new Error(data.message || 'Failed to approve admin');
      }
    } catch (error) {
      console.error('Error approving admin:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to approve admin',
        severity: 'error'
      });
    } finally {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmRejectAdmin = async (adminId: number) => {
    try {
      const response = await fetch(`/api/admin/admins/reject/${adminId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to reject admin');
      }

      // Remove from pending list
      setPendingAdmins(pendingAdmins.filter(admin => admin.id !== adminId));
      
      setSnackbar({
        open: true,
        message: 'Admin rejected successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error rejecting admin:', error);
      setSnackbar({
        open: true,
        message: 'Failed to reject admin',
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

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };

  const filteredAdmins = admins.filter(admin => 
    (admin.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manajemen Admin
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddAdmin}
          sx={{ borderRadius: 2 }}
        >
          Tambah Admin
        </Button>
      </Box>

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
          placeholder="Cari admin berdasarkan nama atau username..."
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
            maxWidth: 500,
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



      {/* Pending Admins Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        Admin Menunggu Persetujuan
      </Typography>
      
      {pendingAdmins.length > 0 ? (
        <TableContainer component={Paper} elevation={0} sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.2)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          padding: 0.5, // Add padding to separate container border from table
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.8),
        }}>
          <Table>
            <TableHead sx={{ 
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.warning.main, 0.1)
                : alpha(theme.palette.warning.main, 0.05)
            }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Mendaftar Pada</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingAdmins.map((admin) => (
                <TableRow key={admin.id} hover>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>
                    {new Date(admin.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => handleApproveAdmin(admin)}
                      sx={{ mr: 1, borderRadius: 2 }}
                    >
                      Setujui
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleRejectAdmin(admin)}
                      sx={{ borderRadius: 2 }}
                    >
                      Tolak
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ 
          p: 3, 
          textAlign: 'center', 
          borderRadius: 3,
          mb: 4,
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.info.main, 0.1) 
            : alpha(theme.palette.info.main, 0.05)
        }}>
          <Typography variant="body1" color="text.secondary">
            {loading ? 'Loading pending admins...' : 'Tidak ada admin yang menunggu persetujuan'}
          </Typography>
        </Paper>
      )}

      {/* Approved Admins Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        Admin Terdaftar
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        padding: 0.5, // Add padding to separate container border from table
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
              <TableCell>Username</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Terdaftar</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id} hover>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      icon={<AdminIcon />}
                      label={
                        admin.role === 'superadmin' ? 'Super Admin' : 
                        admin.role === 'petugas' ? 'Petugas' : 'Admin'
                      }
                      color={
                        admin.role === 'superadmin' ? 'primary' : 
                        admin.role === 'petugas' ? 'secondary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(admin.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditAdmin(admin)}
                      color="primary"
                      disabled={admin.id === Number(user?.id) && admin.role === 'superadmin'}
                      title={admin.id === Number(user?.id) && admin.role === 'superadmin' ? 
                        "Anda tidak dapat mengedit akun superadmin Anda sendiri" : ""}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteAdmin(admin)}
                      color="error"
                      disabled={admin.id === Number(user?.id)}
                      title={admin.id === Number(user?.id) ? "Anda tidak dapat menghapus akun Anda sendiri" : ""}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                    <AdminIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Tidak ada data admin
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleAddAdmin}
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      Tambah Admin
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Admin Form Dialog */}
      <Dialog 
        open={adminDialog.open} 
        onClose={() => setAdminDialog({ ...adminDialog, open: false })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {adminDialog.mode === 'add' ? 'Tambah Admin Baru' : 'Edit Data Admin'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={adminDialog.mode === 'edit'} // Username cannot be changed when editing
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                helperText={adminDialog.mode === 'edit' ? 'Biarkan kosong jika tidak ingin mengubah password' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={formData.role}
                  label="Role"
                  onChange={handleSelectChange}
                  disabled={adminDialog.admin?.id === user?.id} // Cannot change own role
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="petugas">Petugas</MenuItem>
                  <MenuItem value="superadmin">Super Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminDialog({ ...adminDialog, open: false })}>
            Batal
          </Button>
          <Button onClick={submitAdminForm} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approval Dialog with Role Selection */}
      <Dialog
        open={approvalDialog.open}
        onClose={() => setApprovalDialog({ ...approvalDialog, open: false })}
      >
        <DialogTitle>Setujui Admin</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Pilih role untuk {approvalDialog.admin?.name}:
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="approval-role-label">Role</InputLabel>
              <Select
                labelId="approval-role-label"
                value={approvalRole}
                label="Role"
                onChange={(e) => setApprovalRole(e.target.value as 'admin' | 'petugas' | 'superadmin')}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="petugas">Petugas</MenuItem>
                <MenuItem value="superadmin">Super Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog({ ...approvalDialog, open: false })}>
            Batal
          </Button>
          <Button 
            onClick={() => {
              if (approvalDialog.admin) {
                confirmApproveAdmin(approvalDialog.admin.id, approvalRole);
                setApprovalDialog({ ...approvalDialog, open: false });
              }
            }} 
            variant="contained"
            color="primary"
          >
            Setujui
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography>{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
            Batal
          </Button>
          <Button onClick={confirmDialog.onConfirm} color="error" variant="contained">
            Konfirmasi
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
