'use client';

import React, { useState, useEffect } from 'react';
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
  DialogContent,
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
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
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
    limit: 50,
    total: 0,
    totalPages: 0
  });
  
  // Detail dialog
  const [detailDialog, setDetailDialog] = useState({
    open: false,
    log: null as ActivityLog | null
  });

  useEffect(() => {
    fetchFilterOptions();
    fetchLogs();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [filters, pagination.page]);

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

  const fetchLogs = async () => {
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
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPagination(prev => ({ ...prev, page }));
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Card sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HistoryIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
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
      <Paper sx={{ p: 3, mb: 3 }}>
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
              <IconButton onClick={fetchLogs} color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      {/* Logs Table */}
      <Paper>
        <TableContainer>
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
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
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
                      '&:hover': { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.04) 
                      } 
                    }}
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
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
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
