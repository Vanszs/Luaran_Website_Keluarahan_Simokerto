'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Skeleton,
  Chip,
  Grid,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Stack,
  CircularProgress,
  Pagination,
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
import useMediaQuery from '@mui/material/useMediaQuery';
import responsiveUtils from '../../shared-theme/responsive';

interface Admin {
  id: number;
  username: string;
  name: string | null;
  address: string | null;
  created_at: string;
  role: 'superadmin' | 'admin1' | 'admin2' | 'petugas' | 'user' | null;
  pending: boolean;
}

const AdminManagementSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  const theme = useTheme();
  const cardOrRow = (key: number) => isMobile ? (
    <Paper key={key} elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${alpha(theme.palette.divider, 0.8)}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="20%" />
      </Box>
      <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" />
    </Paper>
  ) : (
    <TableRow key={key}>
      <TableCell colSpan={7}>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        <Skeleton width="200px" />
      </Typography>
      {isMobile ? (
        <Stack spacing={1.5}>{Array.from(new Array(3)).map((_, i) => cardOrRow(i))}</Stack>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Table>
            <TableHead>
              <TableRow>
                {Array.from(new Array(7)).map((_, i) => <TableCell key={i}><Skeleton /></TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>{Array.from(new Array(3)).map((_, i) => cardOrRow(i))}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default function AdminManagement() {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
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
    address: '',
    rw: '',
    rt: '',
    password: '',
    role: 'admin1' as 'admin1' | 'admin2' | 'superadmin' | 'petugas' | 'user',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info'
  });

  const filterAdminsByRole = useCallback((adminsList: any[]) => {
    if (user?.role === 'superadmin') return adminsList;
    if (user?.role === 'admin1') return adminsList.filter(admin => ['admin2', 'petugas', 'user'].includes(admin.role));
    return [];
  }, [user?.role]);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const [adminsResponse, pendingResponse] = await Promise.all([
        fetch('/api/admin/admins'),
        fetch('/api/admin/admins/pending')
      ]);
      if (adminsResponse.ok && pendingResponse.ok) {
        const adminsData = await adminsResponse.json();
        const pendingData = await pendingResponse.json();
        setAdmins(filterAdminsByRole(adminsData));
        setPendingAdmins(filterAdminsByRole(pendingData));
      } else {
        throw new Error('Failed to fetch admin data');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setSnackbar({ open: true, message: 'Gagal memuat data admin', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [filterAdminsByRole]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const getAvailableRoles = () => {
    if (user?.role === 'superadmin') {
      return [
        { value: 'superadmin', label: 'Super Admin' },
        { value: 'admin1', label: 'Admin 1' },
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' },
      ];
    } else if (user?.role === 'admin1') {
      return [
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' },
      ];
    }
    return [];
  };

  const getAvailableApprovalRoles = () => {
    if (user?.role === 'superadmin') {
      return [
        { value: 'superadmin', label: 'Super Admin' },
        { value: 'admin1', label: 'Admin 1' },
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' },
        { value: 'user', label: 'User Warga' }
      ];
    } else if (user?.role === 'admin1') {
      return [
        { value: 'admin2', label: 'Admin 2' },
        { value: 'petugas', label: 'Petugas' },
        { value: 'user', label: 'User Warga' }
      ];
    }
    return [];
  };

  const generateRWOptions = () => Array.from({ length: 14 }, (_, i) => ({ value: `RW ${(i + 1).toString().padStart(2, '0')}`, label: `RW ${(i + 1).toString().padStart(2, '0')}` }));
  const generateRTOptions = () => Array.from({ length: 10 }, (_, i) => ({ value: `RT ${(i + 1).toString().padStart(2, '0')}`, label: `RT ${(i + 1).toString().padStart(2, '0')}` }));

  const resetForm = () => {
    const availableRoles = getAvailableRoles();
    const defaultRole = availableRoles.length > 0 ? availableRoles[0].value : 'admin1';
    setFormData({ username: '', name: '', address: '', rw: '', rt: '', password: '', role: defaultRole as any });
  };

  const populateForm = (admin: Admin) => {
    const adminAddress = admin.address || '';
    const addressParts = adminAddress.split(',');
    let baseAddress = adminAddress, rw = '', rt = '';
    if (addressParts.length >= 3) {
      baseAddress = addressParts.slice(0, -2).join(',').trim();
      rw = addressParts[addressParts.length - 2].trim();
      rt = addressParts[addressParts.length - 1].trim();
    }
    setFormData({ username: admin.username, name: admin.name || '', address: baseAddress, rw, rt, password: '', role: admin.role || 'admin1' });
  };

  const handleAddAdmin = () => {
    resetForm();
    setAdminDialog({ open: true, admin: null, mode: 'add' });
  };

  const handleEditAdmin = (admin: Admin) => {
    populateForm(admin);
    setAdminDialog({ open: true, admin, mode: 'edit' });
  };

  const handleDeleteAdmin = (admin: Admin) => {
    if (admin.id === Number(user?.id)) {
      setSnackbar({ open: true, message: 'Anda tidak dapat menghapus akun Anda sendiri.', severity: 'error' });
      return;
    }
    setConfirmDialog({ open: true, title: 'Hapus Admin', message: `Apakah Anda yakin ingin menghapus admin "${admin.name}"?`, onConfirm: () => confirmDeleteAdmin(admin.id) });
  };

  const [approvalRole, setApprovalRole] = useState<'admin1' | 'admin2' | 'petugas' | 'superadmin'>('admin1');
  const [approvalDialog, setApprovalDialog] = useState({ open: false, admin: null as Admin | null });

  const handleApproveAdmin = (admin: Admin) => {
    const availableRoles = getAvailableApprovalRoles();
    setApprovalRole(availableRoles.length > 0 ? availableRoles[0].value as any : 'admin1');
    setApprovalDialog({ open: true, admin });
  };

  const handleRejectAdmin = (admin: Admin) => {
    setConfirmDialog({ open: true, title: 'Tolak Admin', message: `Apakah Anda yakin ingin menolak "${admin.name}"?`, onConfirm: () => confirmRejectAdmin(admin.id) });
  };

  const submitAdminForm = async () => {
    const { username, name, password, role, address, rw, rt } = formData;
    if (!username || !name || (!password && adminDialog.mode === 'add')) {
      setSnackbar({ open: true, message: 'Username, Nama, dan Password wajib diisi.', severity: 'error' });
      return;
    }
    if (role === 'user' && (!address || !rw || !rt)) {
      setSnackbar({ open: true, message: 'Untuk warga, alamat, RW, dan RT wajib diisi.', severity: 'error' });
      return;
    }

    setLoadingStates(prev => ({ ...prev, submit: true }));
    try {
      const fullAddress = rw && rt ? `${address},${rw},${rt}` : address;
      const { rw: _rw, rt: _rt, ...finalData } = { ...formData, address: fullAddress, userId: user?.id, userRole: user?.role, userName: user?.name || user?.username };
      const url = adminDialog.mode === 'add' ? '/api/admin/admins' : `/api/admin/admins/${adminDialog.admin?.id}`;
      const method = adminDialog.mode === 'add' ? 'POST' : 'PUT';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) });
      if (!response.ok) throw new Error((await response.json()).message || 'Gagal menyimpan data admin');
      fetchAdmins();
      setSnackbar({ open: true, message: `Admin berhasil ${adminDialog.mode === 'add' ? 'ditambahkan' : 'diperbarui'}`, severity: 'success' });
      setAdminDialog({ ...adminDialog, open: false });
    } catch (error) {
      setSnackbar({ open: true, message: error instanceof Error ? error.message : 'Gagal menyimpan data admin', severity: 'error' });
    } finally {
      setLoadingStates(prev => ({ ...prev, submit: false }));
    }
  };

  const confirmDeleteAdmin = async (adminId: number) => {
    setLoadingStates(prev => ({ ...prev, delete: { ...prev.delete, [adminId]: true } }));
    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user?.id, userRole: user?.role, userName: user?.name || user?.username }) });
      if (!response.ok) throw new Error('Gagal menghapus admin');
      setAdmins(admins.filter(admin => admin.id !== adminId));
      setSnackbar({ open: true, message: 'Admin berhasil dihapus', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Gagal menghapus admin', severity: 'error' });
    } finally {
      setLoadingStates(prev => ({ ...prev, delete: { ...prev.delete, [adminId]: false } }));
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmApproveAdmin = async (adminId: number, selectedRole: string) => {
    setLoadingStates(prev => ({ ...prev, approve: { ...prev.approve, [adminId]: true } }));
    try {
      const response = await fetch(`/api/admin/admins/approve/${adminId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: selectedRole }) });
      const data = await response.json();
      if (data.alreadyApproved) {
        setSnackbar({ open: true, message: 'Admin ini telah disetujui sebelumnya.', severity: 'info' });
      } else if (response.ok) {
        setSnackbar({ open: true, message: 'Admin berhasil disetujui.', severity: 'success' });
      } else {
        throw new Error(data.message || 'Gagal menyetujui admin');
      }
      fetchAdmins();
    } catch (error) {
      setSnackbar({ open: true, message: error instanceof Error ? error.message : 'Gagal menyetujui admin', severity: 'error' });
    } finally {
      setLoadingStates(prev => ({ ...prev, approve: { ...prev.approve, [adminId]: false } }));
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const confirmRejectAdmin = async (adminId: number) => {
    setLoadingStates(prev => ({ ...prev, reject: { ...prev.reject, [adminId]: true } }));
    try {
      const response = await fetch(`/api/admin/admins/reject/${adminId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal menolak admin');
      setPendingAdmins(pendingAdmins.filter(admin => admin.id !== adminId));
      setSnackbar({ open: true, message: 'Admin berhasil ditolak', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Gagal menolak admin', severity: 'error' });
    } finally {
      setLoadingStates(prev => ({ ...prev, reject: { ...prev.reject, [adminId]: false } }));
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelectChange = (e: any) => setFormData(prev => ({ ...prev, role: e.target.value }));

  const filteredAdmins = admins.filter(admin =>
    ((admin.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || admin.username.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter ? admin.role === roleFilter : true)
  );

  const renderRoleChip = (role: string) => {
    const roleMap: { [key: string]: { label: string; color: any } } = {
      superadmin: { label: 'Super Admin', color: 'error' },
      admin1: { label: 'Admin', color: 'primary' },
      admin2: { label: 'Admin 2', color: 'secondary' },
      petugas: { label: 'Petugas', color: 'info' },
    };
    const { label, color } = roleMap[role] || { label: role, color: 'default' };
    return <Chip label={label} size="small" color={color} />;
  };

  const renderAdminList = (list: Admin[], isPending: boolean) => {
    if (isMobile) {
      return (
        <Stack spacing={1.5}>
          {list.map(admin => (
            <Paper key={admin.id} elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{admin.name || admin.username}</Typography>
                {!isPending && renderRoleChip(admin.role || '')}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>@{admin.username}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                {isPending ? (
                  <>
                    <Button size="small" color="success" onClick={() => handleApproveAdmin(admin)} disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}>Setujui</Button>
                    <Button size="small" color="error" onClick={() => handleRejectAdmin(admin)} disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}>Tolak</Button>
                  </>
                ) : (
                  <>
                    <IconButton size="small" onClick={() => handleEditAdmin(admin)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDeleteAdmin(admin)} disabled={loadingStates.delete[admin.id]}><DeleteIcon fontSize="small" /></IconButton>
                  </>
                )}
              </Box>
            </Paper>
          ))}
        </Stack>
      );
    }
    return (
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Username</TableCell>
              {!isPending && <TableCell>Role</TableCell>}
              <TableCell>Bergabung</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(admin => (
              <TableRow key={admin.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{admin.name || '-'}</TableCell>
                <TableCell>{admin.username}</TableCell>
                {!isPending && <TableCell>{renderRoleChip(admin.role || '')}</TableCell>}
                <TableCell>{new Date(admin.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                <TableCell align="right">
                  {isPending ? (
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="contained" color="success" onClick={() => handleApproveAdmin(admin)} disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}>Setujui</Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleRejectAdmin(admin)} disabled={loadingStates.approve[admin.id] || loadingStates.reject[admin.id]}>Tolak</Button>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton size="small" onClick={() => handleEditAdmin(admin)}><EditIcon /></IconButton>
                      <IconButton size="small" onClick={() => handleDeleteAdmin(admin)} disabled={loadingStates.delete[admin.id]}><DeleteIcon /></IconButton>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (loading) {
    return <AdminManagementSkeleton isMobile={isMobile} />;
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>Manajemen Admin</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddAdmin}>Tambah Admin</Button>
      </Box>

      <Paper elevation={0} sx={{ ...responsiveUtils.card(theme), p: 2, mb: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="Cari admin" placeholder="Cari berdasarkan nama atau username..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
          <FormControl size="small" sx={{ width: { xs: '100%', sm: 200 } }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="">Semua Role</MenuItem>
              {getAvailableRoles().map(role => <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Daftar Admin</Typography>
      {filteredAdmins.length > 0 ? renderAdminList(filteredAdmins, false) : <Typography color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>Tidak ada admin yang cocok.</Typography>}

      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>Menunggu Persetujuan</Typography>
      {pendingAdmins.length > 0 ? renderAdminList(pendingAdmins, true) : <Typography color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>Tidak ada admin yang menunggu persetujuan.</Typography>}

      {/* Dialogs */}
      <Dialog open={adminDialog.open} onClose={() => setAdminDialog({ ...adminDialog, open: false })} fullWidth maxWidth="sm">
        <DialogTitle>{adminDialog.mode === 'add' ? 'Tambah Admin Baru' : 'Edit Data Admin'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleInputChange} disabled={adminDialog.mode === 'edit'} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Nama Lengkap" name="name" value={formData.name} onChange={handleInputChange} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Alamat" name="address" value={formData.address} onChange={handleInputChange} multiline rows={2} placeholder="Alamat (tanpa RW/RT)" /></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>RW</InputLabel><Select value={formData.rw} label="RW" onChange={(e) => setFormData(p => ({ ...p, rw: e.target.value }))}>{generateRWOptions().map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>RT</InputLabel><Select value={formData.rt} label="RT" onChange={(e) => setFormData(p => ({ ...p, rt: e.target.value }))}>{generateRTOptions().map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={12}><TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} helperText={adminDialog.mode === 'edit' ? 'Biarkan kosong jika tidak ingin mengubah password' : ''} /></Grid>
            <Grid item xs={12}><FormControl fullWidth><InputLabel>Role</InputLabel><Select value={formData.role} label="Role" onChange={handleSelectChange} disabled={adminDialog.admin?.id === user?.id}>{getAvailableRoles().map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}</Select></FormControl></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminDialog({ ...adminDialog, open: false })}>Batal</Button>
          <Button onClick={submitAdminForm} variant="contained" disabled={loadingStates.submit}>{loadingStates.submit ? 'Menyimpan...' : 'Simpan'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={approvalDialog.open} onClose={() => setApprovalDialog({ ...approvalDialog, open: false })}>
        <DialogTitle>Setujui Admin</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={approvalRole} label="Role" onChange={(e) => setApprovalRole(e.target.value as any)}>
              {getAvailableApprovalRoles().map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog({ ...approvalDialog, open: false })}>Batal</Button>
          <Button onClick={() => { if (approvalDialog.admin) { confirmApproveAdmin(approvalDialog.admin.id, approvalRole); setApprovalDialog({ ...approvalDialog, open: false }); } }} variant="contained">Setujui</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent><Typography>{confirmDialog.message}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Batal</Button>
          <Button onClick={confirmDialog.onConfirm} color="error" variant="contained">Konfirmasi</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
