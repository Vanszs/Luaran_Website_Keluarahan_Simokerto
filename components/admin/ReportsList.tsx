'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  alpha,
  useTheme,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Chip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
  HourglassEmpty as PendingIcon,
  Engineering as ProcessingIcon,
  CheckCircle as CompletedIcon,
  Cancel as RejectedIcon,
} from '@mui/icons-material';

interface Report {
  id: number;
  user_id: number;
  address: string;
  description: string;
  created_at: string;
  pelapor: string;
  jenis_laporan: string;
  reporter_type: string;
  status: string;
  user: {
    name: string;
    phone: string | null;
  };
}

export default function ReportsList() {
  const theme = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [reporterTypeFilter, setReporterTypeFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  // Status update related state
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReportForStatus, setSelectedReportForStatus] = useState<number | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reports');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  // Status menu handlers
  const handleStatusMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, reportId: number) => {
    setStatusMenuAnchorEl(event.currentTarget);
    setSelectedReportForStatus(reportId);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setSelectedReportForStatus(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedReportForStatus) return;
    
    setStatusUpdateLoading(true);
    try {
      const response = await fetch('/api/admin/reports/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: selectedReportForStatus,
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local reports state with new status
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === selectedReportForStatus ? { ...report, status: newStatus } : report
        )
      );

      setSnackbar({
        open: true,
        message: `Status berhasil diubah menjadi ${getStatusInIndonesian(newStatus)}`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating status:', error);
      setSnackbar({
        open: true,
        message: 'Gagal mengubah status laporan',
        severity: 'error'
      });
    } finally {
      setStatusUpdateLoading(false);
      handleStatusMenuClose();
    }
  };

  // Helper function to get status in Indonesian
  const getStatusInIndonesian = (status: string): string => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'completed': return 'Selesai';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon fontSize="small" />;
      case 'processing': return <ProcessingIcon fontSize="small" />;
      case 'completed': return <CompletedIcon fontSize="small" />;
      case 'rejected': return <RejectedIcon fontSize="small" />;
      default: return <PendingIcon fontSize="small" />;
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const handleViewDetails = (report: Report) => {
    setDetailDialogOpen(true);
    setSelectedReport(report);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.pelapor && report.pelapor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.user.name && report.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.jenis_laporan && report.jenis_laporan.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'all' || 
      (report.status && report.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
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
          Daftar Laporan
        </Typography>
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Cari berdasarkan nama warga atau alamat..."
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
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Semua Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Sedang Diproses</MenuItem>
                <MenuItem value="completed">Selesai</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

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
              <TableCell>Nama Pelapor</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Waktu Laporan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>
                    {report.pelapor || report.user.name}
                    <Typography variant="caption" display="block" color="text.secondary">
                      {report.reporter_type === 'admin' ? '(Admin)' : '(Warga)'}
                    </Typography>
                  </TableCell>
                  <TableCell>{report.jenis_laporan || 'Umum'}</TableCell>
                  <TableCell>{report.address}</TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        icon={getStatusIcon(report.status)}
                        label={getStatusInIndonesian(report.status)}
                        color={getStatusColor(report.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton 
                        size="small"
                        onClick={(e) => handleStatusMenuOpen(e, report.id)}
                        disabled={statusUpdateLoading}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleStatusMenuOpen(e, report.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={statusMenuAnchorEl}
                      open={Boolean(statusMenuAnchorEl) && selectedReportForStatus === report.id}
                      onClose={handleStatusMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleStatusChange('pending');
                        }}
                        disabled={report.status === 'pending'}
                      >
                        <ListItemIcon>
                          <PendingIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Tandai Sebagai Pending" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleStatusChange('processing');
                        }}
                        disabled={report.status === 'processing'}
                      >
                        <ListItemIcon>
                          <ProcessingIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Tandai Sedang Diproses" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleStatusChange('completed');
                        }}
                        disabled={report.status === 'completed'}
                      >
                        <ListItemIcon>
                          <CompletedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Tandai Selesai" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleStatusChange('rejected');
                        }}
                        disabled={report.status === 'rejected'}
                      >
                        <ListItemIcon>
                          <RejectedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Tandai Ditolak" />
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                    <WarningIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Tidak ada data laporan
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Report Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detail Laporan #{selectedReport?.id}</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  ID Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle2" color="text.secondary">
                  Waktu Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {new Date(selectedReport.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nama Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.pelapor || selectedReport.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tipe Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.reporter_type === 'admin' ? 'Admin' : 'Warga'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  No. Telepon
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.user.phone || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Jenis Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.jenis_laporan || 'Umum'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Alamat Kejadian
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Deskripsi
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.description}
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
