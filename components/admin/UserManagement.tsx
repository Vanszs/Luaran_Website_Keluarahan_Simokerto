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
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ListSubheader,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import responsiveUtils from '../../shared-theme/responsive';
import { Lock as LockIcon } from '@mui/icons-material';

interface User {
  id: number;
  username: string;
  name: string;
  address: string;
  phone: string | null;
  created_at: string;
}

export default function UserManagement() {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Check if current user can add users
  const canAddUsers = user?.role !== 'admin2'; // Admin2 cannot add users

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDialog, setUserDialog] = useState({
    open: false,
    user: null as User | null,
    mode: 'add' as 'add' | 'edit'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    userId: null as number | null,
    userName: ''
  });
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    address: '',
    rw: '',
    rt: '',
    phone: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Generate RW options (1-14)
  const generateRWOptions = () => {
    const options = [];
    for (let i = 1; i <= 14; i++) {
      options.push({
        value: `RW ${i.toString().padStart(2, '0')}`,
        label: `RW ${i.toString().padStart(2, '0')}`
      });
    }
    return options;
  };

  // Generate RT options (1-10)
  const generateRTOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push({
        value: `RT ${i.toString().padStart(2, '0')}`,
        label: `RT ${i.toString().padStart(2, '0')}`
      });
    }
    return options;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load users',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setFormData({
      username: '',
      name: '',
      address: '',
      rw: '',
      rt: '',
      phone: '',
      password: '',
    });
    setUserDialog({
      open: true,
      user: null,
      mode: 'add'
    });
  };

  const handleEditUser = (user: User) => {
    // Parse existing address to extract RW/RT if present
    const addressParts = user.address.split(',');
    let baseAddress = user.address;
    let rw = '';
    let rt = '';
    
    if (addressParts.length >= 3) {
      // Address format: {address},{rw},{rt}
      baseAddress = addressParts.slice(0, -2).join(',').trim();
      rw = addressParts[addressParts.length - 2].trim();
      rt = addressParts[addressParts.length - 1].trim();
    }
    
    setFormData({
      username: user.username,
      name: user.name,
      address: baseAddress,
      rw: rw,
      rt: rt,
      phone: user.phone || '',
      password: '', // Don't prefill password when editing
    });
    setUserDialog({
      open: true,
      user,
      mode: 'edit'
    });
  };

  const handleDeleteUser = (user: User) => {
    setConfirmDialog({
      open: true,
      userId: user.id,
      userName: user.name
    });
  };

  const submitUserForm = async () => {
    try {
      // Combine address with RW and RT
      const fullAddress = formData.rw && formData.rt 
        ? `${formData.address},${formData.rw},${formData.rt}`
        : formData.address;
      
      const submitData = {
        ...formData,
        address: fullAddress
      };
      
      // Remove rw and rt from submit data since they're now part of address
      const { rw, rt, ...finalData } = submitData;
      
      const url = userDialog.mode === 'add' 
        ? '/api/admin/users' 
        : `/api/admin/users/${userDialog.user?.id}`;
      
      const method = userDialog.mode === 'add' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save user');
      }

      // Refresh user list
      fetchUsers();
      
      setSnackbar({
        open: true,
        message: userDialog.mode === 'add' 
          ? 'User added successfully' 
          : 'User updated successfully',
        severity: 'success'
      });
      
      setUserDialog({ ...userDialog, open: false });
    } catch (error) {
      console.error('Error saving user:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to save user',
        severity: 'error'
      });
    }
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${confirmDialog.userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from state
      setUsers(users.filter(user => user.id !== confirmDialog.userId));
      
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Mobile card layout for responsive design
  if (isMobile) {
    return (
      <>
        {/* Header and Add Button */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={700}>
            Manajemen Warga
          </Typography>
          {canAddUsers && (
            <Button 
              variant="contained" 
              onClick={handleAddUser}
              startIcon={<AddIcon />}
              size="small"
            >
              Tambah
            </Button>
          )}
        </Box>

        {/* Search Field */}
        <Paper
          elevation={0}
          sx={{
            ...responsiveUtils.card(theme),
            mb: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <TextField
            fullWidth
            placeholder="Cari berdasarkan nama, username, atau alamat..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              ...responsiveUtils.formField(theme),
              marginBottom: 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Mobile Card List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Paper key={user.id} sx={{ ...responsiveUtils.card(theme), mb: 1, border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">ID</Typography>
                  <Typography variant="body1" fontWeight={600}>{user.id}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Username</Typography>
                  <Typography variant="body1">{user.username}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Nama</Typography>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Alamat</Typography>
                  <Typography variant="body1">{user.address}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>No. Telepon</Typography>
                  <Typography variant="body1">{user.phone || '-'}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Terdaftar</Typography>
                  <Typography variant="body1">{new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography>
                  {canAddUsers && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <IconButton size="small" onClick={() => handleEditUser(user)} color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteUser(user)} color="error" sx={{ ml: 1 }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Paper>
            ))
          ) : (
            <Paper sx={{ ...responsiveUtils.card(theme), textAlign: 'center', p: 3 }}>
              <Typography variant="body1" color="text.secondary">Tidak ada data warga</Typography>
            </Paper>
          )}
        </Box>

        {/* Dialogs and Snackbar */}
        {renderDialogs()}
      </>
    );
  }

  // Desktop table layout
  return (
    <>
      {/* Header and Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Manajemen Warga
        </Typography>
        {canAddUsers && (
          <Button 
            variant="contained" 
            onClick={handleAddUser}
            startIcon={<AddIcon />}
          >
            Tambah Warga
          </Button>
        )}
      </Box>

      {/* Search Field */}
      <Paper
        elevation={0}
        sx={{
          ...responsiveUtils.card(theme),
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari berdasarkan nama, username, atau alamat..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            ...responsiveUtils.formField(theme),
            marginBottom: 0,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Desktop Table */}
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          ...responsiveUtils.table(theme),
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.2)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.8),
        }}
      >
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
              <TableCell>No. Telepon</TableCell>
              <TableCell>Terdaftar</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {user.address}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.phone || '-'}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {canAddUsers && (
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditUser(user)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDeleteUser(user)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada data warga yang ditemukan
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogs and Snackbar */}
      {renderDialogs()}
    </>
  );

  // Function to render all dialogs and snackbar
  function renderDialogs() {
    return (
      <>
        {/* User Form Dialog */}
        <Dialog 
          open={userDialog.open} 
          onClose={() => setUserDialog({ ...userDialog, open: false })}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {userDialog.mode === 'add' ? 'Tambah Warga Baru' : 'Edit Data Warga'}
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
                  disabled={userDialog.mode === 'edit'} // Username cannot be changed when editing
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
                  label="Alamat"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  placeholder="Masukkan alamat lengkap (tanpa RW/RT)"
                  helperText="RW dan RT akan dipilih di form terpisah di bawah"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="rw-select-label">RW</InputLabel>
                  <Select
                    labelId="rw-select-label"
                    id="rw-select"
                    value={formData.rw}
                    label="RW"
                    onChange={(e) => setFormData(prev => ({ ...prev, rw: e.target.value }))}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          width: 200,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Pilih RW</em>
                    </MenuItem>
                    {generateRWOptions().map((option) => (
                      <MenuItem 
                        key={option.value}
                        value={option.value}
                        sx={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          py: 0.5,
                          px: 1,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        <span>{option.label}</span>
                        {option.value === formData.rw && (
                          <Chip size="small" label="Dipilih" color="primary" sx={{ borderRadius: 1 }} />
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="rt-select-label">RT</InputLabel>
                  <Select
                    labelId="rt-select-label"
                    id="rt-select"
                    value={formData.rt}
                    label="RT"
                    onChange={(e) => setFormData(prev => ({ ...prev, rt: e.target.value }))}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          width: 200,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Pilih RT</em>
                    </MenuItem>
                    {generateRTOptions().map((option) => (
                      <MenuItem 
                        key={option.value}
                        value={option.value}
                        sx={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          py: 0.5,
                          px: 1,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        <span>{option.label}</span>
                        {option.value === formData.rt && (
                          <Chip size="small" label="Dipilih" color="primary" sx={{ borderRadius: 1 }} />
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No. Telepon"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Masukkan nomor telepon (opsional)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAddIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {userDialog.mode === 'add' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Masukkan password untuk akun ini"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialog({ ...userDialog, open: false })} color="inherit">
              Batal
            </Button>
            <Button onClick={submitUserForm} variant="contained" color="primary">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
        {/* Confirm Delete Dialog */}
        <Dialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
          aria-labelledby="confirm-delete-dialog-title"
          aria-describedby="confirm-delete-dialog-description"
        >
          <DialogTitle id="confirm-delete-dialog-title">Konfirmasi Hapus Pengguna</DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="text.secondary">
              Apakah Anda yakin ingin menghapus pengguna <strong>{confirmDialog.userName}</strong>? Tindakan ini tidak dapat dibatalkan.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })} color="inherit">
              Batal
            </Button>
            <Button onClick={confirmDeleteUser} variant="contained" color="error">
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  }
}
