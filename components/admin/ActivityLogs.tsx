'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  Stack,
  alpha,
  useTheme,
  InputAdornment,
  ButtonGroup,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface ActivityLog {
  id: number;
  user_id: number | null;
  user_role: string | null;
  user_name: string | null;
  action: string;
  table_name: string | null;
  record_id: number | null;
  old_data: any;
  new_data: any;
  description: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface FilterOptions {
  actions: string[];
  tables: string[];
  users: Array<{ user_id: number; user_name: string; user_role: string }>;
}

export default function ActivityLogs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    actions: [],
    tables: [],
    users: []
  });
  
  // Filters
  const [filters, setFilters] = useState({
    action: 'all',
    table: 'all',
    userId: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  
  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  // Detail dialog
  const [detailDialog, setDetailDialog] = useState({
    open: false,
    log: null as ActivityLog | null
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.action !== 'all' && { action: filters.action }),
        ...(filters.table !== 'all' && { table: filters.table }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      });

      const response = await fetch(`/api/admin/logs?${searchParams}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages
        }));
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchFilterOptions();
    fetchLogs();
  }, [fetchLogs]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/admin/logs', { method: 'OPTIONS' });
      if (response.ok) {
        const data = await response.json();
        setFilterOptions(data);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleFirstPage = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePrevPage = () => {
    setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  };

  const handleNextPage = () => {
    setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }));
  };

  const handleLastPage = () => {
    setPagination(prev => ({ ...prev, page: prev.totalPages }));
  };

  const handleViewDetails = (log: ActivityLog) => {
    setDetailDialog({
      open: true,
      log
    });
  };

  const getActionColor = (action: string): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    switch (action) {
      case 'CREATE':
        return 'success';
      case 'UPDATE':
        return 'warning';
      case 'DELETE':
        return 'error';
      case 'LOGIN':
        return 'info';
      case 'LOGOUT':
        return 'secondary';
      case 'PASSWORD_CHANGE':
        return 'warning';
      case 'STATUS_CHANGE':
        return 'primary';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss', { locale: idLocale });
  };

  const filteredLogs = logs.filter(log => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      log.description.toLowerCase().includes(searchLower) ||
      log.user_name?.toLowerCase().includes(searchLower) ||
      log.action.toLowerCase().includes(searchLower) ||
      log.table_name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 3,
      minHeight: '100vh',
      backgroundColor: 'grey.50'
    }}>
      {/* Header */}
      <Card sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          transform: 'translateX(-100%)',
          animation: loading ? 'shimmer 2s infinite' : 'none',
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          }
        }
      }}>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HistoryIcon sx={{ fontSize: isMobile ? 32 : 40 }} />
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                Log Aktivitas Sistem
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Pantau semua aktivitas dan perubahan dalam sistem
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Filters */}
      <Paper sx={{ 
        p: isMobile ? 2 : 3, 
        mb: 3,
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
        }
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Cari aktivitas..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Aksi</InputLabel>
              <Select
                value={filters.action}
                label="Aksi"
                onChange={(e) => handleFilterChange('action', e.target.value)}
              >
                <MenuItem value="all">Semua Aksi</MenuItem>
                {filterOptions.actions.map(action => (
                  <MenuItem key={action} value={action}>{action}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Tabel</InputLabel>
              <Select
                value={filters.table}
                label="Tabel"
                onChange={(e) => handleFilterChange('table', e.target.value)}
              >
                <MenuItem value="all">Semua Tabel</MenuItem>
                {filterOptions.tables.map(table => (
                  <MenuItem key={table} value={table}>{table}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Dari Tanggal"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Sampai Tanggal"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} md={1}>
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={fetchLogs} 
                color="primary"
                disabled={loading}
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(180deg)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  },
                  ...(loading && {
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    }
                  })
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      {/* Logs Table */}
      <Paper sx={{ 
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        ...(loading && {
          opacity: 0.7,
          pointerEvents: 'none'
        })
      }}>
        <TableContainer sx={{ 
          maxHeight: isMobile ? '60vh' : '70vh',
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100],
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: 4,
            '&:hover': {
              backgroundColor: theme.palette.grey[600],
            }
          }
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Waktu</TableCell>
                <TableCell>Pengguna</TableCell>
                <TableCell>Aksi</TableCell>
                <TableCell>Tabel</TableCell>
                <TableCell>Deskripsi</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell align="center">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Loading skeleton
                Array.from({ length: pagination.limit }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <TableCell key={`skeleton-cell-${cellIndex}`} sx={{ py: 2 }}>
                        <Box
                          sx={{
                            height: cellIndex === 0 ? 16 : cellIndex === 4 ? 20 : 14,
                            backgroundColor: theme.palette.grey[200],
                            borderRadius: 1,
                            animation: 'pulse 1.5s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%': { opacity: 1 },
                              '50%': { opacity: 0.4 },
                              '100%': { opacity: 1 },
                            },
                            width: cellIndex === 4 ? '80%' : cellIndex === 0 ? '60%' : '100%'
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Tidak ada data log yang ditemukan
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        transform: 'scale(1.001)',
                        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
                      },
                      '&:active': {
                        transform: 'scale(0.999)'
                      }
                    }}
                    onClick={() => handleViewDetails(log)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {formatDate(log.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {log.user_name || 'System'}
                        </Typography>
                        {log.user_role && (
                          <Chip 
                            label={log.user_role} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.action} 
                        color={getActionColor(log.action)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {log.table_name || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {log.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {log.ip_address || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Lihat Detail">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewDetails(log)}
                          color="primary"
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Enhanced Pagination Controls */}
        {pagination.totalPages > 1 && (
          <Box sx={{ 
            p: 2, 
            borderTop: 1, 
            borderColor: 'divider',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}>
            {/* Pagination Info */}
            <Typography variant="body2" color="text.secondary">
              Menampilkan {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} data
            </Typography>
            
            {/* Pagination Controls */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              justifyContent: 'center'
            }}>
              {/* Desktop Pagination */}
              {!isMobile && (
                <>
                  <ButtonGroup variant="outlined" size="small">
                    <Button
                      onClick={handleFirstPage}
                      disabled={pagination.page === 1}
                      startIcon={<FirstPageIcon />}
                    >
                      Pertama
                    </Button>
                    <Button
                      onClick={handlePrevPage}
                      disabled={pagination.page === 1}
                      startIcon={<PrevIcon />}
                    >
                      Sebelumnya
                    </Button>
                  </ButtonGroup>
                  
                  <Pagination
                    count={pagination.totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    showFirstButton={false}
                    showLastButton={false}
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: theme.shadows[2]
                        }
                      }
                    }}
                  />
                  
                  <ButtonGroup variant="outlined" size="small">
                    <Button
                      onClick={handleNextPage}
                      disabled={pagination.page === pagination.totalPages}
                      endIcon={<NextIcon />}
                    >
                      Selanjutnya
                    </Button>
                    <Button
                      onClick={handleLastPage}
                      disabled={pagination.page === pagination.totalPages}
                      endIcon={<LastPageIcon />}
                    >
                      Terakhir
                    </Button>
                  </ButtonGroup>
                </>
              )}
              
              {/* Mobile Pagination */}
              {isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: 2, 
                  width: '100%' 
                }}>
                  {/* Page indicator */}
                  <Typography variant="body2" fontWeight="medium">
                    Halaman {pagination.page} dari {pagination.totalPages}
                  </Typography>
                  
                  {/* Navigation buttons */}
                  <ButtonGroup 
                    variant="contained" 
                    size="large" 
                    fullWidth
                    sx={{
                      '& .MuiButton-root': {
                        py: 1.5,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4]
                        },
                        '&:disabled': {
                          transform: 'none',
                          boxShadow: 'none'
                        }
                      }
                    }}
                  >
                    <Button
                      onClick={handlePrevPage}
                      disabled={pagination.page === 1}
                      startIcon={<PrevIcon />}
                      sx={{ flex: 1 }}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      onClick={handleNextPage}
                      disabled={pagination.page === pagination.totalPages}
                      endIcon={<NextIcon />}
                      sx={{ flex: 1 }}
                    >
                      Selanjutnya
                    </Button>
                  </ButtonGroup>
                  
                  {/* Quick jump to first/last for mobile */}
                  {pagination.totalPages > 3 && (
                    <ButtonGroup variant="outlined" size="small">
                      <Button
                        onClick={handleFirstPage}
                        disabled={pagination.page === 1}
                        startIcon={<FirstPageIcon />}
                      >
                        Halaman 1
                      </Button>
                      <Button
                        onClick={handleLastPage}
                        disabled={pagination.page === pagination.totalPages}
                        endIcon={<LastPageIcon />}
                      >
                        Halaman {pagination.totalPages}
                      </Button>
                    </ButtonGroup>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Detail Dialog */}
      <Dialog 
        open={detailDialog.open} 
        onClose={() => setDetailDialog({ open: false, log: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HistoryIcon color="primary" />
            <Typography variant="h6">Detail Log Aktivitas</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {detailDialog.log && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Waktu</Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {formatDate(detailDialog.log.created_at)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Pengguna</Typography>
                <Typography variant="body1">
                  {detailDialog.log.user_name || 'System'} ({detailDialog.log.user_role || 'N/A'})
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Aksi</Typography>
                <Chip 
                  label={detailDialog.log.action} 
                  color={getActionColor(detailDialog.log.action)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Tabel</Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {detailDialog.log.table_name || '-'}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Deskripsi</Typography>
                <Typography variant="body1">
                  {detailDialog.log.description}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">IP Address</Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {detailDialog.log.ip_address || '-'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Record ID</Typography>
                <Typography variant="body1">
                  {detailDialog.log.record_id || '-'}
                </Typography>
              </Grid>
              
              {detailDialog.log.old_data && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Data Lama</Typography>
                  <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                    <pre style={{ fontSize: '0.875rem', margin: 0, overflow: 'auto' }}>
                      {JSON.stringify(detailDialog.log.old_data, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              
              {detailDialog.log.new_data && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Data Baru</Typography>
                  <Paper sx={{ p: 2, backgroundColor: 'success.50' }}>
                    <pre style={{ fontSize: '0.875rem', margin: 0, overflow: 'auto' }}>
                      {JSON.stringify(detailDialog.log.new_data, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              )}
              
              {detailDialog.log.user_agent && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">User Agent</Typography>
                  <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                    {detailDialog.log.user_agent}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialog({ open: false, log: null })}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
