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
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ListSubheader,
  Pagination,
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

// --- Skeleton Component ---
const UserManagementSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  const theme = useTheme();
  
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...Array(3)].map((_, index) => (
          <Paper 
            key={index} 
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width={50} height={30} />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Skeleton variant="circular" width={36} height={36} />
                <Skeleton variant="circular" width={36} height={36} />
              </Box>
            </Box>
            <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(7)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(7)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


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

  const [mobilePage, setMobilePage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    return <UserManagementSkeleton isMobile={isMobile} />;
  }

  // Mobile card layout for responsive design
  if (isMobile) {
    const pageCount = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice(
      (mobilePage - 1) * ITEMS_PER_PAGE,
      mobilePage * ITEMS_PER_PAGE
    );

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user, index) => (
              <Paper 
                key={user.id} 
                elevation={0}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.7)})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0,0,0,0.3)'
                      : '0 8px 32px rgba(0,0,0,0.12)',
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Header with ID and Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5,
                          display: 'block'
                        }}
                      >
                        ID Warga
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: theme.palette.primary.main 
                        }}
                      >
                        #{user.id}
                      </Typography>
                    </Box>
                    {canAddUsers && (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditUser(user)} 
                          sx={{
                            color: theme.palette.primary.main,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            },
                            width: 36,
                            height: 36,
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDeleteUser(user)} 
                          sx={{
                            color: theme.palette.error.main,
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.2),
                            },
                            width: 36,
                            height: 36,
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  {/* Username and Name */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Username
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 1 }}>
                      {user.username}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Nama Lengkap
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                      {user.name}
                    </Typography>
                  </Box>

                  {/* Address */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Alamat
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                        color: theme.palette.text.primary
                      }}
                    >
                      {user.address}
                    </Typography>
                  </Box>

                  {/* Contact and Registration Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5,
                          display: 'block'
                        }}
                      >
                        No. Telepon
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem', color: theme.palette.text.primary }}>
                        {user.phone || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5,
                          display: 'block'
                        }}
                      >
                        Terdaftar
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem', color: theme.palette.text.primary }}>
                        {new Date(user.created_at).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          ) : (
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.6)
                  : alpha(theme.palette.background.paper, 0.8),
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.text.secondary, 0.1)}, ${alpha(theme.palette.text.secondary, 0.05)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.7 }} />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  Tidak ada data warga
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pageCount}
              page={mobilePage}
              onChange={(e, page) => setMobilePage(page)}
              color="primary"
            />
          </Box>
        )}

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
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.background.paper, 0.9),
        }}
      >
        <TableContainer sx={{ 
          overflow: 'auto',
          [theme.breakpoints.down('lg')]: {
            minWidth: 800,
            overflowX: 'auto',
          },
        }}>
          <Table sx={{
            minWidth: { xs: 800, lg: 'auto' },
            '& .MuiTableCell-root': {
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              padding: '16px 12px',
              fontSize: '0.875rem',
              '&:first-of-type': {
                paddingLeft: 20,
              },
              '&:last-of-type': {
                paddingRight: 20,
              },
            },
          }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  ID
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  Username
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  Nama
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  Alamat
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  No. Telepon
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  Terdaftar
                </TableCell>
                <TableCell align="right" sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  background: 'transparent',
                }}>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          fontSize: '0.85rem'
                        }}
                      >
                        #{user.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.875rem',
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {user.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {user.phone || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {canAddUsers ? (
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditUser(user)}
                            sx={{
                              color: theme.palette.primary.main,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                              },
                              width: 32,
                              height: 32,
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteUser(user)}
                            sx={{
                              color: theme.palette.error.main,
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.2),
                              },
                              width: 32,
                              height: 32,
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Tidak ada aksi
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box 
                        sx={{ 
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${alpha(theme.palette.text.secondary, 0.1)}, ${alpha(theme.palette.text.secondary, 0.05)})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PersonAddIcon sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.7 }} />
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                        Tidak ada data warga
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
