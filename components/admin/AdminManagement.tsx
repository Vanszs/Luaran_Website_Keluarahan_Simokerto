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
  Stack,
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
  role: 'superadmin' | 'admin1' | 'admin2' | 'petugas' | null; // Updated roles
  pending: boolean; // Add pending status
}

export default function AdminManagement() {
  const theme = useTheme();
  const { user } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // Loading states for different operations
  const [loadingStates, setLoadingStates] = useState({
    approve: {} as Record<number, boolean>,
    reject: {} as Record<number, boolean>,
    delete: {} as Record<number, boolean>,
    submit: false,
  });
  
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
    role: 'admin1' as 'admin1' | 'admin2' | 'superadmin' | 'petugas',
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
  // Function to get available roles based on current user's role
  const getAvailableRoles = () => {
    if (user?.role === 'superadmin') {
      // Superadmin can create admin1, admin2, and superadmin
      return [
        { value: 'admin1', label: 'Admin 1' },
        { value: 'admin2', label: 'Admin 2' },
        { value: 'superadmin', label: 'Super Admin' }
      ];
    } else if (user?.role === 'admin1') {
      // Admin1 can create admin2 and petugas
      return [
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' }
      ];
    }
    return [];
  };

  const getAvailableApprovalRoles = () => {
    if (user?.role === 'superadmin') {
      // Superadmin can approve as admin1, admin2, and superadmin
      return [
        { value: 'admin1', label: 'Admin 1' },
        { value: 'admin2', label: 'Admin 2' },
        { value: 'superadmin', label: 'Super Admin' }
      ];
    } else if (user?.role === 'admin1') {
      // Admin1 can approve as admin2 and petugas
      return [
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' }
      ];
    }
    return [];
  };

  const resetForm = () => {
    const availableRoles = getAvailableRoles();
    const defaultRole = availableRoles.length > 0 ? availableRoles[0].value : 'admin1';
    
    setFormData({
      username: '',
      name: '',
      password: '',
      role: defaultRole as 'admin1' | 'admin2' | 'superadmin' | 'petugas',
    });
  };

  // Populate form with admin data when editing
  const populateForm = (admin: Admin) => {
    setFormData({
      username: admin.username,
      name: admin.name || '',
      password: '', // Don't populate password for security
      role: admin.role || 'admin1', // Default to admin1 if role is null
    });
  };

  // Filter admins based on current user's role permissions
  const filterAdminsByRole = (adminsList: any[]) => {
    if (user?.role === 'superadmin') {
      // Superadmin can see all admins
      return adminsList;
    } else if (user?.role === 'admin1') {
      // Admin1 can only see petugas and admin2
      return adminsList.filter(admin => 
        admin.role === 'petugas' || admin.role === 'admin2'
      );
    }
    // Other roles can't see any admins
    return [];
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
        
        // Filter data based on user role
        const filteredAdmins = filterAdminsByRole(adminsData);
        const filteredPending = filterAdminsByRole(pendingData);
        
        setAdmins(filteredAdmins);
        setPendingAdmins(filteredPending);
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
  const [approvalRole, setApprovalRole] = useState<'admin1' | 'admin2' | 'petugas' | 'superadmin'>('admin1');
  const [approvalDialog, setApprovalDialog] = useState({
    open: false,
    admin: null as Admin | null
  });
  
  const handleApproveAdmin = (admin: Admin) => {
    const availableRoles = getAvailableApprovalRoles();
    const defaultRole = availableRoles.length > 0 ? availableRoles[0].value : 'admin1';
    
    setApprovalRole(defaultRole as 'admin1' | 'admin2' | 'petugas' | 'superadmin'); // Reset to default role
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
    // Set loading state
    setLoadingStates(prev => ({
      ...prev,
      submit: true
    }));
    
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
    } finally {
      // Clear loading state
      setLoadingStates(prev => ({
        ...prev,
        submit: false
      }));
    }
  };

  const confirmDeleteAdmin = async (adminId: number) => {
    // Set loading state
    setLoadingStates(prev => ({
      ...prev,
      delete: { ...prev.delete, [adminId]: true }
    }));
    
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
      // Clear loading state
      setLoadingStates(prev => ({
        ...prev,
        delete: { ...prev.delete, [adminId]: false }
      }));
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmApproveAdmin = async (adminId: number, selectedRole: 'admin1' | 'admin2' | 'petugas' | 'superadmin') => {
    // Set loading state
    setLoadingStates(prev => ({
      ...prev,
      approve: { ...prev.approve, [adminId]: true }
    }));
    
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
      // Clear loading state
      setLoadingStates(prev => ({
        ...prev,
        approve: { ...prev.approve, [adminId]: false }
      }));
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmRejectAdmin = async (adminId: number) => {
    // Set loading state
    setLoadingStates(prev => ({
      ...prev,
      reject: { ...prev.reject, [adminId]: true }
    }));
    
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
      // Clear loading state
      setLoadingStates(prev => ({
        ...prev,
        reject: { ...prev.reject, [adminId]: false }
      }));
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

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = (admin.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         admin.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? admin.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Cari admin"
            placeholder="Cari berdasarkan nama atau username..."
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
              flex: 1,
              minWidth: 300,
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
          <TextField
            label="Role"
            select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            size="small"
            sx={{ 
              width: { xs: '100%', sm: 160 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          >
            <MenuItem value="">Semua Role</MenuItem>
            {getAvailableRoles().map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/* Admin List Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Daftar Admin
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Menampilkan {filteredAdmins.length} dari {admins.length} admin
          {(searchTerm || roleFilter) && (
            <Chip 
              label={`Filter: ${searchTerm || roleFilter}`} 
              size="small" 
              onDelete={() => {
                setSearchTerm('');
                setRoleFilter('');
              }}
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
      </Box>

      {/* Admins Table */}
      {filteredAdmins.length > 0 ? (
        <TableContainer component={Paper} elevation={0} sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
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
                <TableCell>Username</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Bergabung</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{admin.username}</TableCell>
                  <TableCell>{admin.name || '-'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={
                        admin.role === 'superadmin' ? 'Super Admin' : 
                        admin.role === 'admin1' ? 'Admin' : 
                        admin.role === 'admin2' ? 'Admin2' : 
                        admin.role === 'petugas' ? 'Petugas' : admin.role
                      } 
                      size="small" 
                      color={
                        admin.role === 'superadmin' ? 'error' : 
                        admin.role === 'admin1' ? 'primary' : 
                        admin.role === 'admin2' ? 'secondary' : 
                        'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(admin.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditAdmin(admin)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAdmin(admin)}
                      disabled={loadingStates.delete[admin.id]}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 3,
          border: `1px dashed ${theme.palette.divider}`,
          mb: 4
        }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            {searchTerm || roleFilter ? 'Tidak ada admin yang sesuai dengan filter' : 'Belum ada admin'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || roleFilter ? 'Coba ubah kriteria pencarian atau filter' : 'Tambahkan admin pertama dengan mengklik tombol "Tambah Admin"'}
          </Typography>
        </Paper>
      )}

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
                      disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}
                      sx={{ mr: 1, borderRadius: 2 }}
                      startIcon={loadingStates.approve[admin.id] ? <CircularProgress size={16} /> : null}
                    >
                      {loadingStates.approve[admin.id] ? 'Processing...' : 'Setujui'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleRejectAdmin(admin)}
                      disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}
                      sx={{ borderRadius: 2 }}
                      startIcon={loadingStates.reject[admin.id] ? <CircularProgress size={16} /> : null}
                    >
                      {loadingStates.reject[admin.id] ? 'Processing...' : 'Tolak'}
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
                  {getAvailableRoles().map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminDialog({ ...adminDialog, open: false })}>
            Batal
          </Button>
          <Button 
            onClick={submitAdminForm} 
            variant="contained"
            disabled={loadingStates.submit}
            startIcon={loadingStates.submit ? <CircularProgress size={16} /> : null}
          >
            {loadingStates.submit ? 'Menyimpan...' : 'Simpan'}
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
                onChange={(e) => setApprovalRole(e.target.value as 'admin1' | 'admin2' | 'petugas' | 'superadmin')}
              >
                {getAvailableApprovalRoles().map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
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
