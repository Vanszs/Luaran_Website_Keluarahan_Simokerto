'use client';

import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  Divider,
  Avatar,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Tipe data berdasarkan struktur database
interface User {
  id: number;
  username: string;
  name: string;
  address: string;
  created_at: string;
}

interface Admin {
  id: number;
  username: string;
  name: string | null;
  created_at: string;
  role: 'superadmin' | 'admin';
}

interface Report {
  id: number;
  user_id: number;
  address: string;
  created_at: string;
  user?: {
    name: string;
  };
}

export default function AdminDashboardPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error' | 'info'}>({
    open: false,
    message: '',
    severity: 'info'
  });
  
  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  
  // Filter dan search
  const [userSearch, setUserSearch] = useState('');
  const [adminSearch, setAdminSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  
  // Dialog states
  const [userDialog, setUserDialog] = useState<{open: boolean; user: User | null; mode: 'add' | 'edit'}>({
    open: false,
    user: null,
    mode: 'add'
  });
  const [adminDialog, setAdminDialog] = useState<{open: boolean; admin: Admin | null; mode: 'add' | 'edit'}>({
    open: false,
    admin: null,
    mode: 'add'
  });
  const [confirmDialog, setConfirmDialog] = useState<{open: boolean; title: string; message: string; onConfirm: () => void}>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Muat data dari API ketika komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulasi panggilan API
      // Dalam implementasi nyata, ganti dengan panggilan fetch ke API Anda
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Data dummy untuk demo
      setUsers([
        { id: 1, username: 'user1', name: 'Siti Aminah', address: 'Jl. Melati No.10, Surabaya', created_at: '2025-07-01 12:45:07' },
        { id: 2, username: 'user2', name: 'Budi Santoso', address: 'Jl. Kenanga No.22, Sidoarjo', created_at: '2025-07-01 12:45:07' },
        { id: 3, username: 'warga3', name: 'Rina Wijaya', address: 'Jl. Anggrek No.5, Gresik', created_at: '2025-07-01 12:45:07' },
      ]);
      
      setAdmins([
        { id: 1, username: 'admin_kelurahan1', name: 'Admin Simokerto', created_at: '2025-07-02 14:21:23', role: 'superadmin' },
        { id: 2, username: 'admin_utara', name: 'Admin Utara', created_at: '2025-07-02 14:21:23', role: 'admin' },
      ]);
      
      setPendingAdmins([
        { id: 3, username: 'admin_baru', name: 'Admin Baru', created_at: '2025-07-03 10:15:00', role: 'admin' },
      ]);
      
      setReports([
        { id: 1, user_id: 1, address: 'Jl. Melati No.10, Surabaya', created_at: '2025-07-03 08:45:07', user: { name: 'Siti Aminah' } },
        { id: 2, user_id: 2, address: 'Jl. Kenanga No.22, Sidoarjo', created_at: '2025-07-03 09:30:15', user: { name: 'Budi Santoso' } },
        { id: 3, user_id: 1, address: 'Jl. Melati No.10, Surabaya', created_at: '2025-07-02 14:20:33', user: { name: 'Siti Aminah' } },
        { id: 4, user_id: 3, address: 'Jl. Anggrek No.5, Gresik', created_at: '2025-07-02 16:05:22', user: { name: 'Rina Wijaya' } },
      ]);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setSnackbar({
        open: true,
        message: 'Gagal memuat data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddUser = () => {
    setUserDialog({
      open: true,
      user: null,
      mode: 'add'
    });
  };

  const handleEditUser = (user: User) => {
    setUserDialog({
      open: true,
      user,
      mode: 'edit'
    });
  };

  const handleDeleteUser = (user: User) => {
    setConfirmDialog({
      open: true,
      title: 'Hapus Pengguna',
      message: `Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`,
      onConfirm: () => {
        // Implementasi penghapusan pengguna
        setUsers(users.filter(u => u.id !== user.id));
        setSnackbar({
          open: true,
          message: 'Pengguna berhasil dihapus',
          severity: 'success'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleAddAdmin = () => {
    setAdminDialog({
      open: true,
      admin: null,
      mode: 'add'
    });
  };

  const handleApproveAdmin = (admin: Admin) => {
    setConfirmDialog({
      open: true,
      title: 'Setujui Admin',
      message: `Apakah Anda yakin ingin menyetujui "${admin.name}" sebagai admin?`,
      onConfirm: () => {
        // Implementasi persetujuan admin
        setAdmins([...admins, admin]);
        setPendingAdmins(pendingAdmins.filter(a => a.id !== admin.id));
        setSnackbar({
          open: true,
          message: 'Admin berhasil disetujui',
          severity: 'success'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRejectAdmin = (admin: Admin) => {
    setConfirmDialog({
      open: true,
      title: 'Tolak Admin',
      message: `Apakah Anda yakin ingin menolak "${admin.name}" sebagai admin?`,
      onConfirm: () => {
        // Implementasi penolakan admin
        setPendingAdmins(pendingAdmins.filter(a => a.id !== admin.id));
        setSnackbar({
          open: true,
          message: 'Permintaan admin ditolak',
          severity: 'success'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.address.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin => 
    (admin.name || '').toLowerCase().includes(adminSearch.toLowerCase()) || 
    admin.username.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredReports = reports.filter(report => 
    report.address.toLowerCase().includes(reportSearch.toLowerCase()) ||
    (report.user?.name || '').toLowerCase().includes(reportSearch.toLowerCase())
  );

  // Menghitung statistik
  const todayReports = reports.filter(report => {
    const today = new Date().toISOString().split('T')[0];
    return report.created_at.startsWith(today);
  }).length;

  const totalReports = reports.length;

  // Render tab konten dashboard
  const renderDashboardTab = () => (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Kartu Statistik */}
      <Grid item xs={12} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 4,
          p: 1,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha('#3f51b5', 0.2)} 0%, ${alpha('#3f51b5', 0.3)} 100%)`
            : `linear-gradient(135deg, ${alpha('#3f51b5', 0.1)} 0%, ${alpha('#3f51b5', 0.2)} 100%)`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(0,0,0,0.3)'
            : '0 8px 16px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700}>Laporan Hari Ini</Typography>
            </Box>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
              {todayReports}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dari {users.length} warga terdaftar
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 4,
          p: 1,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha('#f44336', 0.2)} 0%, ${alpha('#f44336', 0.3)} 100%)`
            : `linear-gradient(135deg, ${alpha('#f44336', 0.1)} 0%, ${alpha('#f44336', 0.2)} 100%)`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(0,0,0,0.3)'
            : '0 8px 16px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#f44336', mr: 2 }}>
                <NotificationsIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700}>Total Laporan</Typography>
            </Box>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
              {totalReports}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Semua waktu
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 4,
          p: 1,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha('#4caf50', 0.2)} 0%, ${alpha('#4caf50', 0.3)} 100%)`
            : `linear-gradient(135deg, ${alpha('#4caf50', 0.1)} 0%, ${alpha('#4caf50', 0.2)} 100%)`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(0,0,0,0.3)'
            : '0 8px 16px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                <GroupIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700}>Warga Terdaftar</Typography>
            </Box>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
              {users.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pengguna aktif
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Tabel Laporan Terbaru */}
      <Grid item xs={12}>
        <Card elevation={0} sx={{ 
          borderRadius: 4,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.2)'
            : '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Laporan Terbaru
            </Typography>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Waktu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.slice(0, 5).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>#{report.id}</TableCell>
                      <TableCell>{report.user?.name}</TableCell>
                      <TableCell>{report.address}</TableCell>
                      <TableCell>
                        {new Date(report.created_at).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Render tab manajemen warga
  const renderUsersTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Cari warga..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ borderRadius: 2 }}
        >
          Tambah Warga
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
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
              <TableCell>Alamat</TableCell>
              <TableCell>Terdaftar</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEditUser(user)} color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteUser(user)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // Render tab manajemen admin
  const renderAdminsTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Cari admin..."
          value={adminSearch}
          onChange={(e) => setAdminSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAdmin}
          sx={{ borderRadius: 2 }}
        >
          Tambah Admin
        </Button>
      </Box>

      {/* Admin Terdaftar */}
      <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
        Admin Terdaftar
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        mb: 4,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.id} hover>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={admin.role === 'superadmin' ? 'Super Admin' : 'Admin'} 
                    size="small"
                    color={admin.role === 'superadmin' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  {new Date(admin.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Admin yang Menunggu Persetujuan */}
      {pendingAdmins.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
            Menunggu Persetujuan
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ 
            borderRadius: 3,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(0,0,0,0.2)'
              : '0 4px 12px rgba(0,0,0,0.1)',
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
                  <TableCell>Terdaftar</TableCell>
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
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success" 
                        onClick={() => handleApproveAdmin(admin)}
                        sx={{ mr: 1, borderRadius: 2 }}
                      >
                        Setuju
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
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
        </>
      )}
    </>
  );

  // Render tab laporan
  const renderReportsTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Cari laporan..."
          value={reportSearch}
          onChange={(e) => setReportSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Table>
          <TableHead sx={{ 
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Waktu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id} hover>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.user?.name}</TableCell>
                <TableCell>{report.address}</TableCell>
                <TableCell>
                  {new Date(report.created_at).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // Dialog untuk mengelola user
  const renderUserDialog = () => (
    <Dialog 
      open={userDialog.open} 
      onClose={() => setUserDialog({ ...userDialog, open: false })}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{userDialog.mode === 'add' ? 'Tambah Warga Baru' : 'Edit Data Warga'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              defaultValue={userDialog.user?.name || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              defaultValue={userDialog.user?.username || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Alamat"
              multiline
              rows={2}
              defaultValue={userDialog.user?.address || ''}
            />
          </Grid>
          {userDialog.mode === 'add' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setUserDialog({ ...userDialog, open: false })} color="inherit">
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Implementasi penambahan/edit user
            if (userDialog.mode === 'add') {
              // Simulasi penambahan user baru
              const newUser: User = {
                id: users.length + 1,
                username: 'newuser',
                name: 'Warga Baru',
                address: 'Alamat Baru',
                created_at: new Date().toISOString()
              };
              setUsers([...users, newUser]);
            } else if (userDialog.user) {
              // Simulasi edit user
              const updatedUsers = users.map(u => 
                u.id === userDialog.user?.id ? { ...u, name: 'Nama yang diedit' } : u
              );
              setUsers(updatedUsers);
            }
            
            setSnackbar({
              open: true,
              message: userDialog.mode === 'add' ? 'Warga berhasil ditambahkan' : 'Data warga berhasil diperbarui',
              severity: 'success'
            });
            
            setUserDialog({ ...userDialog, open: false });
          }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Dialog untuk mengelola admin
  const renderAdminDialog = () => (
    <Dialog 
      open={adminDialog.open} 
      onClose={() => setAdminDialog({ ...adminDialog, open: false })}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{adminDialog.mode === 'add' ? 'Tambah Admin Baru' : 'Edit Data Admin'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              defaultValue={adminDialog.admin?.name || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              defaultValue={adminDialog.admin?.username || ''}
            />
          </Grid>
          {adminDialog.mode === 'add' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  defaultValue="admin"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="superadmin">Super Admin</MenuItem>
                </TextField>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAdminDialog({ ...adminDialog, open: false })} color="inherit">
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Implementasi penambahan/edit admin
            if (adminDialog.mode === 'add') {
              // Simulasi penambahan admin baru
              const newAdmin: Admin = {
                id: admins.length + pendingAdmins.length + 1,
                username: 'newadmin',
                name: 'Admin Baru',
                created_at: new Date().toISOString(),
                role: 'admin'
              };
              setAdmins([...admins, newAdmin]);
            }
            
            setSnackbar({
              open: true,
              message: adminDialog.mode === 'add' ? 'Admin berhasil ditambahkan' : 'Data admin berhasil diperbarui',
              severity: 'success'
            });
            
            setAdminDialog({ ...adminDialog, open: false });
          }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Dialog konfirmasi
  const renderConfirmDialog = () => (
    <Dialog 
      open={confirmDialog.open} 
      onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
    >
      <DialogTitle>{confirmDialog.title}</DialogTitle>
      <DialogContent>
        <Typography>{confirmDialog.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })} color="inherit">
          Batal
        </Button>
        <Button onClick={confirmDialog.onConfirm} variant="contained" color="error">
          Konfirmasi
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e293b 0%, #283c56 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        mb: 3,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 24px rgba(0,0,0,0.2)'
          : '0 8px 24px rgba(0,0,0,0.1)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Dashboard Admin
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sistem Informasi "Sirine Maling" Kelurahan Simokerto
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ 
        borderRadius: 4,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 1.5,
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<DashboardIcon />} 
            label="Dashboard" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
          <Tab 
            icon={<GroupIcon />} 
            label="Warga" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
          <Tab 
            icon={<AdminPanelSettingsIcon />} 
            label="Admin" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
          <Tab 
            icon={<WarningIcon />} 
            label="Laporan" 
            iconPosition="start"
            sx={{ fontWeight: 600, textTransform: 'none', minHeight: 64 }}
          />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && renderDashboardTab()}
          {tabValue === 1 && renderUsersTab()}
          {tabValue === 2 && renderAdminsTab()}
          {tabValue === 3 && renderReportsTab()}
        </Box>
      </Paper>

      {/* Render dialogs */}
      {renderUserDialog()}
      {renderAdminDialog()}
      {renderConfirmDialog()}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ boxShadow: 2, borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
